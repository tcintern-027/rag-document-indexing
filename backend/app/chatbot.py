import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from backend.app.prompt import create_rag_prompt
from backend.app.core.config import LLM_MODEL, GROQ_API_KEY

load_dotenv()


def create_llm():
    """
    Creates and returns the ChatGroq LLM instance.
    Preserves exact LLM creation logic using Groq API.
    """
    api_key = os.getenv("GROQ_API_KEY") or GROQ_API_KEY
    if not api_key:
        print("Warning: GROQ_API_KEY environment variable is not set!")

    llm = ChatGroq(
        model=LLM_MODEL,
        temperature=0,
        api_key=api_key
    )

    return llm


def generate_answer(question: str, documents):
    """
    Generates a grounded AI answer using retrieved documents context and Groq LLM.
    Preserves exact answer generation logic.
    """
    context = "\n\n".join(
        doc.page_content
        for doc in documents
    )

    prompt = create_rag_prompt()

    formatted_prompt = prompt.invoke(
        {
            "context": context,
            "question": question
        }
    )

    llm = create_llm()

    response = llm.invoke(
        formatted_prompt
    )

    return response.content
