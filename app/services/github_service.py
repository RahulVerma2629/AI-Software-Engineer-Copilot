import os
import shutil
from pathlib import Path
from git import Repo

SUPPORTED = {
    ".py",".js",".jsx",".ts",".tsx",
    ".java",".cpp",".c",".cs",
    ".go",".php",".html",".css",
    ".json",".md"
}

REPO_FOLDER = "repositories"

def clone_repository(url):

    os.makedirs(REPO_FOLDER, exist_ok=True)

    repo = url.split("/")[-1].replace(".git","")

    destination = os.path.join(REPO_FOLDER,repo)

    if os.path.exists(destination):
        return destination

    Repo.clone_from(url,destination)

    return destination


def analyze_repository(path):

    files=0
    lines=0
    languages=set()

    for root,dirs,file_list in os.walk(path):

        dirs[:]=[
            d for d in dirs
            if d not in [".git","node_modules","venv","__pycache__"]
        ]

        for file in file_list:

            ext=Path(file).suffix.lower()

            if ext not in SUPPORTED:
                continue

            files+=1
            languages.add(ext)

            fp=os.path.join(root,file)

            try:
                with open(fp,"r",encoding="utf-8",errors="ignore") as f:
                    lines+=len(f.readlines())
            except:
                pass

    return {
        "files":files,
        "lines":lines,
        "languages":sorted(list(languages))
    }