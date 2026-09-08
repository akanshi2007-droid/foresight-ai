import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export const DEMO_MODE = (process.env.DEMO_MODE || 'true').toLowerCase() === 'true';

export const pool = DEMO_MODE
  ? null
  : new Pool({ connectionString: process.env.DATABASE_URL });

export async function query(text, params) {
  if (DEMO_MODE) throw new Error('query() called while DEMO_MODE=true');
  return pool.query(text, params);
}
