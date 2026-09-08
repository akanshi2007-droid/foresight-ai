import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const FEATURES = [
  { icon: '🧠', title: 'AI Route Optimization', text: 'Predicts disruption risk and recommends the safest alternate route in real time.' },
  { icon: '🗺️', title: 'Real-Time GIS', text: 'Live road, bridge, and hazard visibility layered over terrain data.' },
  { icon: '📍', title: 'GPS Tracking', text: 'Live vehicle location, ETA, and delivery monitoring across the network.' },
  { icon: '🚨', title: 'Smart Alerts + Chatbot', text: 'Flood, landslide, and blockage alerts, with a built-in assistant for quick answers.' },
  { icon: '🌐', title: 'Multilingual Interface', text: 'English and हिन्दी support for every field user.' },
  { icon: '📱', title: 'Offline Field Reporting', text: 'Geo-tagged hazard reports that sync automatically once connectivity returns.' },
];
const STACK = ['React + Vite', 'Tailwind CSS', 'Node.js + Express', 'PostgreSQL', 'Python + FastAPI', 'Scikit-learn', 'Leaflet', 'JWT Auth'];
const WORKFLOW = [
  { n: '01', title: 'Data Sources', text: 'Weather, GPS, GIS/DEM, road feeds, and field reports.' },
  { n: '02', title: 'Node API', text: 'Express handles auth, alerts, reports, and vehicle data over PostgreSQL.' },
  { n: '03', title: 'ML Service', text: 'A Python/FastAPI microservice scores disruption risk for any route.' },
  { n: '04', title: 'GIS + Routing', text: 'Leaflet renders the scored route against live hazard layers.' },
  { n: '05', title: 'Output', text: 'Dashboard, alerts, analytics, and the field reporting flow — predict, decide, act.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg" style={{ backgroundImage: 'radial-gradient(1100px 600px at 15% -10%, rgba(53,195,182,.10), transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(242,169,59,.10), transparent 55%)' }}>
      <Navbar />

      <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-10 items-center px-[6vw] py-[8vh] lg:py-[10vh]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-teal bg-tealDim px-3 py-1.5 rounded-full mb-5 animate-fadeSlideUp">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulseRingSoft" /> SIH 2026 · PS 26002 · Team 4 Bits
          </div>
          <h1 className="font-display font-bold leading-[1.06] mb-5 animate-fadeSlideUp" style={{ fontSize: 'clamp(34px,4.4vw,58px)', animationDelay: '.12s' }}>
            When roads fail,<br />essential supplies <span className="text-amber">shouldn't.</span>
          </h1>
          <p className="text-textDim text-base max-w-[520px] mb-7 animate-fadeSlideUp" style={{ animationDelay: '.2s' }}>
            AAPDA is an AI-based smart logistics and accessibility intelligence platform for the North Eastern Region —
            fusing disaster alerts, GIS hazard mapping, live routing, and field reports into one system that keeps
            essentials moving, even when the roads don't.
          </p>
          <div className="flex gap-3.5 animate-fadeSlideUp" style={{ animationDelay: '.28s' }}>
            <Link to="/login"><button className="bg-amber text-[#221703] font-bold px-6 py-3.5 rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition">Launch Dashboard</button></Link>
            <a href="#features"><button className="border border-line px-5.5 py-3.5 rounded-lg hover:border-teal hover:-translate-y-0.5 transition">See Key Features</button></a>
          </div>
          <div className="flex gap-7 mt-9 animate-fadeSlideUp" style={{ animationDelay: '.36s' }}>
            <div><strong className="font-display text-[22px] block">6</strong><span className="text-[11.5px] text-textDim">Core capabilities</span></div>
            <div><strong className="font-display text-[22px] block">8</strong><span className="text-[11.5px] text-textDim">NER towns covered</span></div>
            <div><strong className="font-display text-[22px] block">2</strong><span className="text-[11.5px] text-textDim">Languages supported</span></div>
          </div>
        </div>

        <div className="relative h-[420px] hidden lg:block animate-fadeSlideUp" style={{ animationDelay: '.2s' }}>
          <div className="absolute bg-panel border border-line rounded-2xl p-4.5 shadow-2xl animate-floatSlow" style={{ top: 0, left: '10%', width: 230 }}>
            <h4 className="text-[12.5px] text-textDim font-semibold mb-2">Risk Score</h4>
            <div className="font-display text-[22px] font-bold">14 / 100</div>
            <div className="h-1.5 bg-[#22364a] rounded-md mt-2.5 overflow-hidden"><span className="block h-full bg-teal rounded-md" style={{ width: '14%' }} /></div>
          </div>
          <div className="absolute bg-panel border border-line rounded-2xl p-4.5 shadow-2xl animate-floatSlow" style={{ top: 150, left: 0, width: 210, animationDelay: '.6s' }}>
            <h4 className="text-[12.5px] text-textDim font-semibold mb-2">Active Alerts</h4>
            <div className="font-display text-[22px] font-bold text-red">7</div>
          </div>
          <div className="absolute bg-panel border border-line rounded-2xl p-4.5 shadow-2xl animate-floatSlow" style={{ top: 270, left: '44%', width: 230, animationDelay: '1.1s' }}>
            <h4 className="text-[12.5px] text-textDim font-semibold mb-2">Route Status</h4>
            <div className="font-display text-[22px] font-bold text-teal">Optimized</div>
          </div>
        </div>
      </section>

      <section className="px-[6vw] py-[8vh]" id="problem">
        <div className="max-w-[640px] mb-11">
          <div className="text-xs text-amber font-semibold mb-2.5">The Problem</div>
          <h2 className="font-display font-bold mb-2.5" style={{ fontSize: 'clamp(24px,2.6vw,34px)' }}>Data exists. Decisions don't.</h2>
          <p className="text-textDim text-[14.5px]">
            Floods and landslides disrupt routes across the NER. Roads and bridges become inaccessible, connectivity
            is unreliable, and weather, GPS, GIS, and field information stay fragmented across separate tools — so
            teams react instead of predicting.
          </p>
        </div>
      </section>

      <section className="px-[6vw] py-[8vh]" id="features">
        <div className="max-w-[640px] mb-11">
          <div className="text-xs text-amber font-semibold mb-2.5">Key Features</div>
          <h2 className="font-display font-bold mb-2.5" style={{ fontSize: 'clamp(24px,2.6vw,34px)' }}>One platform. Six critical capabilities.</h2>
          <p className="text-textDim text-[14.5px]">Everything a logistics operator, field team, or authority needs, in a single dashboard.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {FEATURES.map((f, i) => (
            <div key={f.title} style={{ animationDelay: `${i * 0.06}s` }} className="bg-panel border border-line rounded-2xl p-5.5 animate-fadeSlideUp hover:-translate-y-1.5 hover:border-teal transition-all">
              <span className="text-2xl mb-3.5 inline-block">{f.icon}</span>
              <h3 className="text-[15.5px] font-semibold mb-2">{f.title}</h3>
              <p className="text-textDim text-[13px]">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-[6vw] py-[8vh]" id="workflow">
        <div className="max-w-[640px] mb-11">
          <div className="text-xs text-amber font-semibold mb-2.5">System Architecture</div>
          <h2 className="font-display font-bold mb-2.5" style={{ fontSize: 'clamp(24px,2.6vw,34px)' }}>Predict. Decide. Act.</h2>
          <p className="text-textDim text-[14.5px]">Five stages turn raw signals into a route a driver can actually follow.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between">
          {WORKFLOW.map((w, i) => (
            <div key={w.n} style={{ animationDelay: `${i * 0.08}s` }} className="flex-1 pr-5 relative animate-fadeSlideUp">
              {i < WORKFLOW.length - 1 && <div className="hidden lg:block absolute top-[9px] left-[26px] right-[-10px] h-px bg-line" />}
              <span className="font-display text-[13px] text-amber font-bold">{w.n}</span>
              <h4 className="text-[14.5px] font-semibold mt-2.5 mb-1.5">{w.title}</h4>
              <p className="text-textDim text-[12.5px]">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-[6vw] py-[8vh]" id="stack">
        <div className="max-w-[640px] mb-11">
          <div className="text-xs text-amber font-semibold mb-2.5">Tech Stack</div>
          <h2 className="font-display font-bold mb-2.5" style={{ fontSize: 'clamp(24px,2.6vw,34px)' }}>Built on tools that scale to production.</h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {STACK.map((s) => <span key={s} className="border border-line px-4 py-2 rounded-full text-[12.5px] text-textDim hover:border-amber hover:text-white transition">{s}</span>)}
        </div>
      </section>

      <div className="mx-[6vw] mb-[8vh] rounded-[18px] border border-line p-14 px-[6vw] text-center relative overflow-hidden" style={{ background: 'linear-gradient(120deg, #142331, #182a3b)' }}>
        <h2 className="font-display font-bold mb-3.5" style={{ fontSize: 'clamp(22px,3vw,32px)' }}>Smarter routes. Safer access. Resilient logistics.</h2>
        <p className="text-textDim mb-6">Open the live dashboard to try route optimization, GIS alerts, and the bilingual assistant yourself.</p>
        <Link to="/login"><button className="bg-amber text-[#221703] font-bold px-6 py-3.5 rounded-lg hover:shadow-lg transition">Launch Dashboard →</button></Link>
      </div>

      <div className="px-[6vw] py-6 border-t border-line flex flex-col sm:flex-row justify-between gap-2 text-textDim text-xs">
        <span>4 Bits · SRM Institute of Science & Technology, Kattankulathur</span>
        <span>Smart India Hackathon 2026 · PS 26002</span>
      </div>
    </div>
  );
}
