import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import Overview from './Overview';
import MapView from '../components/MapView';
import RouteOptimizer from '../components/RouteOptimizer';
import AlertsPanel from '../components/AlertsPanel';
import FieldReports from '../components/FieldReports';
import Analytics from './Analytics';
import { useI18n } from '../i18n';

const TITLES = {
  '/app': 'nav_overview', '/app/map': 'nav_map', '/app/route': 'nav_route',
  '/app/alerts': 'nav_alerts', '/app/reports': 'nav_reports', '/app/analytics': 'nav_analytics',
};

export default function Dashboard() {
  const { lang, setLang, t } = useI18n();
  const [isOffline, setIsOffline] = useState(false);
  const [toast, setToast] = useState(null);
  const location = useLocation();

  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(null), 2400);
  }

  const titleKey = TITLES[location.pathname] || 'nav_overview';

  return (
    <div className="grid grid-cols-[232px_1fr] h-screen">
      <Sidebar t={t} isOffline={isOffline} setIsOffline={setIsOffline} />
      <main className="overflow-y-auto p-5.5 px-7.5 pb-16">
        <div className="flex items-center justify-between mb-5.5 animate-fadeSlideUp">
          <div>
            <div className="text-[22px] font-bold font-display">{t(titleKey)}</div>
            <div className="text-textDim text-[13px] mt-0.5">{t('page_sub_overview')}</div>
          </div>
          <div className="flex bg-panel border border-line rounded-lg p-0.5 gap-0.5">
            <button onClick={() => setLang('en')} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${lang === 'en' ? 'bg-panel2 text-amber' : 'text-textDim'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition font-hi ${lang === 'hi' ? 'bg-panel2 text-amber' : 'text-textDim'}`}>हिन्दी</button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Overview t={t} />} />
          <Route path="/map" element={<MapView t={t} />} />
          <Route path="/route" element={<RouteOptimizer t={t} showToast={showToast} />} />
          <Route path="/alerts" element={<AlertsPanel t={t} />} />
          <Route path="/reports" element={<FieldReports t={t} isOffline={isOffline} showToast={showToast} />} />
          <Route path="/analytics" element={<Analytics t={t} />} />
        </Routes>
      </main>

      <Chatbot lang={lang} />

      {toast && (
        <div className="fixed left-1/2 bottom-6 -translate-x-1/2 bg-panel2 border border-line border-l-[3px] border-l-olive px-4.5 py-2.5 rounded-lg text-[12.5px] z-[80] animate-fadeSlideUp">
          {toast}
        </div>
      )}
    </div>
  );
}
