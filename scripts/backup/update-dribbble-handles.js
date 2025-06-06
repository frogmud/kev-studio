"use strict";

const fs = require('fs').promises;
const path = require('path');

// Function to update Dribbble handles in HTML files
async function updateDribbbleHandles(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file.name);
      
      if (file.isDirectory()) {
        // Skip node_modules and other special directories
        if (file.name !== 'node_modules' && !file.name.startsWith('.')) {
          await updateDribbbleHandles(filePath);
        }
      } else if (file.name.endsWith('.html')) {
        console.log(`Processing ${filePath}`);
        
        let content = await fs.readFile(filePath, 'utf8');
        let modified = false;
        
        // Update Dribbble handle in footer links (keep the URL as is, just update the display text)
        const dribbbleRegex = /<a href="https:\/\/dribbble.com\/kevingrz"[^>]*>[\s\S]*?@k_gosh[\s\S]*?<\/a>/g;
        if (dribbbleRegex.test(content)) {
          content = content.replace(dribbbleRegex, match => {
            return match.replace('@k_gosh', '@kevingrz');
          });
          modified = true;
        }
        
        // Write back changes if modified
        if (modified) {
          await fs.writeFile(filePath, content, 'utf8');
          console.log(`Updated Dribbble handle in ${filePath}`);
        } else {
          console.log(`No Dribbble handle updates needed for ${filePath}`);
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
  console.log(`Starting to update Dribbble handles in ${portfolioDir}`);
  await updateDribbbleHandles(portfolioDir);
  console.log('Done updating Dribbble handles');
}

main().catch(console.error);