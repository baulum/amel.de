import os
import re
import time
import subprocess
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().rstrip('/')


# ============ Health ============
def test_root():
    r = requests.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert "Amel" in data["message"]


# ============ Contact create (valid) + non-blocking ============
def test_contact_valid_returns_quickly():
    payload = {
        "name": "TEST_User",
        "email": "test_user@example.com",
        "phone": "+491234567890",
        "service": "Umzug",
        "move_date": "2026-02-15",
        "message": "TEST_ contact submission iteration_3 email forwarding",
    }
    t0 = time.time()
    r = requests.post(f"{BASE_URL}/api/contact", json=payload, timeout=10)
    elapsed = time.time() - t0
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert "created_at" in data
    # Non-blocking: even if the email proxy takes time, API returns quickly
    assert elapsed < 5.0, f"POST /api/contact took {elapsed:.2f}s (should be non-blocking)"
    return data["id"]


# ============ Contact create (invalid email) ============
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


# ============ GET /api/contact ordering ============
def test_list_contacts_desc_ordering():
    r = requests.get(f"{BASE_URL}/api/contact")
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    if len(items) >= 2:
        # created_at is a datetime serialized as ISO string
        ts = [it["created_at"] for it in items]
        assert ts == sorted(ts, reverse=True), "contacts should be sorted by created_at desc"


# ============ Email forwarding: check backend log for the forward line ============
def test_email_forwarded_log_written():
    payload = {
        "name": "TEST_ForwardLog",
        "email": "forward_log@example.com",
        "phone": "+491230000",
        "service": "Umzug",
        "message": "TEST_ verifying forwarded-log line appears",
    }
    r = requests.post(f"{BASE_URL}/api/contact", json=payload, timeout=10)
    assert r.status_code == 200
    submission_id = r.json()["id"]

    # Give the fire-and-forget task time to hit the proxy
    log_files = [
        "/var/log/supervisor/backend.out.log",
        "/var/log/supervisor/backend.err.log",
    ]
    pattern = re.compile(
        rf"Forwarded contact request {re.escape(submission_id)} to Info@amel\.de \(email_id=([^)]+)\)"
    )
    fail_pattern = re.compile(
        rf"Failed to forward contact request {re.escape(submission_id)}"
    )

    found = None
    failed = None
    for _ in range(20):  # up to ~20s
        time.sleep(1)
        for lf in log_files:
            if not os.path.exists(lf):
                continue
            try:
                # Read tail to avoid huge files
                out = subprocess.run(
                    ["tail", "-n", "2000", lf], capture_output=True, text=True, timeout=5
                ).stdout
            except Exception:
                continue
            m = pattern.search(out)
            if m:
                found = m.group(1)
                break
            fm = fail_pattern.search(out)
            if fm:
                failed = out[max(0, fm.start()-200):fm.end()+400]
        if found or failed:
            break

    assert failed is None, f"Email forwarding failed and was logged: {failed}"
    assert found is not None, (
        f"Did not find 'Forwarded contact request {submission_id} to Info@amel.de' "
        f"in backend supervisor logs within 20s"
    )
    assert found and found != "None", f"email_id should be non-empty, got {found!r}"


# ============ Verify send_email uses correct headers and payload (static inspection) ============
def test_server_uses_correct_email_proxy_config():
    with open("/app/backend/server.py") as f:
        src = f.read()
    assert 'integrations.emergentagent.com' in src
    assert '/api/v1/email/send' in src
    assert 'X-Email-Key' in src
    assert 'from_name' in src
    # OWNER_EMAIL default must be Info@amel.de
    assert 'Info@amel.de' in src
    # EMAIL_FROM_NAME default
    assert "Amel's Team GmbH" in src


# ============ Invalid email must NOT trigger a forward attempt (no failed-log for it) ============
def test_invalid_email_does_not_forward():
    # Marker string that must appear in the message only if we later inspect logs
    marker = f"TEST_MARKER_{int(time.time())}"
    payload = {
        "name": "TEST_NoForward",
        "email": "still-not-an-email",
        "phone": "123",
        "service": "Umzug",
        "message": marker,
    }
    r = requests.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 422
    # Give any (erroneous) background task time
    time.sleep(2)
    for lf in ("/var/log/supervisor/backend.out.log", "/var/log/supervisor/backend.err.log"):
        if not os.path.exists(lf):
            continue
        out = subprocess.run(["tail", "-n", "500", lf], capture_output=True, text=True).stdout
        assert marker not in out or "Forwarded contact request" not in out.split(marker, 1)[-1][:500], (
            "Invalid email submission must not trigger an email forward"
        )
