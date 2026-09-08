import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DEMO_MODE, query } from '../db.js';
import { demoUser } from '../demoStore.js';

const router = Router();

function signToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '12h' }
  );
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  let user;
  if (DEMO_MODE) {
    user = email.toLowerCase() === demoUser.email ? demoUser : null;
  } else {
    const result = await query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    user = result.rows[0];
  }
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.post('/register', async (req, res) => {
  if (DEMO_MODE) {
    return res.status(400).json({ error: 'Registration is disabled in DEMO_MODE — use admin@aapda.in / aapda123, or set DEMO_MODE=false with Postgres configured.' });
  }
  const { name, email, password, role } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password are required' });

  const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
  if (existing.rows.length) return res.status(409).json({ error: 'Email already registered' });

  const hash = await bcrypt.hash(password, 10);
  const result = await query(
    'INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role',
    [name, email.toLowerCase(), hash, role || 'operator']
  );
  const user = result.rows[0];
  res.status(201).json({ token: signToken(user), user });
});

export default router;
