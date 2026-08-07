import os
from langchain_community.document_loaders import (
    TextLoader,
    PyPDFLoader,
)
from backend.app.core.config import DATA_FOLDER


def load_single_document(file_path: str):
    """
    Loads a single document file (.txt, .pdf, .md) and returns LangChain Documents.
    """
    if not os.path.exists(file_path):
        return []

    file_lower = file_path.lower()
    if file_lower.endswith(".txt") or file_lower.endswith(".md"):
        loader = TextLoader(file_path, encoding="utf-8")
    elif file_lower.endswith(".pdf"):
        loader = PyPDFLoader(file_path)
    else:
        return []

    return loader.load()


def load_documents(data_folder: str = DATA_FOLDER):
    """
    Scans the data folder and loads all supported (.txt, .pdf, .md) documents.
    Preserves exact loading logic from original implementation.
    """
    documents = []

    if not os.path.exists(data_folder):
        return documents

    for file in os.listdir(data_folder):
        path = os.path.join(data_folder, file)

        docs = load_single_document(path)
        documents.extend(docs)

    return documents
