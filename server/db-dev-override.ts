// Development override that uses existing PostgreSQL setup without affecting production
// This file allows us to use PostgreSQL in development while keeping MySQL compatibility for production
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Re-export the existing PostgreSQL schema as-is (it's already working)
export * from './schema-pg';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set for development");
}

console.log('Using PostgreSQL for development');
const sql = neon(DATABASE_URL);

// Import the working PostgreSQL schema
import * as schema from './schema-pg';
export const db = drizzle(sql, { schema });