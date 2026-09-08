import random
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from data import TOWNS
from risk_model import score_route

app = FastAPI(title="AAPDA ML Service", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class RouteRequest(BaseModel):
    origin: str
    destination: str


def _midpoint(a, b, jitter=1.4):
    return (
        (a[0] + b[0]) / 2 + (random.random() - 0.5) * jitter,
        (a[1] + b[1]) / 2 + (random.random() - 0.5) * jitter,
    )


@app.get("/")
def root():
    return {"status": "ok", "service": "AAPDA ML Service"}


@app.get("/towns")
def towns():
    return TOWNS


@app.post("/optimize")
def optimize(req: RouteRequest):
    if req.origin not in TOWNS or req.destination not in TOWNS:
        raise HTTPException(status_code=400, detail="Unknown origin or destination")
    if req.origin == req.destination:
        raise HTTPException(status_code=400, detail="Origin and destination must differ")

    p1, p2 = TOWNS[req.origin], TOWNS[req.destination]
    safe_mid = _midpoint(p1, p2, jitter=1.4)
    blocked_mid = ((p1[0] + p2[0]) / 2 - 0.6, (p1[1] + p2[1]) / 2 + 0.6)

    result = score_route(req.origin, req.destination)
    return {
        "origin": req.origin,
        "destination": req.destination,
        **result,
        "path": [list(p1), list(safe_mid), list(p2)],
        "blocked_path": [list(p1), list(blocked_mid), list(p2)],
    }
