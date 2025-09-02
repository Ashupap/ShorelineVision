# Alashore Marine Website - PostgreSQL Production Deployment Guide

This guide will walk you through deploying the Alashore Marine seafood company website with PostgreSQL database migration from your current MySQL setup.

## Prerequisites

- Ubuntu VPS with root/sudo access
- Domain name (optional, can use IP address)
- At least 2GB RAM recommended
- PostgreSQL database provider account (Neon, Railway, Supabase, or AWS RDS)

## Step 1: Database Migration Planning

### 1.1 Export Current MySQL Data
Before migrating, backup your existing MySQL production data:

```bash
# Export testimonials table
mysql --host=your-mysql-host --user=your-user --password=your-password \
  -e "SELECT * FROM testimonials INTO OUTFILE '/tmp/testimonials.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n';" your_database_name

# Export products table
mysql --host=your-mysql-host --user=your-user --password=your-password \
  -e "SELECT * FROM products INTO OUTFILE '/tmp/products.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n';" your_database_name

# Export other tables (blog_posts, inquiries, website_content, etc.)
mysql --host=your-mysql-host --user=your-user --password=your-password \
  -e "SELECT * FROM blog_posts INTO OUTFILE '/tmp/blog_posts.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n';" your_database_name
```

### 1.2 Set Up PostgreSQL Database
Choose one of these managed PostgreSQL providers:

**Option A: Neon (Recommended - Same as Replit development)**
1. Sign up at neon.tech
2. Create a new database
3. Get your PostgreSQL connection string

**Option B: Railway**
1. Sign up at railway.app
2. Create PostgreSQL service
3. Get connection string from dashboard

**Option C: Supabase**
1. Sign up at supabase.com
2. Create new project
3. Get PostgreSQL connection string from settings

**Your DATABASE_URL will look like:**
```
postgresql://username:password@host:5432/database_name
```

## Step 2: Initial Server Setup

### 2.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2 Install Required Software
```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL client tools (for data import)
sudo apt install postgresql-client -y

# Install Nginx
sudo apt install nginx -y

# Install PM2 globally
sudo npm install pm2 -g

# Install Git
sudo apt install git -y
```

## Step 3: Application Setup

### 3.1 Create Application Directory
```bash
sudo mkdir -p /var/www/alashore-marine
cd /var/www/alashore-marine
```

### 3.2 Deploy Application Code
```bash
# Clone from your repository (replace with your GitHub repo)
git clone https://github.com/your-username/your-repo.git .

# Set proper ownership
sudo chown -R $USER:$USER /var/www/alashore-marine/

# Install dependencies
npm install

# Build the application
npm run build
```

## Step 4: Environment Configuration

### 4.1 Create Production Environment File
```bash
nano .env.production
```

Add the following content:
```env
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:5432/database_name
SESSION_SECRET=your-super-secret-session-key-change-this-in-production-make-it-long-and-random
PORT=5000
```

### 4.2 Create PM2 Ecosystem File
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
        DATABASE_URL: 'postgresql://username:password@host:5432/database_name',
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

## Step 5: PostgreSQL Schema Deployment

### 5.1 Initialize Database Schema
```bash
# Deploy the PostgreSQL schema (creates all 9 tables)
npm run db:push

# If you get warnings about data loss, force push
npm run db:push --force
```

This creates these tables:
- `sessions` (for authentication)
- `users` (user accounts)
- `blog_posts` (blog content)
- `testimonials` (customer reviews)
- `products` (seafood catalog)
- `inquiries` (contact form submissions)
- `website_content` (dynamic content)
- `media_files` (file uploads)
- `website_settings` (configuration)

## Step 6: Data Migration from MySQL to PostgreSQL

### 6.1 Import Your Data
Using the CSV files exported in Step 1.1, import to PostgreSQL:

```bash
# Import testimonials
psql "$DATABASE_URL" -c "\COPY testimonials (id, name, company, content, rating, avatar, published, created_at, updated_at) FROM '/tmp/testimonials.csv' WITH (FORMAT csv, HEADER true);"

# Import products
psql "$DATABASE_URL" -c "\COPY products (id, name, description, featured_image, category, specifications, published, \"order\", created_at, updated_at) FROM '/tmp/products.csv' WITH (FORMAT csv, HEADER true);"

# Import blog posts
psql "$DATABASE_URL" -c "\COPY blog_posts (id, title, slug, excerpt, content, featured_image, category, published, author_id, created_at, updated_at) FROM '/tmp/blog_posts.csv' WITH (FORMAT csv, HEADER true);"

# Reset sequences to continue from max ID
psql "$DATABASE_URL" -c "SELECT setval('testimonials_id_seq', (SELECT MAX(id) FROM testimonials));"
psql "$DATABASE_URL" -c "SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));"
psql "$DATABASE_URL" -c "SELECT setval('blog_posts_id_seq', (SELECT MAX(id) FROM blog_posts));"
```

