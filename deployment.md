# Alashore Marine Website - MySQL to PostgreSQL Migration Guide

## Live Production Migration Strategy

Since your website is already live with MySQL, this guide provides a **zero-downtime migration** approach to safely switch from MySQL to PostgreSQL installed directly on your VPS.

## Pre-Migration Checklist

- [ ] Current MySQL application running smoothly
- [ ] Full database backup completed
- [ ] VPS has sufficient disk space (check with `df -h`)
- [ ] Migration testing plan prepared

## Step 1: Install PostgreSQL on Your VPS (Alongside MySQL)

### 1.1 Install PostgreSQL
```bash
# SSH into your production VPS
ssh user@your-server-ip

# Update package lists
sudo apt update

# Install PostgreSQL and additional tools
sudo apt install postgresql postgresql-contrib postgresql-client -y

# Start and enable PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Check PostgreSQL is running
sudo systemctl status postgresql
```

### 1.2 Configure PostgreSQL
```bash
# Switch to postgres user
sudo -i -u postgres

# Create database and user for Alashore Marine
createdb alashore_marine_pg
createuser --interactive alashore_user_pg
# When prompted: 
# - Shall the new role be a superuser? n
# - Shall the new role be allowed to create databases? y
# - Shall the new role be allowed to create more new roles? n

# Set password for user
psql -c "ALTER USER alashore_user_pg PASSWORD 'your_secure_pg_password';"

# Grant privileges
psql -c "GRANT ALL PRIVILEGES ON DATABASE alashore_marine_pg TO alashore_user_pg;"

# Exit postgres user
exit
```

### 1.3 Configure PostgreSQL for Application Access
```bash
# Edit PostgreSQL configuration
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Find and update these lines:
```
listen_addresses = 'localhost'  # Already correct for local access
port = 5432                     # Default port
```

```bash
# Edit client authentication
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

Add this line before other rules:
```
local   alashore_marine_pg   alashore_user_pg                     md5
host    alashore_marine_pg   alashore_user_pg   127.0.0.1/32      md5
```

```bash
# Restart PostgreSQL
sudo systemctl restart postgresql

# Test connection
psql -h localhost -U alashore_user_pg -d alashore_marine_pg -c "SELECT 'PostgreSQL connection successful';"
```

### 1.4 Create Local CONNECTION_URL
Your local PostgreSQL connection string:
```
postgresql://alashore_user_pg:your_secure_pg_password@localhost:5432/alashore_marine_pg
```

## Step 2: Backup Current MySQL Data (CRITICAL)

### 2.1 Create Complete MySQL Backup
```bash
# Create backup directory
mkdir -p ~/mysql-backup/$(date +%Y%m%d)
cd ~/mysql-backup/$(date +%Y%m%d)

# Full database backup
mysqldump -u alashore_user -p alashore_marine > full_backup_$(date +%Y%m%d).sql

# Export individual tables as CSV for PostgreSQL import
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM testimonials" > testimonials.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM products" > products.csv  
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM blog_posts" > blog_posts.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM inquiries" > inquiries.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM website_content" > website_content.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM media_files" > media_files.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM website_settings" > website_settings.csv
mysql -u alashore_user -p alashore_marine -e "SELECT * FROM users" > users.csv
```

### 2.2 Verify Backup Integrity
```bash
# Check backup files exist and have content
ls -la *.csv *.sql
wc -l *.csv

# Check sample data
echo "Testimonials sample:"
head -3 testimonials.csv
echo "Products sample:"
head -3 products.csv
```

## Step 3: Prepare Updated Application Code

### 3.1 Pull Latest Code from GitHub
```bash
cd /var/www/alashore-marine

# Backup current working directory
cp -r . ~/app-backup-$(date +%Y%m%d)

# Pull latest PostgreSQL-compatible code
git pull origin main

# Install any new dependencies
npm install

# Build the updated application
npm run build
```

## Step 4: Deploy PostgreSQL Schema to Local Database

### 4.1 Deploy Schema to Local PostgreSQL
```bash
# Set PostgreSQL environment for schema deployment
export DATABASE_URL="postgresql://alashore_user_pg:your_secure_pg_password@localhost:5432/alashore_marine_pg"

# Deploy schema (creates all 9 tables)
npm run db:push --force
```

### 4.2 Verify Schema Created
```bash
# Check tables were created
psql -h localhost -U alashore_user_pg -d alashore_marine_pg -c "\dt"

# Should show all tables:
# - sessions, users, blog_posts, testimonials, products
# - inquiries, website_content, media_files, website_settings
```

## Step 5: Migrate Data from MySQL to PostgreSQL

