"use strict";

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function updateLogoSize() {
  try {
    // Get all HTML files in the portfolio directory
    const pattern = 'portfolio/**/*.html';
    const files = glob.sync(pattern);
    
    console.log(`Found ${files.length} HTML files to process`);
    
    let updatedCount = 0;
    
    // Process each file
    for (const filePath of files) {
      try {
        // Read file content
        const content = await fs.readFile(filePath, 'utf8');
        
        // Replace width="40" height="40" with width="30" height="30" in both logo img tags
        const updatedContent = content.replace(
          /<img src="images\/kpfp-black\.svg" alt="Kevin Grzejka" class="logo light-logo" width="40" height="40">/g, 
          '<img src="images/kpfp-black.svg" alt="Kevin Grzejka" class="logo light-logo" width="30" height="30">'
        ).replace(
          /<img src="images\/kpfp-white\.svg" alt="Kevin Grzejka" class="logo dark-logo" width="40" height="40">/g,
          '<img src="images/kpfp-white.svg" alt="Kevin Grzejka" class="logo dark-logo" width="30" height="30">'
        );
        
        // If the content has changed, write it back to the file
        if (content !== updatedContent) {
          await fs.writeFile(filePath, updatedContent, 'utf8');
          updatedCount++;
          console.log(`Updated ${filePath}`);
        }
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
      }
    }
    
    console.log(`Updated logo size in ${updatedCount} HTML files`);
  } catch (err) {
    console.error('Error updating logo size:', err);
  }
}

updateLogoSize();