# Website Launch Instructions

## Preparation

1. **Run the preparation script to create a deployment-ready directory**:
   ```
   node prepare-for-launch.js
   ```
   This will create a `deploy-ready` directory with only the necessary files for your website.

2. **Review the content** in the `deploy-ready` directory to ensure everything is included.

3. **Update the deployment script** with your server details:
   ```
   nano deploy.sh
   ```
   Replace the `DESTINATION` variable with your DreamHost server information.

## Deployment Options

### Option 1: Using the included deploy.sh script (recommended)

1. **Make the script executable** (if not already):
   ```
   chmod +x deploy.sh
   ```

2. **Run the deployment script**:
   ```
   ./deploy.sh
   ```
   This will use rsync to efficiently upload only the changed files to your server.

### Option 2: Using the existing DreamHost script

1. **Update server information** in deploy-to-dreamhost.sh:
   ```
   nano deploy-to-dreamhost.sh
   ```

2. **Run the DreamHost deployment script**:
   ```
   ./deploy-to-dreamhost.sh
   ```

### Option 3: Manual FTP/SFTP Upload

If you prefer to use an FTP client:

1. Connect to your DreamHost server using your preferred FTP client
2. Navigate to your website directory on the server
3. Upload the contents of the `deploy-ready` directory

## Post-Deployment Verification

After deployment, verify that your website is working correctly:

1. Check that all pages load without errors
2. Verify that images and videos display correctly
3. Test the theme toggle functionality
4. Test navigation and project filtering
5. Verify that the resume PDF can be downloaded
6. Test the website on different devices and browsers

## Directory Structure

Your deployed website will have this clean structure:

```
/
├── index.html
├── about.html
├── contact.html
├── lets-work-together.html (301 redirect to about.html)
├── resume.html
├── 404.html
├── styles.css
├── .htaccess
├── favicon/
│   └── k-fav-bigger.ico
├── images/
│   └── (all image assets)
├── videos/
│   └── (video assets)
├── projects/
│   └── (HTML pages for each project)
├── data/
│   └── taxonomy.json
├── resume/
│   └── (PDF and images of the résumé)
└── files/
    └── kevin-grzejka-resume-062025.pdf
```

## Troubleshooting

- If images are missing, check the paths in HTML files
- If styles are not applied, verify that styles.css was copied correctly
- For 404 errors on project pages, ensure all project HTML files were included
- If the theme toggle doesn't work, check for JavaScript errors in the browser console

## Backup

Before making major changes to your live site, always create a backup:

```
rsync -avz your-username@your-server.com:/path/to/www/kevingrzejka.com/ ./site-backup/
```