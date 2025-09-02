# Alashore Marine Website - MySQL to PostgreSQL Migration Guide

## Live Production Migration Strategy

Since your website is already live with MySQL, this guide provides a **zero-downtime migration** approach to safely switch from MySQL to PostgreSQL.

## Pre-Migration Checklist

- [ ] Current MySQL application running smoothly
- [ ] Full database backup completed
- [ ] PostgreSQL database provider selected
- [ ] Migration testing completed on staging/development

## Step 1: Set Up PostgreSQL Database (Parallel to MySQL)

### 1.1 Choose PostgreSQL Provider
**Recommended providers:**

**Option A: Neon (Recommended)**
- Sign up at neon.tech
- Create new project
- Get connection string: `postgresql://username:password@host:5432/database`

**Option B: Railway**
- Sign up at railway.app  
- Add PostgreSQL service
- Get connection string from dashboard

**Option C: AWS RDS PostgreSQL**
- Create RDS PostgreSQL instance
- Configure security groups
- Get connection string

### 1.2 Test PostgreSQL Connection
```bash
# Test connection from your VPS
psql "postgresql://username:password@host:5432/database" -c "SELECT 1;"
```

## Step 2: Backup Current MySQL Data (CRITICAL)

### 2.1 Create Complete MySQL Backup
```bash
# SSH into your production VPS
ssh user@your-server-ip

# Create backup directory
mkdir -p ~/mysql-backup/$(date +%Y%m%d)
cd ~/mysql-backup/$(date +%Y%m%d)

# Full database backup
mysqldump -u alashore_user -p alashore_marine > full_backup.sql

# Export individual tables as CSV for PostgreSQL import
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM testimonials" > testimonials.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM products" > products.csv  
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM blog_posts" > blog_posts.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM inquiries" > inquiries.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM website_content" > website_content.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM media_files" > media_files.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM website_settings" > website_settings.csv
```

### 2.2 Verify Backup Integrity
```bash
# Check backup files exist and have content
ls -la *.csv
wc -l *.csv
head -5 testimonials.csv
```

## Step 3: Prepare Updated Application Code

### 3.1 Pull Latest Code from GitHub
```bash
cd /var/www/alashore-marine
git pull origin main

# Install any new dependencies
npm install

# Build the updated application
npm run build
```

## Step 4: Deploy PostgreSQL Schema (Without Switching Traffic)

### 4.1 Set PostgreSQL Environment (Temporary)
```bash
# Create temporary PostgreSQL environment file
nano .env.postgresql
```

Add:
```env
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:5432/database
SESSION_SECRET=your-existing-session-secret
PORT=5001
```

### 4.2 Deploy Schema to PostgreSQL
```bash
# Deploy schema using PostgreSQL connection
DATABASE_URL="postgresql://username:password@host:5432/database" npm run db:push --force
```

This creates all tables:
- sessions, users, blog_posts, testimonials, products
- inquiries, website_content, media_files, website_settings

## Step 5: Migrate Data to PostgreSQL

### 5.1 Import Data Using CSV Files
```bash
# Set PostgreSQL URL for import commands
export PG_URL="postgresql://username:password@host:5432/database"

# Import testimonials
psql "$PG_URL" -c "\COPY testimonials (id, name, company, content, rating, avatar, published, created_at, updated_at) FROM '$PWD/mysql-backup/$(date +%Y%m%d)/testimonials.csv' WITH (FORMAT csv, DELIMITER E'\t', HEADER false);"

# Import products
psql "$PG_URL" -c "\COPY products (id, name, description, featured_image, category, specifications, published, \"order\", created_at, updated_at) FROM '$PWD/mysql-backup/$(date +%Y%m%d)/products.csv' WITH (FORMAT csv, DELIMITER E'\t', HEADER false);"

# Import other tables (blog_posts, inquiries, etc.)
psql "$PG_URL" -c "\COPY blog_posts (id, title, slug, excerpt, content, featured_image, category, published, author_id, created_at, updated_at) FROM '$PWD/mysql-backup/$(date +%Y%m%d)/blog_posts.csv' WITH (FORMAT csv, DELIMITER E'\t', HEADER false);"
```

### 5.2 Reset PostgreSQL Sequences
```bash
# Update sequence counters to continue from existing data
psql "$PG_URL" -c "SELECT setval('testimonials_id_seq', (SELECT COALESCE(MAX(id), 0) FROM testimonials));"
psql "$PG_URL" -c "SELECT setval('products_id_seq', (SELECT COALESCE(MAX(id), 0) FROM products));"
psql "$PG_URL" -c "SELECT setval('blog_posts_id_seq', (SELECT COALESCE(MAX(id), 0) FROM blog_posts));"
psql "$PG_URL" -c "SELECT setval('inquiries_id_seq', (SELECT COALESCE(MAX(id), 0) FROM inquiries));"
```

### 5.3 Verify Data Migration
```bash
# Compare record counts
echo "MySQL counts:"
mysql -u alashore_user -p alashore_marine -e "SELECT 'testimonials' as table_name, COUNT(*) as count FROM testimonials UNION SELECT 'products', COUNT(*) FROM products;"

echo "PostgreSQL counts:"
psql "$PG_URL" -c "SELECT 'testimonials' as table_name, COUNT(*) as count FROM testimonials UNION SELECT 'products', COUNT(*) FROM products;"
```

