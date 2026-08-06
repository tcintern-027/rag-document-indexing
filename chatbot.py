import os

from dotenv import load_dotenv

from langchain_groq import ChatGroq

from prompt import create_rag_prompt


load_dotenv()


def create_llm():

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0,
        api_key=os.getenv("GROQ_API_KEY")
    )

    return llm



def generate_answer(question, documents):

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