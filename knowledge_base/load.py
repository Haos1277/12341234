"""
Script to load documents into the ChromaDB knowledge base.

Usage:
    python knowledge_base/load.py --file path/to/book.pdf
    python knowledge_base/load.py --file path/to/article.txt
    python knowledge_base/load.py --dir path/to/folder/
"""
import argparse
import hashlib
import os
import sys
from pathlib import Path

import chromadb
from chromadb.config import Settings as ChromaSettings

CHUNK_SIZE = 500  # characters
CHUNK_OVERLAP = 50


def chunk_text(text: str, size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = start + size
        chunks.append(text[start:end])
        start += size - overlap
    return [c.strip() for c in chunks if c.strip()]


def load_txt(path: str) -> str:
    with open(path, encoding="utf-8") as f:
        return f.read()


def load_pdf(path: str) -> str:
    try:
        import fitz  # PyMuPDF
    except ImportError:
        print("Install PyMuPDF: pip install pymupdf")
        sys.exit(1)

    doc = fitz.open(path)
    return "\n".join(page.get_text() for page in doc)


def load_file(path: str) -> str:
    ext = Path(path).suffix.lower()
    if ext == ".pdf":
        return load_pdf(path)
    elif ext in (".txt", ".md"):
        return load_txt(path)
    else:
        print(f"Unsupported format: {ext}. Use .pdf, .txt, or .md")
        sys.exit(1)


def doc_id(text: str, index: int) -> str:
    h = hashlib.md5(text.encode()).hexdigest()[:8]
    return f"{h}_{index}"


def main():
    parser = argparse.ArgumentParser(description="Load documents into knowledge base")
    parser.add_argument("--file", help="Path to a single file (.pdf/.txt/.md)")
    parser.add_argument("--dir", help="Path to a directory of files")
    args = parser.parse_args()

    client = chromadb.PersistentClient(
        path="./chroma_data",
        settings=ChromaSettings(anonymized_telemetry=False),
    )
    collection = client.get_or_create_collection("psychology_kb")

    files = []
    if args.file:
        files = [args.file]
    elif args.dir:
        for root, _, filenames in os.walk(args.dir):
            for fn in filenames:
                if fn.lower().endswith((".pdf", ".txt", ".md")):
                    files.append(os.path.join(root, fn))
    else:
        parser.print_help()
        sys.exit(1)

    total_chunks = 0
    for filepath in files:
        print(f"Loading: {filepath}")
        text = load_file(filepath)
        chunks = chunk_text(text)
        ids = [doc_id(chunk, i) for i, chunk in enumerate(chunks)]
        metadatas = [{"source": filepath} for _ in chunks]

        # Add in batches of 100
        for i in range(0, len(chunks), 100):
            collection.upsert(
                documents=chunks[i:i+100],
                ids=ids[i:i+100],
                metadatas=metadatas[i:i+100],
            )

        print(f"  → {len(chunks)} chunks loaded")
        total_chunks += len(chunks)

    print(f"\nDone. Total chunks in KB: {collection.count()}")


if __name__ == "__main__":
    main()
