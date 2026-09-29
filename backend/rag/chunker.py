def read_file(file_path: str) -> str:
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()

    except (UnicodeDecodeError, OSError):
        return ""


def chunk_code(
    content: str,
    file_path: str,
    chunk_size: int = 1500,
    overlap: int = 200
):
    chunks = []

    if not content.strip():
        return chunks

    start = 0

    while start < len(content):

        end = start + chunk_size

        chunk_content = content[start:end]

        chunks.append({
            "file": file_path,
            "content": chunk_content,
            "start_char": start,
            "end_char": min(end, len(content))
        })

        start += chunk_size - overlap

    return chunks