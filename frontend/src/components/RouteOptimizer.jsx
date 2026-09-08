import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { api } from '../api';

const TOWN_NAMES = ['Guwahati', 'Dibrugarh', 'Imphal', 'Shillong', 'Agartala', 'Aizawl', 'Kohima', 'Itanagar'];

function lerp(a, b, t) { return a + (b - a) * t; }
function pointOnPath(pts, t) {
  const segCount = pts.length - 1;
  const segT = t * segCount;
  const seg = Math.min(Math.floor(segT), segCount - 1);
  const localT = segT - seg;
  return [lerp(pts[seg][0], pts[seg + 1][0], localT), lerp(pts[seg][1], pts[seg + 1][1], localT)];
}
function animateLine(map, pts, options, duration) {
  const line = L.polyline([pts[0]], options).addTo(map);
  const start = performance.now();
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const steps = Math.max(2, Math.round(t * 40));
    const drawn = [];
    for (let i = 0; i <= steps; i++) drawn.push(pointOnPath(pts, t * (i / steps)));
    line.setLatLngs(drawn);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  return line;
}

export default function RouteOptimizer({ t, showToast }) {
  const mapRef = useRef(null);
  const mapObj = useRef(null);
  const linesRef = useRef([]);
  const [origin, setOrigin] = useState('Guwahati');
  const [destination, setDestination] = useState('Dibrugarh');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (mapObj.current) return;
    const map = L.map(mapRef.current).setView([25.6, 93.5], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map);
    mapObj.current = map;
  }, []);

  async function handleOptimize() {
    if (origin === destination) { showToast('⚠️ Choose two different towns'); return; }
    setLoading(true);
    setResult(null);
    try {
      const data = await api.optimizeRoute(origin, destination);
      const map = mapObj.current;
      linesRef.current.forEach((l) => map.removeLayer(l));
      linesRef.current = [];

      map.fitBounds(L.latLngBounds([...data.path, ...data.blocked_path]).pad(0.3));
      const blockedLine = animateLine(map, data.blocked_path, { color: '#ef5b4e', weight: 3, dashArray: '6,6', opacity: 0.6 }, 700);
      const safeLine = animateLine(map, data.path, { color: '#35c3b6', weight: 4 }, 900);
      linesRef.current.push(blockedLine, safeLine);
      L.marker(data.path[0]).addTo(map).bindPopup(origin);
      L.marker(data.path[data.path.length - 1]).addTo(map).bindPopup(destination);

      setResult(data);
      showToast('🧠 Route optimized by the AAPDA ML service');
    } catch (e) {
      showToast(e.message || 'Could not reach the backend/ML service');
    } finally {
      setLoading(false);
    }
  }

  const riskColor = result ? (result.risk_score < 25 ? '#35c3b6' : result.risk_score < 55 ? '#f2a93b' : '#ef5b4e') : '#35c3b6';

  return (
    <section className="animate-viewIn">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 items-start">
        <div className="bg-panel border border-line rounded-[10px] p-4.5">
          <h3 className="text-[14.5px] font-semibold mb-3.5">{t('route_title')}</h3>
          <p className="text-textDim text-xs -mt-2 mb-3.5">{t('route_sub')}</p>
          <div className="grid grid-cols-2 gap-3 mb-3.5">
            <div>
              <label className="text-[11.5px] text-textDim block mb-1.5">{t('origin')}</label>
              <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full bg-panel2 border border-line rounded-lg px-2.5 py-2 text-sm">
                {TOWN_NAMES.map((tn) => <option key={tn}>{tn}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11.5px] text-textDim block mb-1.5">{t('destination')}</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-panel2 border border-line rounded-lg px-2.5 py-2 text-sm">
                {TOWN_NAMES.map((tn) => <option key={tn}>{tn}</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={handleOptimize}
            disabled={loading}
            className="relative bg-amber text-[#221703] font-bold text-sm px-4.5 py-2.5 rounded-lg hover:shadow-lg transition active:scale-95 disabled:opacity-80"
          >
            {loading ? <span className="inline-block w-4 h-4 border-2 border-[#22170359] border-t-[#221703] rounded-full animate-spin" /> : t('find_route')}
          </button>

          {result && (
            <div className="mt-4 animate-fadeSlideUp">
              <div className="flex justify-between border-b border-line py-1.5 text-sm"><span className="text-textDim">{t('risk_score')}</span><strong>{result.risk_score} / 100</strong></div>
              <div className="h-2 bg-[#22364a] rounded-md overflow-hidden my-2">
                <div className="h-full rounded-md transition-all duration-1000" style={{ width: `${result.risk_score}%`, background: riskColor }} />
              </div>
              <div className="flex justify-between border-b border-line py-1.5 text-sm"><span className="text-textDim">{t('distance')}</span><strong>{result.distance_km} km</strong></div>
              <div className="flex justify-between border-b border-line py-1.5 text-sm"><span className="text-textDim">{t('eta')}</span><strong>{result.eta_hours} hrs</strong></div>
              <div className="flex justify-between border-b border-line py-1.5 text-sm"><span className="text-textDim">{t('hazards_avoided')}</span><strong>{result.hazards_avoided}</strong></div>
              <div className="flex justify-between py-1.5 text-sm"><span className="text-textDim">{t('recommendation')}</span><strong className="text-right ml-4">{result.recommendation}</strong></div>
            </div>
          )}
        </div>
        <div className="bg-panel border border-line rounded-[10px] p-4.5">
          <h3 className="text-[14.5px] font-semibold mb-3.5">{t('route_map_title')}</h3>
          <div ref={mapRef} className="rounded-lg border border-line" style={{ height: 360 }} />
        </div>
      </div>
    </section>
  );
}
