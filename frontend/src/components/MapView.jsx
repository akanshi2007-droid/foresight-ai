import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { api } from '../api';

function hazardIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="width:14px;height:14px;background:${color};border:2px solid #0c1520;border-radius:50%;box-shadow:0 0 0 4px ${color}33;"></div>`,
    iconSize: [14, 14],
  });
}
const vehicleIcon = L.divIcon({
  className: '',
  html: `<div style="width:12px;height:12px;background:#7fae7a;border:2px solid #0c1520;border-radius:3px;"></div>`,
  iconSize: [12, 12],
});
const SEV_COLOR = { high: '#ef5b4e', medium: '#f2a93b', low: '#35c3b6' };

export default function MapView({ t }) {
  const mapRef = useRef(null);
  const mapObj = useRef(null);
  const hazardLayer = useRef(null);
  const vehicleLayer = useRef(null);
  const vehicleMarkers = useRef({});
  const [layers, setLayers] = useState({ hazard: true, vehicle: true });

  useEffect(() => {
    if (mapObj.current) return;
    const map = L.map(mapRef.current).setView([25.6, 93.5], 6.2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 18,
    }).addTo(map);

    const hLayer = L.layerGroup().addTo(map);
    const vLayer = L.layerGroup().addTo(map);
    mapObj.current = map;
    hazardLayer.current = hLayer;
    vehicleLayer.current = vLayer;

    api.getAlerts().then((alerts) => {
      alerts.forEach((a) => {
        L.marker([a.lat, a.lng], { icon: hazardIcon(SEV_COLOR[a.severity] || '#f2a93b') })
          .addTo(hLayer).bindPopup(`<b>${a.type}</b><br>${a.place}`);
      });
    }).catch(() => {});

    async function pollVehicles() {
      try {
        const vehicles = await api.getVehicles();
        vehicles.forEach((v) => {
          if (vehicleMarkers.current[v.id]) {
            vehicleMarkers.current[v.id].setLatLng([v.lat, v.lng]);
          } else {
            vehicleMarkers.current[v.id] = L.marker([v.lat, v.lng], { icon: vehicleIcon })
              .addTo(vLayer).bindPopup(`<b>${v.reg_number}</b><br>${v.driver_name} — ${v.status}`);
          }
        });
      } catch (e) { /* backend offline — ignore for this poll */ }
    }
    pollVehicles();
    const interval = setInterval(pollVehicles, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mapObj.current) return;
    const map = mapObj.current;
    if (layers.hazard) map.addLayer(hazardLayer.current); else map.removeLayer(hazardLayer.current);
    if (layers.vehicle) map.addLayer(vehicleLayer.current); else map.removeLayer(vehicleLayer.current);
  }, [layers]);

  return (
    <section className="animate-viewIn">
      <div className="flex gap-2.5 mb-3.5 flex-wrap">
        {['hazard', 'vehicle'].map((key) => (
          <label key={key} className="flex items-center gap-1.5 bg-panel border border-line px-3 py-1.5 rounded-full text-xs cursor-pointer select-none hover:border-amber hover:-translate-y-0.5 transition-all">
            <input type="checkbox" checked={layers[key]} onChange={(e) => setLayers({ ...layers, [key]: e.target.checked })} className="accent-amber" />
            <span>{t(key === 'hazard' ? 'layer_hazards' : 'layer_vehicles')}</span>
          </label>
        ))}
      </div>
      <div ref={mapRef} className="rounded-[10px] border border-line" style={{ height: 'calc(100vh - 190px)' }} />
    </section>
  );
}
