from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.app.models.schemas import UploadResponse
from backend.app.services.rag_service import RAGService

router = APIRouter(tags=["Upload"])

ALLOWED_EXTENSIONS = {".pdf", ".txt", ".md"}


@router.post("/upload", response_model=UploadResponse, summary="Upload & Index Document into Knowledge Base")
async def upload_document(file: UploadFile = File(...)):
    """
    Accepts PDF, TXT, or Markdown document upload, saves file, processes text chunks,
    generates embeddings, and stores vectors in persistent ChromaDB.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="Uploaded file must have a filename.")

    ext = "." + file.filename.split(".")[-1].lower() if "." in file.filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Allowed extensions: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    try:
        content_bytes = await file.read()
        rag_service = RAGService.get_instance()
        response = rag_service.ingest_file(file.filename, content_bytes)
        return response
    except Exception as e:
        print(f"Error handling file upload: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")
