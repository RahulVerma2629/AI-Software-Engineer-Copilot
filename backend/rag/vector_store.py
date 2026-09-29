import faiss
import numpy as np


class VectorStore:

    def __init__(self, dimension: int):
        self.dimension = dimension

        # Inner product on normalized vectors = cosine similarity
        self.index = faiss.IndexFlatIP(dimension)

        self.chunks = []

    def add(self, embeddings, chunks):

        vectors = np.array(
            embeddings,
            dtype="float32"
        )

        self.index.add(vectors)

        self.chunks.extend(chunks)

    def search(self, query_embedding, top_k: int = 5):

        if not self.chunks:
            return []

        query_vector = np.array(
            [query_embedding],
            dtype="float32"
        )

        top_k = min(
            top_k,
            len(self.chunks)
        )

        scores, indices = self.index.search(
            query_vector,
            top_k
        )

        results = []

        for score, index in zip(
            scores[0],
            indices[0]
        ):
            results.append({
                "chunk": self.chunks[index],
                "score": float(score)
            })

        return results