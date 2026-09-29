import os
import uuid

from urllib.parse import urlparse

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from services.github_service import clone_repository
from services.llm_service import generate_answer

from rag.loader import load_code_files
from rag.chunker import read_file, chunk_code
from rag.embeddings import create_embedding
from rag.vector_store import VectorStore
from rag.search import search_code


router = APIRouter(
    prefix="/api/repository",
    tags=["Repository"]
)


# In-memory repository registry
repositories = {}


class RepositoryRequest(BaseModel):
    repo_url: str = Field(
        min_length=1,
        description="Public GitHub repository URL"
    )


class AskRequest(BaseModel):
    repo_id: str = Field(
        min_length=1,
        description="Repository ID returned by the analyze endpoint"
    )

    question: str = Field(
        min_length=2,
        description="Question about the repository"
    )

    top_k: int = Field(
        default=5,
        ge=1,
        le=10,
        description="Number of code chunks to retrieve"
    )


@router.post("/analyze")
def analyze_repository(request: RepositoryRequest):

    parsed_url = urlparse(request.repo_url)

    if parsed_url.scheme not in {"http", "https"}:
        raise HTTPException(
            status_code=400,
            detail="Repository URL must use http or https"
        )

    if parsed_url.netloc.lower() != "github.com":
        raise HTTPException(
            status_code=400,
            detail="Only GitHub repositories are currently supported"
        )

    result = clone_repository(request.repo_url)

    if not result["success"]:
        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )

    code_files = load_code_files(result["path"])

    all_chunks = []

    for file_path in code_files:

        content = read_file(file_path)

        chunks = chunk_code(
            content,
            file_path
        )

        for chunk in chunks:
            chunk["file"] = os.path.relpath(
                chunk["file"],
                result["path"]
            )

        all_chunks.extend(chunks)

    if not all_chunks:
        raise HTTPException(
            status_code=400,
            detail="No supported source files found in repository"
        )

    embeddings = [
        create_embedding(chunk["content"])
        for chunk in all_chunks
    ]

    vector_store = VectorStore(
        dimension=len(embeddings[0])
    )

    vector_store.add(
        embeddings,
        all_chunks
    )

    repo_id = str(uuid.uuid4())

    repositories[repo_id] = {
        "repo_url": request.repo_url,
        "path": result["path"],
        "vector_store": vector_store,
        "total_files": len(code_files),
        "total_chunks": len(all_chunks)
    }

    return {
        "message": "Repository indexed successfully 🚀",
        "repo_id": repo_id,
        "repo_url": request.repo_url,
        "total_files": len(code_files),
        "total_chunks": len(all_chunks),
        "embedding_dimension": len(embeddings[0]),
        "vector_count": len(all_chunks)
    }


@router.post("/ask")
def ask_repository(request: AskRequest):

    repository = repositories.get(request.repo_id)

    if repository is None:
        raise HTTPException(
            status_code=404,
            detail="Repository not found. Analyze the repository first."
        )

    vector_store = repository["vector_store"]

    results = search_code(
        vector_store,
        request.question,
        request.top_k
    )

    if not results:
        raise HTTPException(
            status_code=404,
            detail="No relevant code found"
        )

    context_parts = []

    for result in results:

        chunk = result["chunk"]

        context_parts.append(
            f"FILE: {chunk['file']}\n"
            f"CODE:\n{chunk['content']}"
        )

    context = "\n\n---\n\n".join(context_parts)

    answer = generate_answer(
        request.question,
        context
    )

    return {
        "repo_id": request.repo_id,
        "question": request.question,
        "answer": answer,
        "sources": [
            {
                "file": result["chunk"]["file"],
                "score": result["score"],
                "snippet": result["chunk"]["content"]
            }
            for result in results
        ]
    }

@router.get("/{repo_id}")
def get_repository(repo_id: str):

    repository = repositories.get(repo_id)

    if repository is None:
        raise HTTPException(
            status_code=404,
            detail="Repository not found"
        )

    return {
        "repo_id": repo_id,
        "repo_url": repository["repo_url"],
        "total_files": repository["total_files"],
        "total_chunks": repository["total_chunks"],
        "embedding_dimension": repository["vector_store"].dimension,
        "status": "ready"
    }