import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPgSimple from "connect-pg-simple";
import { storage } from "./storage";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const PgSession = connectPgSimple(session);
  
  // Use PostgreSQL connection
  const databaseUrl = process.env.DATABASE_URL || "postgresql://alashore_user:Passw0rd_2025@localhost:5432/alashore_marine";
  
  const sessionStore = new PgSession({
    conString: databaseUrl,
    tableName: 'sessions',
    createTableIfMissing: true,
    ttl: sessionTtl / 1000 // convert to seconds
  });
  
  return session({
    secret: process.env.SESSION_SECRET || "dev-session-secret-key-change-in-production",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  // Simple login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Simple admin credentials - you can change these
      if (username === 'admin' && password === 'admin123') {
        const adminUser = {
          id: 'admin-user',
          email: 'admin@alashoremarine.com',
          firstName: 'Admin',
          lastName: 'User'
        };
        
        // Create the user in database if it doesn't exist
        await storage.upsertUser(adminUser);
        
        // Set user session
        (req.session as any).user = adminUser;
        
        res.json({ 
          success: true, 
          user: adminUser,
          message: 'Login successful' 
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Get current user
  app.get("/api/auth/user", (req, res) => {
    const user = (req.session as any)?.user;
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Logout failed" });
      } else {
        res.json({ message: "Logged out successfully" });
      }
    });
  });
}

// Simple authentication middleware
export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user = (req.session as any)?.user;

  if (user) {
    return next();
  }

  res.status(401).json({ message: "Unauthorized" });
};