import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "@shared/schema";

// Use the DATABASE_URL provided by Replit
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const db = drizzle(pool, { schema });