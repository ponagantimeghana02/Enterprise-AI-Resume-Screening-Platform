from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc

from database.database import get_db
from database.models import Resume

router = APIRouter(
    prefix="/ranking",
    tags=["Candidate Ranking"]
)


@router.get("/")
def candidate_ranking(db: Session = Depends(get_db)):

    candidates = (
        db.query(Resume)
        .order_by(
            desc(Resume.match_score),
            desc(Resume.ats_score)
        )
        .all()
    )

    ranking = []

    for index, candidate in enumerate(candidates, start=1):

        ranking.append(
            {
                "rank": index,
                "candidate_id": candidate.id,
                "candidate_name": candidate.candidate_name,
                "email": candidate.email,
                "ats_score": candidate.ats_score,
                "match_score": candidate.match_score
            }
        )

    return {
        "total_candidates": len(ranking),
        "ranking": ranking
    }