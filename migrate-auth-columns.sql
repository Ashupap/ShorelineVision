-- Migration script to add authentication columns to existing users table
-- Run this with: psql -d alashore_marine -f migrate-auth-columns.sql

-- Add missing authentication columns
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS username VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS password VARCHAR(255),
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user',
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;

-- Update existing users to have usernames based on email
UPDATE users 
SET username = SPLIT_PART(email, '@', 1) 
WHERE username IS NULL AND email IS NOT NULL;

-- Set a default password for existing users (they'll need to reset)
UPDATE users 
SET password = '$scrypt$N=16384,r=8,p=1$placeholder$placeholder' 
WHERE password IS NULL;

-- Make username and password NOT NULL after setting defaults
-- (We'll do this in a separate step to avoid issues)

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Display final structure
\d users;