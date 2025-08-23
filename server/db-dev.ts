import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from "@shared/schema";

// Create SQLite database for development
const sqlite = new Database('dev-database.db');
export const db = drizzle(sqlite, { schema });

// Create tables if they don't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    sid TEXT PRIMARY KEY,
    sess TEXT NOT NULL,
    expire TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
    email TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    profile_image_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    category TEXT NOT NULL,
    published INTEGER DEFAULT 0,
    author_id TEXT REFERENCES users(id),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    avatar TEXT,
    published INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    featured_image TEXT,
    category TEXT NOT NULL,
    specifications TEXT,
    published INTEGER DEFAULT 1,
    "order" INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert some sample data for development
const sampleData = `
  INSERT OR IGNORE INTO testimonials (name, company, content, rating, published) VALUES
  ('John Smith', 'Tech Solutions Inc.', 'Amazing product that transformed our business operations.', 5, 1),
  ('Sarah Johnson', 'Digital Innovations', 'Excellent customer service and reliable products.', 5, 1),
  ('Mike Brown', 'Future Systems', 'Best investment we made this year. Highly recommended.', 5, 1);
  
  INSERT OR IGNORE INTO products (name, description, category, published) VALUES
  ('Smart Widget Pro', 'Advanced smart widget with AI capabilities for modern businesses.', 'Technology', 1),
  ('Business Suite', 'Complete business management solution for growing companies.', 'Software', 1),
  ('Data Analytics Tool', 'Powerful analytics platform for data-driven decision making.', 'Analytics', 1);
  
  INSERT OR IGNORE INTO blog_posts (title, slug, excerpt, content, category, published) VALUES
  ('Welcome to Our Platform', 'welcome-to-our-platform', 'Learn about our innovative solutions and how they can help your business grow.', 'This is our first blog post introducing our platform and services...', 'Company News', 1),
  ('Industry Trends 2024', 'industry-trends-2024', 'Discover the latest trends shaping our industry this year.', 'The industry is evolving rapidly with new technologies...', 'Industry', 1);
`;

sqlite.exec(sampleData);

console.log('Development database initialized with sample data');