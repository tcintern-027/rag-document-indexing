# Development Rules & Coding Standards

## 1. Code Standards & Quality Guidelines
- **PEP 8 Compliance:** Python backend code must follow PEP 8 standards with explicit type annotations for function signatures.
- **Async & Non-Blocking Operations:** File IO and external API network calls should utilize asynchronous execution or thread offloading where suitable to prevent blocking the main Uvicorn event loop.
- **Component Architecture (React):** Keep UI components modular, clean, and styled strictly with utility-first Tailwind CSS classes. No inline styles unless necessary for dynamic layout math.

---

## 2. Directory Structure Rules
- `backend/app/routes/`: Route handlers only. No direct database or LLM invocation inside routes; delegate strictly to `RAGService`.
- `backend/app/services/`: Business logic and RAG service orchestration layer.
- `backend/app/models/`: Pydantic models for API request validation, response serialization, and schemas.
- `frontend/src/components/`: Reusable React UI components categorized by responsibility (Navbar, Sidebar, MessageItem, Modals).
- `frontend/src/services/`: API integration services using Axios.

---

## 3. Environment & Security Guidelines
- **API Keys:** NEVER hardcode credentials or secrets in source code. `GROQ_API_KEY` must be loaded exclusively via environment variables (`.env`).
- **File Upload Guardrails:** Validate uploaded file extensions (`.pdf`, `.txt`, `.md`) and size limits prior to disk storage and vector index processing.
- **CORS Policies:** Restrict origin policies in production environments. Default development settings allow `http://localhost:5173` and `http://localhost:3000`.

---

## 4. AI & RAG Pipeline Rules
- **Preserve Pipeline Contract:** `embeddings.py`, `vector_store.py`, `retriever.py`, `chatbot.py`, `loaders.py`, `splitter.py`, and `prompt.py` must retain their core interfaces so existing retrieval experiments remain 100% operational.
- **Strict Guardrail Prompting:** The RAG prompt must enforce that if relevant context is not present in retrieved document chunks, the model strictly outputs: *"I don't have enough information from the provided documents."*
- **Vector DB Abstraction:** Interactions with vector collections should be wrapped in `vector_store.py` functions to allow swapping ChromaDB with Qdrant, Pinecone, or Weaviate without modifying route handlers.
