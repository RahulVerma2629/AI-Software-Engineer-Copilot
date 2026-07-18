from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    question: str

@router.post("/")
def chat(request: ChatRequest):

    question = request.question.lower()

    if "authentication" in question or "jwt" in question:
        answer = "Authentication is implemented using JWT middleware. Protected routes validate tokens before processing requests."
        files = [
            "middleware/auth.py",
            "routes/auth.py"
        ]

    elif "database" in question:
        answer = "The application uses a relational database for storing users, repositories and metadata."
        files = [
            "database/schema.py"
        ]

    elif "api" in question:
        answer = "The backend exposes REST APIs for repository analysis and AI chat."
        files = [
            "repository.py",
            "chat.py"
        ]

    else:
        answer = "Repository indexed successfully. RAG pipeline will retrieve relevant code chunks here."
        files = []

    return {
        "question": request.question,
        "answer": answer,
        "referenced_files": files
    }