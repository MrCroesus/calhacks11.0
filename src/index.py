import sys
from pathlib import Path

# Add the parent directory (which contains 'src') to the Python path
from main import app

# This is necessary for Vercel serverless deployment
app = app
