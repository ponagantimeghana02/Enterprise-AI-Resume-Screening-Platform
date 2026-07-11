import json

from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session

from ai.rag import save_file, extract_text
from ai.resume_ai import analyze_resume, match_resume_with_jd

from database.database import get_db
from database.models import Resume

router = APIRouter(
    prefix="/resume",
    tags=["Resume AI"]
)


@router.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    path = save_file(file)

    text = extract_text(path)

    result = analyze_resume(text)

    candidate = Resume(
    candidate_name=result.get("candidate_name", ""),
    email=result.get("email", ""),
    phone=result.get("phone", ""),
    filename=file.filename,
    summary=result.get("summary", ""),
    skills=result.get("skills", []),
    experience=result.get("experience", []),
    education=result.get("education", {}),
    ats_score=result.get("ats_score", 0),
    match_score=0,
    strengths=result.get("strengths", []),
    weaknesses=result.get("weaknesses", []),
    interview_questions=result.get("interview_questions", [])
)

    db.add(candidate)

    db.commit()

    db.refresh(candidate)

    return {

        "message": "Resume analyzed successfully",

        "candidate": candidate

    }


@router.post("/match/{candidate_id}")
async def match_resume(

    candidate_id: int,

    job_description: str = Form(...),

    db: Session = Depends(get_db)

):

    # Find candidate
    candidate = db.query(Resume).filter(
        Resume.id == candidate_id
    ).first()

    if candidate is None:
        return {
            "message": "Candidate not found"
        }

    # Build resume text from database
    resume_text = f"""
Candidate Name: {candidate.candidate_name}

Summary:
{candidate.summary}

Skills:
{candidate.skills}

Experience:
{candidate.experience}

Education:
{candidate.education}
"""

    # AI Matching
    result = match_resume_with_jd(
        resume_text,
        job_description
    )

    print(result)

    # Save into database
    candidate.job_description = job_description

    candidate.match_score = result.get(
        "match_percentage",
        0
    )

    db.commit()

    db.refresh(candidate)

    return {

        "message": "Resume matched successfully",

        "candidate_name": candidate.candidate_name,

        "match_percentage": result.get(
            "match_percentage",
            0
        ),

        "matching_skills": result.get(
            "matching_skills",
            []
        ),

        "missing_skills": result.get(
            "missing_skills",
            []
        ),

        "skill_gap": result.get(
            "skill_gap",
            ""
        ),

        "recommendation": result.get(
            "recommendation",
            ""
        )
    }