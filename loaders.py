import os
from config import DATA_FOLDER

from langchain_community.document_loaders import (
    TextLoader,
    PyPDFLoader,
)

def load_documents():

    documents = []

    for file in os.listdir(DATA_FOLDER):

        path = os.path.join(DATA_FOLDER, file)

        if file.endswith(".txt"):
            loader = TextLoader(
                path,
                encoding="utf-8"
            )

        elif file.endswith(".pdf"):
            loader = PyPDFLoader(path)

        elif file.endswith(".md"):
            loader = TextLoader(
                path,
                encoding="utf-8"
            )

        else:
            continue


        docs = loader.load()
        documents.extend(docs)


    return documents