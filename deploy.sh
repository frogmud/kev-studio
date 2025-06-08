#!/bin/bash

# Simple deployment script for kevingrzejka.com
# Usage: ./deploy.sh

SOURCE_DIR="/Users/kevin/Desktop/WEBSITES/PORTFOLIO/deploy-ready"
DESTINATION="your-username@your-server.com:/path/to/www/kevingrzejka.com/"

# Ensure source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: Source directory not found"
  echo "Please run: node prepare-for-launch.js"
  exit 1
fi

# Upload files via rsync
echo "Deploying website to production..."
rsync -avz --delete "$SOURCE_DIR/" "$DESTINATION"

echo "Deployment completed!"
