from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    question: str = Field(..., description="The question or prompt to run against the knowledge base.", example="What is RAG?")
    top_k: Optional[int] = Field(default=None, description="Number of context chunks to retrieve.")


class SourceDocument(BaseModel):
    source: str = Field(..., description="Path or filename of the source document.")
    page: Optional[int] = Field(default=None, description="Page number if applicable.")
    snippet: str = Field(..., description="Preview snippet of the source content.")


class RetrievedChunk(BaseModel):
    id: int = Field(..., description="Chunk sequence identifier.")
    content: str = Field(..., description="Full text content of the chunk.")
    source: str = Field(..., description="Source document path or name.")
    page: Optional[int] = Field(default=None, description="Page number if applicable.")


class ChatResponse(BaseModel):
    answer: str = Field(..., description="AI generated answer grounded in retrieved context.")
    sources: List[SourceDocument] = Field(default_factory=list, description="List of source document citations.")
    chunks: List[RetrievedChunk] = Field(default_factory=list, description="List of raw retrieved context chunks.")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Query telemetry and execution metadata.")


class UploadResponse(BaseModel):
    filename: str = Field(..., description="Name of the uploaded file.")
    status: str = Field(..., description="Processing status (e.g. success, error).")
    chunks_created: int = Field(..., description="Number of vector chunks generated from file.")
    total_vectors: int = Field(..., description="Total vector count in ChromaDB index.")
    message: str = Field(..., description="Detailed status message.")


class HealthResponse(BaseModel):
    status: str = Field(..., description="System health status (e.g., healthy).")
    vector_count: int = Field(..., description="Current count of vectors stored in ChromaDB.")
    chroma_db_status: str = Field(..., description="Vector database operational status.")
    llm_model: str = Field(..., description="LLM model identifier currently in use.")


class DocumentInfo(BaseModel):
    filename: str = Field(..., description="File name.")
    chunk_count: int = Field(..., description="Approximate chunk count in vector index.")
    size_bytes: int = Field(..., description="File size in bytes.")


class DocumentListResponse(BaseModel):
    documents: List[DocumentInfo] = Field(default_factory=list, description="List of uploaded documents.")
    total_documents: int = Field(..., description="Total count of uploaded documents.")
    total_chunks: int = Field(..., description="Total vector count in index.")


class DocumentDeleteResponse(BaseModel):
    message: str = Field(..., description="Deletion result message.")
    remaining_documents: int = Field(..., description="Count of remaining documents.")
    total_vectors: int = Field(..., description="Updated vector count.")
