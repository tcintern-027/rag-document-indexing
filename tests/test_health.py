from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_get_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert data["status"] == "healthy"
    assert "vector_count" in data
    assert "chroma_db_status" in data
    assert "llm_model" in data
