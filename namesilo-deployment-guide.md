# NameSilo Hosting Deployment Guide

This guide provides specific instructions for deploying your portfolio website to NameSilo hosting, which you've purchased alongside your kev.studio domain.

## NameSilo Hosting Setup

1. **Access Your NameSilo Control Panel**
   - Log in to your NameSilo account
   - Navigate to the Hosting section
   - If you haven't activated hosting yet, select a plan that includes:
     - At least 5GB storage (for your images/videos)
     - Unlimited bandwidth (or sufficient for your traffic needs)
     - cPanel access
     - FTP/SFTP support

2. **Connect Your Domain to Hosting**
   - In your NameSilo dashboard, ensure your kev.studio domain is pointed to your hosting
   - This is usually automatic if you purchased hosting and domain together

3. **Obtain Your FTP/SFTP Credentials**
   - From your hosting control panel, locate your FTP credentials
   - You'll need:
     - Server hostname (typically ftp.kev.studio or similar)
     - Username
     - Password
     - Port (usually 21 for FTP, 22 for SFTP/SSH)

## Preparing Your Files

Run the preparation script to create your deployment package:

```bash
node prepare-for-launch.js
```

This will create a `deploy-ready` directory with all necessary files organized in the lean structure.

## Deployment Options

### Option 1: Using an FTP Client (Recommended for NameSilo)

1. **Download and install an FTP client** if you don't have one:
   - [FileZilla](https://filezilla-project.org/) (cross-platform)
   - [Cyberduck](https://cyberduck.io/) (macOS/Windows)
   - [WinSCP](https://winscp.net/) (Windows)

2. **Connect to your hosting**:
   - Enter your NameSilo FTP credentials
   - Connect to the server

3. **Upload your files**:
   - Navigate to the public directory on your server (usually `public_html`, `www`, or `htdocs`)
   - Upload the contents of your `deploy-ready` directory
   - Ensure file permissions are set correctly (644 for files, 755 for directories)

### Option 2: Using Modified deploy.sh Script

If your NameSilo hosting plan supports SSH/SFTP, you can modify the deploy.sh script:

1. **Update the deploy.sh script** with your NameSilo credentials:

```bash
#!/bin/bash

# Deployment script for kev.studio on NameSilo
# Usage: ./deploy.sh

SOURCE_DIR="$(dirname "$0")/deploy-ready"
DESTINATION="your-username@your-namesilo-server.com:/path/to/public_html/"

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
```

2. **Run the deployment script**:
```bash
./deploy.sh
```

### Option 3: cPanel File Manager

If you prefer using the web interface:

1. **Log in to cPanel** provided by NameSilo
2. **Open File Manager** and navigate to your public directory
3. **Upload your files** using the upload feature
4. **Set correct permissions** using the "Change Permissions" feature

## Post-Deployment Configuration

### Set Up HTTPS

1. In your NameSilo/cPanel, look for:
   - SSL/TLS options
   - Let's Encrypt integration (free SSL certificates)
   - Follow the wizard to secure your site with HTTPS

### Configure .htaccess

Ensure your .htaccess file (included in deploy-ready) has these settings:

```
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect www to non-www (or reverse if preferred)
RewriteCond %{HTTP_HOST} ^www\.kev\.studio [NC]
RewriteRule ^(.*)$ https://kev.studio/$1 [L,R=301]

# Error pages
ErrorDocument 404 /404.html

# Redirects for old pages
Redirect 301 /lets-work-together.html /about.html
```

### Test Your Website

1. **Check all pages** load correctly
2. **Verify images and videos** display properly
3. **Test theme toggle functionality**
4. **Verify mobile responsiveness**
5. **Test resume download**

## Troubleshooting

### Common Issues with NameSilo Hosting

1. **Missing Images/Resources**
   - Check file paths in HTML
   - Ensure all files were uploaded
   - Verify file permissions (644 for files, 755 for directories)

2. **404 Errors**
   - Ensure all files have proper names (case-sensitive)
   - Check that the .htaccess file was uploaded correctly
   - Verify your custom 404 page exists

3. **HTTPS Not Working**
   - Ensure SSL certificate is installed in your hosting panel
   - Check that all resources use HTTPS URLs

4. **Support Resources**
   - NameSilo support: [https://www.namesilo.com/Support](https://www.namesilo.com/Support)
   - NameSilo knowledge base: [https://www.namesilo.com/kb/](https://www.namesilo.com/kb/)

## Maintenance

### Regular Backups

Set up a local backup routine:

```bash
# Replace with your actual credentials
lftp -u username,password ftp.kev.studio -e "mirror --reverse /path/to/public_html/ ./backup/; quit"
```

### Updates Process

For future updates:
1. Make changes locally
2. Test thoroughly
3. Run prepare-for-launch.js again
4. Upload only changed files using your preferred method