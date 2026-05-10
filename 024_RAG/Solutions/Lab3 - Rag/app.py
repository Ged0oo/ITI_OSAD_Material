from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import httpx

# Load .env and allow it to override existing environment variables
load_dotenv(override=True)

app = Flask(__name__, template_folder="templates")


def make_clients():
    http_client = httpx.Client()
    http_async_client = httpx.AsyncClient()
    return http_client, http_async_client


def init_rag():
    # lazy imports to avoid heavy startup cost
    from langchain_openai import OpenAIEmbeddings, ChatOpenAI
    from langchain_community.vectorstores import Chroma

    http_client, http_async_client = make_clients()

    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        http_client=http_client,
        http_async_client=http_async_client,
        check_embedding_ctx_length=False,
        chunk_size=40,
        max_retries=2,
        request_timeout=60,
    )

    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.2,
        http_client=http_client,
        http_async_client=http_async_client,
        request_timeout=60,
        max_retries=2,
    )

    # load chroma DB from persist directory
    persist_dir = os.path.join(os.getcwd(), "chroma_db")
    db = Chroma(persist_directory=persist_dir, collection_name="rag_collection", embedding_function=embeddings)

    return embeddings, llm, db


embeddings, llm, db = init_rag()


from langchain_core.prompts import PromptTemplate

rag_prompt = PromptTemplate(
    template=(
        "You are a helpful assistant.\n\nUse ONLY the context below to answer.\n"
        "If the context does not contain the answer, say: \"I don't know.\".\n\n"
        "Context:\n{context}\n\nQuestion:\n{question}"
    ),
    input_variables=["context", "question"],
)


def retrieve(query, k=3):
    results = db.similarity_search_with_score(query, k=k)
    return results


def rag_agent(query):
    results = retrieve(query, k=3)
    if not results:
        return {"answer": "I don't know.", "case": "no_docs", "confidence": "low"}

    best_doc, best_score = results[0]
    # Chroma returns distance-like score (lower = more similar)
    # conservative threshold
    if best_score > 2.0:
        return {"answer": "I don't know.", "case": "no_relevant", "confidence": "low", "best_score": best_score}

    context = "\n---\n".join([r[0].page_content for r in results])
    prompt_text = rag_prompt.format(context=context, question=query)
    response = llm.invoke(prompt_text)
    return {"answer": response.content, "case": "found", "confidence": "high", "best_score": best_score}


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/query", methods=["POST"])
def query():
    data = request.json or {}
    question = data.get("question", "").strip()
    if not question:
        return jsonify({"error": "Empty question"}), 400

    result = rag_agent(question)
    return jsonify(result)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
