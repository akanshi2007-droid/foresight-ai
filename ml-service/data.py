"""Static reference data used by the ML risk-scoring service."""

TOWNS = {
    "Guwahati": (26.1445, 91.7362),
    "Dibrugarh": (27.4728, 94.9120),
    "Imphal": (24.8170, 93.9368),
    "Shillong": (25.5788, 91.8933),
    "Agartala": (23.8315, 91.2868),
    "Aizawl": (23.7307, 92.7173),
    "Kohima": (25.6751, 94.1086),
    "Itanagar": (27.0844, 93.6053),
}

# A crude "hazard density" per town used to bias the mock risk model,
# standing in for real live rainfall/landslide-susceptibility data
# (swap for IMD rainfall + Bhuvan/DEM landslide susceptibility layers).
HAZARD_BIAS = {
    "Guwahati": 0.15, "Dibrugarh": 0.55, "Imphal": 0.35, "Shillong": 0.6,
    "Agartala": 0.25, "Aizawl": 0.4, "Kohima": 0.3, "Itanagar": 0.45,
}
