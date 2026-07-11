from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from database.database import get_db
from database.models import Resume


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


# ============================
# Dashboard Statistics
# ============================

@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):

    # Total candidates
    total_candidates = db.query(
        Resume
    ).count()


    # Average ATS Score
    average_score = db.query(
        func.avg(Resume.ats_score)
    ).scalar()


    if average_score:
        average_score = round(
            average_score,
            2
        )
    else:
        average_score = 0



    # Top candidate
    top_candidate = db.query(
        Resume
    ).order_by(
        desc(Resume.ats_score)
    ).first()



    if top_candidate:

        top_candidate_data = {
            "id": top_candidate.id,
            "name": top_candidate.candidate_name,
            "ats_score": top_candidate.ats_score
        }

    else:

        top_candidate_data = None



    # Recent candidates

    recent_candidates = db.query(
        Resume
    ).order_by(
        desc(Resume.created_at)
    ).limit(5).all()



    recent_data = []

    for candidate in recent_candidates:

        recent_data.append(
            {
                "id": candidate.id,
                "name": candidate.candidate_name,
                "email": candidate.email,
                "ats_score": candidate.ats_score,
                "uploaded_at": candidate.created_at
            }
        )


    return {

        "total_candidates": total_candidates,

        "average_ats_score": average_score,

        "top_candidate": top_candidate_data,

        "recent_candidates": recent_data

    }