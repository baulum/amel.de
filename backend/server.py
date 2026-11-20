from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import asyncio
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Configure logging (must be available before helpers)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============ Email setup (Emergent-managed Resend) ============
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Amel's Team GmbH")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "Info@amel.de")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = (
    "reply with your password", "reply with the code", "send your password", "cvv",
    "send us your password", "enter your password below", "confirm your card number",
    "your full card number", "seed phrase", "recovery phrase", "verify your card",
    "social security number", "confirm your bank details",
)
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> Optional[str]:
    """Send an email through the Emergent managed proxy. Raises on failure."""
    _assert_safe_email(subject, html)
    if not EMAIL_KEY:
        raise RuntimeError("EMERGENT_EMAIL_KEY not configured")
    payload = {
        "to": [to],
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,
    }
    async with httpx.AsyncClient(timeout=30) as http_client:
        resp = await http_client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def _build_contact_email_html(name: str, email: str, phone: str, service: str,
                              move_date: Optional[str], message: str) -> str:
    """Server-side template. All interpolations HTML-escaped."""
    date_row = ""
    if move_date:
        date_row = (
            f'<tr><td style="padding:6px 12px;background:#f5f5f0;font-weight:600;'
            f'width:140px">Wunschtermin</td>'
            f'<td style="padding:6px 12px">{escape(move_date)}</td></tr>'
        )
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f0;padding:24px">'
        '<tr><td align="center">'
        '<table role="presentation" width="600" cellpadding="0" cellspacing="0" '
        'style="background:#ffffff;border:1px solid #d2d2cc">'
        '<tr><td style="padding:24px 24px 0 24px">'
        '<div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;'
        'text-transform:uppercase;color:#666">Neue Anfrage · amel.de</div>'
        '<h1 style="font-family:Arial,sans-serif;font-size:24px;margin:8px 0 0 0;'
        f'color:#111">Neue Kontaktanfrage von {escape(name)}</h1>'
        '</td></tr>'
        '<tr><td style="padding:16px 24px">'
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="border-collapse:collapse;font-size:14px;color:#111">'
        f'<tr><td style="padding:6px 12px;background:#f5f5f0;font-weight:600;width:140px">Name</td>'
        f'<td style="padding:6px 12px">{escape(name)}</td></tr>'
        f'<tr><td style="padding:6px 12px;background:#f5f5f0;font-weight:600">E-Mail</td>'
        f'<td style="padding:6px 12px">{escape(email)}</td></tr>'
        f'<tr><td style="padding:6px 12px;background:#f5f5f0;font-weight:600">Telefon</td>'
        f'<td style="padding:6px 12px">{escape(phone)}</td></tr>'
        f'<tr><td style="padding:6px 12px;background:#f5f5f0;font-weight:600">Leistung</td>'
        f'<td style="padding:6px 12px">{escape(service)}</td></tr>'
        f'{date_row}'
        '</table>'
        '</td></tr>'
        '<tr><td style="padding:8px 24px 16px 24px">'
        '<div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;'
        'text-transform:uppercase;color:#666;margin-bottom:6px">Nachricht</div>'
        f'<div style="font-size:14px;color:#111;white-space:pre-wrap;line-height:1.5">{escape(message)}</div>'
        '</td></tr>'
        '<tr><td style="padding:16px 24px 24px 24px;border-top:1px solid #eee">'
        f'<div style="font-size:12px;color:#888">Diese Nachricht wurde automatisch über das Kontaktformular '
        f'von {escape(EMAIL_FROM_NAME)} gesendet. Zum Antworten den obigen Kunden-E-Mail-Link nutzen.</div>'
        '</td></tr>'
        '</table>'
        '</td></tr></table>'
    )


# ============ Models ============
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactRequestCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=3, max_length=40)
    service: str = Field(min_length=1, max_length=60)
    move_date: Optional[str] = None
    message: str = Field(min_length=1, max_length=4000)


class ContactRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: str
    move_date: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ============ Routes ============
@api_router.get("/")
async def root():
    return {"message": "Amel's Team GmbH API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


async def _forward_contact_email(obj: ContactRequest) -> None:
    """Fire-and-forget forwarding to the owner inbox. Errors are logged, not raised."""
    try:
        subject = f"Neue Anfrage · {obj.service} · {obj.name}"
        html = _build_contact_email_html(
            name=obj.name,
            email=obj.email,
            phone=obj.phone,
            service=obj.service,
            move_date=obj.move_date,
            message=obj.message,
        )
        email_id = await send_email(to=OWNER_EMAIL, subject=subject, html=html)
        logger.info(f"Forwarded contact request {obj.id} to {OWNER_EMAIL} (email_id={email_id})")
    except Exception as e:
        logger.error(f"Failed to forward contact request {obj.id} to {OWNER_EMAIL}: {e}")


@api_router.post("/contact", response_model=ContactRequest)
async def create_contact(payload: ContactRequestCreate):
    obj = ContactRequest(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_requests.insert_one(doc)
    logger.info(f"New contact request from {obj.name} <{obj.email}> for {obj.service}")

    # Non-blocking email forward — do NOT fail the API if email delivery fails.
    asyncio.create_task(_forward_contact_email(obj))

    return obj


@api_router.get("/contact", response_model=List[ContactRequest])
async def list_contacts():
    items = await db.contact_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
