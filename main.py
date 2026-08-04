from loaders import load_documents
from splitter import split_documents
from embeddings import create_embeddings
from vector_store import (
    create_vector_store,
    verify_vector_store
)


def main():

    print("Loading documents...")

    documents = load_documents()

    print(
        f"Loaded {len(documents)} document(s)"
    )


    embeddings = create_embeddings()


    chunk_sizes = [200, 500, 1000]


    print("\nChunk Size Comparison")
    print("=" * 40)


    for size in chunk_sizes:

        print(
            f"\nTesting chunk size: {size}"
        )


        chunks = split_documents(
            documents,
            size
        )


        db_name = f"chroma_db_{size}"


        vector_store = create_vector_store(
            chunks,
            embeddings,
            db_name
        )


        count = verify_vector_store(
            vector_store
        )


        print(
            f"Chunks created: {len(chunks)}"
        )

        print(
            f"Vectors stored: {count}"
        )


    print(
        "\nDocument indexing completed successfully!"
    )



if __name__ == "__main__":
    main()