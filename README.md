# ForeSight AI — AI-Powered Safety & Early Warning Intelligence Platform

**Team 4 Bits**

> **THE MOMENT BEFORE CRITICAL**
> See the risk. Act before it becomes danger.

ForeSight AI is an AI-powered **safety and early-warning platform for the North Eastern Region (NER)** designed to identify subtle signals that can precede critical incidents such as **landslides, road disruptions, and hazardous route conditions**.

Instead of reacting after a disaster occurs, ForeSight AI focuses on detecting when a normal or unusual situation is **escalating toward danger**.

The platform combines **GIS hazard mapping, AI-based risk scoring, safety alerts, route intelligence, GPS tracking, and field reporting** into a unified safety command center.

---

## 🚨 The Problem — The Moment Before Critical

Critical incidents rarely begin with one obvious warning.

A landslide-prone route may initially show only individual signs:

* Increasing rainfall
* Changing environmental conditions
* Terrain susceptibility
* Road disruptions
* Abnormal operational patterns

Individually, these signals may appear manageable.

But when multiple signals begin to converge, the situation can rapidly become dangerous.

### The Core Challenge

> **Distinguish normal abnormality from dangerous abnormality.**

ForeSight AI is designed around this transition:

**NORMAL → UNUSUAL → ESCALATING → CRITICAL**

---

## 💡 Our Solution

ForeSight AI acts as an **AI safety intelligence layer** that evaluates available hazard and operational signals to determine the current level of risk.

### The platform provides:

* 🛰️ Hazard and operational signal monitoring
* ⛰️ Landslide-risk and hazard-zone identification
* 🤖 Explainable AI risk scoring
* 🗺️ Interactive GIS safety map
* 🚨 Severity-based safety alerts
* 🚚 Field vehicle tracking
* 📍 Offline-capable field reporting
* 📊 Safety analytics and decision support
* 🌐 English and Hindi support

---

## 🧠 From Abnormal to Dangerous

The core intelligence of ForeSight AI is **signal convergence**.

```text
Environmental Signal
        +
Terrain / Hazard Signal
        +
Operational Signal
        +
Historical Risk
        ↓
   AI Risk Analysis
        ↓
 ┌───────────────────┐
 │ NORMAL            │
 │ MONITOR           │
 │ ESCALATING        │
 │ CRITICAL          │
 └───────────────────┘
        ↓
   SAFETY ACTION
```

A single unusual signal does not automatically indicate a critical incident.

The system becomes more concerned when **multiple risk indicators converge**.

---

## 🗺️ Safety Intelligence Dashboard

The ForeSight AI command center brings critical information together in one interface:

* Live GIS hazard map
* Risk zones
* Vehicle positions
* Route safety information
* Smart alerts
* Field reports
* Analytics
* AI-assisted decision support

> **See the warning before it becomes an emergency.**

---

## 🤖 Explainable AI Risk Engine

The ML service currently uses an **explainable weighted-feature risk model** to calculate route disruption risk.

The model is designed to remain transparent so safety operators can understand why a route has been flagged.

```text
Hazard Conditions
       ↓
Risk Features
       ↓
Weighted Risk Model
       ↓
Risk Score
       ↓
Safety Recommendation
```

The current model can later be replaced with a trained machine-learning model without changing the rest of the platform architecture.

---

## 🏗️ Architecture

```text
┌─────────────────────┐
│    React + Vite     │
│    Tailwind CSS     │
│                     │
│ Safety Dashboard    │
│ GIS Map             │
│ Alerts              │
│ Route Intelligence  │
│ Field Reports       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Node.js + Express   │
│                     │
│ Authentication      │
│ Alerts              │
│ Vehicles            │
│ Reports             │
│ Analytics           │
│ API Proxy           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Python + FastAPI    │
│                     │
│ AI Risk Scoring     │
│ Geospatial Logic    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│                     │
│ Users               │
│ Alerts              │
│ Vehicles            │
│ Reports             │
│ Analytics           │
└─────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React 18
* Vite
* Tailwind CSS
* Leaflet
* JavaScript

### Backend

* Node.js
* Express
* JWT Authentication
* bcrypt

### AI / ML

* Python
* FastAPI
* Explainable weighted-feature risk model
* Future trained ML integration

### Database

* PostgreSQL

### Offline Capability

* Browser `localStorage`
* Automatic report synchronization

---

## ⚡ Quick Start

ForeSight AI can run in `DEMO_MODE` without PostgreSQL for a quick hackathon demonstration.

### Terminal 1 — ML Service

```bash
cd ml-service
python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

### Terminal 2 — Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Terminal 3 — Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Then select **Launch Dashboard**.

### Demo Login

```text
Email: admin@aapda.in
Password: aapda123
```

---

## 🗄️ PostgreSQL Setup

Create the database:

```bash
createdb aapda
```

Load the schema:

```bash
psql aapda -f database/schema.sql
```

Load the demo data:

```bash
psql aapda -f database/seed.sql
```

Configure:

```env
DEMO_MODE=false
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/aapda
```

Restart the backend.

---

## 📊 Current Implementation

| Feature                            | Status                |
| ---------------------------------- | --------------------- |
| JWT Authentication                 | ✅ Real                |
| Safety Alerts API                  | ✅ Real                |
| Vehicle API                        | ✅ Real                |
| Field Reports API                  | ✅ Real                |
| AI Route Risk Scoring              | ✅ Real                |
| GIS Map                            | ✅ Implemented         |
| Offline Field Reporting            | ✅ Real                |
| Vehicle GPS                        | 🟡 Simulated          |
| Chatbot                            | 🟡 Rule-based         |
| Weather / IMD / Bhuvan / DEM feeds | 🔴 Not yet wired      |
| Trained historical ML model        | 🔴 Future enhancement |

---

## 🎬 Hackathon Demo Flow

1. **Landing Page** — Introduce **The Moment Before Critical**.
2. **Login** — Demonstrate authentication.
3. **Safety Overview** — Show current risk levels and alerts.
4. **Live GIS Map** — Display hazard zones and vehicle locations.
5. **AI Route Intelligence** — Compare route risk and identify safer routes.
6. **Smart Alerts** — Filter and investigate safety alerts.
7. **Offline Field Reporting** — Demonstrate reporting during connectivity loss.
8. **Analytics** — Show safety intelligence for decision-makers.
9. **AI Assistant** — Interact with the safety assistant in English/Hindi.

---

## 🔮 Future Scope

ForeSight AI can be extended with:

* Real-time rainfall and weather feeds
* Soil-moisture data
* DEM and slope analysis
* Satellite imagery
* Historical landslide datasets
* IoT sensor streams
* Trained landslide-risk models
* Advanced anomaly detection
* Real GPS feeds
* Regional-language support
* Automated emergency escalation

These integrations would strengthen ForeSight AI's ability to identify **the transition from an unusual condition to a genuinely dangerous situation**.

---

## 🎯 Our Vision

Most disaster systems focus on what happens **after** a critical event.

**ForeSight AI focuses on what happens before it.**

> **Detect the signal.**
> **Understand the escalation.**
> **Warn before critical.**
> **Act before danger.**

# **ForeSight AI**

### *See the risk. Act before it becomes danger.*

**Team 4 Bits**
