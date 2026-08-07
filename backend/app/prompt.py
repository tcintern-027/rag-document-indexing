from langchain_core.prompts import ChatPromptTemplate


def create_rag_prompt():
    """
    Creates and returns the RAG prompt template enforcing strict grounded answer generation.
    Preserves exact prompt template from original implementation.
    """
    prompt = ChatPromptTemplate.from_template(
        """
You are a helpful AI assistant. 
Answer the question using only the provided context.

If the answer is not available in the context, say:
"I don't have enough information from the provided documents."

Context:
{context}


Question:
{question}


Answer:
"""
    )

    return prompt
