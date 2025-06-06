"use strict";

const fs = require('fs').promises;
const path = require('path');

async function fixLogoVisibility() {
  try {
    // Add inline CSS to all HTML files to ensure only one logo shows at a time
    const cssToAdd = `
<style>
/* Logo visibility fix */
.logo-link .dark-logo {
  display: none !important;
}

.logo-link .light-logo {
  display: block !important;
}

[data-theme="dark"] .logo-link .dark-logo {
  display: block !important;
}

[data-theme="dark"] .logo-link .light-logo {
  display: none !important;
}
</style>
`;

    // Find all HTML files
    const indexPath = path.join(__dirname, 'portfolio', 'index.html');
    const aboutPath = path.join(__dirname, 'portfolio', 'about.html');
    const contactPath = path.join(__dirname, 'portfolio', 'contact.html');
    
    // Array of files to modify
    const filesToModify = [indexPath, aboutPath, contactPath];
    
    // Process each file
    for (const filePath of filesToModify) {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        
        // Check if the file already has the style
        if (content.includes('/* Logo visibility fix */')) {
          console.log(`Style already exists in ${filePath}`);
          continue;
        }
        
        // Add the style before the closing head tag
        const updatedContent = content.replace('</head>', `${cssToAdd}</head>`);
        
        // Write the updated content back to the file
        await fs.writeFile(filePath, updatedContent, 'utf8');
        console.log(`Updated ${filePath}`);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
      }
    }
    
    console.log('Logo visibility fix completed');
  } catch (err) {
    console.error('Error fixing logo visibility:', err);
  }
}

fixLogoVisibility();