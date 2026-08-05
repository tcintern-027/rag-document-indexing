from langchain_text_splitters import RecursiveCharacterTextSplitter

from config import CHUNK_OVERLAP


def split_documents(documents, chunk_size):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=CHUNK_OVERLAP,
    )

    return splitter.split_documents(documents)