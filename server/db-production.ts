// Production MySQL database connection
// This file should be used in production environments
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from "@shared/schema";

// Production MySQL connection
const DATABASE_URL = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/alashore_marine";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set for production");
}

console.log('Using MySQL for production');

// Create connection pool for MySQL
const pool = mysql.createPool(DATABASE_URL);
export const db = drizzle(pool, { schema, mode: 'default' });