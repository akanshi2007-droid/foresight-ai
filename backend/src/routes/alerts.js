import { Router } from 'express';
import { DEMO_MODE, query } from '../db.js';
import { alerts as demoAlerts } from '../demoStore.js';

const router = Router();

router.get('/', async (req, res) => {
  const { severity } = req.query;
  if (DEMO_MODE) {
    const list = !severity || severity === 'all' ? demoAlerts : demoAlerts.filter(a => a.severity === severity);
    return res.json(list);
  }
  const result = severity && severity !== 'all'
    ? await query('SELECT * FROM alerts WHERE severity = $1 ORDER BY created_at DESC', [severity])
    : await query('SELECT * FROM alerts ORDER BY created_at DESC');
  res.json(result.rows);
});

export default router;
