"use strict";

const fs = require('fs').promises;
const path = require('path');

// Function to update HTML files
async function updateHtmlFiles(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file.name);
      
      if (file.isDirectory()) {
        // Skip node_modules and other special directories
        if (file.name !== 'node_modules' && !file.name.startsWith('.')) {
          await updateHtmlFiles(filePath);
        }
      } else if (file.name.endsWith('.html')) {
        console.log(`Processing ${filePath}`);
        
        let content = await fs.readFile(filePath, 'utf8');
        let modified = false;
        
        // Update title
        const titleRegex = /<title>.*?<\/title>/;
        if (titleRegex.test(content)) {
          content = content.replace(titleRegex, '<title>Kevin Grzejka</title>');
          modified = true;
        }
        
        // Favicon handling removed
        
        // Write back changes if modified
        if (modified) {
          await fs.writeFile(filePath, content, 'utf8');
          console.log(`Updated ${filePath}`);
        } else {
          console.log(`No changes needed for ${filePath}`);
        }
      }
    }
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

// Main function
async function main() {
  const portfolioDir = path.join(__dirname, 'portfolio');
  console.log(`Starting to update HTML files in ${portfolioDir}`);
  await updateHtmlFiles(portfolioDir);
  console.log('Done updating HTML files');
}

main().catch(console.error);