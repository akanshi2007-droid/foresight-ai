import { useEffect, useState } from 'react';

const TAG_CLASSES = {
  red: 'bg-redDim text-red',
  teal: 'bg-tealDim text-teal',
  amber: 'bg-amberDim text-amber',
  olive: 'bg-[#1c2c1e] text-olive',
};

export default function StatCard({ label, value, tag, tagColor = 'teal', delay = 0 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let cur = 0;
    const step = Math.max(1, Math.round(value / 24));
    const timer = setInterval(() => {
      cur += step;
      if (cur >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(cur);
    }, 24);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      className="bg-panel border border-line rounded-[10px] p-4 px-4.5 animate-fadeSlideUp transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#31485d]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex justify-between items-start">
        <span className="text-textDim text-xs">{label}</span>
        {tag && <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-semibold ${TAG_CLASSES[tagColor]}`}>{tag}</span>}
      </div>
      <div className="font-display text-[26px] font-bold mt-2">{display}</div>
    </div>
  );
}
