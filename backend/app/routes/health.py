from fastapi import APIRouter
from backend.app.models.schemas import HealthResponse
from backend.app.services.rag_service import RAGService

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse, summary="Check API & Vector Database Health")
def get_health():
    """
    Returns API operation status, active vector count in ChromaDB, and LLM model availability.
    """
    rag_service = RAGService.get_instance()
    health_data = rag_service.get_health_status()
    return HealthResponse(**health_data)
