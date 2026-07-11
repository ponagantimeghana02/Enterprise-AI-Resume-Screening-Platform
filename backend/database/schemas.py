from pydantic import BaseModel



class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class Login(BaseModel):
    email: str
    password: str



class ChatRequest(BaseModel):
    question: str



class DocumentResponse(BaseModel):
    id: int
    filename: str

    class Config:
        from_attributes = True



class ResumeResponse(BaseModel):
    candidate_name: str
    ats_score: int
    summary: str



class DashboardResponse(BaseModel):
    users: int
    documents: int
    resumes: int
    chats: int

class CandidateResponse(BaseModel):
    id: int
    candidate_name: str
    email: str | None = None
    ats_score: int
    match_score: int

    class Config:
        from_attributes = True


class CandidateDetails(BaseModel):
    id: int
    candidate_name: str
    email: str | None = None
    phone: str | None = None
    summary: str
    skills: str
    experience: str
    education: str
    ats_score: int
    match_score: int
    strengths: str
    weaknesses: str
    interview_questions: str

    class Config:
        from_attributes = True