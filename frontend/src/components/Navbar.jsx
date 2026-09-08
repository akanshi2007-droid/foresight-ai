import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between px-[6vw] py-4 backdrop-blur-md bg-bg/70 border-b border-line animate-fadeSlideUp">
      <div className="flex items-center gap-2.5">
        <Logo size={30} />
        <span className="font-display text-lg font-bold tracking-wide">AAPDA</span>
      </div>
      <div className="hidden md:flex gap-7 text-sm text-textDim">
        <a href="#problem" className="hover:text-white transition-colors">Problem</a>
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#stack" className="hover:text-white transition-colors">Tech Stack</a>
        <a href="#workflow" className="hover:text-white transition-colors">How it works</a>
      </div>
      <Link to="/login">
        <button className="bg-amber text-[#221703] font-bold text-sm px-4.5 py-2.5 rounded-lg hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition-transform">
          Launch Dashboard →
        </button>
      </Link>
    </div>
  );
}
