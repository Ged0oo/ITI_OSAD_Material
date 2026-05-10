# Lab2 MRI - Multi-Modal Medical AI Assistant

A medical assistant project that combines notebook-based experimentation with a Flask web app.

The app supports:

- Chat-based medical guidance (safe, non-diagnostic)
- Hospital/clinic search augmentation
- CSV-backed case records and professional web dashboard view

## 1. What This Project Does

This project analyzes patient case text (symptoms and optional MRI descriptions), generates structured guidance, and stores/views case data.

Core capabilities:

- Accept symptom and MRI-style descriptions
- Generate structured response with safety disclaimer
- Add nearby hospital search results when relevant
- Keep short session memory in web chat
- Display stored case records in a searchable dashboard

## 2. Key Files

- app.py: Flask backend and chat logic
- mri.ipynb: Notebook workflow and experimentation
- patient_cases.csv: Stored patient case records
- templates/index.html: Web chatbot UI
- templates/cases.html: Web dashboard for stored cases
- static/styles.css: Shared styles for chat and dashboard
- requirements.txt: Python dependencies
- lab.md: Lab task requirements

## 3. Architecture Overview

### Backend

The Flask backend exposes:

- /: chatbot web interface
- /chat: JSON POST endpoint for chat inference
- /cases: searchable records dashboard

Chat pipeline in app.py:

1. Load session history
2. Build message list with system prompt + recent turns
3. Call OpenAI chat model through LangChain
4. Optionally append DuckDuckGo hospital search results
5. Enforce safety disclaimer
6. Store shortened history in session

### Data Flow

- Real-time chat memory is session-based (browser session)
- Long-term case records are stored in patient_cases.csv
- /cases reads CSV, normalizes timestamps, and renders cards

## 4. Prerequisites

- Python 3.10+
- Valid OpenAI API key

## 5. Installation

From project root:

    python3 -m pip install -r requirements.txt

## 6. Environment Configuration

Create or update .env in project root with:

    OPENAI_API_KEY=your_real_openai_key
    OPENAI_MODEL=gpt-4o-mini
    FLASK_SECRET_KEY=change_this_for_production

Notes:

- The app uses dotenv with override, so .env takes priority over stale exported shell variables.
- If you changed keys, restart the server.

## 7. Run the Application

Start server:

    python3 app.py

Open in browser:

- Chat UI: http://127.0.0.1:8000/
- Cases UI: http://127.0.0.1:8000/cases

## 8. API Reference

### POST /chat

Request JSON:

    {
      "message": "I have lower back pain radiating to my leg..."
    }

Success response:

    {
      "reply": "...assistant response...",
      "history": [
        {"role": "user", "preview": "..."},
        {"role": "assistant", "preview": "..."}
      ]
    }

Special command:

- Sending /reset clears session chat history.

Possible error responses:

- 400 when message is missing
- 500 for model/provider errors (sanitized message)

## 9. Notebook Workflow

mri.ipynb includes:

- Dependency setup
- Tool definitions (hospital search, CSV storage)
- Prompt and agent construction
- Multiple test cases
- Memory inspection and trimming demos

Recommended run order:

1. Install/import/setup cells
2. Agent setup cells
3. Test case cells
4. Memory and CSV inspection cells

## 10. Safety Constraints

The assistant is configured to:

- Avoid diagnosis and prescriptions
- Provide general guidance only
- Always include this disclaimer:
  This is not a medical diagnosis. Consult a doctor.

## 11. Troubleshooting

### A) /chat returns 404

Cause:

- Old/stale server process is running

Fix:

1. Stop old Flask process
2. Start again from this project folder:

   cd /home/nagy/Mine/ITI/024_RAG/Solutions/Lab2-MRI
   python3 app.py

### B) /chat returns 500 with authentication error

Cause:

- Invalid OPENAI_API_KEY

Fix:

1. Put a valid key in .env
2. Restart server

### C) Browser says Unexpected token '<' while parsing JSON

Cause:

- Endpoint returned HTML error page

Fix:

- Verify server routes and restart app
- Ensure requests go to the current app process on port 8000

### D) Chat works but model seems wrong

Cause:

- OPENAI_MODEL not set as expected

Fix:

- Update OPENAI_MODEL in .env and restart

## 12. Development Notes

- Session memory is intentionally lightweight and capped.
- CSV dashboard supports filtering over major text fields.
- In production, move secrets out of .env and disable debug mode.

## 13. Suggested Next Improvements

- Save chatbot conversations directly as structured case records
- Add token streaming in chat UI
- Add authentication and per-user session persistence
- Add record export and sortable table controls in /cases

---

If you use this project for real medical workflows, keep a human clinician in the loop for all decisions.
