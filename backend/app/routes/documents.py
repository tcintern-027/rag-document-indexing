from fastapi import APIRouter, HTTPException
from backend.app.models.schemas import DocumentListResponse, DocumentDeleteResponse
from backend.app.services.rag_service import RAGService

router = APIRouter(tags=["Documents"])


@router.get("/documents", response_model=DocumentListResponse, summary="List All Ingested Documents")
def list_documents():
    """
    Returns list of indexed document files, file sizes, and chunk statistics.
    """
    try:
        rag_service = RAGService.get_instance()
        return rag_service.get_document_list()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing documents: {str(e)}")


@router.delete("/documents/{filename}", response_model=DocumentDeleteResponse, summary="Remove Document from Knowledge Base")
def delete_document(filename: str):
    """
    Deletes specified file from knowledge base and rebuilds vector index.
    """
    try:
        rag_service = RAGService.get_instance()
        return rag_service.delete_document(filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting document: {str(e)}")
