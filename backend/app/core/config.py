import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent.parent

try:
    from pydantic_settings import BaseSettings
except ImportError:
    try:
        from pydantic import BaseSettings  # type: ignore
    except ImportError:
        from pydantic import BaseModel as BaseSettings  # type: ignore


class Settings(BaseSettings):
    """
    Centralized application configuration settings powered by Pydantic.
    """
    # App & Server Settings
    APP_TITLE: str = "AI Knowledge Assistant API"
    APP_VERSION: str = "1.0.0"
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))

    # Storage Paths
    DATA_FOLDER: str = os.getenv("DATA_FOLDER", os.path.join(BASE_DIR, "data"))
    CHROMA_DB_PATH: str = os.getenv("CHROMA_DB_PATH", os.path.join(BASE_DIR, "chroma_db"))
    VECTOR_DB: str = os.getenv("CHROMA_DB_PATH", os.path.join(BASE_DIR, "chroma_db"))

    # Chunking & Retrieval Defaults
    DEFAULT_CHUNK_SIZE: int = int(os.getenv("DEFAULT_CHUNK_SIZE", 500))
    CHUNK_OVERLAP: int = int(os.getenv("CHUNK_OVERLAP", 50))
    TOP_K: int = int(os.getenv("TOP_K", 3))

    # Groq & Embedding Model Settings
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    LLM_MODEL: str = os.getenv("LLM_MODEL", "llama-3.3-70b-versatile")
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")


settings = Settings()

# Ensure required directories exist
os.makedirs(settings.DATA_FOLDER, exist_ok=True)
os.makedirs(settings.CHROMA_DB_PATH, exist_ok=True)

# Backward-compatible module-level aliases
DATA_FOLDER = settings.DATA_FOLDER
CHROMA_DB_PATH = settings.CHROMA_DB_PATH
VECTOR_DB = settings.VECTOR_DB
DEFAULT_CHUNK_SIZE = settings.DEFAULT_CHUNK_SIZE
CHUNK_OVERLAP = settings.CHUNK_OVERLAP
TOP_K = settings.TOP_K
GROQ_API_KEY = settings.GROQ_API_KEY
LLM_MODEL = settings.LLM_MODEL
EMBEDDING_MODEL = settings.EMBEDDING_MODEL
HOST = settings.HOST
PORT = settings.PORT
