# 🧠 AI Knowledge Assistant — Full-Stack Grounded RAG Platform

> A production-grade, portfolio-level Retrieval-Augmented Generation (RAG) SaaS application that converts static documents (PDF, TXT, Markdown) into an interactive, grounded AI knowledge assistant featuring source citations, raw context chunk inspection, markdown formatting, syntax highlighting, and sub-second inference powered by **FastAPI**, **ChromaDB**, **LangChain**, **HuggingFace**, **Groq LLM (Llama 3.3 70B)**, and **React 18 + TypeScript**.

---

## 🌟 Key Features

- **⚡ Grounded AI Q&A Engine:** Generates zero-hallucination answers backed strictly by retrieved document context using Groq's high-speed `llama-3.3-70b-versatile` model.
- **📝 Markdown & Code Highlighting:** Native rendering of markdown responses and syntax-highlighted code blocks using `react-markdown` and `react-syntax-highlighter` (`vscDarkPlus`).
- **📚 Multi-Format Ingestion:** Drag-and-drop support for **PDF**, **TXT**, and **Markdown** files with automatic chunking and vector indexing.
- **🔍 Vector Store Telemetry & Search:** Persistent HNSW vector indexing using ChromaDB with configurable top-K similarity search.
- **📖 Interactive Source Citations:** Every answer displays clickable source references highlighting file names, page numbers, and preview snippets.
- **👁️ Raw Context Inspection:** Full modal drawer allowing users to inspect exact raw text chunks retrieved for any answer.
- **🎨 Award-Winning SaaS Interface:** Built with **React 18**, **TypeScript (`strict: true`)**, **Vite**, **Tailwind CSS**, and **Lucide Icons** featuring instant dark/light mode toggle, preset prompts, and responsive glassmorphic cards.
- **🔌 OpenAPI & REST Architecture:** Fully documented FastAPI REST endpoints (`/chat`, `/upload`, `/health`, `/documents`) with Pydantic validation.
- **🐳 Containerized & Cloud Ready:** Complete Docker Compose setup for backend and frontend deployment.

---

## 🏗️ System Architecture

```
                                  USER INTERFACE
          (React 18 + TypeScript + Tailwind CSS + react-markdown + Axios)
                                         │
                                         ▼ HTTP REST API
                    ┌────────────────────────────────────────┐
                    │            FASTAPI BACKEND             │
                    │   (Routers, Lifespan, Pydantic)       │
                    └───────────────────┬────────────────────┘
                                        │
                                        ▼
                    ┌────────────────────────────────────────┐
                    │               RAG SERVICE              │
                    │  (App / Services / RAGService Singleton)│
                    └───────┬───────────────┬───────────────┬┘
                            │               │               │
                            ▼               ▼               ▼
                  ┌─────────────────┐ ┌───────────┐ ┌──────────────┐
                  │ Document Loader │ │Embeddings │ │  Groq LLM    │
                  │ PyPDF / Text    │ │ MiniLM-L6 │ │ Llama 3.3 70B│
                  └────────┬────────┘ └─────┬─────┘ └──────┬───────┘
                           │                │              ▲
                           ▼                ▼              │
                  ┌─────────────────────────────────┐      │
                  │  RecursiveCharacterTextSplitter │      │
                  └────────────────┬────────────────┘      │
                                   │                       │
                                   ▼                       │
                  ┌─────────────────────────────────┐      │
                  │       ChromaDB Vector Store     │──────┘ (Top-K Chunks)
                  └─────────────────────────────────┘
```

---

## 📁 Repository Structure

