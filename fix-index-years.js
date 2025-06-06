"use strict";

const fs = require('fs').promises;
const path = require('path');

async function fixIndexYears() {
  try {
    console.log('Starting index year fix...');
    
    // Read the index.html file
    const indexPath = path.join(__dirname, 'portfolio', 'index.html');
    let indexContent = await fs.readFile(indexPath, 'utf8');
    
    // First, fix the duplicate data-year attributes in the first card
    indexContent = indexContent.replace(
      /(data-year="[^"]*"\s+){2,}/, 
      'data-year="2021" '
    );
    
    // Create a mapping of project IDs to years from info.md files
    const projectYears = {};
    
    // Get all project info.md files
    const projectsDir = path.join(__dirname, 'portfolio', 'projects');
    const projectDirs = await fs.readdir(projectsDir);
    
    // Extract years from info.md files
    for (const dir of projectDirs) {
      try {
        // Skip files, only process directories
        const stat = await fs.stat(path.join(projectsDir, dir));
        if (!stat.isDirectory()) continue;
        
        // Read the info.md file
        const infoPath = path.join(projectsDir, dir, 'info.md');
        try {
          const infoContent = await fs.readFile(infoPath, 'utf8');
          const yearMatch = infoContent.match(/Year:\s*(20\d\d)/);
          
          if (yearMatch && yearMatch[1]) {
            projectYears[dir] = yearMatch[1];
            console.log(`Project ${dir}: Year ${yearMatch[1]}`);
          }
        } catch (err) {
          // Skip if info.md doesn't exist
          console.log(`No info.md for ${dir}`);
        }
      } catch (err) {
        console.error(`Error processing ${dir}:`, err);
      }
    }
    
    // Update year attributes in project cards
    for (const [projectId, year] of Object.entries(projectYears)) {
      // Look for project card with link to this project
      const regex = new RegExp(
        `<div class="project-card[^>]*>\\s*<div class="project-image">.*?<a href="projects/${projectId}\\.html"`,
        's'
      );
      
      if (regex.test(indexContent)) {
        console.log(`Updating ${projectId} card with year ${year}`);
        
        // Replace or add data-year attribute
        indexContent = indexContent.replace(
          new RegExp(`(<div class="project-card[^>]*?)(?:data-year="[^"]*")?([^>]*>)`, 's'),
          (match, before, after) => {
            // Remove any existing data-year attributes
            const cleaned = before.replace(/\s*data-year="[^"]*"/g, '');
            return `${cleaned} data-year="${year}"${after}`;
          }
        );
      } else {
        console.log(`Warning: Could not find card for ${projectId}`);
      }
    }
    
    // Write the updated content back to the file
    await fs.writeFile(indexPath, indexContent, 'utf8');
    console.log('Index.html updated with correct year attributes');
    
  } catch (err) {
    console.error('Error fixing index years:', err);
  }
}

// Run the script
fixIndexYears();