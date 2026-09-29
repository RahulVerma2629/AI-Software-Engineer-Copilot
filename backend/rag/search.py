from rag.embeddings import create_embedding


def search_code(vector_store, query: str, top_k: int = 5):

    query_embedding = create_embedding(query)

    results = vector_store.search(
        query_embedding,
        top_k=top_k
    )

    return results