from config import CHUNK_SIZES

from loaders import load_documents
from splitter import split_documents
from embeddings import create_embeddings

from vector_store import create_vector_store

from retriever import (
    create_retriever,
    retrieve_documents
)


def run_experiment():

    print("Loading documents...")
    documents = load_documents()

    embeddings = create_embeddings()


    chunk_sizes = [200, 500, 1000]
    top_k_values = [2, 4, 6]


    query = input("\nEnter test query: ")


    for chunk_size in chunk_sizes:

        print("\n")
        print("=" * 60)
        print(f"CHUNK SIZE: {chunk_size}")
        print("=" * 60)


        chunks = split_documents(
            documents,
            chunk_size
        )


        vector_store = create_vector_store(
            chunks,
            embeddings,
            f"experiment_db_{chunk_size}"
        )


        for k in top_k_values:

            print("\n")
            print(f"TOP-K: {k}")

            retriever = create_retriever(
                vector_store,
                k
            )


            results = retrieve_documents(
                retriever,
                query
            )


            print(
                f"Retrieved chunks: {len(results)}"
            )


            for i, doc in enumerate(results, start=1):

                print("\nResult", i)
                print("-" * 40)
                print(
                    doc.page_content[:300]
                )


if __name__ == "__main__":
    run_experiment()