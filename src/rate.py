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

def check_rate_limit():
    rate_limit_url = f"{API_BASE_URL}/rate_limit"
    response = requests.get(rate_limit_url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        core_limit = data['resources']['core']
        print(f"API Rate Limit:")
        print(f"  Limit: {core_limit['limit']}")
        print(f"  Remaining: {core_limit['remaining']}")
        print(f"  Reset Time: {datetime.fromtimestamp(core_limit['reset'], timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}")
    else:
        print(f"Failed to fetch rate limit info: {response.status_code} - {response.text}")

if __name__ == "__main__":
    check_rate_limit()