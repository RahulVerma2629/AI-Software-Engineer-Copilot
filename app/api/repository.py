from fastapi import APIRouter
from pydantic import BaseModel
from app.services.github_service import clone_repository, analyze_repository

router = APIRouter(prefix="/repository", tags=["Repository"])

class RepoRequest(BaseModel):
    github_url: str

@router.post("/analyze")
def analyze(request: RepoRequest):

    repo_path = clone_repository(request.github_url)

    analysis = analyze_repository(repo_path)

    return {
        "status": "success",
        "repository_name": request.github_url.split("/")[-1],
        "analysis": analysis
    }