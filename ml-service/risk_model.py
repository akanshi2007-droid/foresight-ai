"""
Lightweight, explainable "AI" risk model for route disruption scoring.

This is intentionally a transparent weighted-feature model (not a black-box
network) so it's easy to demo and defend to a jury: it combines a mock
weather-severity feature, a hazard-density feature per town, and a small
random field-noise term meant to represent live field-report signal.

Swap `score_route()` internals for a trained scikit-learn model (e.g.
GradientBoostingRegressor over historical disruption + weather + terrain
features) once real historical data is available -- the function signature
and output stay the same, so nothing else in the stack needs to change.
"""
import random
from data import HAZARD_BIAS


def score_route(origin: str, destination: str) -> dict:
    o_bias = HAZARD_BIAS.get(origin, 0.3)
    d_bias = HAZARD_BIAS.get(destination, 0.3)
    weather_feature = random.uniform(0, 0.4)      # mock live weather severity
    field_noise = random.uniform(-0.05, 0.05)      # mock recent field-report signal

    raw = (o_bias + d_bias) / 2 * 0.6 + weather_feature * 0.4 + field_noise
    risk = max(3, min(97, round(raw * 100)))

    distance = random.randint(90, 310)
    eta_hours = round(distance / 38, 1)
    hazards_avoided = 1 + int(risk > 30) + int(risk > 55)

    if risk < 25:
        recommendation = "Proceed — route conditions favorable"
    elif risk < 55:
        recommendation = "Proceed with caution — monitor weather"
    else:
        recommendation = "Delay if possible — high-risk corridor"

    return {
        "risk_score": risk,
        "distance_km": distance,
        "eta_hours": eta_hours,
        "hazards_avoided": hazards_avoided,
        "recommendation": recommendation,
    }
