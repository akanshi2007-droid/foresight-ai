import { useState } from 'react';

const KB = [
  { keys: ['report', 'hazard', 'submit', 'landslide', 'flood'], en: "To report a hazard: open Field Reports, tap the location on the map, choose the hazard type, add a short description, and submit. Reports queue automatically if you're offline.", hi: 'खतरे की रिपोर्ट करने के लिए: फील्ड रिपोर्ट खोलें, मानचित्र पर स्थान चुनें, प्रकार चुनें और सबमिट करें।' },
  { keys: ['route', 'safest', 'optimi', 'path'], en: 'The AI Route Optimizer scores disruption risk using a weighted model over hazard density and live weather, then suggests the safest alternate path.', hi: 'एआई मार्ग अनुकूलक जोखिम स्कोर के आधार पर सबसे सुरक्षित वैकल्पिक मार्ग सुझाता है।' },
  { keys: ['alert', 'warning', 'current', 'active'], en: 'Check the Smart Alerts tab for the full, filterable list of active flood, landslide, and blockage alerts.', hi: 'सक्रिय अलर्ट की पूरी सूची के लिए स्मार्ट अलर्ट टैब देखें।' },
  { keys: ['emergency', 'helpline', 'contact', 'number'], en: 'National Disaster Management helpline: 1078 (toll-free). In a life-threatening emergency, always call 112 first.', hi: 'राष्ट्रीय आपदा प्रबंधन हेल्पलाइन: 1078। आपात स्थिति में हमेशा 112 पर कॉल करें।' },
  { keys: ['offline', 'connectivity', 'sync'], en: 'AAPDA is built for low-connectivity areas: field reports are cached locally and sync automatically once a connection is available.', hi: 'AAPDA कम कनेक्टिविटी वाले क्षेत्रों के लिए बनाया गया है और कनेक्शन मिलते ही सिंक हो जाता है।' },
  { keys: ['who', 'what is', 'about', 'aapda'], en: 'AAPDA is an AI-based smart logistics and accessibility intelligence platform for the North Eastern Region.', hi: 'AAPDA पूर्वोत्तर क्षेत्र के लिए एक एआई-आधारित स्मार्ट लॉजिस्टिक्स प्लेटफॉर्म है।' },
  { keys: ['login', 'password', 'account'], en: 'Demo login: admin@aapda.in / aapda123.', hi: 'डेमो लॉगिन: admin@aapda.in / aapda123' },
];
const FALLBACK = { en: 'I can help with hazard reporting, route safety, active alerts, offline sync, or emergency helplines.', hi: 'मैं खतरे की रिपोर्टिंग, मार्ग सुरक्षा या आपातकालीन हेल्पलाइन में मदद कर सकता हूँ।' };
const SUGGESTIONS = [
  { en: 'How do I report a hazard?', hi: 'खतरे की रिपोर्ट कैसे करें?' },
  { en: 'Emergency helpline number?', hi: 'आपातकालीन हेल्पलाइन नंबर?' },
  { en: 'How does route optimization work?', hi: 'मार्ग अनुकूलन कैसे काम करता है?' },
];

export default function Chatbot({ lang }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ who: 'bot', text: lang === 'hi' ? 'नमस्ते! मैं AAPDA सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?' : "Hi! I'm the AAPDA Assistant. Ask me about hazard reporting, routes, or alerts." }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');

  function botReply(query) {
    const q = query.toLowerCase();
    const hit = KB.find((item) => item.keys.some((k) => q.includes(k)));
    return hit ? hit[lang] : FALLBACK[lang];
  }

  function send(text) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { who: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { who: 'bot', text: botReply(text) }]);
    }, 600 + Math.random() * 400);
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-amber shadow-xl flex items-center justify-center z-50 animate-fabPulse hover:scale-110 hover:-rotate-6 active:scale-90 transition-transform"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#221703" strokeWidth="1.8" className="w-6 h-6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" /></svg>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[340px] h-[460px] bg-panel border border-line rounded-2xl flex flex-col overflow-hidden shadow-2xl z-50 animate-popIn">
          <div className="px-4 py-3.5 bg-panel2 border-b border-line flex justify-between items-center">
            <div>
              <strong className="text-[13.5px]">AAPDA Assistant</strong><br />
              <span className="text-[11px] text-olive">● Online</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-textDim hover:text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-2.5">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[82%] px-3 py-2 rounded-xl text-[12.8px] leading-snug animate-popIn ${m.who === 'bot' ? 'bg-panel2 self-start rounded-bl-sm' : 'bg-amberDim text-[#f6dfae] self-end rounded-br-sm'}`}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="bg-panel2 self-start rounded-xl rounded-bl-sm px-3 py-2 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-textDim animate-dotBlink" />
                <span className="w-1.5 h-1.5 rounded-full bg-textDim animate-dotBlink" style={{ animationDelay: '.15s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-textDim animate-dotBlink" style={{ animationDelay: '.3s' }} />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 px-3.5 pb-2.5">
            {SUGGESTIONS.map((s) => (
              <button key={s.en} onClick={() => send(s[lang])} className="bg-panel2 border border-line text-textDim text-[11px] px-2.5 py-1.5 rounded-full hover:border-amber hover:text-white active:scale-95 transition">
                {s[lang]}
              </button>
            ))}
          </div>
          <div className="flex border-t border-line">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent px-3.5 py-3 text-sm outline-none"
            />
            <button onClick={() => send(input)} className="text-amber font-bold px-4">→</button>
          </div>
        </div>
      )}
    </>
  );
}
