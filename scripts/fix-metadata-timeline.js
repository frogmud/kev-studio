"use strict";

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');
const util = require('util');
const globPromise = util.promisify(glob);

/**
 * Script to fix HTML structure issues in project pages where 
 * timeline content is incorrectly being included in metadata sections
 */
async function fixProjectPages() {
  try {
    console.log('Starting project page metadata structure fix...');
    
    // Get all project HTML files
    const projectsDir = path.join(__dirname, '..', 'portfolio', 'projects');
    const htmlFiles = await globPromise(`${projectsDir}/*.html`);
    
    console.log(`Found ${htmlFiles.length} project pages to check`);
    
    let fixedCount = 0;
    
    for (const filePath of htmlFiles) {
      try {
        let content = await fs.readFile(filePath, 'utf8');
        const fileName = path.basename(filePath);
        
        // Skip project-template files
        if (fileName.includes('template')) {
          console.log(`Skipping template file: ${fileName}`);
          continue;
        }
        
        // Check if there's a HTML structure issue where metadata isn't properly closed
        // Look for patterns where project-metadata opening div isn't properly closed before project-timeline
        let isFixed = false;
        
        // Pattern 1: Missing closing div for project-metadata before project-timeline
        if (content.includes('<div class="project-metadata">') && 
            content.includes('<div class="project-timeline">') &&
            !content.match(/<\/div>\s*<\/div>\s*<div class="project-description">/)) {
          
          // Fix: Ensure project-metadata and project-info are properly closed
          const fixedContent = content.replace(
            /(<div class="project-metadata">[\s\S]*?)(<div class="project-timeline">)/,
            '$1</div>\n            </div>\n            \n            <div class="project-description">\n                $2'
          );
          
          // Only save if there was a change
          if (fixedContent !== content) {
            await fs.writeFile(filePath, fixedContent);
            isFixed = true;
            fixedCount++;
            console.log(`✅ Fixed metadata structure in ${fileName}`);
          }
        }
        
        // Pattern 2: Detect stray end tags (p tags) in metadata
        if (!isFixed && content.includes('<div class="project-metadata">')) {
          const metadataRegex = /<div class="metadata-item">\s*<h3>[^<]*<\/h3>\s*<p>[^<]*<\/p><\/p>/g;
          if (content.match(metadataRegex)) {
            const fixedContent = content.replace(metadataRegex, (match) => {
              return match.replace(/<\/p><\/p>/g, '</p>');
            });
            
            if (fixedContent !== content) {
              await fs.writeFile(filePath, fixedContent);
              isFixed = true;
              fixedCount++;
              console.log(`✅ Fixed stray </p> tags in ${fileName}`);
            }
          }
        }
        
        // Pattern 3: Handle timeline content mixed with metadata
        if (!isFixed && content.includes('<div class="project-metadata">') && 
            content.includes('<div class="timeline-item">')) {
          
          // Check if timeline appears within the metadata section
          const metadataSection = content.match(/<div class="project-metadata">[\s\S]*?(?:<\/div>\s*<\/div>\s*<div class="project-description">|<div class="timeline-item">)/);
          
          if (metadataSection && metadataSection[0].includes('<div class="timeline-item">')) {
            // Timeline is inside metadata - fix structure
            const fixedContent = content.replace(
              /(<div class="project-metadata">[\s\S]*?)(<div class="timeline-item">[\s\S]*)/,
              '$1</div>\n            </div>\n            \n            <div class="project-description">\n                <div class="project-timeline">\n                    $2'
            );
            
            if (fixedContent !== content) {
              await fs.writeFile(filePath, fixedContent);
              isFixed = true;
              fixedCount++;
              console.log(`✅ Fixed timeline mixed with metadata in ${fileName}`);
            }
          }
        }
        
        if (!isFixed) {
          console.log(`✓ No issues found in ${fileName}`);
        }
        
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
      }
    }
    
    console.log(`\nCompleted! Fixed ${fixedCount} project pages.`);
    
  } catch (error) {
    console.error('Error fixing project pages:', error);
  }
}

// Run the script
fixProjectPages();