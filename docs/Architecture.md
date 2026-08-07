# System Architecture & Technical Specifications

## 1. High-Level System Architecture

```
                    +---------------------------------------------------+
                    |             REACT 18 TYPESCRIPT FRONTEND          |
                    |   (Vite + TypeScript + Tailwind CSS + Axios)      |
                    |   (react-markdown + react-syntax-highlighter)     |
                    +-------------------------+-------------------------+
                                              |
                                              | HTTP REST Requests
                                              v
                    +---------------------------------------------------+
                    |                  FASTAPI BACKEND                  |
                    |   (Router / Controllers / OpenAPI Documentation)  |
                    +-------------------------+-------------------------+
                                              |
                                              v
                    +---------------------------------------------------+
                    |                 RAG SERVICE LAYER                 |
                    |             (App / Services / RagService)         |
                    +----+--------------------+--------------------+----+
                         |                    |                    |
                         v                    v                    v
          +----------------------+   +-------------------+   +--------------------+
          |  DOCUMENT LOADERS    |   | EMBEDDINGS MODEL  |   | GROQ LLM SERVICE   |
          | PyPDF, TXT, Markdown |   | sentence-transf.  |   | Llama 3.3 70B      |
          +----------+-----------+   +---------+---------+   +---------+----------+
                     |                         |                       ^
                     v                         v                       |
          +----------------------------------------------+             |
          |        RECURSIVE CHARACTER SPLITTER          |             |
          +----------------------+-----------------------+             |
                                 |                                     |
                                 v                                     |
          +----------------------------------------------+             |
          |               CHROMADB VECTOR DB             |             |
          |       (Persistent HNSW Index Storage)        |             |
          +----------------------+-----------------------+             |
                                 |                                     |
                                 +---- Top-K Context Chunks -----------+
```

---

## 2. Frontend TypeScript Architecture

The frontend is built with strict TypeScript (`strict: true`) with explicit type definitions:
- **`src/types/chat.ts`**: Defines `Message`, `SourceCitation`, `RetrievedChunk`, `ChatRequest`, `ChatResponse`, and `ContextModalData`.
- **`src/types/document.ts`**: Defines `DocumentInfo`, `DocumentListResponse`, `UploadResponse`, `DocumentDeleteResponse`, and `DocumentStats`.
- **`src/types/api.ts`**: Defines `HealthResponse` and `APIErrorResponse`.
- **`src/services/api.ts`**: Fully typed Axios API client matching FastAPI backend response schemas.
- **`src/hooks/useChat.ts` & `useUpload.ts`**: Strongly-typed custom React hooks managing state, pending states, and API callbacks.

---

## 3. RAG Pipeline Specifications

```
  [User File Ingestion Flow]
  Uploaded Files (.pdf, .txt, .md)
      └─► Saved to `backend/data/`
            └─► Document Loaders (PyPDFLoader / TextLoader)
                  └─► RecursiveCharacterTextSplitter (chunk_size=500, overlap=50)
                        └─► HuggingFace Embeddings (`sentence-transformers/all-MiniLM-L6-v2`)
                              └─► Persistent ChromaDB Collection (`backend/chroma_db`)

  [User Query & Inference Flow]
  User Question
      └─► Embed Query using HuggingFace Model
            └─► Similarity Search in ChromaDB (Top-K=3)
                  └─► Extract Retained Context & Metadata
                        └─► Inject into ChatPromptTemplate Guardrail
                              └─► ChatGroq Inference (`llama-3.3-70b-versatile`)
                                    └─► Structured JSON Response (Answer + Sources + Chunks)
```

---

## 4. API Design Specifications

### `GET /health`
- **Response**: `200 OK` (`HealthResponse`)
```json
{
  "status": "healthy",
  "vector_count": 42,
  "chroma_db_status": "connected",
  "llm_model": "llama-3.3-70b-versatile"
}
```

### `POST /chat`
- **Request Body**: `ChatRequest`
```json
{
  "question": "What is the chunk overlap used in text splitting?",
  "top_k": 3
}
```
- **Response**: `200 OK` (`ChatResponse`)
```json
{
  "answer": "The text splitter uses a chunk overlap of 50 characters.",
  "sources": [
    {
      "source": "data/config.py",
      "page": null,
      "snippet": "CHUNK_OVERLAP = 50"
    }
  ],
  "chunks": [
    {
      "id": 1,
      "content": "CHUNK_SIZES = [200, 500, 1000]\nDEFAULT_CHUNK_SIZE = 500\nCHUNK_OVERLAP = 50",
      "source": "data/config.py"
    }
  ],
  "metadata": {
    "question": "What is the chunk overlap used in text splitting?",
    "top_k": 3,
    "chunk_count": 1
  }
}
```

### `POST /upload`
- **Content-Type**: `multipart/form-data`
- **Form Data**: `file` (Binary file: `.pdf`, `.txt`, `.md`)
- **Response**: `200 OK` (`UploadResponse`)

### `GET /documents`
- **Response**: `200 OK` (`DocumentListResponse`)

### `DELETE /documents/{filename}`
- **Response**: `200 OK` (`DocumentDeleteResponse`)
