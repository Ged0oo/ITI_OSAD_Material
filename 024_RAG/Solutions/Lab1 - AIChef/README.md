# AI Chef Assistant

AI Chef Assistant is a Streamlit app that helps users plan meals from available ingredients using an LLM-driven conversation flow.

## Project Structure

```text
Lab1 - AIChef/
├── app.py
├── requirements.txt
├── .env
└── README.md
```

### File Breakdown

- `app.py`
  - Main application entry point.
  - Builds the Streamlit UI (chat, sidebar settings, debug panel).
  - Defines the cooking workflow with LangGraph nodes:
    - analyze ingredients
    - ask preference
    - suggest meal
    - provide cooking steps
    - suggest alternatives
    - save memory summary
  - Supports two providers:
    - OpenAI (via `langchain-openai`)
    - Ollama (via `langchain-community`)
  - Loads environment variables from `.env`.

- `requirements.txt`
  - Python dependencies needed to run the app.

- `.env`
  - Local environment configuration.
  - Holds secrets and runtime model/provider settings (for example `OPENAI_API_KEY`, model names, provider options).

- `README.md`
  - Project documentation (this file).

## How the App Flow Works

1. User enters available ingredients.
2. App analyzes what can be made.
3. App asks for meal preference (quick, healthy, spicy, etc.).
4. App suggests a best-fit meal.
5. App returns step-by-step cooking instructions.
6. App suggests alternatives.
7. App stores a memory summary for context.

## Setup

1. Create and activate a virtual environment.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Add your API key and settings in `.env`.

## Run

```bash
streamlit run app.py
```

Then open the local URL shown by Streamlit in your terminal.
