from langchain_community.vectorstores import Chroma


def create_vector_store(
        chunks,
        embeddings,
        database_name
):

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=database_name,
    )

    return vector_store



def verify_vector_store(vector_store):

    count = vector_store._collection.count()

    return count