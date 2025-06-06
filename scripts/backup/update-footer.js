"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateFooterLinks() {
  try {
    const projectsDir = path.join(__dirname, 'portfolio', 'projects');
    const files = await fs.readdir(projectsDir);
    
    // Filter to only include HTML files
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    console.log(`Found ${htmlFiles.length} HTML files to process`);
    
    // Create a counter for updated files
    let updatedCount = 0;
    
    // Process each HTML file
    for (const file of htmlFiles) {
      const filePath = path.join(projectsDir, file);
      let content = await fs.readFile(filePath, 'utf8');
      
      // The pattern to look for - this includes the SVG and the "about" text
      const searchPattern = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5\.514 0 10 4\.486 10 10s-4\.486 10-10 10-10-4\.486-10-10 4\.486-10 10-10zm0-2c-6\.627 0-12 5\.373-12 12s5\.373 12 12 12 12-5\.373 12-12-5\.373-12-12-12zm-\.001 5\.75c\.69 0 1\.251\.56 1\.251 1\.25s-\.561 1\.25-1\.251 1\.25-1\.249-\.56-1\.249-1\.25\.559-1\.25 1\.249-1\.25zm2\.001 12\.25h-4v-1c\.484-\.179 1-\.201 1-\.735v-4\.467c0-\.534-\.516-\.618-1-\.797v-1h3v6\.265c0 \.535\.517\.558 1 \.735v\.999z"\/><\/svg>\s*about/;
      
      // The replacement pattern - keeps the SVG but changes "about" to "Let's work together"
      const replacementPattern = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"/></svg>\n                            Let\'s work together';
      
      // Check if the file contains the pattern
      if (content.match(searchPattern)) {
        // Replace the pattern with the new text
        const updatedContent = content.replace(searchPattern, replacementPattern);
        
        // Write the updated content back to the file
        await fs.writeFile(filePath, updatedContent, 'utf8');
        
        console.log(`Updated: ${file}`);
        updatedCount++;
      } else {
        console.log(`No match found in: ${file}`);
      }
    }
    
    console.log(`\nUpdated ${updatedCount} out of ${htmlFiles.length} HTML files.`);
    
  } catch (error) {
    console.error('Error updating footer links:', error);
  }
}

// Run the function
updateFooterLinks();