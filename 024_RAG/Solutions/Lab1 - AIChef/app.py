import os
from typing import TypedDict, Literal, Optional

import streamlit as st
from dotenv import load_dotenv, dotenv_values

from langgraph.graph import StateGraph, END

from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langchain_community.chat_models import ChatOllama

# Force .env values to override shell-exported variables.
# This prevents stale terminal keys from causing 401 invalid_api_key errors.
load_dotenv(override=True)

# ============================================================
# Page config
# ============================================================
st.set_page_config(page_title="AI Chef", page_icon="👨‍🍳", layout="centered")
st.title("👨‍🍳 AI Chef Assistant")

# ============================================================
# Optional LangChain Memory Import
# ============================================================
# We try to use langchain.memory if available.
# If not, we gracefully fall back to Streamlit session state.
# This avoids crashes from version differences.
try:
    from langchain.memory import ConversationBufferMemory
    MEMORY_AVAILABLE = True
except Exception:
    MEMORY_AVAILABLE = False

# ============================================================
# Session State Initialization
# ============================================================
if "messages" not in st.session_state:
    st.session_state.messages = []

if "conversation_stage" not in st.session_state:
    # stages: awaiting_ingredients -> awaiting_preference -> completed
    st.session_state.conversation_stage = "awaiting_ingredients"

if "chef_state" not in st.session_state:
    st.session_state.chef_state = {
        "ingredients": "",
        "analyzed_food": "",
        "user_preference": "",
        "suggested_meal": "",
        "cooking_steps": "",
        "alternatives": "",
        "memory_summary": "",
    }

if "memory" not in st.session_state and MEMORY_AVAILABLE:
    st.session_state.memory = ConversationBufferMemory(
        return_messages=True,
        memory_key="chat_history"
    )

# ============================================================
# UI Controls
# ============================================================
with st.sidebar:
    st.header("Chef Settings")
    model_choice = st.selectbox("Model Provider", ["OpenAI", "Ollama"])
    creativity = st.slider("Creativity", 0.0, 1.0, 0.3, 0.1)
    response_mode = st.radio("Response Mode", ["Concise", "Detailed"], horizontal=True)

    if st.button("Reset Conversation"):
        st.session_state.messages = []
        st.session_state.conversation_stage = "awaiting_ingredients"
        st.session_state.chef_state = {
            "ingredients": "",
            "analyzed_food": "",
            "user_preference": "",
            "suggested_meal": "",
            "cooking_steps": "",
            "alternatives": "",
            "memory_summary": "",
        }
        if MEMORY_AVAILABLE:
            st.session_state.memory = ConversationBufferMemory(
                return_messages=True,
                memory_key="chat_history"
            )
        st.rerun()

# ============================================================
# Model Factory
# ============================================================
def get_model(provider: str, temperature: float):
    if provider == "OpenAI":
        env_file_key = dotenv_values(".env").get("OPENAI_API_KEY")
        api_key = (env_file_key or os.getenv("OPENAI_API_KEY") or "").strip().strip('"').strip("'")
        if not api_key:
            raise ValueError("OPENAI_API_KEY is missing in .env")
        return ChatOpenAI(
            model="gpt-4o-mini",
            temperature=temperature,
            api_key=api_key,
        )
    else:
        return ChatOllama(
            model="llama3",
            temperature=temperature,
        )

def get_openai_key_debug_info():
    env_file_key = (dotenv_values(".env").get("OPENAI_API_KEY") or "").strip().strip('"').strip("'")
    os_env_key = (os.getenv("OPENAI_API_KEY") or "").strip().strip('"').strip("'")
    effective_key = env_file_key or os_env_key
    source = "env_file" if env_file_key else ("os_env" if os_env_key else "missing")

    def suffix(key: str) -> str:
        if not key:
            return ""
        return key[-4:]

    return {
        "source": source,
        "effective_suffix": suffix(effective_key),
        "env_file_suffix": suffix(env_file_key),
        "os_env_suffix": suffix(os_env_key),
    }

