from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from database.database import get_db
from database.models import Resume

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/")
def analytics(db: Session = Depends(get_db)):

    total_resumes = db.query(Resume).count()

    average_ats = db.query(
        func.avg(Resume.ats_score)
    ).scalar()

    average_match = db.query(
        func.avg(Resume.match_score)
    ).scalar()

    highest_ats = db.query(
        func.max(Resume.ats_score)
    ).scalar()

    highest_match = db.query(
        func.max(Resume.match_score)
    ).scalar()

    return {
        "total_resumes": total_resumes,
        "average_ats_score": round(average_ats or 0, 2),
        "average_match_score": round(average_match or 0, 2),
        "highest_ats_score": highest_ats or 0,
        "highest_match_score": highest_match or 0
    }