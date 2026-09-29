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
    allow_origins=["*"],
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

if __name__ == "__main__":
    import uvicorn
    import os
    # Render automatically provides a PORT environment variable
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
