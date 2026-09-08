# AAPDA — AI-Based Smart Logistics & Accessibility Intelligence Platform for NER

**Team 4 Bits · SIH 2026 · Problem Statement PS 26002**

A full-stack disruption-aware logistics platform for the North Eastern Region: it fuses
disaster alerts, GIS hazard mapping, AI-scored routing, live GPS tracking, and offline-capable
field reporting into one command-center dashboard, with a bilingual (English/Hindi) interface
and an in-app assistant.

## Architecture

```
┌─────────────────┐      ┌──────────────────────┐      ┌───────────────────────┐
│  React + Vite    │ ───▶ │  Node.js + Express    │ ───▶ │  Python + FastAPI      │
│  + Tailwind CSS  │◀──── │  (auth, CRUD, proxy)  │◀──── │  ML risk-scoring       │
│  Frontend :5173  │      │  Backend :8000        │      │  service :8001         │
└─────────────────┘      └──────────┬───────────┘      └───────────────────────┘
                                     │
                                     ▼
                          ┌──────────────────────┐
                          │  PostgreSQL           │
                          │  (or DEMO_MODE=true   │
                          │   in-memory data)      │
                          └──────────────────────┘
```

- **Frontend** — React 18 + Vite + Tailwind CSS. Landing page, JWT-authenticated login, and a
  dashboard with a live GIS map (Leaflet), AI route optimizer, smart alerts, offline-capable
  field reporting, analytics, and a bilingual rule-based chatbot.
- **Backend (Node/Express)** — owns authentication (JWT + bcrypt), alerts, vehicles, field
  reports, and analytics. Proxies route-optimization requests to the ML service and logs the
  result.
- **ML service (Python/FastAPI)** — an explainable, weighted-feature risk model
  (`ml-service/risk_model.py`) that scores route disruption risk. Swap it for a trained
  scikit-learn model later without changing any other part of the stack.
- **Database** — PostgreSQL schema in `database/schema.sql`, seed data in `database/seed.sql`.
  For a zero-setup hackathon demo, the backend also has a `DEMO_MODE` that runs entirely on
  in-memory mock data — no database required.

## Quick start (demo mode — no PostgreSQL needed)

Open **three terminals** in VS Code (`` Ctrl+` `` → split):

**Terminal 1 — ML service**
```bash
cd ml-service
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

**Terminal 2 — Backend**
```bash
cd backend
cp .env.example .env      # DEMO_MODE=true by default — no DB needed
npm install
npm run dev
```

**Terminal 3 — Frontend**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open **http://localhost:5173** — you'll land on the marketing page. Click **Launch Dashboard**
and log in with:

```
Email:    admin@aapda.in
Password: aapda123
```

## Running with real PostgreSQL

1. Create a database and load the schema + seed data:
   ```bash
   createdb aapda
   psql aapda -f database/schema.sql
   psql aapda -f database/seed.sql
   ```
2. In `backend/.env`, set:
   ```
   DEMO_MODE=false
   DATABASE_URL=postgresql://<user>:<password>@localhost:5432/aapda
   ```
3. Restart the backend (`npm run dev`). Registration (`POST /api/auth/register`) is only
   enabled outside demo mode.

## What's mocked vs. real right now

| Feature | Status |
|---|---|
| Auth (JWT + bcrypt), login | **Real** |
| Alerts, vehicles, field reports API | Real endpoints; demo data unless PostgreSQL is configured |
| AI route risk scoring | Real, explainable weighted model in `ml-service/risk_model.py` — swap in a trained model when you have historical disruption data |
| GPS vehicle movement | Simulated jitter on the backend (stand-in for a live GPS feed) |
| Offline field reporting | **Real** — reports queue in `localStorage` when offline and auto-sync when the "Simulate offline" toggle is switched back on |
| Chatbot | Rule-based keyword matcher (client-side) — swap for a real LLM call by replacing `Chatbot.jsx`'s `botReply()` |
| Weather/IMD/Bhuvan/DEM data feeds | Not yet wired — `ml-service/data.py` has a placeholder `HAZARD_BIAS` map to replace with real feeds |

## Project layout

```
aapda-full/
├── database/
│   ├── schema.sql        # PostgreSQL tables
│   └── seed.sql          # Demo user + alerts + vehicles
├── backend/               # Node.js + Express
│   ├── src/
│   │   ├── server.js      # entrypoint
│   │   ├── db.js          # Postgres pool / DEMO_MODE switch
│   │   ├── demoStore.js   # in-memory data for DEMO_MODE
│   │   ├── middleware/auth.js
│   │   └── routes/        # auth, alerts, vehicles, reports, route, analytics
│   └── .env.example
├── ml-service/            # Python + FastAPI
│   ├── main.py            # /optimize, /towns
│   ├── risk_model.py      # explainable weighted risk model
│   └── data.py            # towns + mock hazard bias
└── frontend/              # React + Vite + Tailwind
    └── src/
        ├── pages/          # Landing, Login, Dashboard, Overview, Analytics
        ├── components/     # Sidebar, MapView, RouteOptimizer, AlertsPanel,
        │                   # FieldReports, Chatbot, StatCard, Logo
        ├── auth/AuthContext.jsx
        ├── api.js
        └── i18n.js
```

## API reference (backend, port 8000)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | — | Returns `{ token, user }` |
| POST | `/api/auth/register` | — | Disabled in DEMO_MODE |
| GET | `/api/alerts?severity=high` | — | List alerts, optional severity filter |
| GET | `/api/vehicles` | — | Live vehicle positions |
| GET | `/api/route/towns` | — | Town → lat/lng lookup (proxied from ML service) |
| POST | `/api/route/optimize` | — | `{ origin, destination }` → risk score + path |
| GET | `/api/reports` | ✅ | List field reports |
| POST | `/api/reports` | ✅ | Submit a field report |
| GET | `/api/analytics/summary` | ✅ | Aggregate stats for the Analytics page |

## Demo script for the jury

1. **Landing page** — walk through the problem statement, features, and architecture sections.
2. **Login** — show the JWT-based auth.
3. **Overview** — live counts pulled from the backend.
4. **Live GIS Map** — hazard markers + moving vehicle markers (simulated GPS).
5. **Route Optimizer** — pick two towns, show the AI-scored safe route animate in against the
   blocked path, and explain the risk model is a transparent weighted-feature score (easy to
   defend under jury questioning, and swappable for a trained model later).
6. **Smart Alerts** — filter by severity.
7. **Field Reports** — flip "Simulate offline," submit a report, show it queue locally, flip
   back online, watch it auto-sync.
8. **Analytics** — aggregate view for decision-makers.
9. **Chatbot** — ask it about hazard reporting, alerts, or the helpline number, in English and
   Hindi.

## Notes

- CORS is fully open (`origins: '*'`) for hackathon-demo simplicity — restrict this to your
  real frontend domain before any production deployment.
- `JWT_SECRET` in `.env.example` is a placeholder — generate a real random string for any
  non-demo deployment.
