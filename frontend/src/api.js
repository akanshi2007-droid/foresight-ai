// Base URL: empty string works with the Vite dev proxy (see vite.config.js),
// which forwards /api/* to the Express backend at http://127.0.0.1:8000.
const BASE = import.meta.env.VITE_API_BASE || '';

function authHeaders() {
  const token = localStorage.getItem('aapda_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${path} failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getAlerts: (severity) => request(`/api/alerts${severity && severity !== 'all' ? `?severity=${severity}` : ''}`),
  getVehicles: () => request('/api/vehicles'),
  getTowns: () => request('/api/route/towns'),
  optimizeRoute: (origin, destination) => request('/api/route/optimize', { method: 'POST', body: JSON.stringify({ origin, destination }) }),
  getReports: () => request('/api/reports'),
  submitReport: (report) => request('/api/reports', { method: 'POST', body: JSON.stringify(report) }),
  getAnalytics: () => request('/api/analytics/summary'),
};
