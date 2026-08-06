# RAG Document Indexing & Chatbot with ChromaDB and Groq

A complete Retrieval-Augmented Generation (RAG) application that allows users to ask questions about their own documents. The system retrieves relevant document chunks from a ChromaDB vector database and uses Groq-powered LLM generation to produce grounded answers based only on the provided knowledge base.

---

# Project Overview

Traditional LLMs generate answers based on their pre-trained knowledge. However, they may lack information about private or custom documents.

This project implements a RAG pipeline where:

1. Documents are loaded from local files.
2. Documents are split into smaller chunks.
3. Chunks are converted into vector embeddings.
4. Embeddings are stored in ChromaDB.
5. User queries are matched with relevant chunks using similarity search.
6. Retrieved context is injected into a prompt.
7. Groq LLM generates a grounded response.

---

# Features

:white_check_mark: Load TXT, PDF, and Markdown documents
:white_check_mark: Document chunking and preprocessing
:white_check_mark: Generate embeddings using HuggingFace models
:white_check_mark: Store embeddings in ChromaDB
:white_check_mark: Persistent vector database support
:white_check_mark: Similarity-based retrieval
:white_check_mark: Configurable Top-K retrieval
:white_check_mark: Context injection into prompts
:white_check_mark: Groq LLM integration
:white_check_mark: Display retrieved document chunks
:white_check_mark: Fully functional RAG chatbot

---

# RAG Architecture

```
                 DOCUMENT INDEXING

 TXT / PDF / MD Files
          |
          ↓
 Document Loaders
          |
          ↓
 Text Splitter
          |
          ↓
 Embedding Model
          |
          ↓
 ChromaDB Vector Store



                 RETRIEVAL PIPELINE

 User Question
          |
          ↓
 Retriever
          |
          ↓
 Similarity Search
          |
          ↓
 Top-K Relevant Chunks



                 GENERATION PIPELINE

 Retrieved Context
          +
 User Query
          |
          ↓
 Prompt Template
          |
          ↓
 Groq LLM
          |
          ↓
 Grounded AI Response
```

---

# Technologies Used

## Backend

* Python
* LangChain
* LangChain Chroma
* Groq API
* ChromaDB

## AI Components

* HuggingFace Sentence Transformers
* Vector Embeddings
* Retrieval-Augmented Generation (RAG)
* Large Language Models (LLMs)

## Document Processing

* PDF Loader
* Text Loader
* Markdown Loader
* Text Splitters

---

# Project Structure

```
rag-document-indexing/

│
├── data/
│   ├── guide.pdf
│   ├── notes.txt
│   └── tutorial.md
│
├── main.py                 # Application entry point
├── loaders.py              # Document loading logic
├── splitter.py             # Text chunking logic
├── embeddings.py           # Embedding model setup
├── vector_store.py         # ChromaDB creation/loading
├── retriever.py            # Similarity search logic
├── prompt.py               # Prompt template
├── chatbot.py              # Groq LLM integration
├── experiments.py          # Chunk size experiments
├── config.py               # Configuration values
│
├── chroma_db/              # Persistent vector database
│
├── requirements.txt
├── README.md
└── .env
```

---

# Installation

## 1. Clone Repository

```bash
git clone <repository-url>

cd rag-document-indexing
```

---

## 2. Create Virtual Environment

```bash
python -m venv venv
```

Activate:

### Windows

```powershell
venv\Scripts\activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create a `.env` file:

```
GROQ_API_KEY=your_groq_api_key_here
```

The API key is used to communicate with Groq LLM models.

---

# Running the Application

Start the RAG chatbot:

```bash
python main.py
```

Example:

```
RAG Chatbot Ready!
Type 'exit' to quit.

Enter your question:
What is artificial intelligence?
```

Output:

```
Retrieved Context
-----------------

Artificial Intelligence (AI) is transforming industries by enabling machines to perform tasks that typically require human intelligence.


AI Answer
---------

Artificial Intelligence is the field of creating machines that can perform tasks requiring human intelligence.
```

---

# How the System Works

## 1. Document Loading

Supported formats:

* PDF
* TXT
* Markdown

Example:

```
data/
 |
 ├── guide.pdf
 ├── notes.txt
 └── tutorial.md
```

Documents are converted into LangChain Document objects.

---

## 2. Text Splitting

Large documents are divided into smaller chunks.

Example:

```
Original Document

        |
        ↓

Chunk 1
Chunk 2
Chunk 3
```

Chunking improves retrieval accuracy because the system searches smaller meaningful sections instead of entire documents.

---

## 3. Embeddings

Each chunk is converted into a numerical vector representation.

Example:

```
Text:

"Machine Learning is a subset of AI"


Embedding:

[0.234, -0.421, 0.765, ...]
```

These vectors capture semantic meaning.

---

## 4. ChromaDB Storage

The generated embeddings are stored in ChromaDB.

Example:

```
Vector Database

Vector              Source
--------------------------------
Embedding 1         notes.txt
Embedding 2         tutorial.md
Embedding 3         guide.pdf
```

The database is persistent, meaning embeddings do not need to be recreated every time.

---

## 5. Retrieval

When a user asks a question:

```
Question:

"What is AI?"
```

The retriever performs similarity search and finds the most relevant chunks.

Example:

```
Retrieved:

1. notes.txt
2. tutorial.md
3. guide.pdf
```

---

## 6. Context Injection

The retrieved chunks are inserted into the prompt:

```
Context:

Artificial Intelligence enables machines...

Question:

What is AI?
```

The LLM receives both the question and supporting information.

---

## 7. Response Generation

Groq LLM generates a response based on the retrieved context.

This reduces hallucination because the model answers using the provided documents.

---

# Top-K Retrieval Experiment

Top-K controls how many document chunks are retrieved.

Experiments were performed using different values.

## Top-K = 2

* Retrieves fewer chunks.
* More precise results.
* Less context.

## Top-K = 4

* Balanced retrieval.
* Good amount of context.
* Better overall performance.

## Top-K = 6

* Retrieves more information.
* May include less relevant chunks.

Final configuration:

```
TOP_K = 3
```

because it provides a balance between relevance and available context.

---

# Persistent ChromaDB Design

The application separates indexing and retrieval.

First execution:

```
Documents
   ↓
Chunks
   ↓
Embeddings
   ↓
ChromaDB
```

Future executions:

```
Existing ChromaDB
        ↓
Load Database
        ↓
Start Chatbot
```

This avoids unnecessary embedding generation.

---

# Example Questions

Try:

```
What is artificial intelligence?
```

```
Explain machine learning.
```

```
What is RAG?
```

```
How does ChromaDB store documents?
```

---

# Future Improvements

Possible extensions:

* Add web interface using React and Tailwind
* Add streaming responses
* Add conversation memory
* Support more document formats
* Add authentication
* Add LangSmith tracing and evaluation
* Deploy using Docker and cloud services

---

# Learning Outcomes

Through this project, the following RAG concepts were implemented:

:white_check_mark: Document Loading
:white_check_mark: Text Chunking
:white_check_mark: Embeddings
:white_check_mark: Vector Databases
:white_check_mark: ChromaDB
:white_check_mark: Similarity Search
:white_check_mark: Retrievers
:white_check_mark: Top-K Retrieval
:white_check_mark: Prompt Templates
:white_check_mark: Context Injection
:white_check_mark: LLM Integration
:white_check_mark: Complete RAG Workflow

---

# Author

Zarwan Zahid

RAG Document Indexing & Chatbot Project