```
rag-chat-bot/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entrypoint & middleware
│   │   ├── chatbot.py           # LLM answer generation logic using Groq
│   │   ├── retriever.py         # Top-K context retrieval pipeline
│   │   ├── embeddings.py        # HuggingFace sentence-transformers factory
│   │   ├── vector_store.py      # ChromaDB storage & vector management
│   │   ├── loaders.py           # PyPDF, TXT & Markdown document loaders
│   │   ├── splitter.py          # RecursiveCharacterTextSplitter (size=500, overlap=50)
│   │   ├── prompt.py            # Guardrail RAG prompt templates
│   │   ├── core/
│   │   │   └── config.py        # Environment variables & settings
│   │   ├── models/
│   │   │   └── schemas.py       # Pydantic request/response schemas
│   │   ├── routes/
│   │   │   ├── chat.py          # POST /chat endpoint
│   │   │   ├── upload.py        # POST /upload endpoint
│   │   │   ├── health.py        # GET /health endpoint
│   │   │   └── documents.py     # GET /documents, DELETE /documents endpoints
│   │   └── services/
│   │       └── rag_service.py   # RAG Service orchestrator
│   ├── data/                    # Storage folder for uploaded documents
│   ├── chroma_db/               # Persistent ChromaDB vector database
│   ├── requirements.txt         # FastAPI, LangChain, ChromaDB, Groq dependencies
│   └── run.py                   # Script to run FastAPI server using Uvicorn
├── frontend/
│   ├── tsconfig.json            # Main TypeScript configuration
│   ├── tsconfig.app.json        # Strict React app tsconfig
│   ├── tsconfig.node.json       # Vite node tsconfig
│   ├── vite.config.ts           # Vite configuration in TypeScript
│   ├── package.json             # React 18, TypeScript, Tailwind, Lucide, Axios, react-markdown
│   └── src/
│       ├── vite-env.d.ts        # Vite environment types
│       ├── types/               # chat.ts, document.ts, api.ts
│       ├── components/          # Navbar.tsx, Sidebar.tsx, ChatArea.tsx, MessageList.tsx, MessageItem.tsx, SourceCitations.tsx, ContextModal.tsx, UploadModal.tsx, DocumentList.tsx, StatsCard.tsx
│       ├── pages/               # Dashboard.tsx, ChatPage.tsx
│       ├── hooks/               # useChat.ts, useUpload.ts
│       ├── services/            # api.ts (Typed Axios API client)
│       ├── utils/               # formatters.ts
│       ├── App.tsx
│       └── main.tsx
├── frontend_backup_before_typescript_migration/ # Backup directory
├── docs/                        # Complete technical documentation suite
│   ├── PRD.md                   # Product Vision, User Stories & Requirements
│   ├── Architecture.md          # System Architecture & API Design Specs
│   ├── Rules.md                 # Development Rules & Coding Standards
│   ├── Phases.md                # Development Roadmap & Phase Tracking
│   ├── Design.md                # UI/UX Design System & Color Palette
│   └── Memory.md                # Continuous AI Context Memory Log
├── tests/                       # Automated pytest suite
├── docker-compose.yml
├── backend/Dockerfile
├── frontend/Dockerfile
├── .env.example
└── README.md
```

---

## 🛠️ Required Software & Versions

| Software | Required Version | Purpose |
|---|---|---|
| **Python** | `3.10` or higher | Backend FastAPI runtime & LangChain pipeline |
| **Node.js** | `18.0` or higher | Frontend React + TypeScript Vite development server |
| **TypeScript** | `5.0` or higher | Type-safe frontend compilation |
| **npm** / **pnpm** | `9.0` or higher | Frontend package management |
| **Docker** (Optional) | `24.0` or higher | Containerized multi-service execution |
| **Groq API Key** | Free account at [console.groq.com](https://console.groq.com/) | LLM inference API key |

---

## 🚀 Quickstart Installation & Setup

### 1. Clone & Configure Environment

```bash
git clone https://github.com/ZarwanZahid42/rag-chat-bot.git
cd rag-chat-bot

# Copy environment variable template
cp .env.example .env
```

Edit your `.env` file and set your `GROQ_API_KEY`:

```env
GROQ_API_KEY=gsk_your_actual_groq_api_key_here
CHROMA_DB_PATH=chroma_db
DATA_FOLDER=data
DEFAULT_CHUNK_SIZE=500
CHUNK_OVERLAP=50
TOP_K=3
HOST=0.0.0.0
PORT=8000
```

---

### 2. Backend Setup (FastAPI)

```bash
# Create and activate virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r backend/requirements.txt

# Run the FastAPI server
python backend/run.py
```

Swagger API Docs: `http://localhost:8000/docs`

---

### 3. Frontend Setup (React 18 + TypeScript)

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install Node & TypeScript dependencies
npm install

# Start Vite development server
npm run dev

# Run TypeScript type checker & production build
npm run build
```

The frontend web app runs at `http://localhost:5173`.

---

## 🏃 Running Backend and Frontend Together

### Option A: Concurrent Development Mode
Terminal 1 (Backend): `python backend/run.py`
Terminal 2 (Frontend): `cd frontend && npm run dev`

### Option B: Docker Compose Deployment
```bash
docker compose up --build
```
- **Frontend App:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000`
- **Swagger Docs:** `http://localhost:8000/docs`

---

## 🧪 Running Automated Tests

```bash
pytest tests/
```
