import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { api } from '../api';

const QUEUE_KEY = 'aapda_offline_report_queue';

function readQueue() {
  try { return JSON.parse(localStorage.getItem(QUEUE_KEY)) || []; } catch { return []; }
}
function writeQueue(q) { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); }

export default function FieldReports({ t, isOffline, showToast }) {
  const mapRef = useRef(null);
  const mapObj = useRef(null);
  const markerRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState('Landslide');
  const [desc, setDesc] = useState('');
  const [serverReports, setServerReports] = useState([]);
  const [queued, setQueued] = useState(readQueue());

  useEffect(() => {
    if (mapObj.current) return;
    const map = L.map(mapRef.current).setView([25.6, 93.5], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map);
    map.on('click', (e) => {
      setSelected(e.latlng);
      if (markerRef.current) map.removeLayer(markerRef.current);
      markerRef.current = L.marker(e.latlng).addTo(map);
    });
    mapObj.current = map;
    refreshReports();
  }, []);

  function refreshReports() {
    api.getReports().then(setServerReports).catch(() => {});
  }

  // Auto-sync the offline queue whenever we come back online.
  useEffect(() => {
    if (isOffline) return;
    const q = readQueue();
    if (q.length === 0) return;
    (async () => {
      for (const item of q) {
        try { await api.submitReport(item); } catch { /* leave it queued for the next attempt */ return; }
      }
      writeQueue([]);
      setQueued([]);
      showToast(`✅ Synced ${q.length} queued report(s)`);
      refreshReports();
    })();
  }, [isOffline]);

  async function handleSubmit() {
    if (!selected) { showToast('Click a location on the map first.'); return; }
    const report = { type, description: desc || '—', lat: selected.lat, lng: selected.lng, synced: !isOffline };

    if (isOffline) {
      const q = [...readQueue(), report];
      writeQueue(q);
      setQueued(q);
      showToast('📥 Offline — report queued locally, will sync automatically');
    } else {
      try {
        await api.submitReport(report);
        showToast('✅ Report submitted and synced');
        refreshReports();
      } catch (e) {
        showToast(e.message || 'Submit failed — queuing locally instead');
        const q = [...readQueue(), report];
        writeQueue(q);
        setQueued(q);
      }
    }
    setDesc('');
  }

  return (
    <section className="animate-viewIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-panel border border-line rounded-[10px] p-4.5">
          <h3 className="text-[14.5px] font-semibold mb-1">{t('submit_report')}</h3>
          <p className="text-textDim text-xs mb-3.5">{t('report_sub')}</p>
          <div ref={mapRef} className="rounded-lg border border-line" style={{ height: 300 }} />
          <div className="flex flex-col gap-2.5 mt-3">
            <input readOnly value={selected ? `${selected.lat.toFixed(3)}, ${selected.lng.toFixed(3)}` : ''} placeholder="Selected location..." className="bg-panel2 border border-line rounded-lg px-3 py-2 text-sm" />
            <select value={type} onChange={(e) => setType(e.target.value)} className="bg-panel2 border border-line rounded-lg px-3 py-2 text-sm">
              <option>{t('type_landslide')}</option>
              <option>{t('type_flood')}</option>
              <option>{t('type_blockage')}</option>
              <option>{t('type_bridge')}</option>
            </select>
            <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={t('report_desc_ph')} className="bg-panel2 border border-line rounded-lg px-3 py-2 text-sm resize-none" />
            <button onClick={handleSubmit} className="bg-amber text-[#221703] font-bold text-sm px-4.5 py-2.5 rounded-lg hover:shadow-lg active:scale-95 transition">
              {t('submit')}
            </button>
          </div>
        </div>

        <div className="bg-panel border border-line rounded-[10px] p-4.5">
          <h3 className="text-[14.5px] font-semibold mb-3.5">{t('report_list_title')}</h3>
          {queued.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-red font-semibold mb-1.5">Queued offline ({queued.length})</div>
              {queued.map((r, i) => (
                <div key={i} className="text-xs text-textDim border-b border-dashed border-line py-1.5">{r.type} · {r.lat.toFixed(3)}, {r.lng.toFixed(3)}</div>
              ))}
            </div>
          )}
          {serverReports.length === 0 && queued.length === 0 && <div className="text-textDim text-sm">No reports submitted yet.</div>}
          {serverReports.map((r) => (
            <div key={r.id} className="py-2.5 border-b border-line text-[12.5px] animate-fadeSlideUp">
              <div className="flex justify-between">
                <strong className="text-[13px]">{r.type}</strong>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-[#1c2c1e] text-olive animate-popIn">Synced</span>
              </div>
              <div className="text-textDim mt-0.5">{r.description}</div>
              <div className="text-textDim text-[11px] mt-0.5">{r.lat.toFixed(3)}, {r.lng.toFixed(3)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