# ============================================================
# Helpers
# ============================================================
def get_detail_instruction(mode: str) -> str:
    if mode == "Concise":
        return "Keep responses concise, practical, and clear."
    return "Give detailed, warm, natural chef-like responses with helpful explanations."

def get_memory_context() -> str:
    """
    Gather memory context from LangChain memory if available,
    otherwise from Streamlit session messages.
    """
    if MEMORY_AVAILABLE and "memory" in st.session_state:
        try:
            memory_vars = st.session_state.memory.load_memory_variables({})
            history = memory_vars.get("chat_history", [])
            return "\n".join(
                [f"{msg.__class__.__name__}: {msg.content}" for msg in history]
            )
        except Exception:
            pass

    # Fallback
    history_lines = []
    for msg in st.session_state.messages[-10:]:
        history_lines.append(f"{msg['role']}: {msg['content']}")
    return "\n".join(history_lines)

def save_to_memory(user_input: str, ai_output: str):
    if MEMORY_AVAILABLE and "memory" in st.session_state:
        try:
            st.session_state.memory.save_context(
                {"input": user_input},
                {"output": ai_output}
            )
        except Exception:
            pass

def add_chat(role: str, content: str):
    st.session_state.messages.append({"role": role, "content": content})

def render_chat():
    for msg in st.session_state.messages:
        with st.chat_message("assistant" if msg["role"] == "assistant" else "user"):
            st.markdown(msg["content"])

def chef_system_prompt(response_mode: str) -> str:
    return f"""
You are a friendly, professional human chef.
You speak naturally, warmly, and confidently like a real chef.
You encourage the user and make smart cooking suggestions.

You must NEVER skip steps.
You must follow this conversation order exactly:
1. Read ingredients
2. Analyze available food
3. Ask user preference
4. Suggest best meal
5. Give cooking steps
6. Offer alternatives
7. Save memory

If the user has not yet given their meal preference, do not suggest the final meal.
If the app is currently at the preference step, ask a clear question and stop there.

{get_detail_instruction(response_mode)}
"""

# ============================================================
# LangGraph State
# ============================================================
class ChefGraphState(TypedDict, total=False):
    ingredients: str
    analyzed_food: str
    user_preference: str
    suggested_meal: str
    cooking_steps: str
    alternatives: str
    memory_summary: str

    response_mode: str
    model_choice: str
    temperature: float

    stage: Literal["awaiting_ingredients", "awaiting_preference", "completed"]
    assistant_message: str

# ============================================================
# LangGraph Nodes
# ============================================================
def analyze_ingredients_node(state: ChefGraphState) -> ChefGraphState:
    llm = get_model(state["model_choice"], state["temperature"])
    memory_context = get_memory_context()

    messages = [
        SystemMessage(content=chef_system_prompt(state["response_mode"])),
        SystemMessage(content="""
You are at step 2: Analyze available food only.
Read the ingredients and explain what can reasonably be made from them.
Do NOT ask preference here.
Do NOT suggest the final dish yet.
"""),
        HumanMessage(content=f"""
Conversation memory:
{memory_context}

Ingredients:
{state['ingredients']}
""")
    ]

    response = llm.invoke(messages)
    return {"analyzed_food": response.content}

def ask_preference_node(state: ChefGraphState) -> ChefGraphState:
    llm = get_model(state["model_choice"], state["temperature"])
    memory_context = get_memory_context()

    messages = [
        SystemMessage(content=chef_system_prompt(state["response_mode"])),
        SystemMessage(content="""
You are at step 3: Ask the user for meal preference.
You must ask what kind of meal they want.
Examples: quick meal, healthy meal, spicy dish, comfort food, high protein, vegetarian style.
Do NOT suggest the final meal yet.
End with a clear question.
"""),
        HumanMessage(content=f"""
Conversation memory:
{memory_context}

Ingredients:
{state['ingredients']}

Ingredient analysis:
{state['analyzed_food']}
""")
    ]

    response = llm.invoke(messages)
    combined = f"**What I see in your kitchen:**\n\n{state['analyzed_food']}\n\n**Next step:**\n\n{response.content}"
    return {
        "assistant_message": combined,
        "stage": "awaiting_preference"
    }

