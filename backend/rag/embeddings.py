
import os
import requests
from dotenv import load_dotenv

load_dotenv()

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

API_URL = (
    f"https://router.huggingface.co/hf-inference/models/"
    f"{MODEL_NAME}/pipeline/feature-extraction"
)

HF_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")

headers = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}


def create_embedding(text: str):
    """Generate text embeddings using the Hugging Face Inference API."""

    if not HF_TOKEN:
        raise ValueError("HUGGINGFACE_API_TOKEN is missing.")

    payload = {
        "inputs": text
    }

    try:
        response = requests.post(
            API_URL,
            headers=headers,
            json=payload,
            timeout=60
        )

        if response.status_code != 200:
            raise Exception(
                f"Hugging Face API Error "
                f"({response.status_code}): {response.text}"
            )

        result = response.json()

        if isinstance(result, list) and len(result) > 0:
            if isinstance(result[0], list):
                return result[0]
            return result

        raise ValueError(
            f"Unexpected embedding response: {result}"
        )

    except requests.exceptions.RequestException as error:
        raise Exception(
            f"Embedding request failed: {error}"
        ) from error
