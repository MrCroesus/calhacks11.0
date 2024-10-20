import sys
from pathlib import Path

# Add the parent directory (which contains 'src') to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from src.main import app

# This is necessary for Vercel serverless deployment
app = app
