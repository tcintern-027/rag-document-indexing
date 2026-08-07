import os
import shutil
from typing import List, Optional
from langchain_chroma import Chroma
from langchain_core.documents import Document
from backend.app.core.config import CHROMA_DB_PATH


def create_vector_store(
    chunks: List[Document],
    embeddings,
    persist_directory: str = CHROMA_DB_PATH
) -> Chroma:
    """
    Creates or loads a persistent vector store abstraction (ChromaDB implementation).
    Preserves exact vector store creation and loading logic from original code.
    """
    if os.path.exists(persist_directory) and len(os.listdir(persist_directory)) > 0:
        print("Loading existing ChromaDB...")
        vector_store = Chroma(
            persist_directory=persist_directory,
            embedding_function=embeddings,
        )
        if chunks:
            print("Adding new chunks to existing ChromaDB...")
            vector_store.add_documents(documents=chunks)
    else:
        print("Creating new ChromaDB index...")
        if not chunks:
            vector_store = Chroma(
                persist_directory=persist_directory,
                embedding_function=embeddings
            )
        else:
            vector_store = Chroma.from_documents(
                documents=chunks,
                embedding=embeddings,
                persist_directory=persist_directory,
            )

    return vector_store


def add_documents_to_store(vector_store: Chroma, chunks: List[Document]):
    """
    Appends new document chunks into the active vector store index.
    """
    if chunks:
        vector_store.add_documents(documents=chunks)


def verify_vector_store(vector_store: Chroma) -> int:
    """
    Returns total document count stored inside the vector index.
    """
    try:
        return vector_store._collection.count()
    except Exception as e:
        print(f"Error checking vector store count: {e}")
        return 0


def clear_vector_store(persist_directory: str = CHROMA_DB_PATH):
    """
    Resets/clears the vector store directory for clean re-indexing.
    """
    if os.path.exists(persist_directory):
        try:
            shutil.rmtree(persist_directory)
            os.makedirs(persist_directory, exist_ok=True)
        except Exception as e:
            print(f"Error clearing vector store: {e}")
