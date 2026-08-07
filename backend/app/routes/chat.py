from fastapi import APIRouter, HTTPException
from backend.app.models.schemas import ChatRequest, ChatResponse
from backend.app.services.rag_service import RAGService

router = APIRouter(tags=["Chat"])


@router.post("/chat", response_model=ChatResponse, summary="Query Knowledge Base via Grounded RAG")
def chat_query(request: ChatRequest):
    """
    Accepts user question, queries ChromaDB vector index, retrieves relevant chunks,
    and invokes Groq LLM to return a grounded AI answer with citations.
    """
    if not request.question or not request.question.strip():
        raise HTTPException(status_code=400, detail="Question prompt cannot be empty.")

    try:
        rag_service = RAGService.get_instance()
        response = rag_service.query(
            question=request.question.strip(),
            top_k=request.top_k
        )
        return response
    except Exception as e:
        print(f"Error executing chat query: {e}")
        raise HTTPException(status_code=500, detail=f"Error executing RAG pipeline: {str(e)}")
