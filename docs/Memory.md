# Project Memory & Context Log

## 1. System Context & Overview
The **AI Knowledge Assistant** is a full-stack RAG SaaS platform transformed from an existing Python CLI prototype and migrated to a **React 18 + TypeScript + Tailwind CSS** frontend architecture and a **FastAPI (Pydantic Settings)** backend architecture. The core RAG pipeline preserves original LangChain, HuggingFace embeddings (`sentence-transformers/all-MiniLM-L6-v2`), ChromaDB vector search, and Groq LLM integration (`llama-3.3-70b-versatile`).

---

## 2. Current Architecture & File Mapping

```
rag-chat-bot/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app with CORS, routes & lifespan events
│   │   ├── chatbot.py           # Groq LLM answer generation function
│   │   ├── retriever.py         # Top-K vector retrieval helper
│   │   ├── embeddings.py        # HuggingFace sentence-transformers factory
│   │   ├── vector_store.py      # ChromaDB storage abstraction
│   │   ├── loaders.py           # PyPDF, Text & Markdown loaders
│   │   ├── splitter.py          # RecursiveCharacterTextSplitter (size=500, overlap=50)
│   │   ├── prompt.py            # Guardrail RAG ChatPromptTemplate
│   │   ├── core/
│   │   │   └── config.py        # Centralized Pydantic Settings & environment config
│   │   ├── models/
│   │   │   └── schemas.py       # API schemas (Chat, Upload, Health, Documents)
│   │   ├── routes/
│   │   │   ├── chat.py          # POST /chat endpoint
│   │   │   ├── upload.py        # POST /upload endpoint
│   │   │   ├── health.py        # GET /health endpoint
│   │   │   └── documents.py     # GET /documents, DELETE /documents/{filename}
│   │   └── services/
│   │       └── rag_service.py   # RAGService singleton handling pipeline workflows
│   ├── data/                    # Storage directory for uploaded user documents
│   ├── chroma_db/               # Persistent ChromaDB vector database directory
│   ├── requirements.txt         # FastAPI, Uvicorn, Pydantic Settings, LangChain, ChromaDB, Groq dependencies
│   └── run.py                   # Server startup launcher script using `settings.HOST` & `settings.PORT`
├── frontend/
│   ├── package.json             # React 18, TypeScript, Tailwind, Lucide, Axios, react-markdown, react-syntax-highlighter
│   ├── tsconfig.json            # Root tsconfig referencing app & node configs
│   ├── tsconfig.app.json        # App tsconfig (strict: true, jsx: react-jsx)
│   ├── tsconfig.node.json       # Node tsconfig for Vite
│   ├── vite.config.ts           # Vite config in TypeScript
│   ├── index.html
│   └── src/
│       ├── vite-env.d.ts        # Vite client types
│       ├── types/               # chat.ts, document.ts, api.ts
│       ├── components/          # Navbar.tsx, Sidebar.tsx, ChatArea.tsx, MessageList.tsx, MessageItem.tsx, SourceCitations.tsx, ContextModal.tsx, UploadModal.tsx, DocumentList.tsx, StatsCard.tsx
│       ├── pages/               # Dashboard.tsx, ChatPage.tsx
│       ├── hooks/               # useChat.ts, useUpload.ts
│       ├── services/            # api.ts (Typed Axios HTTP client)
│       ├── utils/               # formatters.ts
│       ├── App.tsx              # Root app component with theme context
│       ├── main.tsx             # DOM mounting
│       └── index.css            # Tailwind directives & custom glassmorphism styles
├── frontend_backup_before_typescript_migration/ # Backup of JS frontend before TS migration
├── docs/                        # PRD.md, Architecture.md, Rules.md, Phases.md, Design.md, Memory.md
├── tests/                       # test_health.py, test_chat.py, test_upload.py
├── docker-compose.yml
├── backend/Dockerfile
├── frontend/Dockerfile
├── .env.example
└── README.md
```

---

## 3. Configuration & Startup Architecture
- **Pydantic Settings:** `backend/app/core/config.py` defines `Settings(BaseSettings)` instantiating `settings = Settings()`.
- **Runner Fix (`backend/run.py`):** `backend/run.py` imports `settings` from `backend.app.core.config` and references `settings.HOST` and `settings.PORT`.
- **Backward-Compatible Module Exports:** `backend/app/core/config.py` also provides module-level aliases (`HOST`, `PORT`, `DATA_FOLDER`, `CHROMA_DB_PATH`, `DEFAULT_CHUNK_SIZE`, `CHUNK_OVERLAP`, `TOP_K`, `GROQ_API_KEY`, `LLM_MODEL`, `EMBEDDING_MODEL`) for seamless backwards compatibility.

---

## 4. API Endpoints Reference
- `GET /health` -> Returns `HealthResponse`.
- `POST /chat` -> Accepts `ChatRequest` -> Returns `ChatResponse`.
- `POST /upload` -> Accepts multipart `file` -> Returns `UploadResponse`.
- `GET /documents` -> Returns `DocumentListResponse`.
- `DELETE /documents/{filename}` -> Returns `DocumentDeleteResponse`.

---

## 5. Verification Status
- Backend main import `python -c "import backend.app.main"` succeeds cleanly.
- `from backend.app.core.config import settings` prints correct `HOST` and `PORT`.
- Frontend `npm run build` succeeds with 0 TypeScript compilation errors.