## Step 6: Test PostgreSQL Application (Parallel Testing)

### 6.1 Start PostgreSQL Version on Different Port
```bash
# Create PM2 config for PostgreSQL testing
nano ecosystem.postgresql.config.cjs
```

```javascript
module.exports = {
  apps: [
    {
      name: 'alashore-marine-postgresql',
      script: 'dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://username:password@host:5432/database',
        SESSION_SECRET: 'your-existing-session-secret',
        PORT: '5001'
      }
    }
  ]
};
```

### 6.2 Start PostgreSQL Application
```bash
# Start PostgreSQL version on port 5001
pm2 start ecosystem.postgresql.config.cjs --env production

# Check it's running
pm2 status
curl http://localhost:5001/

# Test API endpoints
curl http://localhost:5001/api/products
curl http://localhost:5001/api/testimonials
```

## Step 7: Zero-Downtime Migration Switch

### 7.1 Update Nginx to Test PostgreSQL
```bash
# Backup current nginx config
sudo cp /etc/nginx/sites-available/alashore-marine /etc/nginx/sites-available/alashore-marine.mysql.backup

# Update nginx to point to PostgreSQL (port 5001) temporarily
sudo nano /etc/nginx/sites-available/alashore-marine
```

Change all `proxy_pass http://localhost:5000;` to `proxy_pass http://localhost:5001;`

```bash
# Test nginx config
sudo nginx -t

# Reload nginx (this switches traffic to PostgreSQL)
sudo systemctl reload nginx
```

### 7.2 Test Live PostgreSQL Traffic
```bash
# Test your live domain
curl http://your-domain.com/
curl http://your-domain.com/api/products

# Monitor PostgreSQL application logs
pm2 logs alashore-marine-postgresql
```

## Step 8: Finalize Migration (If Testing Successful)

### 8.1 Update Main Application to PostgreSQL
```bash
# Stop old MySQL application
pm2 delete alashore-marine

# Update main PM2 config to use PostgreSQL
nano ecosystem.config.cjs
```

Update the DATABASE_URL:
```javascript
env_production: {
  NODE_ENV: 'production',
  DATABASE_URL: 'postgresql://username:password@host:5432/database',  // Updated
  SESSION_SECRET: 'your-existing-session-secret',
  PORT: '5000'
}
```

### 8.2 Switch Back to Port 5000
```bash
# Stop PostgreSQL test app
pm2 delete alashore-marine-postgresql

# Start main app with PostgreSQL on port 5000
pm2 start ecosystem.config.cjs --env production

# Update nginx back to port 5000
sudo nano /etc/nginx/sites-available/alashore-marine
```

Change `proxy_pass http://localhost:5001;` back to `proxy_pass http://localhost:5000;`

```bash
# Reload nginx
sudo systemctl reload nginx

# Save PM2 config
pm2 save
```

## Step 9: Post-Migration Verification

### 9.1 Full Application Test
```bash
# Test all functionality
curl http://your-domain.com/
curl http://your-domain.com/api/products
curl http://your-domain.com/api/testimonials

# Check application logs
pm2 logs alashore-marine

# Monitor resource usage
pm2 monit
```

### 9.2 Performance Comparison
```bash
# Test response times
time curl -s http://your-domain.com/api/products > /dev/null
time curl -s http://your-domain.com/api/testimonials > /dev/null
```

## Step 10: Cleanup (After Successful Migration)

### 10.1 Remove MySQL (Optional - Keep for Rollback)
```bash
# Stop MySQL service (ONLY after confirming PostgreSQL works)
sudo systemctl stop mysql
sudo systemctl disable mysql

# Keep data for rollback safety
# sudo rm -rf /var/lib/mysql  # DON'T run this until 100% sure
```

### 10.2 Update Monitoring
```bash
# Update any monitoring scripts to check PostgreSQL instead of MySQL
# Update backup scripts to backup PostgreSQL instead of MySQL
```

## Rollback Plan (If Issues Occur)

### Emergency Rollback to MySQL
```bash
# 1. Start MySQL service
sudo systemctl start mysql

# 2. Update PM2 config back to MySQL
nano ecosystem.config.cjs
# Change DATABASE_URL back to mysql://...

# 3. Restart application
pm2 restart alashore-marine

# 4. Verify MySQL application works
curl http://your-domain.com/api/products
```

## Migration Benefits After Switch

**Immediate Benefits:**
- Better JSON handling for website content
- Improved query performance for complex searches
- Enhanced data integrity and ACID compliance
- Same database system as development (easier debugging)

**Long-term Benefits:**
- Better scalability for traffic growth
- Advanced PostgreSQL features (full-text search, etc.)
- More reliable connection handling
- Better backup and replication options

## Key Files Updated for PostgreSQL Migration

- ✅ `shared/schema.ts` - PostgreSQL table definitions
- ✅ `server/db.ts` - PostgreSQL connection setup
- ✅ All application logic - No changes needed
- ✅ PM2 configuration - Updated DATABASE_URL

Your migration is complete! The application now runs on PostgreSQL with improved performance and reliability while maintaining all existing functionality.