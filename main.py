import os

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

from chatbot import generate_answer


def main():

    embeddings = create_embeddings()


    # Check if ChromaDB already exists
    if os.path.exists(VECTOR_DB):

        print("Existing ChromaDB found.")
        print("Loading vector database...")


        vector_store = create_vector_store(
            [],
            embeddings,
            VECTOR_DB,
        )


    else:

        print("No ChromaDB found.")
        print("Creating new index...")


        print("\nLoading documents...")
        documents = load_documents()

        print(f"Loaded {len(documents)} document(s)")


        print("\nSplitting documents...")
        chunks = split_documents(
            documents,
            DEFAULT_CHUNK_SIZE,
        )

        print(f"Created {len(chunks)} chunks")


        print("\nCreating ChromaDB...")

        vector_store = create_vector_store(
            chunks,
            embeddings,
            VECTOR_DB,
        )


    count = verify_vector_store(vector_store)

    print(f"\nVectors stored: {count}")


    retriever = create_retriever(
        vector_store,
        TOP_K,
    )


    print("\nRAG Chatbot Ready!")
    print("Type 'exit' to quit.")


    while True:

        query = input(
            "\nEnter your question (or 'exit'): "
        )


        if query.lower() == "exit":
            break


        # Retrieve relevant chunks
        results = retrieve_documents(
            retriever,
            query,
        )


        # Display retrieved context
        display_documents(results)


        # Generate grounded response
        answer = generate_answer(
            query,
            results,
        )


        print("\n")
        print("=" * 60)
        print("AI Answer")
        print("=" * 60)

        print(answer)



if __name__ == "__main__":
    main()