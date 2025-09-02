import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

console.log('Database connection established');

// Configure postgres client for local PostgreSQL
const sql = postgres(DATABASE_URL, {
  prepare: false
});
export const db = drizzle(sql, { schema });