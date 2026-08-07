import sys
from pathlib import Path
import uvicorn

# Ensure workspace root is added to PYTHONPATH
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from backend.app.core.config import settings

if __name__ == "__main__":
    print(f"Starting FastAPI server on http://{settings.HOST}:{settings.PORT}")
    uvicorn.run("backend.app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
