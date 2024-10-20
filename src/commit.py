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
        genai.configure(api_key=os.getenv("GEMINI_TOKEN"))
        self.gemini = genai.GenerativeModel("gemini-1.5-flash")

    def get_commit(self, hash: str):
        """Return the COMMIT associated to the SHA HASH: hash."""
        url = f"{self.API_BASE_URL}/repos/{self.owner}/{self.repo}/commits/{hash}"
        
        response = requests.get(url, headers=self.HEADERS)


        if response.status_code == 200:
            commit_data = response.json()
            code_changes = self.extract_code_changes(commit_data)
            code_description_response = self.gemini.generate_content(f"Given the following commit message and code changes please generate a description of the changes done in the commit: COMMIT MESSAGE: {commit_data['commit']['message']} CODE CHANGES: {code_changes}")

            code_changes_description = str(code_description_response.candidates[0].content.parts[0].text)

            return f"\"{commit_data['commit']['message']}\"\n" \
                   f"By {commit_data['commit']['author']['name']}\n" \
                   f"Committed on: {commit_data['commit']['author']['date']}\n" \
                   f"+ {commit_data['stats']['additions']} lines/ - {commit_data['stats']['deletions']} lines\n" \
                   f"Commit Hash: {commit_data['sha']}\n\n" \
                   f"Diff Analysis:\n{code_changes_description}"
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

    def create_pr(self, branch1: str, branch2: str):
        
        branch1_url = f"{self.API_BASE_URL}/repos/{self.owner}/{self.repo}/git/refs/heads/{branch1}"
        branch2_url = f"{self.API_BASE_URL}/repos/{self.owner}/{self.repo}/git/refs/heads/{branch2}"

        branch1_commit = requests.get(branch1_url, headers=self.HEADERS)
        branch2_commit = requests.get(branch2_url, headers=self.HEADERS)

        def get_commit_sha(commit):
            return commit.json()['object']['sha']
        
        hash1, hash2 = get_commit_sha(branch1_commit), get_commit_sha(branch2_commit)

        commit1, commit2 = self.get_commit(hash1), self.get_commit(hash2)

        code_description_response = self.gemini.generate_content(f"We are currently merging COMMIT1 into COMMIT2. Can you generate a description of this merge and the changes that we are merging together. This will serve as the body of a pull request and displayed to the user so keep in natural language. Here is COMMIT1: {commit1}. Here is COMMIT2: {commit2}.")

        code_changes_description = str(code_description_response.candidates[0].content.parts[0].text)

        code_title_response = self.gemini.generate_content(f"We are currently merging COMMIT1 into COMMIT2. Can you generate a title for the pull request of this merge. Please just return the title and nothing else. Here is COMMIT1: {commit1}. Here is COMMIT2: {commit2}.")

        code_title = str(code_title_response.candidates[0].content.parts[0].text)
        
        pr_data = {
            "title": code_title,
            "head": branch1,
            "base": branch2,
            "body": code_changes_description,
            "owner": 'OWNER',
            "repo": 'REPO',
        }

        pr_response = requests.post(f"{self.API_BASE_URL}/repos/{self.owner}/{self.repo}/pulls", headers=self.HEADERS, json=pr_data)

        return pr_response.text


# Usage example
commit = Commit("owner", "repo")
commit_info = commit.get_commit("commit_hash")
if "error" not in commit_info:
    analysis = commit.analyze_commit(commit_info)
    print(analysis)
else:
    print(commit_info["error"])