def suggest_meal_node(state: ChefGraphState) -> ChefGraphState:
    llm = get_model(state["model_choice"], state["temperature"])
    memory_context = get_memory_context()

    messages = [
        SystemMessage(content=chef_system_prompt(state["response_mode"])),
        SystemMessage(content="""
You are at step 4: Suggest the best meal.
Now the user has already given their preference.
Choose one best meal that fits:
- available ingredients
- user preference
- previous context if relevant
Speak like a real chef.
"""),
        HumanMessage(content=f"""
Conversation memory:
{memory_context}

Ingredients:
{state['ingredients']}

Ingredient analysis:
{state['analyzed_food']}

User preference:
{state['user_preference']}
""")
    ]

    response = llm.invoke(messages)
    return {"suggested_meal": response.content}

def cooking_steps_node(state: ChefGraphState) -> ChefGraphState:
    llm = get_model(state["model_choice"], state["temperature"])

    messages = [
        SystemMessage(content=chef_system_prompt(state["response_mode"])),
        SystemMessage(content="""
You are at step 5: Give cooking steps.
Provide clear, ordered, practical cooking instructions.
"""),
        HumanMessage(content=f"""
Suggested meal:
{state['suggested_meal']}
""")
    ]

    response = llm.invoke(messages)
    return {"cooking_steps": response.content}

def alternatives_node(state: ChefGraphState) -> ChefGraphState:
    llm = get_model(state["model_choice"], state["temperature"])
    memory_context = get_memory_context()

    messages = [
        SystemMessage(content=chef_system_prompt(state["response_mode"])),
        SystemMessage(content="""
You are at step 6: Offer alternatives.
Offer 2 or 3 good alternatives using similar ingredients.
Keep them practical.
"""),
        HumanMessage(content=f"""
Conversation memory:
{memory_context}

Ingredients:
{state['ingredients']}

Chosen meal:
{state['suggested_meal']}
""")
    ]

    response = llm.invoke(messages)
    return {"alternatives": response.content}

def save_memory_node(state: ChefGraphState) -> ChefGraphState:
    summary = f"""
Ingredients: {state.get('ingredients', '')}

Analyzed Food:
{state.get('analyzed_food', '')}

User Preference:
{state.get('user_preference', '')}

Suggested Meal:
{state.get('suggested_meal', '')}

Cooking Steps:
{state.get('cooking_steps', '')}

Alternatives:
{state.get('alternatives', '')}
""".strip()

    final_message = f"""
### Chef's Recommendation
{state.get('suggested_meal', '')}

### Cooking Steps
{state.get('cooking_steps', '')}

### Alternatives
{state.get('alternatives', '')}
""".strip()

    # Save to optional LangChain memory
    save_to_memory(
        user_input=f"Ingredients: {state.get('ingredients', '')}\nPreference: {state.get('user_preference', '')}",
        ai_output=summary
    )

    return {
        "memory_summary": summary,
        "assistant_message": final_message,
        "stage": "completed"
    }

# ============================================================
# Graph Routing
# ============================================================
def route_from_start(state: ChefGraphState):
    if state["stage"] == "awaiting_ingredients":
        return "analyze_ingredients"
    elif state["stage"] == "awaiting_preference":
        return "suggest_meal"
    return END

# ============================================================
# Build Graph
# ============================================================
graph = StateGraph(ChefGraphState)

