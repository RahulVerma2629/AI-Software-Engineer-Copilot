import os
import requests
from dotenv import load_dotenv

load_dotenv()

MODEL_NAME = "all-MiniLM-L6-v2"
API_URL = f"https://huggingface.co{MODEL_NAME}"
HF_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")
headers = {"Authorization": f"Bearer {HF_TOKEN}"}

def create_embedding(text: str):
    """Fetches vector embeddings from Hugging Face Cloud API instead of local RAM"""
    payload = {"inputs": [text]}
    response = requests.post(API_URL, headers=headers, json=payload)
    
    if response.status_code == 200:
        result = response.json()
        # The API returns a nested list [[0.1, 0.2, ...]], so we extract the first item
        if isinstance(result, list) and len(result) > 0:
            return result[0] if isinstance(result[0], list) else result
        return result
    else:
        raise Exception(f"Hugging Face API Error: {response.text}")