### 5.1 Import Data Using CSV Files
```bash
cd ~/mysql-backup/$(date +%Y%m%d)

# Set PostgreSQL connection
export PG_CONN="postgresql://alashore_user_pg:your_secure_pg_password@localhost:5432/alashore_marine_pg"

# Import testimonials (adjust column order if needed)
psql "$PG_CONN" -c "\COPY testimonials (id, name, company, content, rating, avatar, published, created_at, updated_at) FROM '$PWD/testimonials.csv' WITH (FORMAT csv, DELIMITER E'\t', HEADER false);"

# Import products
psql "$PG_CONN" -c "\COPY products (id, name, description, featured_image, category, specifications, published, \"order\", created_at, updated_at) FROM '$PWD/products.csv' WITH (FORMAT csv, DELIMITER E'\t', HEADER false);"

# Import users (if any)
psql "$PG_CONN" -c "\COPY users (id, email, first_name, last_name, profile_image_url, created_at, updated_at) FROM '$PWD/users.csv' WITH (FORMAT csv, DELIMITER E'\t', HEADER false);"

# Import other tables
psql "$PG_CONN" -c "\COPY blog_posts (id, title, slug, excerpt, content, featured_image, category, published, author_id, created_at, updated_at) FROM '$PWD/blog_posts.csv' WITH (FORMAT csv, DELIMITER E'\t', HEADER false);"
```

### 5.2 Reset PostgreSQL Sequences
```bash
# Update sequence counters to continue from existing data
psql "$PG_CONN" -c "SELECT setval('testimonials_id_seq', (SELECT COALESCE(MAX(id), 0) FROM testimonials));"
psql "$PG_CONN" -c "SELECT setval('products_id_seq', (SELECT COALESCE(MAX(id), 0) FROM products));"
psql "$PG_CONN" -c "SELECT setval('blog_posts_id_seq', (SELECT COALESCE(MAX(id), 0) FROM blog_posts));"
psql "$PG_CONN" -c "SELECT setval('inquiries_id_seq', (SELECT COALESCE(MAX(id), 0) FROM inquiries));"
psql "$PG_CONN" -c "SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 0) FROM users));"
```

### 5.3 Verify Data Migration
```bash
# Compare record counts between MySQL and PostgreSQL
echo "=== MySQL Counts ==="
mysql -u alashore_user -p alashore_marine -e "SELECT 'testimonials' as table_name, COUNT(*) as count FROM testimonials UNION SELECT 'products', COUNT(*) FROM products UNION SELECT 'users', COUNT(*) FROM users;"

echo "=== PostgreSQL Counts ==="
psql "$PG_CONN" -c "SELECT 'testimonials' as table_name, COUNT(*) as count FROM testimonials UNION SELECT 'products', COUNT(*) FROM products UNION SELECT 'users', COUNT(*) FROM users;"

# Verify sample data
echo "=== Sample Testimonial Data ==="
psql "$PG_CONN" -c "SELECT name, company FROM testimonials LIMIT 3;"
```

## Step 6: Test PostgreSQL Application (Parallel to MySQL)

### 6.1 Create PostgreSQL PM2 Configuration
```bash
cd /var/www/alashore-marine

# Create PostgreSQL test configuration
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
        DATABASE_URL: 'postgresql://alashore_user_pg:your_secure_pg_password@localhost:5432/alashore_marine_pg',
        SESSION_SECRET: 'your-existing-session-secret',
        PORT: '5001'
      }
    }
  ]
};
```

### 6.2 Start PostgreSQL Application for Testing
```bash
# Start PostgreSQL version on port 5001 (MySQL still on 5000)
pm2 start ecosystem.postgresql.config.cjs --env production

# Check both applications running
pm2 status

# Test PostgreSQL application
curl http://localhost:5001/
curl http://localhost:5001/api/products
curl http://localhost:5001/api/testimonials

# Compare with MySQL application
curl http://localhost:5000/api/products
```

## Step 7: Zero-Downtime Traffic Switch

### 7.1 Update Nginx for PostgreSQL Testing
```bash
# Backup current nginx config
sudo cp /etc/nginx/sites-available/alashore-marine /etc/nginx/sites-available/alashore-marine.mysql.backup

# Create test nginx config
sudo nano /etc/nginx/sites-available/alashore-marine-test
```

Copy your existing config and change:
```nginx
# Change all proxy_pass lines from:
proxy_pass http://localhost:5000;
# To:
proxy_pass http://localhost:5001;
```

### 7.2 Switch Traffic to PostgreSQL (Temporary Test)
```bash
# Disable current MySQL config
sudo rm /etc/nginx/sites-enabled/alashore-marine

# Enable PostgreSQL test config
sudo ln -s /etc/nginx/sites-available/alashore-marine-test /etc/nginx/sites-enabled/

# Test nginx config
sudo nginx -t

# Switch traffic to PostgreSQL
sudo systemctl reload nginx
```

### 7.3 Test Live PostgreSQL Traffic
```bash
# Test your live domain with PostgreSQL
curl http://your-domain.com/
curl http://your-domain.com/api/products
curl http://your-domain.com/api/testimonials

# Monitor PostgreSQL application
pm2 logs alashore-marine-postgresql

# Test website functionality in browser
# Visit: http://your-domain.com
```

## Step 8: Finalize Migration (If Testing Successful)

### 8.1 Update Main Application to PostgreSQL
```bash
# Stop old MySQL application
pm2 delete alashore-marine

# Update main PM2 config for PostgreSQL
nano ecosystem.config.cjs
```

