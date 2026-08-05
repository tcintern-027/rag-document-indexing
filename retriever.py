from langchain_core.documents import Document


def create_retriever(vector_store, top_k):
    return vector_store.as_retriever(
        search_kwargs={"k": top_k}
    )


def retrieve_documents(retriever, query):
    return retriever.invoke(query)


def display_documents(documents):
    print("\n" + "=" * 60)
    print("Retrieved Context")
    print("=" * 60)

    for i, doc in enumerate(documents, start=1):
        print(f"\nResult {i}")
        print("-" * 60)
        print(doc.page_content)

        if "source" in doc.metadata:
            print(f"\nSource: {doc.metadata['source']}")