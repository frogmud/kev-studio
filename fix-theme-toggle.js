"use strict";

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

/**
 * Updates the theme toggle to use symbols instead of emoji on all project pages
 */
async function updateThemeToggle() {
  try {
    // Get all project HTML files
    const projectFiles = glob.sync(path.join(__dirname, 'portfolio/projects/*.html'));
    
    let updatedCount = 0;
    
    // Process each file
    for (const filePath of projectFiles) {
      // Read the HTML file
      let htmlContent = await fs.readFile(filePath, 'utf8');
      
      // Check if the toggle needs updating
      if (htmlContent.includes('<span class="sun">☀️</span>') && 
          htmlContent.includes('<span class="moon">🌙</span>')) {
        
        // Update the toggle HTML
        htmlContent = htmlContent.replace(
          /<div class="theme-toggle"([^>]*)>\s*<span class="sun">☀️<\/span>\s*<span class="moon">🌙<\/span>\s*<\/div>/,
          `<div class="theme-toggle"$1>
                        <span class="sun">◐</span>
                        <span class="moon">◑</span>
                    </div>`
        );
        
        // Write the updated HTML back to the file
        await fs.writeFile(filePath, htmlContent, 'utf8');
        updatedCount++;
        
        console.log(`Updated toggle in: ${path.basename(filePath)}`);
      }
    }
    
    console.log(`Successfully updated ${updatedCount} project pages with new theme toggle.`);
    
  } catch (error) {
    console.error('Error updating theme toggle:', error);
  }
}

// Run if this script is executed directly
if (require.main === module) {
  updateThemeToggle();
}