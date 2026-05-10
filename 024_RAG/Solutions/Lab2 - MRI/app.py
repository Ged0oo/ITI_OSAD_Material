from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import pandas as pd
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request, session
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

BASE_DIR = Path(__file__).resolve().parent
CSV_PATH = BASE_DIR / "patient_cases.csv"

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev-secret-key-change-me")

# Prefer .env values over stale exported shell variables.
load_dotenv(override=True)

MODEL_NAME = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
llm = ChatOpenAI(model=MODEL_NAME, temperature=0.2, max_tokens=1200)
search = DuckDuckGoSearchRun()

SYSTEM_PROMPT = """
You are a professional medical assistant chatbot.
- Provide safe, structured, general medical guidance.
- Never provide diagnoses or prescriptions.
- Always include: "This is not a medical diagnosis. Consult a doctor."
""".strip()


def _shorten(text: str, limit: int = 220) -> str:
    text = (text or "").strip()
    return text if len(text) <= limit else text[: limit - 3] + "..."


def _get_history() -> list[dict[str, str]]:
    history: list[dict[str, str]] = session.get("chat_history", [])
    return history


def _set_history(history: list[dict[str, str]]) -> None:
    session["chat_history"] = history[-12:]


def _build_messages(history: list[dict[str, str]], user_text: str) -> list[Any]:
    messages: list[Any] = [SystemMessage(content=SYSTEM_PROMPT)]
    for item in history[-10:]:
        role = item.get("role")
        content = item.get("content", "")
        if role == "user":
            messages.append(HumanMessage(content=content))
        elif role == "assistant":
            messages.append(AIMessage(content=content))
    messages.append(HumanMessage(content=user_text))
    return messages


def _format_chat_response(user_text: str, model_text: str) -> str:
    text = model_text.strip()
    query = user_text.lower()
    if any(token in query for token in ["hospital", "clinic", "near", "cardiology", "neurology"]):
        try:
            search_results = search.run(f"hospitals clinics medical facilities {user_text}")
            text = f"{text}\n\nHospital Search Results:\n{search_results}"
        except Exception as exc:
            text = f"{text}\n\nHospital search is unavailable right now: {exc}"
    if "This is not a medical diagnosis. Consult a doctor." not in text:
        text += "\n\nThis is not a medical diagnosis. Consult a doctor."
    return text


def _safe_chat_error(exc: Exception) -> str:
    text = str(exc)
    lowered = text.lower()
    if "invalid_api_key" in lowered or "incorrect api key" in lowered or "401" in lowered:
        return (
            "Assistant authentication failed. Please set a valid OPENAI_API_KEY in your .env "
            "and restart the server."
        )
    return "Assistant request failed. Please try again."


def load_cases() -> pd.DataFrame:
    """Load case data and normalize common fields for UI rendering."""
    if not CSV_PATH.exists():
        return pd.DataFrame(
            columns=[
                "case_id",
                "timestamp",
                "patient_symptoms",
                "mri_description",
                "ai_summary",
                "recommended_actions",
                "disclaimer",
            ]
        )

    df = pd.read_csv(CSV_PATH)
    df = df.fillna("")

    if "timestamp" in df.columns:
        ts = pd.to_datetime(df["timestamp"], errors="coerce")
        df["timestamp_display"] = ts.dt.strftime("%Y-%m-%d %H:%M")
        df["timestamp_display"] = df["timestamp_display"].fillna(df["timestamp"])
    else:
        df["timestamp_display"] = ""

    return df


@app.route("/")
def chatbot_view() -> str:
    return render_template("index.html", model_name=MODEL_NAME)


@app.route("/chat", methods=["POST"])
def chat() -> Any:
    data = request.get_json(silent=True) or {}
    user_text = str(data.get("message", "")).strip()
    if not user_text:
        return jsonify({"error": "Message is required."}), 400

    if user_text.lower() == "/reset":
        session["chat_history"] = []
        return jsonify({"reply": "Conversation memory was cleared."})

    history = _get_history()
    messages = _build_messages(history, user_text)

    try:
        response = llm.invoke(messages)
        answer = _format_chat_response(user_text, str(response.content))
    except Exception as exc:
        return jsonify({"error": _safe_chat_error(exc)}), 500

    history.append({"role": "user", "content": user_text})
    history.append({"role": "assistant", "content": answer})
    _set_history(history)

    return jsonify(
        {
            "reply": answer,
            "history": [
                {"role": item["role"], "preview": _shorten(item["content"]) }
                for item in _get_history()
            ],
        }
    )


@app.route("/cases")
def dashboard() -> str:
    query = request.args.get("q", "").strip()
    df = load_cases()

    total_cases = len(df)

    if query:
        mask = (
            df["case_id"].str.contains(query, case=False, na=False)
            | df["patient_symptoms"].str.contains(query, case=False, na=False)
            | df["mri_description"].str.contains(query, case=False, na=False)
            | df["ai_summary"].str.contains(query, case=False, na=False)
            | df["recommended_actions"].str.contains(query, case=False, na=False)
        )
        filtered = df[mask].copy()
    else:
        filtered = df.copy()

    filtered = filtered.sort_values(by="timestamp", ascending=False, kind="stable") if not filtered.empty and "timestamp" in filtered.columns else filtered

    cases = filtered.to_dict(orient="records")

    return render_template(
        "cases.html",
        cases=cases,
        query=query,
        total_cases=total_cases,
        filtered_cases=len(cases),
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
