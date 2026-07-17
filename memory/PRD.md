# Amel's Team GmbH — Website (Munich Removals)

## Original Problem Statement
Erstelle eine professionelle Website für Wohnungsumzüge in und um München.
Firma: **Amel's Team GmbH**, Ravensburgerring 23, 81243 München · 089/87579385 · Info@amel.de.
Leistungen: Umzüge (nah & fern), Entrümpelungen, Montage, kostenlose Besichtigung.
GmbH seit über 20 Jahren. Sprache: Deutsch. Design: modern & professionell, Awwwards-level, kinetic hero, framer-motion, lenis smooth scroll.

## Architecture
- **Backend**: FastAPI + MongoDB (motor). Endpoints under `/api`:
  - `GET /api/` — health
  - `POST /api/contact` — persist contact/inspection request
  - `GET /api/contact` — list requests (sorted desc)
  - Legacy: `POST/GET /api/status`
- **Frontend**: React 19 + CRA/craco, TailwindCSS, framer-motion, lenis, react-fast-marquee, shadcn/ui.
  - Single-page composition in `/src/pages/Home.jsx`
  - Components: `Nav`, `Hero` (masked line reveal + parallax), `Marquee`, `Services`, `Manifesto`, `Gallery` (per-image parallax), `Process`, `Contact`, `Footer`
  - Global smooth scroll: `SmoothScroll.jsx` (Lenis)
  - Design tokens (Bone / Ink / Rust) live in `index.css`

## User Personas
- **Umziehende Münchner** — Privatperson die einen stressfreien Umzug innerhalb oder aus München sucht.
- **Nachlassverwalter / Mieter** — braucht Entrümpelung + besenreine Übergabe.
- **KMU / Büros** — Bürostandortwechsel innerhalb Bayerns.

## Core Requirements (static)
- 100% Deutsch
- Kostenlose-Besichtigung-Anfrage per Formular (Name, E-Mail, Telefon, Leistung, Wunschtermin, Nachricht)
- Firmendaten prominent im Footer & Kontakt
- Awwwards-level Motion & Editorial Design
- Voll responsiv, keine Purple-Slop-Gradienten, sharp corners, Cabinet Grotesk / Satoshi

## Implemented (Dec 2025)
- ✅ Backend Contact API (create/list) + Email validation
- ✅ Kinetic Hero mit Line-by-Line Reveal + Parallax
- ✅ Editorial Marquee
- ✅ Numbered Services (3 Kapitel)
- ✅ Manifesto Section (4 Kapitel, dunkler Split)
- ✅ Parallax Gallery mit 4 Editorial-Bildern
- ✅ 5-Step Process (Ablauf)
- ✅ Contact Section (Formular + Firmendaten + Sonner Toasts)
- ✅ Word-mark Footer
- ✅ Testing agent iteration 1: 100% pass (backend + frontend)

## Backlog / Next Actions
### P0
- (none blocking)

### P1
- Impressum & Datenschutz Legal Pages (Pflicht laut TMG in DE)
- E-Mail-Benachrichtigung an Info@amel.de via Resend Integration
- Google Maps Embed am Standort (Ravensburgerring 23)

### P2
- Kundenbewertungen / Testimonials Section
- Blog / SEO-Landingpages für "Umzug Schwabing", "Entrümpelung Haidhausen" etc.
- WhatsApp Quick-Contact Button
- Admin-Dashboard zum Einsehen eingegangener Anfragen
- Mehrsprachig (DE/EN)

## Env / Test Credentials
- Keine Auth in dieser Iteration — nicht relevant.

## Deployment Notes
- Frontend: `REACT_APP_BACKEND_URL` in `frontend/.env`
- Backend: `MONGO_URL`, `DB_NAME` in `backend/.env`
- Extra libs: `lenis`, `react-fast-marquee` (already in package.json)
