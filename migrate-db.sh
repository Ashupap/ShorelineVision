#!/bin/bash

# Database Migration Script for Alashore Marine
# This script handles database setup and migrations safely

set -e

echo "🗄️  Starting database migration for Alashore Marine..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Load environment variables
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
    print_success "Environment variables loaded"
else
    print_error ".env file not found!"
    exit 1
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    print_error "DATABASE_URL not set in .env file"
    exit 1
fi

# Test database connection
echo "Testing database connection..."
if pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" &> /dev/null; then
    print_success "Database connection successful"
else
    print_error "Cannot connect to database"
    exit 1
fi

# Create database backup before migration
BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
echo "Creating database backup: $BACKUP_FILE"
pg_dump "$DATABASE_URL" > "$BACKUP_FILE"
print_success "Database backup created: $BACKUP_FILE"

# Run database migrations
echo "Applying database schema changes..."
npm run db:push

print_success "Database migration completed!"

# Verify critical tables exist
echo "Verifying database structure..."
TABLES=(
    "users"
    "sessions" 
    "testimonials"
    "products"
    "blog_posts"
    "inquiries"
    "website_content"
    "media_files"
    "website_settings"
)

for table in "${TABLES[@]}"; do
    if psql "$DATABASE_URL" -t -c "SELECT to_regclass('public.$table');" | grep -q "$table"; then
        echo "✓ Table '$table' exists"
    else
        print_warning "Table '$table' not found"
    fi
done

print_success "Database migration completed successfully!"
echo "Backup saved as: $BACKUP_FILE"