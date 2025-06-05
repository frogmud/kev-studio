"use strict";

const fs = require('fs').promises;
const path = require('path');

// Function to update Instagram URLs in HTML files to match the handle
async function updateInstagramURLs(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file.name);
      
      if (file.isDirectory()) {
        // Skip node_modules and other special directories
        if (file.name !== 'node_modules' && !file.name.startsWith('.')) {
          await updateInstagramURLs(filePath);
        }
      } else if (file.name.endsWith('.html')) {
        console.log(`Processing ${filePath}`);
        
        let content = await fs.readFile(filePath, 'utf8');
        let modified = false;
        
        // Fix the Instagram link URL to match the display handle @k_gosh
        // Using a more specific regex to check for Instagram URLs with kevingrz
        const instagramRegex = /href="https:\/\/instagram.com\/kevingrz"/g;
        if (instagramRegex.test(content)) {
          content = content.replace(instagramRegex, 'href="https://instagram.com/k_gosh"');
          modified = true;
        }
        
        // Write back changes if modified
        if (modified) {
          await fs.writeFile(filePath, content, 'utf8');
          console.log(`Updated Instagram URL in ${filePath}`);
        } else {
          console.log(`No Instagram URL updates needed for ${filePath}`);
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
  console.log(`Starting to update Instagram URLs in ${portfolioDir}`);
  await updateInstagramURLs(portfolioDir);
  console.log('Done updating Instagram URLs');
}

main().catch(console.error);