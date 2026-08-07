from typing import List
from langchain_core.documents import Document
from backend.app.core.config import TOP_K


def create_retriever(vector_store, top_k: int = TOP_K):
    """
    Creates a retriever instance from the given vector store using similarity search with top_k.
    Preserves exact retriever creation logic.
    """
    return vector_store.as_retriever(
        search_kwargs={"k": top_k}
    )


def retrieve_documents(retriever, query: str) -> List[Document]:
    """
    Invokes the retriever to get relevant document chunks for the given query.
    Preserves exact document retrieval logic.
    """
    return retriever.invoke(query)


def display_documents(documents: List[Document]):
    """
    Utility function to format and print retrieved context documents to stdout.
    Preserves CLI display functionality.
    """
    print("\n" + "=" * 60)
    print("Retrieved Context")
    print("=" * 60)

    for i, doc in enumerate(documents, start=1):
        print(f"\nResult {i}")
        print("-" * 60)
        print(doc.page_content)

        if "source" in doc.metadata:
            print(f"\nSource: {doc.metadata['source']}")
