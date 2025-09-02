# Alashore Marine Website - Complete VPS Deployment Guide

This guide will walk you through deploying the Alashore Marine seafood company website on your Ubuntu VPS from scratch.

## Prerequisites

- Ubuntu VPS with root/sudo access
- Domain name (optional, can use IP address)
- At least 2GB RAM recommended

## Step 1: Initial Server Setup

### 1.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Required Software
```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL Server
sudo apt install postgresql postgresql-contrib -y

# Install Nginx
sudo apt install nginx -y

# Install PM2 globally
sudo npm install pm2 -g

# Install Git
sudo apt install git -y
```

### 1.3 Configure PostgreSQL
```bash
# Switch to postgres user
sudo -u postgres psql

# Inside PostgreSQL prompt:
CREATE DATABASE alashore_marine;
CREATE USER alashore_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE alashore_marine TO alashore_user;
\q

# Configure PostgreSQL for local connections
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Add this line before other rules:
# local   alashore_marine    alashore_user                     md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

## Step 2: Application Setup

### 2.1 Create Application Directory
```bash
sudo mkdir -p /var/www/alashore-marine
cd /var/www/alashore-marine
```

### 2.2 Upload/Copy Application Files
```bash
# Option 1: If you have the files locally, copy them to the server
# Option 2: Clone from Git repository (if available)
# Option 3: Upload via SCP/SFTP

# For this example, assuming files are copied to:
# /var/www/alashore-marine/ShorelineVision/

# Set proper ownership
sudo chown -R $USER:$USER /var/www/alashore-marine/
```

### 2.3 Install Dependencies and Build
```bash
cd /var/www/alashore-marine/ShorelineVision

# Install Node.js dependencies
npm install

# Install required PostgreSQL packages
npm install connect-pg-simple

# Build the application
npm run build
```

## Step 3: Environment Configuration

### 3.1 Create Production Environment File
```bash
nano .env.production
```

Add the following content:
```env
NODE_ENV=production
DATABASE_URL=postgresql://alashore_user:your_secure_password@localhost:5432/alashore_marine
SESSION_SECRET=your-super-secret-session-key-change-this-in-production-make-it-long-and-random
PORT=5000
```

### 3.2 Create PM2 Ecosystem File
```bash
nano ecosystem.config.cjs
```

Add the following content:
```javascript
module.exports = {
  apps: [
    {
      name: 'alashore-marine',
      script: 'dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://alashore_user:your_secure_password@localhost:5432/alashore_marine',
        SESSION_SECRET: 'your-super-secret-session-key-change-this-in-production-make-it-long-and-random',
        PORT: '5000'
      },
      error_file: '/var/log/pm2/alashore-marine-error.log',
      out_file: '/var/log/pm2/alashore-marine-out.log',
      log_file: '/var/log/pm2/alashore-marine-combined.log'
    }
  ]
};
```

## Step 4: Database Schema Setup

### 4.1 Initialize Database Tables
```bash
# Push the database schema
npm run db:push

