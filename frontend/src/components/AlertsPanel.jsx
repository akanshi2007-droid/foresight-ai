import { useEffect, useState } from 'react';
import { api } from '../api';

const SEV_STYLE = { high: 'bg-redDim text-red', medium: 'bg-amberDim text-amber', low: 'bg-tealDim text-teal' };

export default function AlertsPanel({ t }) {
  const [filter, setFilter] = useState('all');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.getAlerts(filter).then(setAlerts).catch(() => setAlerts([]));
  }, [filter]);

  return (
    <section className="animate-viewIn">
      <div className="flex gap-2 mb-3.5">
        {['all', 'high', 'medium', 'low'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs border transition-all active:scale-95 ${filter === f ? 'border-amber text-white' : 'border-line text-textDim bg-panel'}`}
          >
            {t(`filter_${f}`)}
          </button>
        ))}
      </div>
      <div>
        {alerts.map((a, i) => (
          <div key={a.id} style={{ animationDelay: `${i * 0.04}s` }} className="flex gap-3.5 p-3.5 bg-panel border border-line rounded-[10px] mb-2.5 items-start animate-fadeSlideUp hover:bg-panel2 transition-colors">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide flex-none ${SEV_STYLE[a.severity]}`}>{t(`filter_${a.severity}`)}</span>
            <div>
              <strong className="block text-[13.5px]">{a.type}</strong>
              <div className="text-textDim text-xs mt-0.5">{a.place}</div>
            </div>
          </div>
        ))}
        {alerts.length === 0 && <div className="text-textDim text-sm">No alerts in this category.</div>}
      </div>
    </section>
  );
}
