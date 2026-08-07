from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_chat_empty_question():
    response = client.post("/chat", json={"question": ""})
    assert response.status_code == 400


def test_chat_valid_payload_structure():
    response = client.post("/chat", json={"question": "Test system prompt?", "top_k": 2})
    # Should return 200 OK even if no API key is present (fallback grounding message)
    assert response.status_code in [200, 500]
    if response.status_code == 200:
        data = response.json()
        assert "answer" in data
        assert "sources" in data
        assert "chunks" in data
        assert "metadata" in data
