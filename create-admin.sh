#!/bin/bash

# Simple wrapper script for creating admin users
# Usage: ./create-admin.sh

echo "🔧 Alashore Marine Admin User Creator"
echo "====================================="

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js not found. Please install Node.js first."
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found."
    echo "💡 Create a .env file with DATABASE_URL before running this script."
    exit 1
fi

echo ""
echo "Please provide the admin user details:"
echo ""

# Get username
while true; do
    read -p "👤 Username (required): " username
    if [ -n "$username" ]; then
        break
    fi
    echo "❌ Username cannot be empty"
done

# Get password
while true; do
    read -s -p "🔐 Password (required, min 6 chars): " password
    echo ""
    if [ ${#password} -ge 6 ]; then
        break
    fi
    echo "❌ Password must be at least 6 characters"
done

# Get optional fields
read -p "📧 Email (optional): " email
read -p "👤 First Name (optional): " firstName
read -p "👤 Last Name (optional): " lastName

echo ""
echo "🚀 Creating admin user..."

# Run the Node.js script
if [ -n "$email" ] && [ -n "$firstName" ] && [ -n "$lastName" ]; then
    node create-admin.js "$username" "$password" "$email" "$firstName" "$lastName"
elif [ -n "$email" ] && [ -n "$firstName" ]; then
    node create-admin.js "$username" "$password" "$email" "$firstName"
elif [ -n "$email" ]; then
    node create-admin.js "$username" "$password" "$email"
else
    node create-admin.js "$username" "$password"
fi