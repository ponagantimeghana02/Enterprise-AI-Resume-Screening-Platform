from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.documents import router as document_router
from api.candidates import router as candidate_router

from config import settings
from database.database import Base, engine
from api.auth import router as auth_router
from api.chat import router as chat_router
from api.resume import router as resume_router
from api.dashboard import router as dashboard_router
from api.ranking import router as ranking_router
from api.analytics import router as analytics_router
from api.admin import router as admin_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Enterprise AI Workspace",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(document_router)
app.include_router(chat_router)
app.include_router(resume_router)
app.include_router(candidate_router)
app.include_router(dashboard_router)
app.include_router(ranking_router)
app.include_router(analytics_router)
app.include_router(admin_router)


@app.get("/")
def home():
    return {
        "message": "Enterprise AI Workspace API"
    }


@app.get("/health")
def health():
    return {
        "status": "Running"
    }