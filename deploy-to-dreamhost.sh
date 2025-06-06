#!/bin/bash
# Script to deploy Kevin Grzejka's portfolio to Dreamhost
# Created by Claude on June 5, 2025

# Configuration - EDIT THESE VARIABLES
DREAMHOST_USER="your-dreamhost-username"
DREAMHOST_DOMAIN="your-domain.com"
PORTFOLIO_PATH="/Users/kevin/Desktop/WEBSITES/PORTFOLIO/portfolio"
DEPLOY_TO_SUBDIRECTORY=false  # Set to true if you want to deploy to a subdirectory
SUBDIRECTORY_NAME="portfolio" # Only used if DEPLOY_TO_SUBDIRECTORY is true

# Colors for better output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Portfolio Deployment to Dreamhost ===${NC}"
echo "This script will deploy your portfolio to Dreamhost."
echo ""

# Confirm settings
echo -e "${YELLOW}Current Settings:${NC}"
echo "Dreamhost Username: $DREAMHOST_USER"
echo "Domain: $DREAMHOST_DOMAIN"
echo "Local Portfolio Path: $PORTFOLIO_PATH"
if [ "$DEPLOY_TO_SUBDIRECTORY" = true ]; then
  echo "Deploying to subdirectory: $SUBDIRECTORY_NAME"
  REMOTE_PATH="$DREAMHOST_DOMAIN/$SUBDIRECTORY_NAME"
else
  echo "Deploying to domain root"
  REMOTE_PATH="$DREAMHOST_DOMAIN"
fi

# Confirm to proceed
echo ""
read -p "Continue with these settings? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${RED}Deployment canceled.${NC}"
  exit 1
fi

# Create temp directory for the archive
TEMP_DIR=$(mktemp -d)
ARCHIVE_NAME="portfolio-$(date +%Y%m%d%H%M%S).tar.gz"
ARCHIVE_PATH="$TEMP_DIR/$ARCHIVE_NAME"

echo -e "${GREEN}Step 1: Creating archive of portfolio files...${NC}"
tar -czvf "$ARCHIVE_PATH" -C "$(dirname "$PORTFOLIO_PATH")" "$(basename "$PORTFOLIO_PATH")"

if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to create archive. Aborting.${NC}"
  rm -rf "$TEMP_DIR"
  exit 1
fi
echo -e "${GREEN}Archive created successfully at: $ARCHIVE_PATH${NC}"

echo -e "${GREEN}Step 2: Uploading to Dreamhost...${NC}"
scp "$ARCHIVE_PATH" "$DREAMHOST_USER@$DREAMHOST_DOMAIN:~/"

if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to upload archive to Dreamhost. Aborting.${NC}"
  rm -rf "$TEMP_DIR"
  exit 1
fi
echo -e "${GREEN}Upload completed successfully.${NC}"

echo -e "${GREEN}Step 3: Extracting files on Dreamhost...${NC}"
if [ "$DEPLOY_TO_SUBDIRECTORY" = true ]; then
  # Deploy to subdirectory
  ssh "$DREAMHOST_USER@$DREAMHOST_DOMAIN" "mkdir -p ~/$REMOTE_PATH && tar -xzvf ~/$ARCHIVE_NAME -C ~/$REMOTE_PATH --strip-components=1"
else
  # Deploy to root
  ssh "$DREAMHOST_USER@$DREAMHOST_DOMAIN" "tar -xzvf ~/$ARCHIVE_NAME -C ~/$REMOTE_PATH --strip-components=1"
fi

if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to extract files on Dreamhost. Please check manually.${NC}"
  echo "You can extract manually with: tar -xzvf ~/$ARCHIVE_NAME -C ~/$REMOTE_PATH --strip-components=1"
  rm -rf "$TEMP_DIR"
  exit 1
fi
echo -e "${GREEN}Files extracted successfully.${NC}"

echo -e "${GREEN}Step 4: Setting permissions...${NC}"
ssh "$DREAMHOST_USER@$DREAMHOST_DOMAIN" "chmod -R 755 ~/$REMOTE_PATH && find ~/$REMOTE_PATH -type f -name '*.html' -o -name '*.css' -o -name '*.js' -exec chmod 644 {} \;"

if [ $? -ne 0 ]; then
  echo -e "${YELLOW}Warning: Permission setting may not have completed successfully. Please check manually.${NC}"
else
  echo -e "${GREEN}Permissions set successfully.${NC}"
fi

echo -e "${GREEN}Step 5: Cleaning up...${NC}"
ssh "$DREAMHOST_USER@$DREAMHOST_DOMAIN" "rm ~/$ARCHIVE_NAME"
rm -rf "$TEMP_DIR"

echo -e "${GREEN}===== Deployment Complete! =====${NC}"
echo "Your portfolio should now be live at: http://$DREAMHOST_DOMAIN"
if [ "$DEPLOY_TO_SUBDIRECTORY" = true ]; then
  echo "Or specifically at: http://$DREAMHOST_DOMAIN/$SUBDIRECTORY_NAME"
fi
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Test your site thoroughly"
echo "2. Verify all links, images, and functionality"
echo "3. Set up HTTPS if not already configured"
echo "4. Set up domain forwarding or redirects if needed"
echo ""
echo "Thank you for using the deployment script!"