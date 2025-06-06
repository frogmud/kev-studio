"use strict";

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

/**
 * Prepares a leaner directory structure for website launch
 * Creates a minimal deployment version with only the necessary files
 */
async function prepareForLaunch() {
  const rootDir = __dirname;
  const portfolioDir = path.join(rootDir, 'portfolio');
  const deployDir = path.join(rootDir, 'deploy-ready');
  
  try {
    // Create deploy directory if it doesn't exist
    await fs.mkdir(deployDir, { recursive: true });
    console.log('Created deploy directory');
    
    // List of main files to copy
    const mainFiles = [
      'index.html',
      'about.html',
      'contact.html',
      'lets-work-together.html', // Keeping this for backward compatibility
      'resume.html',
      'styles.css'
    ];
    
    // List of directories to copy
    const directoriesToCopy = [
      'favicon',
      'images',
      'videos',
      'projects',
      'data',
      'resume',
      'files'
    ];
    
    // Copy main files
    for (const file of mainFiles) {
      const sourcePath = path.join(portfolioDir, file);
      const destPath = path.join(deployDir, file);
      
      try {
        await fs.copyFile(sourcePath, destPath);
        console.log(`Copied ${file}`);
      } catch (err) {
        console.warn(`Warning: Could not copy ${file}: ${err.message}`);
      }
    }
    
    // Helper function to copy a directory recursively
    async function copyDir(src, dest) {
      await fs.mkdir(dest, { recursive: true });
      
      const entries = await fs.readdir(src, { withFileTypes: true });
      
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        // Skip .DS_Store files
        if (entry.name === '.DS_Store') continue;
        
        if (entry.isDirectory()) {
          await copyDir(srcPath, destPath);
        } else {
          await fs.copyFile(srcPath, destPath);
        }
      }
    }
    
    // Copy directories
    for (const dir of directoriesToCopy) {
      const sourceDir = path.join(portfolioDir, dir);
      const destDir = path.join(deployDir, dir);
      
      try {
        await copyDir(sourceDir, destDir);
        console.log(`Copied directory ${dir}`);
      } catch (err) {
        console.warn(`Warning: Could not copy directory ${dir}: ${err.message}`);
      }
    }
    
    // Create .htaccess file if it doesn't exist
    const htaccessPath = path.join(deployDir, '.htaccess');
    const htaccessContent = `# Enable directory browsing
Options +Indexes

# Enable URL rewriting
RewriteEngine On

# Redirect 404 errors to custom page
ErrorDocument 404 /404.html

# Redirect old URLs to new URLs
Redirect 301 /lets-work-together.html /about.html
`;
    
    await fs.writeFile(htaccessPath, htaccessContent, 'utf8');
    console.log('Created .htaccess file');
    
    // Create a 404.html file
    const notFoundPage = path.join(deployDir, '404.html');
    const notFoundContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kevin Grzejka</title>
    <link rel="shortcut icon" href="favicon/k-fav-bigger.ico" type="image/x-icon">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="theme-light">
    <div class="container">
        <div class="header">
            <div class="logo-container">
                <a href="index.html" class="logo">Kevin Grzejka</a>
            </div>
            <div class="navigation">
                <a href="about.html" class="nav-link">About</a>
                <a href="index.html" class="nav-link active">Work</a>
                <a href="resume.html" class="nav-link">Resume</a>
                <div class="theme-toggle" id="theme-toggle" title="Toggle dark mode">
                    <span id="toggle-emoji">☀</span>
                </div>
            </div>
        </div>
        <div class="content-container" style="text-align: center; padding: 100px 20px;">
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for does not exist.</p>
            <div style="margin-top: 40px;">
                <a href="index.html" class="button">Return to Portfolio</a>
            </div>
        </div>
    </div>
    <script>
        // Theme toggle functionality
        const toggleBtn = document.getElementById('theme-toggle');
        const emoji = document.getElementById('toggle-emoji');
        const body = document.body;
        
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
            emoji.innerText = savedTheme === 'dark' ? '☾' : '☀';
        } else {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            body.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
            emoji.innerText = prefersDarkMode ? '☾' : '☀';
        }
        
        toggleBtn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            emoji.innerText = newTheme === 'dark' ? '☾' : '☀';
        });
    </script>
</body>
</html>`;
    
    await fs.writeFile(notFoundPage, notFoundContent, 'utf8');
    console.log('Created 404.html file');
    
    // Create a deploy script
    const deployScript = path.join(rootDir, 'deploy.sh');
    const deployContent = `#!/bin/bash

# Simple deployment script for kevingrzejka.com
# Usage: ./deploy.sh

SOURCE_DIR="${path.join(rootDir, 'deploy-ready')}"
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
`;
    
    await fs.writeFile(deployScript, deployContent, 'utf8');
    await fs.chmod(deployScript, 0o755); // Make executable
    console.log('Created deploy.sh script');
    
    console.log('\nPreparation completed! Deploy-ready directory created at: ' + deployDir);
    console.log('\nNext steps:');
    console.log('1. Review the contents of the deploy-ready directory');
    console.log('2. Edit deploy.sh with your server details');
    console.log('3. Run ./deploy.sh to upload the website');
  } catch (err) {
    console.error('Error during preparation:', err);
  }
}

// Run the preparation function
prepareForLaunch().catch(console.error);
