# RAG Document Indexing and Retrieval System

A complete document processing pipeline built to understand the core concepts behind **Retrieval-Augmented Generation (RAG)** systems.

This project implements the two important stages of a RAG application:

1. **Document Indexing**

   * Loading documents
   * Splitting text into chunks
   * Generating embeddings
   * Storing vectors in ChromaDB

2. **Document Retrieval**

   * Creating a retriever
   * Accepting user queries
   * Performing similarity search
   * Retrieving relevant document chunks
   * Displaying retrieved context

The project prepares the foundation required before connecting an LLM and building a complete RAG chatbot.

---

# Features

## Document Indexing

* Load multiple document formats:

  * TXT files
  * PDF files
  * Markdown files

* Split documents into meaningful chunks

* Generate vector embeddings using HuggingFace models

* Store embeddings in ChromaDB

* Verify stored vectors

---

## Retrieval Pipeline

* Load indexed documents from ChromaDB

* Create a LangChain Retriever

* Accept user queries

* Perform semantic similarity search

* Retrieve the most relevant document chunks

* Display retrieved context without LLM generation

---

## Experiments

* Compare different chunk sizes:

  * 200
  * 500
  * 1000

* Compare different Top-K retrieval values:

  * 2
  * 4
  * 6

---

# RAG Architecture

The implemented pipeline:

```
                 INDEXING PIPELINE

Documents
    |
    ↓
Document Loaders
    |
    ↓
Text Splitting
    |
    ↓
Embedding Generation
    |
    ↓
ChromaDB Vector Storage


                RETRIEVAL PIPELINE

User Query
    |
    ↓
Query Embedding
    |
    ↓
Retriever
    |
    ↓
Similarity Search
    |
    ↓
Top-K Relevant Chunks
    |
    ↓
Retrieved Context
```

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
├── main.py                 # Main indexing and retrieval application
├── experiments.py          # Chunk size and Top-K experiments
│
├── loaders.py              # Document loading logic
├── splitter.py             # Text chunking logic
├── embeddings.py           # Embedding model setup
├── vector_store.py         # ChromaDB operations
├── retriever.py            # Retrieval pipeline
├── config.py               # Project configuration
│
├── requirements.txt
├── README.md
└── .gitignore
```

---

# Technologies Used

## Programming Language

* Python

## Frameworks and Libraries

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

---

## Create Virtual Environment

Windows:

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Running the Application

Run:

```bash
python main.py
```

The application will:

1. Load documents from the `data` folder
2. Split documents into chunks
3. Generate embeddings
4. Store vectors in ChromaDB
5. Create a retriever
6. Accept user queries
7. Display the most relevant document context

---

# Document Loading

The system supports multiple file formats.

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

Markdown documents are loaded as text files.

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

Responsible for reading different document formats and converting them into LangChain Document objects.

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

Splitting documents improves retrieval accuracy by creating smaller searchable sections.

---

## Embedding Generation

File:

```
embeddings.py
```

Converts text chunks into numerical vector representations.

Example:

```
Text
 |
 ↓
Embedding Model
 |
 ↓
[0.23, 0.54, -0.12, ...]
```

---

## Vector Database

File:

```
vector_store.py
```

Handles:

* Creating ChromaDB collections
* Storing embeddings
* Loading vector stores
* Verifying stored vectors

---

# Retrieval Pipeline

File:

```
retriever.py
```

The retriever connects the user query with the vector database.

The retrieval process:

```
User Question

"What is machine learning?"

        ↓

Convert query into embedding

        ↓

Compare with stored vectors

        ↓

Return most similar chunks
```

---

# Similarity Search

Similarity search finds document chunks that are closest to the user's query in vector space.

Example:

Query:

```
What is artificial intelligence?
```

Retrieved chunks:

```
Artificial intelligence allows computers to perform tasks requiring human intelligence.

Machine learning is a subset of artificial intelligence.
```

---

# Top-K Retrieval Experiment

The project compares different retrieval sizes.

| Top-K | Result                         |
| ----- | ------------------------------ |
| 2     | Returns 2 most relevant chunks |
| 4     | Returns 4 relevant chunks      |
| 6     | Returns 6 relevant chunks      |

## Observation

Smaller Top-K values:

* Provide focused context
* Reduce irrelevant information

Larger Top-K values:

* Provide more information
* May include less relevant chunks

---

# Chunk Size Experiment

Different chunk sizes were tested:

| Chunk Size | Purpose                      |
| ---------- | ---------------------------- |
| 200        | Smaller, more precise chunks |
| 500        | Balanced retrieval           |
| 1000       | Larger context chunks        |

## Observation

Smaller chunks generate more vectors and may improve precision.

Larger chunks provide more context but may reduce retrieval accuracy.

Choosing the correct chunk size depends on:

* Document type
* Query complexity
* Retrieval requirements

---

# Example Output

```
Loading documents...
Loaded 3 document(s)

Splitting documents...
Created 3 chunks

Creating ChromaDB...
Vectors stored: 3

Enter your question:

What is machine learning?

Retrieved Context:

Result 1:
Machine learning is a subset of artificial intelligence...

Result 2:
Machine learning algorithms learn patterns from data...
```

---

# Current RAG Progress

Completed:

```
Documents
    ↓
Document Loading
    ↓
Chunking
    ↓
Embeddings
    ↓
ChromaDB
    ↓
Retriever
    ↓
Similarity Search
    ↓
Retrieved Context
```

---

# Future Improvements

* Connect retriever with an LLM
* Build a complete RAG chatbot
* Add conversational memory
* Add metadata filtering
* Support DOCX documents
* Add RAG evaluation using LangSmith
* Deploy as an API service

---

# Author

**Zarwan Zahid**

Computer Science Student | AI & Software Development Enthusiast

---

# License

This project is created for educational purposes and learning RAG fundamentals.
