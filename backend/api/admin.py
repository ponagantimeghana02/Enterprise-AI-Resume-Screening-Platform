from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User, Resume, Document

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


# Total Users
@router.get("/users")
def get_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    return users


# Total Resumes
@router.get("/resumes")
def get_resumes(db: Session = Depends(get_db)):

    resumes = db.query(Resume).all()

    return resumes


# Uploaded Documents
@router.get("/documents")
def get_documents(db: Session = Depends(get_db)):

    documents = db.query(Document).all()

    return documents


# Delete Resume
@router.delete("/resume/{resume_id}")
def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.id == resume_id
    ).first()

    if not resume:
        return {
            "message": "Resume not found"
        }

    db.delete(resume)

    db.commit()

    return {
        "message": "Resume deleted successfully"
    }


# Delete User
@router.delete("/user/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    db.delete(user)

    db.commit()

    return {
        "message": "User deleted successfully"
    }