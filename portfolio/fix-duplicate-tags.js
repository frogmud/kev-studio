"use strict";

const fs = require('fs').promises;
const path = require('path');

/**
 * One-time cleanup script to fix duplicate data-tags attributes in index.html
 */
async function fixDuplicateTags() {
  try {
    console.log('Starting cleanup of duplicate data-tags attributes...');
    
    // Read current index.html
    const indexPath = path.join(__dirname, 'index.html');
    let indexContent = await fs.readFile(indexPath, 'utf8');
    
    // Regex to find project cards with duplicate data-tags attributes
    const duplicateTagsRegex = /<div class="project-card"([^>]*data-tags="[^"]*")(?:[^>]*data-tags="[^"]*")+/g;
    
    // Replace duplicate data-tags with a single attribute
    indexContent = indexContent.replace(duplicateTagsRegex, (match, firstTagAttr) => {
      // Extract all data-tags values
      const tagsRegex = /data-tags="([^"]*)"/g;
      const allTags = [];
      let tagMatch;
      
      while ((tagMatch = tagsRegex.exec(match)) !== null) {
        const tags = tagMatch[1].split(',');
        tags.forEach(tag => {
          if (tag && !allTags.includes(tag)) {
            allTags.push(tag);
          }
        });
      }
      
      // Remove all data-tags attributes
      let cleanedDiv = match.replace(/data-tags="[^"]*"/g, '');
      
      // Add back a single data-tags attribute with all unique tags
      cleanedDiv = cleanedDiv.replace('class="project-card"', `class="project-card" data-tags="${allTags.join(',')}"`);
      
      return cleanedDiv;
    });
    
    // Write the updated content back to the file
    await fs.writeFile(indexPath, indexContent, 'utf8');
    console.log('Successfully removed duplicate data-tags attributes!');
    
  } catch (error) {
    console.error('Error fixing duplicate tags:', error);
  }
}

// Run the script
fixDuplicateTags();