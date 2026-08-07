from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.routes import health, chat, upload, documents
from backend.app.services.rag_service import RAGService


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan context manager initializing RAG Service on startup.
    """
    print("Starting AI Knowledge Assistant Backend...")
    try:
        rag_service = RAGService.get_instance()
        rag_service.initialize()
    except Exception as e:
        print(f"Warning during RAG initialization: {e}")
    yield
    print("Shutting down AI Knowledge Assistant Backend...")


app = FastAPI(
    title="AI Knowledge Assistant API",
    description="Production-Grade Grounded RAG Chatbot Backend powered by FastAPI, ChromaDB, HuggingFace & Groq",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Router endpoints
app.include_router(health.router)
app.include_router(chat.router)
app.include_router(upload.router)
app.include_router(documents.router)


@app.get("/", summary="Root API Redirect Notice")
def root():
    return {
        "message": "Welcome to AI Knowledge Assistant API",
        "docs": "/docs",
        "health": "/health",
    }
