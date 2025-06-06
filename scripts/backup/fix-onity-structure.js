"use strict";

const fs = require('fs').promises;
const path = require('path');

async function fixOnityStructure() {
  const filePath = path.join(__dirname, 'portfolio', 'projects', 'onity.html');
  
  try {
    // Read the HTML content
    let content = await fs.readFile(filePath, 'utf8');
    
    // Fix the structure by properly closing divs and moving the Final deliverables section
    const fixedContent = content
      // Close the image-grid div properly in Brand applications section
      .replace(/<\/figure>\s*<\/figure>\s*<div class="timeline-item">/, '</figure>\n                            </figure>\n                        </div>\n                    </div>\n\n                    <div class="timeline-item">')
      
      // Remove the extra closing div tags after the Final deliverables section
      .replace(/<\/div><\/div>\s*<\/div>\s*<div class="timeline-item">/, '</div>\n\n                    <div class="timeline-item">');
    
    // Write the fixed content back to the file
    await fs.writeFile(filePath, fixedContent, 'utf8');
    console.log('Successfully fixed the HTML structure in onity.html');
  } catch (error) {
    console.error('Error updating the file:', error);
  }
}

fixOnityStructure();