graph.add_node("analyze_ingredients", analyze_ingredients_node)
graph.add_node("ask_preference", ask_preference_node)
graph.add_node("suggest_meal", suggest_meal_node)
graph.add_node("cooking_steps", cooking_steps_node)
graph.add_node("alternatives", alternatives_node)
graph.add_node("save_memory", save_memory_node)

graph.set_conditional_entry_point(
    route_from_start,
    {
        "analyze_ingredients": "analyze_ingredients",
        "suggest_meal": "suggest_meal",
        END: END,
    }
)

graph.add_edge("analyze_ingredients", "ask_preference")
graph.add_edge("ask_preference", END)

graph.add_edge("suggest_meal", "cooking_steps")
graph.add_edge("cooking_steps", "alternatives")
graph.add_edge("alternatives", "save_memory")
graph.add_edge("save_memory", END)

chef_graph = graph.compile()

# ============================================================
# Chat Rendering
# ============================================================
render_chat()

# ============================================================
# Dynamic Prompt
# ============================================================
if st.session_state.conversation_stage == "awaiting_ingredients":
    placeholder = "Tell me what ingredients you have, chef."
elif st.session_state.conversation_stage == "awaiting_preference":
    placeholder = "Tell me what kind of meal you're in the mood for."
else:
    placeholder = "You can start a new meal idea or reset the conversation."

user_input = st.chat_input(placeholder)

# ============================================================
# Chat Logic
# ============================================================
if user_input:
    add_chat("user", user_input)

    try:
        if st.session_state.conversation_stage == "awaiting_ingredients":
            st.session_state.chef_state["ingredients"] = user_input

            result = chef_graph.invoke({
                "ingredients": st.session_state.chef_state["ingredients"],
                "response_mode": response_mode,
                "model_choice": model_choice,
                "temperature": creativity,
                "stage": "awaiting_ingredients",
            })

            assistant_message = result.get("assistant_message", "What kind of meal would you like to make?")
            add_chat("assistant", assistant_message)

            st.session_state.chef_state["analyzed_food"] = result.get("analyzed_food", "")
            st.session_state.conversation_stage = "awaiting_preference"

            save_to_memory(user_input, assistant_message)
            st.rerun()

        elif st.session_state.conversation_stage == "awaiting_preference":
            st.session_state.chef_state["user_preference"] = user_input

            result = chef_graph.invoke({
                "ingredients": st.session_state.chef_state["ingredients"],
                "analyzed_food": st.session_state.chef_state["analyzed_food"],
                "user_preference": st.session_state.chef_state["user_preference"],
                "response_mode": response_mode,
                "model_choice": model_choice,
                "temperature": creativity,
                "stage": "awaiting_preference",
            })

            assistant_message = result.get("assistant_message", "Here's your meal plan.")
            add_chat("assistant", assistant_message)

            st.session_state.chef_state["suggested_meal"] = result.get("suggested_meal", "")
            st.session_state.chef_state["cooking_steps"] = result.get("cooking_steps", "")
            st.session_state.chef_state["alternatives"] = result.get("alternatives", "")
            st.session_state.chef_state["memory_summary"] = result.get("memory_summary", "")
            st.session_state.conversation_stage = "completed"

            save_to_memory(user_input, assistant_message)
            st.rerun()

        else:
            add_chat(
                "assistant",
                "We’ve completed that meal plan, chef. You can reset the conversation from the sidebar to start fresh."
            )
            st.rerun()

    except Exception as e:
        st.error(f"Error: {str(e)}")

# ============================================================
# Debug / Memory View
# ============================================================
with st.expander("Debug State"):
    st.json({
        "conversation_stage": st.session_state.conversation_stage,
        "chef_state": st.session_state.chef_state,
        "memory_available": MEMORY_AVAILABLE,
        "openai_key_debug": get_openai_key_debug_info(),
    })

if MEMORY_AVAILABLE:
    with st.expander("LangChain Memory"):
        try:
            st.write(st.session_state.memory.load_memory_variables({}))
        except Exception as e:
            st.write(f"Memory unavailable: {e}")