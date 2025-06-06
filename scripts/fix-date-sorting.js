"use strict";

const fs = require('fs').promises;
const path = require('path');

async function fixDateSorting() {
  try {
    console.log('Starting date sorting fix...');
    
    // Read taxonomy data
    const taxonomyPath = path.join(__dirname, '..', 'portfolio', 'data', 'taxonomy.json');
    const taxonomyData = JSON.parse(await fs.readFile(taxonomyPath, 'utf8'));
    
    // Get index file
    const indexPath = path.join(__dirname, '..', 'portfolio', 'index.html');
    let indexContent = await fs.readFile(indexPath, 'utf8');
    
    // Process each project
    for (const project of taxonomyData.projects) {
      try {
        // Get project year from its info.md
        const infoPath = path.join(__dirname, '..', 'portfolio', 'projects', project.id, 'info.md');
        
        try {
          const infoContent = await fs.readFile(infoPath, 'utf8');
          // Extract year using regex
          const yearMatch = infoContent.match(/Year:\s*(20\d\d)/);
          
          if (yearMatch && yearMatch[1]) {
            const year = yearMatch[1];
            console.log(`Project ${project.id}: Found year ${year}`);
            
            // Look for this project's card in the index.html
            const projectCardRegex = new RegExp(
              `<div class="project-card"[^>]*data-categories="[^"]*"[^>]*>\\s*<div class="project-image">\\s*<img[^>]*${project.id}[^>]*>`,
              'i'
            );
            
            // If project card exists in index.html
            if (projectCardRegex.test(indexContent)) {
              console.log(`Updating ${project.id} with year ${year}`);
              
              // Update or add data-year attribute
              indexContent = indexContent.replace(
                projectCardRegex,
                match => {
                  if (/data-year="[^"]*"/i.test(match)) {
                    // Replace existing data-year
                    return match.replace(/data-year="[^"]*"/i, `data-year="${year}"`);
                  } else {
                    // Add new data-year attribute after data-tags
                    if (/data-tags="[^"]*"/i.test(match)) {
                      return match.replace(
                        /data-tags="([^"]*)"/,
                        `data-tags="$1" data-year="${year}"`
                      );
                    } else {
                      // Add after data-categories if no data-tags
                      return match.replace(
                        /data-categories="([^"]*)"/,
                        `data-categories="$1" data-year="${year}"`
                      );
                    }
                  }
                }
              );
            } else {
              console.log(`Warning: Could not find card for ${project.id} in index.html`);
            }
          }
        } catch (err) {
          console.log(`Warning: Could not read info.md for ${project.id}: ${err.message}`);
        }
      } catch (err) {
        console.error(`Error processing project ${project.id}:`, err);
      }
    }
    
    // Write updated index.html
    await fs.writeFile(indexPath, indexContent, 'utf8');
    console.log('Updated index.html with correct data-year attributes');
    
    // Check for any missing data-year attributes (fallback)
    const missingYearCount = (indexContent.match(/<div class="project-card"[^>]*(?!data-year=)[^>]*>/g) || []).length;
    if (missingYearCount > 0) {
      console.warn(`Warning: ${missingYearCount} project cards still missing data-year attribute`);
    }
    
    console.log('Date sorting fix completed successfully!');
  } catch (err) {
    console.error('Error fixing date sorting:', err);
  }
}

// Run the script
fixDateSorting();