### 6.2 Verify Data Migration
```bash
# Check data imported correctly
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM testimonials;"
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM products;"
psql "$DATABASE_URL" -c "SELECT name, company FROM testimonials LIMIT 3;"
```

## Step 7: PM2 Process Management

### 7.1 Create Log Directory
```bash
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2
```

### 7.2 Start Application with PM2
```bash
# Stop any existing processes
pm2 delete all

# Start the application with PostgreSQL
pm2 start ecosystem.config.cjs --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command it gives you (usually starts with sudo env PATH=...)
```

### 7.3 Verify Application is Running
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

## Step 8: Nginx Configuration

### 8.1 Remove Default Nginx Site
```bash
sudo rm /etc/nginx/sites-enabled/default
```

### 8.2 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/alashore-marine
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Replace with your domain or use _

    # Serve static files directly
    location /uploads/ {
        alias /var/www/alashore-marine/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /attached_assets/ {
        alias /var/www/alashore-marine/attached_assets/;
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

### 8.3 Enable the Site
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

## Step 9: Firewall Configuration

### 9.1 Configure UFW Firewall
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

## Step 10: Testing and Verification

### 10.1 Test PostgreSQL Application
```bash
# Test local application
curl http://localhost:5000/

# Test through nginx
curl http://your-server-ip/

# Test API endpoints with PostgreSQL data
curl http://your-server-ip/api/products
curl http://your-server-ip/api/testimonials

# Test database connection
psql "$DATABASE_URL" -c "SELECT 'PostgreSQL connection successful';"
```

### 10.2 Check Logs if Issues
```bash
# Check nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Check PM2 logs
pm2 logs alashore-marine

# Check system logs
sudo journalctl -u nginx -f
```

## Step 11: Optional - SSL Certificate

### 11.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 11.2 Get SSL Certificate
```bash
# Replace with your actual domain
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## Migration Benefits ✅

**PostgreSQL Advantages:**
- **Better JSON Support**: Native JSONB for flexible content storage
- **Improved Performance**: Better query optimization and indexing
- **Enhanced Reliability**: Superior ACID compliance and data integrity
- **Advanced Features**: Full-text search capabilities
- **Scalability**: Better handling of concurrent connections
- **Replit Compatibility**: Same database system as development environment

## Admin Access

Once deployed successfully:

- **Website:** `http://your-domain.com`
- **API Endpoints:** All existing endpoints work with PostgreSQL
- **Database:** Full PostgreSQL features available

## Troubleshooting

### Common PostgreSQL Migration Issues:

1. **Database Connection Errors:**
   - Verify PostgreSQL DATABASE_URL format: `postgresql://user:pass@host:5432/db`
   - Check provider dashboard for connection details
   - Test connection: `psql "$DATABASE_URL" -c "SELECT 1;"`

2. **Schema Deployment Issues:**
   - Use `npm run db:push --force` if regular push fails
   - Check Drizzle logs for specific errors
   - Verify PostgreSQL version compatibility

3. **Data Import Problems:**
   - Ensure CSV encoding is UTF-8
   - Check for special characters in exported data
   - Verify column names match PostgreSQL schema

4. **PM2 App Not Starting:**
   - Check PM2 logs: `pm2 logs alashore-marine`
   - Verify PostgreSQL connection in logs
   - Check environment variables: `pm2 env 0`

### Log Locations:
- Nginx: `/var/log/nginx/`
- PM2: `/var/log/pm2/` or `pm2 logs`
- PostgreSQL: Check your provider's dashboard

## Rollback Plan

If migration encounters issues:
1. Keep your original MySQL database running
2. Point domain back to MySQL application temporarily
3. Debug PostgreSQL issues without downtime
4. Switch back when PostgreSQL is fully tested

## Post-Migration Checklist

- [ ] All tables created in PostgreSQL
- [ ] Data successfully imported
- [ ] Website loads correctly
- [ ] Products display properly
- [ ] Testimonials show up
- [ ] Contact forms work
- [ ] Admin features functional
- [ ] Performance monitoring set up
- [ ] SSL certificate installed
- [ ] Backup strategy configured

Remember to replace placeholder values like `your-domain.com`, `your-postgresql-connection-string`, and `your-super-secret-session-key` with your actual values!

**Migration Complete!** Your Alashore Marine website is now running on PostgreSQL with improved performance and reliability.