from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import Resume

router = APIRouter(
    prefix="/candidates",
    tags=["Candidates"]
)


@router.get("/")
def get_candidates(db: Session = Depends(get_db)):

    candidates = db.query(Resume).all()

    return candidates


@router.get("/{candidate_id}")
def get_candidate(candidate_id: int, db: Session = Depends(get_db)):

    candidate = db.query(Resume).filter(
        Resume.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    return candidate


@router.delete("/{candidate_id}")
def delete_candidate(candidate_id: int, db: Session = Depends(get_db)):

    candidate = db.query(Resume).filter(
        Resume.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    db.delete(candidate)

    db.commit()

    return {
        "message": "Candidate deleted successfully"
    }


@router.get("/ranking/list")
def candidate_ranking(db: Session = Depends(get_db)):

    ranking = db.query(Resume).order_by(
        Resume.match_score.desc(),
        Resume.ats_score.desc()
    ).all()

    return ranking