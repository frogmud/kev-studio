"use strict";

const fs = require('fs').promises;
const path = require('path');

// Function to update Instagram handles in HTML files
async function updateInstagramHandles(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file.name);
      
      if (file.isDirectory()) {
        // Skip node_modules and other special directories
        if (file.name !== 'node_modules' && !file.name.startsWith('.')) {
          await updateInstagramHandles(filePath);
        }
      } else if (file.name.endsWith('.html')) {
        console.log(`Processing ${filePath}`);
        
        let content = await fs.readFile(filePath, 'utf8');
        let modified = false;
        
        // Update Instagram handle in footer links
        const instagramRegex = /@kevingrz/g;
        if (instagramRegex.test(content)) {
          content = content.replace(instagramRegex, '@k_gosh');
          modified = true;
        }
        
        // Write back changes if modified
        if (modified) {
          await fs.writeFile(filePath, content, 'utf8');
          console.log(`Updated Instagram handle in ${filePath}`);
        } else {
          console.log(`No Instagram handle updates needed for ${filePath}`);
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
  console.log(`Starting to update Instagram handles in ${portfolioDir}`);
  await updateInstagramHandles(portfolioDir);
  console.log('Done updating Instagram handles');
}

main().catch(console.error);