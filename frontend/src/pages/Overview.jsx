import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { api } from '../api';

const SEV_DOT = { high: 'bg-red animate-pulseRing', medium: 'bg-amber', low: 'bg-teal' };
const ACTIVITY = [
  ['Route optimized: Guwahati → Dibrugarh', '2 min ago'],
  ['Field report synced: Landslide near Shillong', '18 min ago'],
  ['Vehicle AS-07-TR-2291 crossed checkpoint', '25 min ago'],
  ['New alert issued: Flash flood, Barak Valley', '1 hr ago'],
];

export default function Overview({ t }) {
  const [alerts, setAlerts] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.getAlerts().then(setAlerts).catch(() => {});
    api.getVehicles().then(setVehicles).catch(() => {});
    api.getAnalytics().then(setAnalytics).catch(() => {});
  }, []);

  return (
    <section className="animate-viewIn">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5.5">
        <StatCard label={t('stat_alerts')} value={alerts.length} tag="+2 today" tagColor="red" delay={0.04} />
        <StatCard label={t('stat_vehicles')} value={vehicles.length} tag="Live" tagColor="teal" delay={0.1} />
        <StatCard label={t('stat_routes')} value={analytics?.routes_optimized ?? 0} tag="This session" tagColor="amber" delay={0.16} />
        <StatCard label={t('stat_reports')} value={analytics?.total_reports ?? 0} tag="Synced" tagColor="olive" delay={0.22} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 items-start">
        <div className="bg-panel border border-line rounded-[10px] p-4.5">
          <h3 className="text-[14.5px] font-semibold mb-3.5">{t('recent_alerts')}</h3>
          {alerts.slice(0, 5).map((a) => (
            <div key={a.id} className="flex gap-3 py-2.5 border-b border-line last:border-none items-start">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-none ${SEV_DOT[a.severity]}`} />
              <div>
                <strong className="block text-[13px]">{a.type} — {a.place}</strong>
                <span className="text-textDim text-[11.5px]">just now</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-panel border border-line rounded-[10px] p-4.5">
          <h3 className="text-[14.5px] font-semibold mb-3.5">{t('recent_activity')}</h3>
          {ACTIVITY.map(([txt, time]) => (
            <div key={txt} className="flex justify-between py-2 border-b border-dashed border-line last:border-none text-[12.5px]">
              <div>{txt}</div><span className="text-textDim">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
