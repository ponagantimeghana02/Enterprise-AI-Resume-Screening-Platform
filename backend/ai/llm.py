from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

from config import settings
from ai.rag import search

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=settings.GROQ_API_KEY,
    temperature=0
)


def ask_ai(question: str):

    results = search(question)

    documents = results["documents"][0]

    context = "\n\n".join(documents)

    prompt = ChatPromptTemplate.from_template(
        """
You are an Enterprise AI Assistant.

Answer ONLY using the provided context.

If the answer is not available in the context,
reply with:

"I couldn't find that information in the uploaded documents."

Context:
{context}

Question:
{question}
"""
    )

    chain = prompt | llm

    response = chain.invoke(
        {
            "context": context,
            "question": question
        }
    )

    return {
        "answer": response.content,
        "sources": results["metadatas"][0]
    }