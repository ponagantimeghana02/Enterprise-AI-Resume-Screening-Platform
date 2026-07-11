from fastapi import APIRouter, UploadFile, File

from ai.rag import (
    save_file,
    extract_text,
    split_text,
    store_chunks,
    search
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    path = save_file(file)

    text = extract_text(path)

    chunks = split_text(text)

    store_chunks(
        chunks,
        file.filename
    )

    return {

        "message": "Document Uploaded Successfully",

        "filename": file.filename,

        "chunks": len(chunks)

    }


@router.get("/search")
def search_document(query: str):

    results = search(query)

    return results