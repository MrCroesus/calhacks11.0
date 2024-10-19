from fastapi import FastAPI
from dotenv import load_dotenv
import os

# Import functions from other files
from grab_repo import get_repository_data, process_data
from rate import check_rate_limit

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to the GitHub Repository Analyzer API"}

@app.get("/rate-limit")
async def rate_limit():
    return check_rate_limit()

@app.get("/repo/{owner}/{repo}")
async def get_repo_data(owner: str, repo: str):
    branches, commits = get_repository_data(owner, repo)
    processed_data = process_data(branches, commits)
    return processed_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)