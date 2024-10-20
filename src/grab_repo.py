import os
from dotenv import load_dotenv
import requests
from datetime import datetime, timezone
from pprint import pformat, pprint
from collections import defaultdict

# Load .env from the parent directory
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}
API_BASE_URL = "https://api.github.com"


def get_repository_data(owner, repo):
    branches_url = f"{API_BASE_URL}/repos/{owner}/{repo}/branches"
    branches_response = requests.get(branches_url, headers=headers)
    branches = branches_response.json()

    all_commits = []
    for branch in branches:
        branch_name = branch['name']
        commits_url = f"{API_BASE_URL}/repos/{owner}/{repo}/commits"
        params = {"sha": branch_name, "per_page": 100}  # Limit to 100 commits per branch
        commits_response = requests.get(commits_url, headers=headers, params=params)
        branch_commits = commits_response.json()
        for commit in branch_commits:
            commit['branch'] = branch_name
        all_commits.extend(branch_commits)

    return branches, all_commits

def process_data(branches, all_commits):
    processed_data = {
        "branches": [],
        "commits": [],
        "relationships": []
    }

    commit_to_branch = {}
    commit_data = {}

    # Process branches
    for branch in branches:
        processed_data["branches"].append({
            "name": branch['name'],
            "sha": branch['commit']['sha']
        })

    # First pass: associate commits with branches
    for commit in all_commits:
        sha = commit['sha']
        if sha not in commit_to_branch:
            commit_to_branch[sha] = commit['branch']
        
        if sha not in commit_data:
            commit_data[sha] = {
                "sha": sha,
                "message": commit['commit']['message'],
                "author": commit['commit']['author']['name'],
                "date": commit['commit']['author']['date'],
                "parents": [parent['sha'] for parent in commit['parents']],
                "branch": commit['branch']
            }

    # Second pass: handle merge commits
    for sha, data in commit_data.items():
        if len(data['parents']) > 1:  # This is a merge commit
            data['branch'] = commit_to_branch[sha]  # Use the branch it's being merged into

    # Populate processed_data
    for sha, data in commit_data.items():
        processed_data["commits"].append(data)
        for parent_sha in data['parents']:
            processed_data["relationships"].append({
                "from": sha,
                "to": parent_sha
            })

    return processed_data

def main(owner, repo):
    branches, all_commits = get_repository_data(owner, repo)
    processed_data = process_data(branches, all_commits)
    return processed_data

# temp repo for test #TODO: GENERALIZE FOR FASTAPI
if __name__ == "__main__":
    owner = "rovirmani"
    repo = "currgoatify"
    result = main(owner, repo)
    pprint(result)
