import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from "@shared/schema";

// Use a default DATABASE_URL for development if not set
const DATABASE_URL = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/alashore_marine";

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create connection pool
const pool = mysql.createPool(DATABASE_URL);
export const db = drizzle(pool, { schema, mode: 'default' });