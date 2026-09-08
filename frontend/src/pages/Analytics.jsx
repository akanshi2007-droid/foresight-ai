import { useEffect, useState } from 'react';
import { api } from '../api';

const SEV_COLOR = { high: '#ef5b4e', medium: '#f2a93b', low: '#35c3b6' };

export default function Analytics({ t }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getAnalytics().then(setData).catch(() => {});
  }, []);

  if (!data) return <section className="animate-viewIn text-textDim text-sm">Loading analytics…</section>;

  const sevEntries = Object.entries(data.alerts_by_severity || {});
  const sevMax = Math.max(1, ...sevEntries.map(([, v]) => v));
  const typeEntries = Object.entries(data.alerts_by_type || {});
  const typeMax = Math.max(1, ...typeEntries.map(([, v]) => v));

  return (
    <section className="animate-viewIn">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5.5">
        {[
          ['Total Alerts', data.total_alerts ?? sevEntries.reduce((s, [, v]) => s + v, 0)],
          ['Field Reports', data.total_reports],
          ['Routes Optimized', data.routes_optimized],
          ['Avg. Risk Score', data.average_risk_score],
        ].map(([label, value]) => (
          <div key={label} className="bg-panel border border-line rounded-[10px] p-4 animate-fadeSlideUp">
            <div className="text-textDim text-xs">{label}</div>
            <div className="font-display text-2xl font-bold mt-2">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-panel border border-line rounded-[10px] p-4.5">
          <h3 className="text-[14.5px] font-semibold mb-4">Alerts by Severity</h3>
          {sevEntries.map(([sev, count]) => (
            <div key={sev} className="mb-3">
              <div className="flex justify-between text-xs mb-1"><span className="capitalize text-textDim">{sev}</span><span>{count}</span></div>
              <div className="h-2 bg-[#22364a] rounded-md overflow-hidden">
                <div className="h-full rounded-md transition-all duration-700" style={{ width: `${(count / sevMax) * 100}%`, background: SEV_COLOR[sev] || '#35c3b6' }} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-panel border border-line rounded-[10px] p-4.5">
          <h3 className="text-[14.5px] font-semibold mb-4">Alerts by Type</h3>
          {typeEntries.map(([type, count]) => (
            <div key={type} className="mb-3">
              <div className="flex justify-between text-xs mb-1"><span className="text-textDim">{type}</span><span>{count}</span></div>
              <div className="h-2 bg-[#22364a] rounded-md overflow-hidden">
                <div className="h-full rounded-md bg-teal transition-all duration-700" style={{ width: `${(count / typeMax) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
