# Deployment Guide - Alashore Marine Website

This guide covers the deployment process for the Alashore Marine website to the production server.

## Production Environment

- **Server Path**: `/var/www/alashore-marine/ShorelineVision`
- **Domain**: alashoremarine.com
- **Database**: PostgreSQL (Production)
- **Web Server**: Nginx + PM2 (Node.js process manager)

## Prerequisites

Before deployment, ensure you have:

1. **Server Access**: SSH access to the production server
2. **Database Setup**: Production PostgreSQL database configured
3. **Environment Variables**: Production environment variables configured
4. **SSL Certificate**: Valid SSL certificate for alashoremarine.com
5. **Domain Configuration**: DNS pointing to the production server

## Deployment Steps

### 1. Prepare the Build

```bash
# Install dependencies
npm install

# Build the frontend
npm run build

# Prepare production files
npm run build:server
```

### 2. Upload Files to Server

```bash
# Copy files to production server
rsync -avz --exclude node_modules --exclude .git . user@server:/var/www/alashore-marine/ShorelineVision/

# Or using SCP
scp -r . user@server:/var/www/alashore-marine/ShorelineVision/
```

### 3. Server Setup

```bash
# SSH into the production server
ssh user@server

# Navigate to the project directory
cd /var/www/alashore-marine/ShorelineVision

# Install production dependencies
npm install --production

# Build the application
npm run build
```

### 4. Database Setup

```bash
# Run database migrations
npm run db:push

# Verify database connection
npm run db:studio
```

### 5. Environment Configuration

Create production environment file:

```bash
# Create .env file with production variables
cat > .env << EOF
NODE_ENV=production
DATABASE_URL=postgresql://username:password@localhost:5432/alashore_marine_prod
SESSION_SECRET=your-secure-session-secret
PORT=3000
DOMAIN=alashoremarine.com
EOF
```

### 6. Process Management with PM2

```bash
# Install PM2 globally (if not already installed)
npm install -g pm2

# Start the application with PM2
pm2 start npm --name "alashore-marine" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

### 7. Nginx Configuration

Create Nginx configuration file:

```nginx
# /etc/nginx/sites-available/alashoremarine.com
server {
    listen 80;
    server_name alashoremarine.com www.alashoremarine.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name alashoremarine.com www.alashoremarine.com;

    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Static files
    location /assets/ {
        root /var/www/alashore-marine/ShorelineVision/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Main application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security
    location ~ /\. {
        deny all;
    }
}
```

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/alashoremarine.com /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Post-Deployment Verification

### 1. Check Application Status

```bash
# Check PM2 status
pm2 status

# View application logs
pm2 logs alashore-marine

# Check application health
curl -I https://alashoremarine.com
```

### 2. Database Verification

```bash
# Connect to production database
psql $DATABASE_URL

# Verify tables exist
\dt

# Check products data
SELECT COUNT(*) FROM products;
```

### 3. Website Functionality

- ✅ Homepage loads correctly
- ✅ Products page displays all 9 products
- ✅ Contact forms work
- ✅ Images load properly
- ✅ Mobile responsiveness
- ✅ SSL certificate valid
- ✅ Page load speeds acceptable

## Monitoring & Maintenance

### Log Monitoring

```bash
# Real-time logs
pm2 logs alashore-marine --lines 100

# Nginx access logs
tail -f /var/log/nginx/access.log

# Nginx error logs
tail -f /var/log/nginx/error.log
```

### Performance Monitoring

```bash
# Check server resources
htop

# Monitor disk usage
df -h

# Check memory usage
free -h
```

### Backup Strategy

```bash
# Database backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# File backup
tar -czf backup_files_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/alashore-marine/ShorelineVision
```

## Rollback Process

If issues occur after deployment:

```bash
# Stop current application
pm2 stop alashore-marine

# Restore previous version
git checkout previous-working-commit

# Rebuild
npm run build

# Restart application
pm2 restart alashore-marine
```

## Security Checklist

- ✅ HTTPS enabled with valid SSL certificate
- ✅ Security headers configured
- ✅ Database credentials secured
- ✅ File permissions properly set
- ✅ Firewall rules configured
- ✅ Regular security updates applied

## Support & Troubleshooting

### Common Issues

1. **502 Bad Gateway**: Check if Node.js application is running
2. **Database Connection**: Verify DATABASE_URL and credentials
3. **Static Files**: Check Nginx static file serving configuration
4. **SSL Issues**: Verify certificate validity and paths

### Contact Information

- **Technical Support**: Your technical team
- **Server Provider**: Your hosting provider
- **Domain Provider**: Your domain registrar

## Automated Deployment (Optional)

Consider setting up GitHub Actions or similar CI/CD pipeline for automated deployments:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          # Add deployment script here
```

This deployment guide ensures a smooth and secure deployment process for your Alashore Marine website.