Update the configuration:
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
        DATABASE_URL: 'postgresql://alashore_user_pg:your_secure_pg_password@localhost:5432/alashore_marine_pg',
        SESSION_SECRET: 'your-existing-session-secret',
        PORT: '5000'
      }
    }
  ]
};
```

### 8.2 Switch Back to Port 5000 with PostgreSQL
```bash
# Stop PostgreSQL test app
pm2 delete alashore-marine-postgresql

# Start main app with PostgreSQL on port 5000
pm2 start ecosystem.config.cjs --env production

# Update nginx back to port 5000
sudo rm /etc/nginx/sites-enabled/alashore-marine-test
sudo ln -s /etc/nginx/sites-available/alashore-marine /etc/nginx/sites-enabled/

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

# Test database connection
psql -h localhost -U alashore_user_pg -d alashore_marine_pg -c "SELECT COUNT(*) FROM products;"
```

### 9.2 Performance Comparison
```bash
# Test PostgreSQL response times
time curl -s http://your-domain.com/api/products > /dev/null
time curl -s http://your-domain.com/api/testimonials > /dev/null

# Check PostgreSQL performance
psql -h localhost -U alashore_user_pg -d alashore_marine_pg -c "SELECT pg_size_pretty(pg_database_size('alashore_marine_pg'));"
```

## Step 10: Cleanup and Optimization

### 10.1 Optimize PostgreSQL Configuration
```bash
# Edit PostgreSQL config for production
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Update these settings for better performance:
```
# Memory settings (adjust based on your VPS RAM)
shared_buffers = 256MB                  # 25% of RAM for 1GB VPS
effective_cache_size = 512MB            # 50% of RAM
work_mem = 4MB
maintenance_work_mem = 64MB

# Logging
log_statement = 'none'                  # Reduce logging overhead
log_min_duration_statement = 1000       # Log slow queries only
```

```bash
# Restart PostgreSQL to apply changes
sudo systemctl restart postgresql
```

### 10.2 Remove MySQL (After Confirming PostgreSQL Works)
```bash
# ONLY after 100% confirming PostgreSQL works perfectly

# Stop MySQL service
sudo systemctl stop mysql
sudo systemctl disable mysql

# Keep MySQL data for emergency rollback (don't delete yet)
# sudo apt remove mysql-server mysql-client  # Optional - keep for rollback safety
```

## Emergency Rollback Plan

### Quick Rollback to MySQL (If Issues)
```bash
# 1. Start MySQL service
sudo systemctl start mysql

# 2. Update PM2 back to MySQL
nano ecosystem.config.cjs
# Change DATABASE_URL back to: mysql://alashore_user:password@localhost:3306/alashore_marine

# 3. Restart application with MySQL
pm2 restart alashore-marine

# 4. Verify MySQL application
curl http://your-domain.com/api/products

# 5. Check logs
pm2 logs alashore-marine
```

## VPS Resource Requirements

### Recommended VPS Specs for MySQL + PostgreSQL:
- **RAM**: 4GB minimum (to run both databases during migration)
- **Storage**: 20GB+ available space
- **CPU**: 2 cores recommended

### After Migration (PostgreSQL only):
- **RAM**: 2GB sufficient
- **Storage**: 10GB+ available space
- **CPU**: 1-2 cores adequate

### Monitor Resources During Migration:
```bash
# Check available space
df -h

# Monitor memory usage
free -h

# Watch system resources
htop

# Check PostgreSQL memory usage
sudo -u postgres psql -c "SELECT pg_size_pretty(pg_database_size('alashore_marine_pg'));"
```

## Benefits of Local PostgreSQL on VPS

**Cost Savings:**
- No monthly database service fees
- Full control over configuration
- Direct local connection (faster)

**Performance Benefits:**
- Zero network latency between app and database
- Can optimize PostgreSQL for your specific VPS
- Better resource utilization

**Control Benefits:**
- Full backup control
- Custom PostgreSQL extensions if needed
- No third-party dependencies

## Migration Timeline

**Estimated Timeline:**
1. **PostgreSQL Installation**: 15-30 minutes
2. **Data Export**: 10-15 minutes
3. **Schema Deployment**: 5 minutes
4. **Data Import**: 15-30 minutes
5. **Testing**: 30-60 minutes
6. **Traffic Switch**: 5 minutes

**Total Migration Time**: 2-3 hours with thorough testing

## Key Commands Summary

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Create database and user
sudo -u postgres createdb alashore_marine_pg
sudo -u postgres createuser --interactive alashore_user_pg

# Deploy schema
DATABASE_URL="postgresql://alashore_user_pg:password@localhost:5432/alashore_marine_pg" npm run db:push --force

# Test connection
psql -h localhost -U alashore_user_pg -d alashore_marine_pg -c "SELECT 1;"

# Switch application
pm2 restart alashore-marine
```

Your VPS-based PostgreSQL migration is ready! This approach gives you full control, cost savings, and excellent performance for your Alashore Marine website.