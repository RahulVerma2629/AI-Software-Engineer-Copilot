import os


IGNORED_DIRECTORIES = {
    ".git",
    "node_modules",
    "__pycache__",
    "dist",
    "build",
    ".next",
    "venv",
    ".venv",
    ".idea",
    ".vscode"
}


IGNORED_FILES = {
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "composer.lock",
    "poetry.lock",
    "Pipfile.lock"
}


CODE_EXTENSIONS = {
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".java",
    ".cpp",
    ".c",
    ".h",
    ".hpp",
    ".cs",
    ".go",
    ".rs",
    ".php",
    ".rb",
    ".swift",
    ".kt",
    ".html",
    ".css",
    ".scss",
    ".json",
    ".sql"
}


def load_code_files(repo_path: str):

    files = []

    for root, directories, filenames in os.walk(repo_path):

        directories[:] = [
            directory
            for directory in directories
            if directory not in IGNORED_DIRECTORIES
        ]

        for filename in filenames:

            if filename in IGNORED_FILES:
                continue

            extension = os.path.splitext(filename)[1].lower()

            if extension in CODE_EXTENSIONS:

                file_path = os.path.join(root, filename)

                files.append(file_path)

    return files