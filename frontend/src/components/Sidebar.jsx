import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../auth/AuthContext';

const NAV = [
  { to: '/app', label: 'nav_overview', end: true, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px]"><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>
  ) },
  { to: '/app/map', label: 'nav_map', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px]"><path d="M9 4 3 6.5v14L9 18l6 2.5L21 18v-14l-6 2.5" /><path d="M9 4v14M15 6.5v14" /></svg>
  ) },
  { to: '/app/route', label: 'nav_route', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px]"><circle cx="6" cy="19" r="2.2" /><circle cx="18" cy="5" r="2.2" /><path d="M6 16.8 C 6 11, 10 12, 12 9 C 14 6, 16 7, 17.6 6.6" /></svg>
  ) },
  { to: '/app/alerts', label: 'nav_alerts', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px]"><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4M12 17h.01" /></svg>
  ) },
  { to: '/app/reports', label: 'nav_reports', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px]"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>
  ) },
  { to: '/app/analytics', label: 'nav_analytics', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[17px] h-[17px]"><path d="M4 20V10M12 20V4M20 20v-7" /></svg>
  ) },
];

export default function Sidebar({ t, isOffline, setIsOffline }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="bg-bgAlt border-r border-line flex flex-col p-3.5 py-5">
      <div className="flex items-center gap-2.5 px-1.5 pb-5 animate-fadeSlideRight">
        <Logo size={34} />
        <div>
          <div className="font-display text-lg font-bold">AAPDA</div>
          <div className="text-[10.5px] text-textDim mt-0.5">{t('tagline')}</div>
        </div>
      </div>
      <nav className="flex flex-col gap-1 mt-1.5">
        {NAV.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            style={{ animationDelay: `${i * 0.05}s` }}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium border transition-colors animate-fadeSlideRight ` +
              (isActive
                ? 'bg-panel2 text-white border-line [&_svg]:stroke-amber'
                : 'text-textDim border-transparent hover:bg-panel hover:text-white')
            }
          >
            {item.icon}
            <span>{t(item.label)}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-3 border-t border-line animate-fadeSlideUp" style={{ animationDelay: '.3s' }}>
        <div className="flex items-center gap-2 text-xs text-textDim mb-2">
          <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red animate-pulseRing' : 'bg-olive animate-pulseRingSoft'}`} />
          <span>{isOffline ? '—' : t('online')}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-textDim mb-3">
          <span>{t('simulate_offline')}</span>
          <div
            onClick={() => setIsOffline(!isOffline)}
            className={`relative w-[34px] h-[18px] rounded-full cursor-pointer transition-colors ${isOffline ? 'bg-redDim' : 'bg-[#233448]'}`}
          >
            <div className={`absolute w-3.5 h-3.5 rounded-full top-0.5 transition-all ${isOffline ? 'left-[18px] bg-red' : 'left-0.5 bg-[#7f93a4]'}`} />
          </div>
        </div>
        <div className="text-xs text-textDim truncate mb-2">{user?.name}</div>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="w-full text-xs border border-line rounded-lg py-2 text-textDim hover:text-white hover:border-amber transition-colors"
        >
          {t('logout')}
        </button>
      </div>
    </aside>
  );
}
