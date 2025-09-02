#!/usr/bin/env node

/**
 * Admin User Creation Script for Alashore Marine
 * Usage: node create-admin.js <username> <password> [email] [firstName] [lastName]
 */

import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdmin() {
  const [,, username, password, email, firstName, lastName] = process.argv;

  if (!username || !password) {
    console.error("❌ Error: Username and password are required");
    console.log("\n📖 Usage:");
    console.log("node create-admin.js <username> <password> [email] [firstName] [lastName]");
    console.log("\n📝 Examples:");
    console.log("node create-admin.js admin mySecurePassword123");
    console.log("node create-admin.js admin myPass admin@alashore.com John Doe");
    process.exit(1);
  }

  if (password.length < 6) {
    console.error("❌ Error: Password must be at least 6 characters long");
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("❌ Error: DATABASE_URL not found in environment variables");
    console.error("Make sure you have a .env file with DATABASE_URL set");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log("🔗 Connecting to database...");
    
    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT username FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      console.error(`❌ Error: User '${username}' already exists`);
      process.exit(1);
    }

    // Hash the password
    console.log("🔐 Hashing password...");
    const hashedPassword = await hashPassword(password);

    // Create the user
    console.log("👤 Creating admin user...");
    const result = await pool.query(
      `INSERT INTO users (username, password, email, "firstName", "lastName", role, "createdAt", "updatedAt") 
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
       RETURNING id, username, email, "firstName", "lastName", role`,
      [
        username,
        hashedPassword,
        email || null,
        firstName || null,
        lastName || null,
        "admin"
      ]
    );

    const newUser = result.rows[0];

    console.log("\n✅ Admin user created successfully!");
    console.log("📋 User Details:");
    console.log(`   ID: ${newUser.id}`);
    console.log(`   Username: ${newUser.username}`);
    console.log(`   Email: ${newUser.email || 'Not provided'}`);
    console.log(`   Name: ${[newUser.firstName, newUser.lastName].filter(Boolean).join(' ') || 'Not provided'}`);
    console.log(`   Role: ${newUser.role}`);
    
    console.log("\n🚀 You can now login at:");
    console.log("   Development: http://localhost:5000/meadmin");
    console.log("   Production: https://yourdomain.com/meadmin");

  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error("💡 Tip: Make sure PostgreSQL is running and DATABASE_URL is correct");
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createAdmin();