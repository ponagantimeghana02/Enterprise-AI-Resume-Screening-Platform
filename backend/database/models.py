from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func

from database.database import Base


# ===========================
# USERS
# ===========================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(150), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    role = Column(String(30), default="user")

    created_at = Column(DateTime(timezone=True), server_default=func.now())


# ===========================
# DOCUMENTS
# ===========================

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True)

    filename = Column(String(255))

    file_type = Column(String(20))

    file_path = Column(String(255))

    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())


# ===========================
# CHAT HISTORY
# ===========================

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True)

    question = Column(Text)

    answer = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())


# ===========================
# RESUME ANALYSIS
# ===========================

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    candidate_name = Column(String(100), nullable=False)

    email = Column(String(150))

    phone = Column(String(20))

    filename = Column(String(255))

    summary = Column(Text)

    # Store AI data as JSON
    skills = Column(JSON)

    experience = Column(JSON)
    
    job_description = Column(Text)

    education = Column(JSON)

    ats_score = Column(Integer)

    match_score = Column(Integer, default=0)

    strengths = Column(JSON)

    weaknesses = Column(JSON)

    interview_questions = Column(JSON)

    created_at = Column(DateTime(timezone=True), server_default=func.now())


# ===========================
# ANALYTICS
# ===========================

class Analytics(Base):
    __tablename__ = "analytics"

    id = Column(Integer, primary_key=True)

    api_name = Column(String(100))

    total_requests = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())