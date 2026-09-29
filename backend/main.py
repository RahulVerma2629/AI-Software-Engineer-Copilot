from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.repository import router as repository_router


app = FastAPI(
    title="CodePilot API",
    description="AI-powered Software Engineering Assistant",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(repository_router)


@app.get("/")
def root():
    return {
        "message": "CodePilot Backend is running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "codepilot-backend"
    }