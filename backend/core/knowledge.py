"""
RAG knowledge base using ChromaDB.
Run `python knowledge_base/load.py --file <path>` to load documents.
"""
from typing import Optional

try:
    import chromadb
    from chromadb.config import Settings as ChromaSettings

    _chroma_client = chromadb.PersistentClient(
        path="./chroma_data",
        settings=ChromaSettings(anonymized_telemetry=False),
    )
    _collection = _chroma_client.get_or_create_collection("psychology_kb")
    CHROMA_AVAILABLE = True
except Exception:
    CHROMA_AVAILABLE = False
    _collection = None


async def search_knowledge(query: str, n_results: int = 3) -> Optional[str]:
    """Return top relevant chunks for the query, or None if KB is empty."""
    if not CHROMA_AVAILABLE or _collection is None:
        return None

    count = _collection.count()
    if count == 0:
        return None

    results = _collection.query(
        query_texts=[query],
        n_results=min(n_results, count),
    )
    docs = results.get("documents", [[]])[0]
    if not docs:
        return None

    return "\n---\n".join(docs)
