from langchain_community.vectorstores import Chroma


def create_vector_store(chunks, embeddings, database):

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=database,
    )

    return vector_store


def load_vector_store(database, embeddings):

    return Chroma(
        persist_directory=database,
        embedding_function=embeddings,
    )


def verify_vector_store(vector_store):

    return vector_store._collection.count()