# If you get errors, force push
npm run db:push --force
```

## Step 5: Fix Authentication System

### 5.1 Create Simple Auth System
```bash
nano server/simpleauth.ts
```

Add this content:
```typescript
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPgSimple from "connect-pg-simple";
import { storage } from "./storage";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000;
  const PgSession = connectPgSimple(session);
  
  const databaseUrl = process.env.DATABASE_URL || "postgresql://alashore_user:your_secure_password@localhost:5432/alashore_marine";
  
  const sessionStore = new PgSession({
    conString: databaseUrl,
    tableName: 'sessions',
    createTableIfMissing: true,
    ttl: sessionTtl / 1000
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

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (username === 'admin' && password === 'admin123') {
        const adminUser = {
          id: 'admin-user',
          email: 'admin@alashoremarine.com',
          firstName: 'Admin',
          lastName: 'User'
        };
        
        await storage.upsertUser(adminUser);
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

  app.get("/api/auth/user", (req, res) => {
    const user = (req.session as any)?.user;
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });

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

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user = (req.session as any)?.user;
  if (user) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};
```

### 5.2 Update Routes File
```bash
nano server/routes.ts
```

Find this line (around line 5):
```typescript
import { setupAuth, isAuthenticated } from "./replitAuth";
```

Change it to:
```typescript
import { setupAuth, isAuthenticated } from "./simpleauth";
```

### 5.3 Install Required PostgreSQL Session Package
```bash
# Install the PostgreSQL session store package
npm install connect-pg-simple

# Also ensure PostgreSQL driver is installed
npm install pg @types/pg
```

### 5.4 Rebuild Application
```bash
npm run build
```

## Step 6: PM2 Process Management

### 6.1 Create Log Directory
```bash
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2
```

### 6.2 Start Application with PM2
```bash
# Stop any existing processes
pm2 delete all

# Start the application
pm2 start ecosystem.config.cjs --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command it gives you (usually starts with sudo env PATH=...)
```

### 6.3 Verify Application is Running
```bash
# Check PM2 status
pm2 status

# Check if app is listening on port 5000
netstat -tulpn | grep :5000

# Check application logs
pm2 logs alashore-marine

# Test the application directly
curl http://localhost:5000/
```

## Step 7: Nginx Configuration

### 7.1 Remove Default Nginx Site
```bash
sudo rm /etc/nginx/sites-enabled/default
```

### 7.2 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/alashore-marine
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Replace with your domain or use _

    # Serve favicon files directly
    location ~ ^/(favicon\.ico|favicon\.png|favicon-16x16\.png|favicon-32x32\.png|apple-touch-icon\.png|android-chrome-192x192\.png|android-chrome-512x512\.png|site\.webmanifest)$ {
        root /var/www/alashore-marine/ShorelineVision/client/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Serve static files directly
    location /uploads/ {
        alias /var/www/alashore-marine/ShorelineVision/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /attached_assets/ {
        alias /var/www/alashore-marine/ShorelineVision/attached_assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API routes
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
    }

    # All other requests to the app
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
    }
}
```

### 7.3 Enable the Site
```bash
# Create symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/alashore-marine /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx

# Restart nginx to be sure
sudo systemctl restart nginx
```

## Step 8: Firewall Configuration

### 8.1 Configure UFW Firewall
```bash
# Enable firewall
sudo ufw enable

# Allow SSH (important!)
sudo ufw allow ssh

# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Check firewall status
sudo ufw status
```

## Step 9: Testing and Verification

### 9.1 Test Application
```bash
# Test local application
curl http://localhost:5000/

# Test through nginx
curl http://your-server-ip/

# Test API endpoints
curl http://your-server-ip/api/products
curl http://your-server-ip/api/testimonials
```

### 9.2 Check Logs if Issues
```bash
# Check nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Check PM2 logs
pm2 logs alashore-marine

# Check system logs
sudo journalctl -u nginx -f
```

## Step 10: Optional - SSL Certificate

### 10.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 10.2 Get SSL Certificate
```bash
# Replace with your actual domain
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## Admin Access

Once deployed successfully:

- **Admin Login URL:** `http://your-domain.com/temp-login`
- **Username:** `admin`
- **Password:** `admin123`
- **Admin Panel:** `http://your-domain.com/admin`

## Troubleshooting

### Common Issues:

1. **Nginx Default Page Still Showing:**
   - Check if nginx config is properly linked: `ls -la /etc/nginx/sites-enabled/`
   - Restart nginx: `sudo systemctl restart nginx`
   - Verify app is running on port 5000: `netstat -tulpn | grep :5000`

2. **Database Connection Errors:**
   - Check PostgreSQL service: `sudo systemctl status postgresql`
   - Verify database credentials in `.env.production`
   - Test database connection: `psql -U alashore_user -d alashore_marine -h localhost`

3. **PM2 App Not Starting:**
   - Check PM2 logs: `pm2 logs alashore-marine`
   - Verify build completed: `ls -la dist/`
   - Check environment variables: `pm2 env 0`

4. **Port Issues:**
   - Kill process on port 5000: `sudo fuser -k 5000/tcp`
   - Check what's using the port: `sudo lsof -i :5000`

### Log Locations:
- Nginx: `/var/log/nginx/`
- PM2: `/var/log/pm2/` or `pm2 logs`
- Application: Check PM2 logs

Remember to replace placeholder values like `your-domain.com`, `your_secure_password`, and `your-super-secret-session-key` with your actual values!