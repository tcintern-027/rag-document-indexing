from config import (
    DEFAULT_CHUNK_SIZE,
    TOP_K,
    VECTOR_DB,
)

from loaders import load_documents
from splitter import split_documents
from embeddings import create_embeddings

from vector_store import (
    create_vector_store,
    verify_vector_store,
)

from retriever import (
    create_retriever,
    retrieve_documents,
    display_documents,
)


def main():

    print("Loading documents...")
    documents = load_documents()
    print(f"Loaded {len(documents)} document(s)")

    print("\nSplitting documents...")
    chunks = split_documents(
        documents,
        DEFAULT_CHUNK_SIZE,
    )
    print(f"Created {len(chunks)} chunks")

    embeddings = create_embeddings()

    print("\nCreating ChromaDB...")
    vector_store = create_vector_store(
        chunks,
        embeddings,
        VECTOR_DB,
    )

    count = verify_vector_store(vector_store)
    print(f"Vectors stored: {count}")

    retriever = create_retriever(
        vector_store,
        TOP_K,
    )

    while True:

        query = input("\nEnter your question (or 'exit'): ")

        if query.lower() == "exit":
            break

        results = retrieve_documents(
            retriever,
            query,
        )

        display_documents(results)


if __name__ == "__main__":
    main()