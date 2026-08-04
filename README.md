# RAG Document Indexing System

A simple document indexing pipeline built to understand the foundation of **Retrieval-Augmented Generation (RAG)** systems.

This project focuses on the document preparation stage of RAG by loading documents, splitting them into chunks, generating embeddings, and storing those embeddings in **ChromaDB** for future retrieval.

---

# Features

* Load multiple document formats:

  * TXT
  * PDF
  * Markdown

* Split documents into smaller chunks

* Generate text embeddings using HuggingFace models

* Store embeddings in ChromaDB

* Verify stored vectors

* Compare different chunk sizes and observe vector generation

---

# RAG Indexing Workflow

```
Documents
    |
    ↓
Document Loaders
    |
    ↓
Text Chunking
    |
    ↓
Embedding Generation
    |
    ↓
ChromaDB Vector Storage
    |
    ↓
Stored Vector Representations
```

This project implements the indexing stage required before building a complete RAG application.

---

# Project Structure

```
rag-document-indexing/

│
├── data/
│   ├── notes.txt
│   ├── tutorial.md
│   └── guide.pdf
│
├── chroma_db_200/
├── chroma_db_500/
├── chroma_db_1000/
│
├── loaders.py          # Document loading
├── splitter.py         # Text chunking
├── embeddings.py       # Embedding generation
├── vector_store.py     # ChromaDB operations
├── main.py             # Application entry point
│
├── requirements.txt
├── README.md
└── .gitignore
```

---

# Technologies Used

## Language

* Python

## Frameworks & Libraries

* LangChain
* LangChain Community
* LangChain Text Splitters
* HuggingFace Sentence Transformers
* ChromaDB

## Embedding Model

```
sentence-transformers/all-MiniLM-L6-v2
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd rag-document-indexing
```

## Create Virtual Environment

```bash
python -m venv venv
```

Activate:

Windows:

```bash
venv\Scripts\activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Running the Project

Run:

```bash
python main.py
```

The application will:

1. Load documents from the `data` folder
2. Split documents into chunks
3. Generate embeddings
4. Store vectors in ChromaDB
5. Verify stored vectors
6. Compare different chunk sizes

---

# Supported Documents

## TXT Files

Loaded using:

```
TextLoader
```

Example:

```
notes.txt
```

---

## PDF Files

Loaded using:

```
PyPDFLoader
```

Example:

```
guide.pdf
```

---

## Markdown Files

Markdown files are loaded as text documents.

Example:

```
tutorial.md
```

---

# Components

## Document Loader

File:

```
loaders.py
```

Responsible for reading different document formats and converting them into LangChain document objects.

---

## Text Splitter

File:

```
splitter.py
```

Uses:

```
RecursiveCharacterTextSplitter
```

Configuration:

```
chunk_overlap = 50
```

It divides large documents into smaller searchable sections.

---

## Embedding Generator

File:

```
embeddings.py
```

Converts text chunks into numerical vector representations using a HuggingFace embedding model.

---

## Vector Database

File:

```
vector_store.py
```

Handles:

* Creating ChromaDB collections
* Storing embeddings
* Verifying vector count

---

# Chunk Size Experiment

Different chunk sizes were tested to observe their effect on vector creation.

| Chunk Size | Chunks Created | Vectors Stored |
| ---------- | -------------- | -------------- |
| 200        | 6              | 6              |
| 500        | 3              | 3              |
| 1000       | 3              | 3              |

## Observation

Smaller chunks create more embeddings because documents are divided into smaller sections.

Larger chunks create fewer embeddings but may contain more context.

Choosing the right chunk size is important for balancing:

* Retrieval accuracy
* Storage usage
* Search performance

---

# Example Output

```
Loading documents...
Loaded 3 document(s)

Chunk Size Comparison
========================================

Testing chunk size: 200
Chunks created: 6
Vectors stored: 6

Testing chunk size: 500
Chunks created: 3
Vectors stored: 3

Testing chunk size: 1000
Chunks created: 3
Vectors stored: 3

Document indexing completed successfully!
```

---

# Future Improvements

* Add semantic search
* Implement document retrieval
* Connect an LLM for response generation
* Build a complete RAG chatbot
* Add metadata filtering
* Add DOCX support
* Add evaluation using LangSmith

---

# Author

**Zarwan Zahid**

Computer Science Student | AI & Software Development Enthusiast

---

# License

This project is created for educational purposes and learning RAG fundamentals.
