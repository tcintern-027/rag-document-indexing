import io
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_upload_invalid_file_extension():
    file_bytes = b"sample content"
    files = {"file": ("test.exe", io.BytesIO(file_bytes), "application/octet-stream")}
    response = client.post("/upload", files=files)
    assert response.status_code == 400
    assert "Unsupported file format" in response.json()["detail"]


def test_upload_valid_txt_file():
    txt_content = b"The AI Knowledge Assistant is built with FastAPI, LangChain, and ChromaDB."
    files = {"file": ("unit_test_doc.txt", io.BytesIO(txt_content), "text/plain")}
    response = client.post("/upload", files=files)
    assert response.status_code == 200
    data = response.json()
    assert data["filename"] == "unit_test_doc.txt"
    assert data["status"] == "success"
    assert data["chunks_created"] >= 1
