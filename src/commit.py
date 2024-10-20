import os
import requests

class Commit:
    def __init__(self, owner: str, repo: str):
        self.owner = owner
        self.repo = repo
        _GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
        self.HEADERS = {
            "Authorization": f"token {_GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3+json"
        }
        self.API_BASE_URL = "https://api.github.com"


    def get_commit(self, hash: str):
        """Return the COMMIT associated to the SHA HASH: hash."""
        url = f"{self.API_BASE_URL}/repos/{self.owner}/{self.repo}/commits/{hash}"
        
        response = requests.get(url, headers=self.HEADERS)

        def extract_code_changes(commit_data):
            """Parse out the code changes done in the commit."""
            changes = []
            for file in commit_data.get('files', []):
                filename = file['filename']
                patch = file.get('patch', '')
                changes.append(f"File: {filename}\n{patch}\n")
            return "\n".join(changes)

        if response.status_code == 200:
            commit_data = response.json()
            code_changes = extract_code_changes(commit_data)
            return {
                "sha": commit_data["sha"],
                "author": commit_data["commit"]["author"]["name"],
                "email": commit_data["commit"]["author"]["email"],
                "date": commit_data["commit"]["author"]["date"],
                "message": commit_data["commit"]["message"],
                "url": commit_data["html_url"],
                "code_changes": code_changes
            }
        return {"error": f"Failed to fetch commit info. Status code: {response.status_code}"}