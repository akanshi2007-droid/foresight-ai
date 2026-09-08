/**
 * In-memory data store used when DEMO_MODE=true (the default), so the
 * whole stack runs instantly with zero database setup — ideal for a
 * hackathon demo. Set DEMO_MODE=false and configure DATABASE_URL in .env
 * to run against real PostgreSQL (see routes/*.js for the Postgres path).
 */
export const demoUser = {
  id: 1,
  name: 'Aakanksha (Admin)',
  email: 'admin@aapda.in',
  // bcrypt hash of "aapda123"
  password_hash: '$2a$10$qntf0EXDzFjL/a9zhD7CtucRl8BdzVNYYsMlcCofNyYzcKPD1OKJG',
  role: 'admin',
};

export const alerts = [
  { id: 1, severity: 'high', type: 'Flood', place: 'Dibrugarh–Tinsukia road', lat: 27.48, lng: 95.02, created_at: new Date(Date.now() - 12 * 60000) },
  { id: 2, severity: 'high', type: 'Landslide', place: 'NH-6, near Shillong', lat: 25.57, lng: 91.88, created_at: new Date(Date.now() - 40 * 60000) },
  { id: 3, severity: 'medium', type: 'Road Blockage', place: 'Imphal–Kohima corridor', lat: 24.82, lng: 93.94, created_at: new Date(Date.now() - 60 * 60000) },
  { id: 4, severity: 'medium', type: 'Bridge Damage', place: 'Brahmaputra crossing, Jorhat', lat: 26.75, lng: 94.22, created_at: new Date(Date.now() - 120 * 60000) },
  { id: 5, severity: 'low', type: 'Heavy Rainfall', place: 'Aizawl district', lat: 23.73, lng: 92.72, created_at: new Date(Date.now() - 180 * 60000) },
  { id: 6, severity: 'low', type: 'Connectivity Drop', place: 'Tuensang, Nagaland', lat: 26.28, lng: 94.83, created_at: new Date(Date.now() - 300 * 60000) },
  { id: 7, severity: 'high', type: 'Flash Flood Warning', place: 'Barak Valley', lat: 24.83, lng: 92.78, created_at: new Date(Date.now() - 360 * 60000) },
];

export const vehicles = [
  { id: 1, reg_number: 'AS-01-TR-1187', driver_name: 'R. Bora', lat: 26.14, lng: 91.73, status: 'en_route' },
  { id: 2, reg_number: 'AS-07-TR-2291', driver_name: 'M. Das', lat: 27.48, lng: 95.02, status: 'en_route' },
  { id: 3, reg_number: 'MN-02-LG-0044', driver_name: 'T. Singh', lat: 24.82, lng: 93.94, status: 'idle' },
  { id: 4, reg_number: 'ML-05-TR-3312', driver_name: 'K. Marak', lat: 25.57, lng: 91.88, status: 'en_route' },
];

export const reports = [];
let reportIdCounter = 1;
export function nextReportId() { return reportIdCounter++; }

export const routeLogs = [];
