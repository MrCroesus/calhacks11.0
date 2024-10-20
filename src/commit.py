import os
import requests
import google.generativeai as genai

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
        
        # Configure Gemini
        genai.configure(api_key=os.environ["GEMINI_TOKEN"])
        self.gemini = genai.GenerativeModel("gemini-1.5-flash")

    def get_commit(self, hash: str):
        """Return the COMMIT associated to the SHA HASH: hash."""
        url = f"{self.API_BASE_URL}/repos/{self.owner}/{self.repo}/commits/{hash}"
        
        response = requests.get(url, headers=self.HEADERS)


        if response.status_code == 200:
            commit_data = response.json()
            code_changes = self.extract_code_changes(commit_data)
            code_description_response = self.gemini.generate_content(f"Given the following commit message and code changes please generate a description of the changes done in the commit: COMMIT MESSAGE: {commit_data['commit']['message']} CODE CHANGES: {code_changes}")

            code_changes_description = str(code_description_response.candidates[0].content.parts[0])

            return {
                "sha": commit_data["sha"],
                "author": commit_data["commit"]["author"]["name"],
                "email": commit_data["commit"]["author"]["email"],
                "date": commit_data["commit"]["author"]["date"],
                "message": commit_data["commit"]["message"],
                "url": commit_data["html_url"],
                "code_changes": code_changes_description
            }
        return {"error": f"Failed to fetch commit info. Status code: {response.status_code}"}

    def extract_code_changes(self, commit_data):
        """Parse out the code changes done in the commit."""
        changes = []
        for file in commit_data.get('files', []):
            filename = file['filename']
            patch = file.get('patch', '')
            changes.append(f"File: {filename}\n{patch}\n")
        return "\n".join(changes)

    def analyze_commit(self, commit_info):
        """Analyze the commit using Gemini."""
        prompt = f"""Analyze the following commit:
        SHA: {commit_info['sha']}
        Author: {commit_info['author']}
        Date: {commit_info['date']}
        Message: {commit_info['message']}
        Code Changes:
        {commit_info['code_changes']}

        Provide a brief summary of the changes and their potential impact."""

        response = self.gemini.generate_content(prompt)
        return response.text

# Usage example
commit = Commit("owner", "repo")
commit_info = commit.get_commit("commit_hash")
if "error" not in commit_info:
    analysis = commit.analyze_commit(commit_info)
    print(analysis)
else:
    print(commit_info["error"])