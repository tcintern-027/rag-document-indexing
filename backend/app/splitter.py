from langchain_text_splitters import RecursiveCharacterTextSplitter
from backend.app.core.config import CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE


def split_documents(documents, chunk_size=DEFAULT_CHUNK_SIZE):
    """
    Splits loaded documents into chunks using RecursiveCharacterTextSplitter.
    Preserves exact text splitting logic from original implementation.
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=CHUNK_OVERLAP,
    )

    return splitter.split_documents(documents)
