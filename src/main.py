import json
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from dotenv import load_dotenv
import os


# #TODO:
from grab_repo import get_repository_data, process_data
from rate import check_rate_limit
from tree_vis import process_repo_data

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Github API Procesing"}

@app.get("/rate-limit")
async def rate_limit():
    return check_rate_limit()

@app.get("/repo/{owner}/{repo}")
async def get_repo_data(owner: str, repo: str):
    branches, commits = get_repository_data(owner, repo)
    processed_data = process_data(branches, commits)
    tree_data = process_repo_data(processed_data)
    os.makedirs('repo_data', exist_ok=True)
    
    # Save the data to a JSON file
    filename = f"repo_data/{owner}_{repo}_data.json"
    with open(filename, 'w') as f:
        json.dump(tree_data, f, indent=2)
    
    # Print the formatted JSON to the terminal
    print(json.dumps(tree_data, indent=2))
    
    content = jsonable_encoder(tree_data)
    return JSONResponse(
        content=content, 
        headers={
            "Content-Type": "application/json",
            "X-JSON-File": filename
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)