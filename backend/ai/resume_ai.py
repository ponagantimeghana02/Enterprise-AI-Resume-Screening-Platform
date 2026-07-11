import json
import re

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

from config import settings

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=settings.GROQ_API_KEY,
    temperature=0
)


def analyze_resume(text):

    prompt = ChatPromptTemplate.from_template("""
You are an HR recruiter.

Analyze the resume.

Return ONLY valid JSON.

{{
  "candidate_name":"",
  "email":"",
  "phone":"",
  "summary":"",
  "skills":[],
  "experience":"",
  "education":"",
  "ats_score":0,
  "strengths":[],
  "weaknesses":[],
  "interview_questions":[]
}}

Resume:
{text}
""")

    chain = prompt | llm

    response = chain.invoke({"text": text})

    content = response.content.strip()

    print("\nRAW RESPONSE\n")
    print(content)

    # Remove ```json
    content = re.sub(r"^```json\s*", "", content)

    # Remove starting ```
    content = re.sub(r"^```\s*", "", content)

    # Remove ending ```
    content = re.sub(r"\s*```$", "", content)

    content = content.strip()

    return json.loads(content)

def match_resume_with_jd(resume_text, job_description):

    prompt = ChatPromptTemplate.from_template("""
You are an experienced HR recruiter.

Compare the resume with the job description.

Return ONLY valid JSON.

{{
    "match_percentage":0,
    "matching_skills":[],
    "missing_skills":[],
    "skill_gap":"",
    "recommendation":""
}}

Resume:
{resume}

Job Description:
{jd}
""")

    chain = prompt | llm

    response = chain.invoke(
        {
            "resume": resume_text,
            "jd": job_description
        }
    )
    print(response.content)
    content = response.content.strip()

    content = re.sub(r"^```json\s*", "", content)
    content = re.sub(r"^```\s*", "", content)
    content = re.sub(r"\s*```$", "", content)

    content = content.strip()

    return json.loads(content)