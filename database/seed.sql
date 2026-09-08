-- Demo login: admin@aapda.in / aapda123

INSERT INTO users (name, email, password_hash, role) VALUES
  ('Aakanksha (Admin)', 'admin@aapda.in', '$2a$10$qntf0EXDzFjL/a9zhD7CtucRl8BdzVNYYsMlcCofNyYzcKPD1OKJG', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO alerts (severity, type, place, lat, lng) VALUES
  ('high', 'Flood', 'Dibrugarh–Tinsukia road', 27.48, 95.02),
  ('high', 'Landslide', 'NH-6, near Shillong', 25.57, 91.88),
  ('medium', 'Road Blockage', 'Imphal–Kohima corridor', 24.82, 93.94),
  ('medium', 'Bridge Damage', 'Brahmaputra crossing, Jorhat', 26.75, 94.22),
  ('low', 'Heavy Rainfall', 'Aizawl district', 23.73, 92.72),
  ('low', 'Connectivity Drop', 'Tuensang, Nagaland', 26.28, 94.83),
  ('high', 'Flash Flood Warning', 'Barak Valley', 24.83, 92.78)
ON CONFLICT DO NOTHING;

INSERT INTO vehicles (reg_number, driver_name, lat, lng, status) VALUES
  ('AS-01-TR-1187', 'R. Bora', 26.14, 91.73, 'en_route'),
  ('AS-07-TR-2291', 'M. Das', 27.48, 95.02, 'en_route'),
  ('MN-02-LG-0044', 'T. Singh', 24.82, 93.94, 'idle'),
  ('ML-05-TR-3312', 'K. Marak', 25.57, 91.88, 'en_route')
ON CONFLICT DO NOTHING;
