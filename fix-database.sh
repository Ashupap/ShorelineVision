#!/bin/bash

echo "🔧 Fixing database schema for authentication..."

# Load environment variables
if [ -f ".env" ]; then
    source .env
else
    echo "❌ Error: .env file not found"
    exit 1
fi

# Run the migration
echo "📄 Running database migration..."
psql "$DATABASE_URL" -f migrate-auth-columns.sql

echo "✅ Database migration completed!"

# Try to push the schema again
echo "🔄 Pushing schema..."
npm run db:push --force

echo "🎉 Database is now ready for authentication!"
echo ""
echo "Now you can create admin users with:"
echo "  ./create-admin.sh"