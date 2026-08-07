try:
    from langchain_huggingface import HuggingFaceEmbeddings
except ImportError:
    from langchain_community.embeddings import HuggingFaceEmbeddings  # type: ignore

from backend.app.core.config import EMBEDDING_MODEL


def create_embeddings():
    """
    Creates and returns the HuggingFace Embeddings instance using sentence-transformers.
    Supports both langchain_huggingface and langchain_community implementations.
    """
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )
    return embeddings
