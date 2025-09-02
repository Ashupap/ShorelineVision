#!/bin/bash

# Quick fix script to build and restart the service
echo "🔧 Fixing Alashore Marine service..."

# Build the application
echo "Building application..."
npm run build

# Restart the service
echo "Restarting service..."
sudo systemctl restart alashore-marine

# Check status
echo "Service status:"
sudo systemctl status alashore-marine --no-pager -l

echo "✅ Fix applied!"