"use strict";

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function applyLogoFixToAllFiles() {
  try {
    // Get all HTML files in the portfolio directory
    const pattern = 'portfolio/**/*.html';
    const files = glob.sync(pattern);
    
    console.log(`Found ${files.length} HTML files to process`);
    
    // CSS to add to each file
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

    let updatedCount = 0;
    
    // Process each file
    for (const filePath of files) {
      try {
        // Read file content
        const content = await fs.readFile(filePath, 'utf8');
        
        // Skip if the style is already added
        if (content.includes('/* Logo visibility fix */')) {
          console.log(`Style already exists in ${filePath}`);
          continue;
        }
        
        // Add the style before the closing head tag
        const updatedContent = content.replace('</head>', `${cssToAdd}</head>`);
        
        // Write the updated content back to the file
        await fs.writeFile(filePath, updatedContent, 'utf8');
        
        updatedCount++;
        console.log(`Updated ${filePath}`);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
      }
    }
    
    console.log(`Updated ${updatedCount} HTML files`);
    console.log('Logo visibility fix applied to all HTML files');
  } catch (err) {
    console.error('Error applying logo fix:', err);
  }
}

applyLogoFixToAllFiles();