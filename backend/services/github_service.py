import shutil
import tempfile

from git import Repo


def clone_repository(repo_url: str):

    temp_dir = tempfile.mkdtemp(
        prefix="codepilot_"
    )

    try:

        Repo.clone_from(
            repo_url,
            temp_dir
        )

        return {
            "success": True,
            "path": temp_dir,
            "message": "Repository cloned successfully"
        }

    except Exception as e:

        shutil.rmtree(
            temp_dir,
            ignore_errors=True
        )

        return {
            "success": False,
            "path": None,
            "message": f"Failed to clone repository: {str(e)}"
        }