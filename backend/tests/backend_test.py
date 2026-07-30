import os
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    # Fallback: read frontend/.env
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().rstrip('/')


def test_root():
    r = requests.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert "Amel" in data["message"]


def test_contact_valid():
    payload = {
        "name": "TEST_User",
        "email": "test_user@example.com",
        "phone": "+491234567890",
        "service": "Umzug",
        "move_date": "2026-02-15",
        "message": "TEST_ contact submission for iteration_2",
    }
    r = requests.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert "id" in data


def test_contact_invalid_email():
    payload = {
        "name": "TEST_Invalid",
        "email": "not-an-email",
        "phone": "12345",
        "service": "Umzug",
        "message": "x",
    }
    r = requests.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 422
