import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Logo from '../components/Logo';

export default function Login() {
  const [email, setEmail] = useState('admin@aapda.in');
  const [password, setPassword] = useState('aapda123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4" style={{ backgroundImage: 'radial-gradient(900px 500px at 80% 0%, rgba(242,169,59,.08), transparent 55%)' }}>
      <div className="w-full max-w-[380px] animate-fadeSlideUp">
        <Link to="/" className="flex items-center gap-2.5 mb-8 justify-center">
          <Logo size={32} />
          <span className="font-display text-xl font-bold">AAPDA</span>
        </Link>
        <div className="bg-panel border border-line rounded-2xl p-7">
          <h2 className="font-display text-xl font-bold mb-1">Command Center Login</h2>
          <p className="text-textDim text-xs mb-6">Sign in to access the NER logistics dashboard.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="text-[11.5px] text-textDim block mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-panel2 border border-line rounded-lg px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="text-[11.5px] text-textDim block mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-panel2 border border-line rounded-lg px-3 py-2.5 text-sm" />
            </div>
            {error && <div className="text-red text-xs bg-redDim rounded-lg px-3 py-2">{error}</div>}
            <button type="submit" disabled={loading} className="bg-amber text-[#221703] font-bold py-2.5 rounded-lg mt-1.5 hover:shadow-lg active:scale-95 transition disabled:opacity-80">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className="text-textDim text-[11px] mt-5 text-center">
            Demo credentials are pre-filled — this is a hackathon build (DEMO_MODE=true).
          </p>
        </div>
      </div>
    </div>
  );
}
