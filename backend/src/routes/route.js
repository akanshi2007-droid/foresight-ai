import { Router } from 'express';
import fetch from 'node-fetch';
import { DEMO_MODE, query } from '../db.js';
import { routeLogs } from '../demoStore.js';

const router = Router();
const ML_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8001';

router.get('/towns', async (req, res) => {
  try {
    const r = await fetch(`${ML_URL}/towns`);
    res.json(await r.json());
  } catch (e) {
    res.status(502).json({ error: 'ML service unreachable', detail: String(e) });
  }
});

// Proxies to the Python ML microservice, which owns the actual risk-scoring
// logic (see ml-service/risk_model.py). This route just logs the result.
router.post('/optimize', async (req, res) => {
  const { origin, destination } = req.body || {};
  if (!origin || !destination) return res.status(400).json({ error: 'origin and destination are required' });

  try {
    const mlRes = await fetch(`${ML_URL}/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination }),
    });
    if (!mlRes.ok) {
      const detail = await mlRes.text();
      return res.status(mlRes.status).json({ error: 'ML service error', detail });
    }
    const data = await mlRes.json();

    if (DEMO_MODE) {
      routeLogs.unshift({ ...data, created_at: new Date() });
    } else {
      await query(
        `INSERT INTO route_logs (origin, destination, risk_score, distance_km, eta_hours, recommendation)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [data.origin, data.destination, data.risk_score, data.distance_km, data.eta_hours, data.recommendation]
      );
    }
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: 'Could not reach ML service. Is it running on ' + ML_URL + '?', detail: String(e) });
  }
});

export default router;
