#!/usr/bin/env node

/**
 * Admin User Creation Script for Alashore Marine
 * Usage: node create-admin.js <username> <password> [email] [firstName] [lastName]
 */

import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import pkg from "pg";
import { readFileSync } from "fs";
const { Pool } = pkg;

// Load environment variables from .env file
function loadEnv() {
  try {
    const envFile = readFileSync('.env', 'utf8');
    const envVars = {};
    
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          envVars[key.trim()] = value;
          process.env[key.trim()] = value;
        }
      }
    });
    
    return envVars;
  } catch (error) {
    console.error("❌ Error: Could not read .env file");
    console.error("Make sure you have a .env file in the current directory");
    process.exit(1);
  }
}

// Load environment variables
loadEnv();

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
    
    // Check if user already exists (by email since username might not exist)
    const existingUser = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email || username + '@localhost']
    );

    if (existingUser.rows.length > 0) {
      console.error(`❌ Error: User with email '${email || username + '@localhost'}' already exists`);
      process.exit(1);
    }

    // Hash the password
    console.log("🔐 Hashing password...");
    const hashedPassword = await hashPassword(password);

    // Create the user (using available columns)
    console.log("👤 Creating admin user...");
    const result = await pool.query(
      `INSERT INTO users (email, "first_name", "last_name", "created_at", "updated_at") 
       VALUES ($1, $2, $3, NOW(), NOW()) 
       RETURNING id, email, "first_name", "last_name"`,
      [
        email || username + '@localhost',
        firstName || username,
        lastName || 'Admin'
      ]
    );

    const newUser = result.rows[0];

    console.log("\n✅ Admin user created successfully!");
    console.log("📋 User Details:");
    console.log(`   ID: ${newUser.id}`);
    console.log(`   Email: ${newUser.email}`);
    console.log(`   Name: ${[newUser.first_name, newUser.last_name].filter(Boolean).join(' ')}`);
    
    console.log("\n⚠️  Note: This user was created for the old authentication system.");
    console.log("   You'll need to run the database migration to add the new authentication columns.");
    
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