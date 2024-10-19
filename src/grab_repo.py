#TODO: FASTAPI or some other flask for requests type shi 

import os
from dotenv import load_dotenv
import requests
from datetime import datetime, timezone

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

    # 
    branches_url = f"{API_BASE_URL}/repos/{owner}/{repo}/branches"
    branches_response = requests.get(branches_url, headers=headers)
    branches = branches_response.json()

    # limit 100 commits for now since we are limited to 5k req per 20 minute?
    commits_url = f"{API_BASE_URL}/repos/{owner}/{repo}/commits"
    commits_response = requests.get(commits_url, headers=headers, params={"per_page": 100})
    commits = commits_response.json()

    return branches, commits

def process_data(branches, commits):

    processed_data = {
        "branches": [],
        "commits": [],
        "relationships": []
    }

    # process branches with commits and hashes
    if isinstance(branches, list):
        for branch in branches:
            processed_data["branches"].append({
                "name": branch["name"],
                "sha": branch["commit"]["sha"]
            })
    elif isinstance(branches, dict) and 'message' in branches:
        print(f"Error fetching branches: {branches['message']}")
    else:
        print(f"Unexpected branches data format: {branches}")

    # process commits with metadata
    if isinstance(commits, list):
        for commit in commits:
            processed_data["commits"].append({
                "sha": commit["sha"],
                "message": commit["commit"]["message"],
                "author": commit["commit"]["author"]["name"],
                "date": commit["commit"]["author"]["date"],
                "parents": [parent["sha"] for parent in commit["parents"]]
            })

            #create relationships 
            for parent_sha in commit["parents"]:
                processed_data["relationships"].append({
                    "from": commit["sha"],
                    "to": parent_sha["sha"]
                })
    elif isinstance(commits, dict) and 'message' in commits:
        print(f"Error fetching commits: {commits['message']}")
    else:
        print(f"Unexpected commits data format: {commits}")

    return processed_data

def main(owner, repo):
    branches, commits = get_repository_data(owner, repo)
    processed_data = process_data(branches, commits)
    return processed_data

# temp repo for test. #TODO: FASTAPI shi for easy requests
if __name__ == "__main__":
    owner = "rovirmani"
    repo = "currgoatify"
    result = main(owner, repo)
    print(result)
