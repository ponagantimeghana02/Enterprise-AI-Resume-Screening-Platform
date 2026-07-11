from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import ChatHistory

router = APIRouter(
    prefix="/chat",
    tags=["Chat History"]
)


class ChatRequest(BaseModel):
    question: str
    answer: str


# Save chat
@router.post("/")
def save_chat(
    chat: ChatRequest,
    db: Session = Depends(get_db)
):

    new_chat = ChatHistory(
        question=chat.question,
        answer=chat.answer
    )

    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    return {
        "message": "Chat saved successfully",
        "chat": new_chat
    }


# Get all chats
@router.get("/")
def get_chat_history(
    db: Session = Depends(get_db)
):

    chats = (
        db.query(ChatHistory)
        .order_by(ChatHistory.created_at.desc())
        .all()
    )

    return chats


# Delete all chats
@router.delete("/")
def delete_chat_history(
    db: Session = Depends(get_db)
):

    db.query(ChatHistory).delete()

    db.commit()

    return {
        "message": "All chat history deleted successfully"
    }