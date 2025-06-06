#!/bin/bash

# Deployment script for kevingrzejka.com
# Usage: ./deploy.sh

SOURCE_DIR="$(dirname "$0")/deploy-ready"
DESTINATION="kg@kevingrzejka.com:/home/kg/kevingrzejka.com/"

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
