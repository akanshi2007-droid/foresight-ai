import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './routes/auth.js';
import alertRoutes from './routes/alerts.js';
import vehicleRoutes from './routes/vehicles.js';
import reportRoutes from './routes/reports.js';
import routeRoutes from './routes/route.js';
import analyticsRoutes from './routes/analytics.js';
import { DEMO_MODE } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'AAPDA API', demo_mode: DEMO_MODE, docs: 'See README.md for all endpoints' });
});

app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/route', routeRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`AAPDA backend running on http://localhost:${PORT} (DEMO_MODE=${DEMO_MODE})`);
});
