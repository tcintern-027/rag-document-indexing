import os

from langchain_chroma import Chroma


def create_vector_store(
        chunks,
        embeddings,
        persist_directory
):

    if os.path.exists(persist_directory):

        print("Loading existing ChromaDB...")

        vector_store = Chroma(
            persist_directory=persist_directory,
            embedding_function=embeddings,
        )

    else:

        print("Creating new ChromaDB...")

        vector_store = Chroma.from_documents(
            documents=chunks,
            embedding=embeddings,
            persist_directory=persist_directory,
        )

    return vector_store



def verify_vector_store(vector_store):

    return vector_store._collection.count()