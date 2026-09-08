import { Router } from 'express';
import { DEMO_MODE, query } from '../db.js';
import { vehicles as demoVehicles } from '../demoStore.js';

const router = Router();

router.get('/', async (req, res) => {
  if (DEMO_MODE) {
    // Small live jitter so the map shows believable "GPS" movement on each poll.
    demoVehicles.forEach(v => {
      if (v.status === 'en_route') {
        v.lat += (Math.random() - 0.5) * 0.03;
        v.lng += (Math.random() - 0.5) * 0.03;
      }
    });
    return res.json(demoVehicles);
  }
  const result = await query('SELECT * FROM vehicles ORDER BY id');
  res.json(result.rows);
});

export default router;
