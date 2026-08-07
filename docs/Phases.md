# Project Development Roadmap & Phases

## Phase 1: Existing RAG CLI Foundations (Completed)
- [x] Initial document loading for PDF, TXT, and Markdown formats using LangChain loaders.
- [x] Character text splitting with `RecursiveCharacterTextSplitter`.
- [x] Vector embedding generation using `sentence-transformers/all-MiniLM-L6-v2`.
- [x] Local vector storage and persistence using ChromaDB.
- [x] Integration with Groq API (`llama-3.3-70b-versatile`) for grounded answer generation.
- [x] Interactive terminal CLI interface (`main.py`) & retrieval evaluation (`experiments.py`).

---

## Phase 2: FastAPI Backend Refactoring & API Suite (Completed)
- [x] Refactor standalone RAG scripts into structured `backend/app/` layout.
- [x] Create centralized configuration management (`backend/app/core/config.py`).
- [x] Define Pydantic request/response schemas (`backend/app/models/schemas.py`).
- [x] Build `RAGService` orchestrator (`backend/app/services/rag_service.py`).
- [x] Implement `GET /health`, `POST /chat`, `POST /upload`, `GET /documents`, `DELETE /documents/{filename}`.
- [x] Add CORS middleware, error handlers, and interactive OpenAPI documentation (`/docs`).

---

## Phase 3: React 18 + TypeScript SaaS Frontend Migration (Completed)
- [x] Migrate full frontend from React JavaScript (`.jsx`/`.js`) to strict **React 18 + TypeScript (`.tsx`/`.ts`)**.
- [x] Setup `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`.
- [x] Define domain types in `src/types/` (`chat.ts`, `document.ts`, `api.ts`).
- [x] Implement `react-markdown` and `react-syntax-highlighter` in `MessageItem.tsx` for AI answer formatting and code highlighting.
- [x] Build ChatGPT-style message interface, expandable **Source Citations**, and **Retrieved Context Inspection Drawer**.
- [x] Enforce `strict: true` type checking with zero compilation errors (`npm run build`).

---

## Phase 4: Authentication & Multi-Tenancy (Roadmap)
- [ ] JWT authentication and user registration system.
- [ ] User role-based access control (RBAC).
- [ ] Multi-tenant isolated vector namespaces and private knowledge bases.

---

## Phase 5: Persistence & Database Layer (Roadmap)
- [ ] PostgreSQL integration with SQLAlchemy / Prisma for persistent user profiles.
- [ ] Chat conversation history persistence and session management.
- [ ] Document indexing status audit logs.

---

## Phase 6: Cloud Deployment & CI/CD (Roadmap)
- [ ] Production multi-stage Docker containerization.
- [ ] GitHub Actions CI/CD workflow with automated test and build verification.
- [ ] Kubernetes / AWS ECS cloud infrastructure deployment.

---

## Phase 7: Advanced AI & RAG Infrastructure (Roadmap)
- [ ] LangSmith observability and telemetry integration.
- [ ] RAG Triad evaluation metrics (Context Relevance, Groundedness, Answer Relevance).
- [ ] Hybrid search integration (Sparse BM25 + Dense ChromaDB vector search).
- [ ] Cohere / BGE Reranker integration for top-k contextual compression.
- [ ] Multi-query rewriting and hypothetical document embeddings (HyDE).
