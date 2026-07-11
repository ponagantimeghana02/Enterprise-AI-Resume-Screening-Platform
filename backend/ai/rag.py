import os
import chromadb
from docx import Document
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter

from config import settings


# Load embedding model only once
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# ChromaDB
client = chromadb.PersistentClient(path=settings.CHROMA_DB_PATH)

collection = client.get_or_create_collection(
    name="knowledge_base"
)


def save_file(file):

    os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)

    file_path = os.path.join(
        settings.UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    return file_path


def extract_text(file_path):

    if file_path.endswith(".pdf"):

        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        return text

    elif file_path.endswith(".docx"):

        doc = Document(file_path)

        return "\n".join(
            p.text
            for p in doc.paragraphs
        )

    else:

        raise Exception("Unsupported File")


def split_text(text):

    splitter = RecursiveCharacterTextSplitter(

        chunk_size=500,

        chunk_overlap=100

    )

    return splitter.split_text(text)


def store_chunks(chunks, filename):

    for index, chunk in enumerate(chunks):

        embedding = embedding_model.encode(chunk).tolist()

        collection.add(

            ids=[f"{filename}_{index}"],

            documents=[chunk],

            embeddings=[embedding],

            metadatas=[
                {
                    "source": filename
                }
            ]
        )


def search(query):
    embedding = embedding_model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[embedding],
        n_results=5
    )

    response = []

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]

    for i in range(len(documents)):
        response.append({
            "document": documents[i],
            "source": metadatas[i]["source"],
            "distance": round(distances[i], 4)
        })

    return response