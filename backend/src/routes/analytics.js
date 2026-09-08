import { Router } from 'express';
import { DEMO_MODE, query } from '../db.js';
import { alerts, reports, routeLogs } from '../demoStore.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/summary', requireAuth, async (req, res) => {
  if (DEMO_MODE) {
    const bySeverity = { high: 0, medium: 0, low: 0 };
    alerts.forEach(a => { bySeverity[a.severity] = (bySeverity[a.severity] || 0) + 1; });

    const byType = {};
    alerts.forEach(a => { byType[a.type] = (byType[a.type] || 0) + 1; });

    const avgRisk = routeLogs.length
      ? Math.round(routeLogs.reduce((s, r) => s + r.risk_score, 0) / routeLogs.length)
      : 18;

    return res.json({
      total_alerts: alerts.length,
      alerts_by_severity: bySeverity,
      alerts_by_type: byType,
      total_reports: reports.length,
      routes_optimized: routeLogs.length,
      average_risk_score: avgRisk,
    });
  }

  const [alertsBySeverity, alertsByType, reportCount, routeCount, avgRisk] = await Promise.all([
    query(`SELECT severity, COUNT(*) FROM alerts GROUP BY severity`),
    query(`SELECT type, COUNT(*) FROM alerts GROUP BY type`),
    query(`SELECT COUNT(*) FROM field_reports`),
    query(`SELECT COUNT(*) FROM route_logs`),
    query(`SELECT COALESCE(AVG(risk_score),0) AS avg FROM route_logs`),
  ]);

  res.json({
    alerts_by_severity: Object.fromEntries(alertsBySeverity.rows.map(r => [r.severity, Number(r.count)])),
    alerts_by_type: Object.fromEntries(alertsByType.rows.map(r => [r.type, Number(r.count)])),
    total_reports: Number(reportCount.rows[0].count),
    routes_optimized: Number(routeCount.rows[0].count),
    average_risk_score: Math.round(Number(avgRisk.rows[0].avg)),
  });
});

export default router;
