# Enterprise-AI-Resume-Screening-Platform
Enterprise AI Resume Screening Platform
# Enterprise AI Resume Screening Platform

## Overview

Enterprise AI Resume Screening Platform is an AI-powered HR application that automates resume screening, candidate analysis, semantic search, and job description matching. It helps recruiters quickly identify the most suitable candidates using Large Language Models (LLMs) and vector search.

---

## Features

* User Registration & Login (JWT Authentication)
* Resume Upload (PDF/DOCX)
* AI Resume Analysis using Groq LLM
* Candidate Summary Generation
* Skill, Experience, and Education Extraction
* ATS Score Generation
* Resume vs Job Description Matching
* Skill Gap Analysis
* Interview Question Generation
* Semantic Resume Search using ChromaDB
* Candidate Ranking
* Dashboard & Analytics
* Chat History
* Admin Dashboard
* PostgreSQL Database Integration

---

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Axios
* React Router

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication

### AI & Vector Database

* LangChain
* Groq (Llama 3.3 70B Versatile)
* Sentence Transformers
* ChromaDB

### Tools

* Docker (Planned)
* Git & GitHub

---

## Project Structure

```text
frontend/
backend/
```

---

## Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## API Modules

* Authentication
* Resume Analysis
* Candidate Management
* Dashboard
* Analytics
* Document Search
* Chat History
* Admin

---

## AI Workflow

1. Upload Resume
2. Extract Resume Text
3. Generate Embeddings
4. Store Embeddings in ChromaDB
5. Analyze Resume using Groq LLM
6. Store Candidate Data in PostgreSQL
7. Perform Semantic Search
8. Match Resume with Job Description
9. Generate ATS Score and Interview Questions

---

## Future Enhancements

* Docker Deployment
* Role-Based Access Control
* Email Notifications
* Pagination & Filtering
* Export Reports (PDF/Excel)
* Cloud Deployment (Render/Vercel/AWS)

---

## Author

**Meghana Ponaganti**

AI Full Stack Developer | React | FastAPI | PostgreSQL | LangChain | Groq | ChromaDB
