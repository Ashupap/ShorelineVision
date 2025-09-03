#!/bin/bash

# Alashore Marine Production Deployment Script
# This script updates the entire application including database schema

set -e  # Exit on any error

echo "🚀 Starting Alashore Marine Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root or with sudo
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root. Please run as a regular user with sudo access."
   exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    print_error "PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

print_status "Checking Node.js version..."
NODE_VERSION=$(node -v)
print_success "Node.js version: $NODE_VERSION"

# Backup current deployment
print_status "Creating backup of current deployment..."
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
if [ -d "node_modules" ]; then
    mkdir -p "$BACKUP_DIR"
    cp -r package.json package-lock.json "$BACKUP_DIR/" 2>/dev/null || true
    print_success "Backup created: $BACKUP_DIR"
else
    print_warning "No existing deployment found, skipping backup"
fi

# Update system packages (optional, uncomment if needed)
# print_status "Updating system packages..."
# sudo apt update && sudo apt upgrade -y

# Pull latest code (if using git)
if [ -d ".git" ]; then
    print_status "Pulling latest code from repository..."
    git pull origin main || git pull origin master
    print_success "Code updated from repository"
else
    print_warning "Not a git repository, assuming code is already updated"
fi

# Install/Update Node.js dependencies
print_status "Installing Node.js dependencies..."
if [ -f "package-lock.json" ]; then
    npm ci --production=false
else
    npm install
fi
print_success "Dependencies installed"

# Environment variables check
print_status "Checking environment variables..."
# Check for production environment file first
if [ -f ".env.production" ]; then
    ENV_FILE=".env.production"
    print_status "Using .env.production for production deployment"
else
    ENV_FILE=".env"
fi

if [ ! -f "$ENV_FILE" ]; then
    print_warning "No .env file found. Creating template..."
    cat > "$ENV_FILE" << 'EOF'
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/alashore_marine
PGHOST=localhost
PGPORT=5432
PGUSER=alashore_user
PGPASSWORD=your_secure_password
PGDATABASE=alashore_marine

# Session Secret (generate a secure random string)
SESSION_SECRET=your_very_secure_session_secret_at_least_32_characters_long

# Application Configuration
NODE_ENV=production
PORT=8000

# Optional: Email configuration for contact forms
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_app_password
EOF
    print_warning "Please edit $ENV_FILE with your actual configuration before continuing!"
    print_warning "Press Enter to continue after updating the .env file..."
    read -r
fi

# Source environment variables
if [ -f "$ENV_FILE" ]; then
    set -a
    source "$ENV_FILE"
    set +a
    print_success "Environment variables loaded"
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    print_error "DATABASE_URL is not set in .env file"
    exit 1
fi

# Database operations
print_status "Setting up database..."

# Extract database details from DATABASE_URL
DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')

# Test database connection
print_status "Testing database connection..."
if pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" &> /dev/null; then
    print_success "Database connection successful"
else
    print_error "Cannot connect to database. Please check your database configuration."
    exit 1
fi

# Run database migrations
print_status "Updating database schema..."
npm run db:push
print_success "Database schema updated"

# Build the application
print_status "Building application for production..."
npm run build
print_success "Application built successfully"

# Create systemd service file
print_status "Setting up systemd service..."
SERVICE_FILE="/etc/systemd/system/alashore-marine.service"
APP_DIR=$(pwd)
APP_USER=$(whoami)

sudo tee "$SERVICE_FILE" > /dev/null << EOF
[Unit]
Description=Alashore Marine Seafood Export Website
After=network.target postgresql.service

[Service]
Type=simple
User=$APP_USER
WorkingDirectory=$APP_DIR
Environment=NODE_ENV=production
EnvironmentFile=$APP_DIR/.env
ExecStart=/usr/bin/node $APP_DIR/dist/index.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=alashore-marine

[Install]
WantedBy=multi-user.target
EOF

print_success "Systemd service file created"

# Set up log rotation
print_status "Setting up log rotation..."
sudo tee "/etc/logrotate.d/alashore-marine" > /dev/null << 'EOF'
/var/log/alashore-marine.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 0644 syslog adm
    postrotate
        systemctl reload rsyslog > /dev/null 2>&1 || true
    endscript
}
EOF

print_success "Log rotation configured"

# Skip nginx configuration as requested

# Reload systemd and start service
print_status "Starting Alashore Marine service..."
sudo systemctl daemon-reload
sudo systemctl enable alashore-marine
sudo systemctl restart alashore-marine

# Wait a moment for service to start
sleep 3

# Check service status
if sudo systemctl is-active --quiet alashore-marine; then
    print_success "Alashore Marine service is running!"
else
    print_error "Service failed to start. Check logs with: sudo journalctl -u alashore-marine -f"
    exit 1
fi

# Show service status
print_status "Service status:"
sudo systemctl status alashore-marine --no-pager -l

# Skip firewall configuration as requested

# Final instructions
echo ""
print_success "🎉 Deployment completed successfully!"
echo ""
print_status "Useful commands:"
echo "- Check logs: sudo journalctl -u alashore-marine -f"
echo "- Restart service: sudo systemctl restart alashore-marine"
echo "- Stop service: sudo systemctl stop alashore-marine"
echo "- Update app: ./deploy.sh"
echo ""
print_success "Alashore Marine is ready for production! 🐟"