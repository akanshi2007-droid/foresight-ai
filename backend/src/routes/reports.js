import { Router } from 'express';
import { DEMO_MODE, query } from '../db.js';
import { reports as demoReports, nextReportId } from '../demoStore.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  if (DEMO_MODE) return res.json(demoReports);
  const result = await query('SELECT * FROM field_reports ORDER BY created_at DESC');
  res.json(result.rows);
});

router.post('/', requireAuth, async (req, res) => {
  const { type, description, lat, lng, synced } = req.body || {};
  if (!type || lat === undefined || lng === undefined) {
    return res.status(400).json({ error: 'type, lat, lng are required' });
  }

  if (DEMO_MODE) {
    const entry = {
      id: nextReportId(),
      user_id: req.user.id,
      type, description, lat, lng,
      synced: synced !== false,
      created_at: new Date(),
    };
    demoReports.unshift(entry);
    return res.status(201).json(entry);
  }

  const result = await query(
    `INSERT INTO field_reports (user_id, type, description, lat, lng, synced)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [req.user.id, type, description || '', lat, lng, synced !== false]
  );
  res.status(201).json(result.rows[0]);
});

export default router;
