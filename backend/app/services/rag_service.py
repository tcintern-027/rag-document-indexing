import os
import shutil
from typing import List, Dict, Any, Optional

from backend.app.core.config import (
    DATA_FOLDER,
    CHROMA_DB_PATH,
    DEFAULT_CHUNK_SIZE,
    TOP_K,
    LLM_MODEL,
)
from backend.app.embeddings import create_embeddings
from backend.app.loaders import load_documents, load_single_document
from backend.app.splitter import split_documents
from backend.app.vector_store import (
    create_vector_store,
    verify_vector_store,
    add_documents_to_store,
    clear_vector_store,
)
from backend.app.retriever import create_retriever, retrieve_documents
from backend.app.chatbot import generate_answer
from backend.app.models.schemas import (
    SourceDocument,
    RetrievedChunk,
    ChatResponse,
    UploadResponse,
    DocumentInfo,
    DocumentListResponse,
    DocumentDeleteResponse,
)


class RAGService:
    """
    Singleton orchestration service for document loading, splitting, embedding,
    vector storage in ChromaDB, retrieval, and LLM inference via Groq.
    """

    _instance: Optional["RAGService"] = None

    def __init__(self):
        self.embeddings = None
        self.vector_store = None
        self.initialized = False

    @classmethod
    def get_instance(cls) -> "RAGService":
        if cls._instance is None:
            cls._instance = RAGService()
        return cls._instance

    def initialize(self):
        """
        Initializes embeddings and loads or builds ChromaDB vector store.
        """
        if self.initialized and self.vector_store is not None:
            return

        print("Initializing RAG Service...")
        self.embeddings = create_embeddings()

        if os.path.exists(CHROMA_DB_PATH) and len(os.listdir(CHROMA_DB_PATH)) > 0:
            print("Loading existing ChromaDB index...")
            self.vector_store = create_vector_store([], self.embeddings, CHROMA_DB_PATH)
        else:
            print("No existing ChromaDB found. Ingesting documents from data folder...")
            documents = load_documents(DATA_FOLDER)
            if documents:
                chunks = split_documents(documents, DEFAULT_CHUNK_SIZE)
                self.vector_store = create_vector_store(chunks, self.embeddings, CHROMA_DB_PATH)
            else:
                self.vector_store = create_vector_store([], self.embeddings, CHROMA_DB_PATH)

        self.initialized = True
        vector_count = verify_vector_store(self.vector_store)
        print(f"RAG Service Initialized! Vectors in store: {vector_count}")

    def query(self, question: str, top_k: Optional[int] = None) -> ChatResponse:
        """
        Executes a RAG query: retrieves top_k relevant chunks, formats sources,
        and generates a grounded answer via Groq LLM.
        """
        if not self.initialized or self.vector_store is None:
            self.initialize()

        k = top_k if top_k is not None else TOP_K
        retriever = create_retriever(self.vector_store, top_k=k)
        retrieved_docs = retrieve_documents(retriever, question)

        chunks_list: List[RetrievedChunk] = []
        sources_list: List[SourceDocument] = []
        seen_sources = set()

        for idx, doc in enumerate(retrieved_docs, start=1):
            source_path = doc.metadata.get("source", "Unknown Document")
            clean_source = os.path.basename(source_path)
            page_num = doc.metadata.get("page", None)

            chunks_list.append(
                RetrievedChunk(
                    id=idx,
                    content=doc.page_content,
                    source=clean_source,
                    page=page_num,
                )
            )

            source_key = f"{clean_source}:{page_num}"
            if source_key not in seen_sources:
                seen_sources.add(source_key)
                snippet_preview = doc.page_content[:150].replace("\n", " ") + "..."
                sources_list.append(
                    SourceDocument(
                        source=clean_source,
                        page=page_num,
                        snippet=snippet_preview,
                    )
                )

        if retrieved_docs:
            answer = generate_answer(question, retrieved_docs)
        else:
            answer = "I don't have enough information from the provided documents."

        return ChatResponse(
            answer=answer,
            sources=sources_list,
            chunks=chunks_list,
            metadata={
                "question": question,
                "top_k": k,
                "chunks_retrieved": len(retrieved_docs),
                "model": LLM_MODEL,
            },
        )

    def ingest_file(self, filename: str, content_bytes: bytes) -> UploadResponse:
        """
        Saves uploaded file to data directory, processes chunks, generates embeddings,
        and updates ChromaDB.
        """
        if not self.initialized:
            self.initialize()

        target_path = os.path.join(DATA_FOLDER, filename)
        with open(target_path, "wb") as f:
            f.write(content_bytes)

        new_docs = load_single_document(target_path)
        if not new_docs:
            return UploadResponse(
                filename=filename,
                status="error",
                chunks_created=0,
                total_vectors=verify_vector_store(self.vector_store),
                message="Failed to extract text or unsupported format.",
            )

        chunks = split_documents(new_docs, DEFAULT_CHUNK_SIZE)
        add_documents_to_store(self.vector_store, chunks)

        total_vectors = verify_vector_store(self.vector_store)
        return UploadResponse(
            filename=filename,
            status="success",
            chunks_created=len(chunks),
            total_vectors=total_vectors,
            message=f"File '{filename}' processed into {len(chunks)} chunks and indexed successfully.",
        )

    def get_document_list(self) -> DocumentListResponse:
        """
        Returns list of stored documents and chunk statistics.
        """
        docs_info: List[DocumentInfo] = []
        total_chunks = verify_vector_store(self.vector_store) if self.vector_store else 0

        if os.path.exists(DATA_FOLDER):
            for fname in os.listdir(DATA_FOLDER):
                fpath = os.path.join(DATA_FOLDER, fname)
                if os.path.isfile(fpath):
                    size = os.path.getsize(fpath)
                    docs_info.append(
                        DocumentInfo(
                            filename=fname,
                            chunk_count=max(1, size // DEFAULT_CHUNK_SIZE),
                            size_bytes=size,
                        )
                    )

        return DocumentListResponse(
            documents=docs_info,
            total_documents=len(docs_info),
            total_chunks=total_chunks,
        )

    def delete_document(self, filename: str) -> DocumentDeleteResponse:
        """
        Deletes target file from data folder and rebuilds the vector index.
        """
        target_path = os.path.join(DATA_FOLDER, filename)
        if os.path.exists(target_path):
            os.remove(target_path)

        clear_vector_store(CHROMA_DB_PATH)
        self.vector_store = None
        self.initialized = False
        self.initialize()

        remaining_resp = self.get_document_list()
        return DocumentDeleteResponse(
            message=f"Document '{filename}' removed and vector index rebuilt successfully.",
            remaining_documents=remaining_resp.total_documents,
            total_vectors=remaining_resp.total_chunks,
        )

    def get_health_status(self) -> Dict[str, Any]:
        """
        Returns real-time health and telemetry metrics.
        """
        vector_count = verify_vector_store(self.vector_store) if self.vector_store else 0
        return {
            "status": "healthy",
            "vector_count": vector_count,
            "chroma_db_status": "connected" if self.vector_store else "uninitialized",
            "llm_model": LLM_MODEL,
        }
