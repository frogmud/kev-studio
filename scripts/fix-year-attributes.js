"use strict";

const fs = require('fs').promises;
const path = require('path');

async function fixYearAttributes() {
  try {
    console.log('Starting year attribute fix...');
    
    // Read the index.html file
    const indexPath = path.join(__dirname, '..', 'portfolio', 'index.html');
    let indexContent = await fs.readFile(indexPath, 'utf8');
    
    // Find all project cards with their current attributes
    const projectCardRegex = /<div class="project-card[^>]*?(?:data-year="([^"]*)")?[^>]*?>[\s\S]*?<h3>(.*?)<\/h3>[\s\S]*?<a href="projects\/(.*?)\.html"/g;
    
    const projectCards = [];
    let match;
    
    // Extract all project cards and their data
    while ((match = projectCardRegex.exec(indexContent)) !== null) {
      const currentYear = match[1] || '';
      const projectTitle = match[2];
      const projectId = match[3];
      
      projectCards.push({
        id: projectId,
        title: projectTitle,
        currentYear
      });
    }
    
    console.log(`Found ${projectCards.length} project cards in index.html`);
    
    // Get actual years from info.md files
    for (const card of projectCards) {
      try {
        const infoPath = path.join(__dirname, '..', 'portfolio', 'projects', card.id, 'info.md');
        const infoContent = await fs.readFile(infoPath, 'utf8');
        
        const yearMatch = infoContent.match(/Year:\s*(20\d\d)/);
        if (yearMatch && yearMatch[1]) {
          card.actualYear = yearMatch[1];
          
          if (card.currentYear !== card.actualYear) {
            console.log(`Project ${card.id}: Year mismatch - Current: ${card.currentYear || 'missing'}, Actual: ${card.actualYear}`);
            
            // Update data-year attribute in index.html
            const cardRegex = new RegExp(
              `<div class="project-card[^>]*?>\\s*<div class="project-image">\\s*<img[^>]*alt="${card.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>[\\s\\S]*?<h3>${card.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/h3>`,
              'i'
            );
            
            if (cardRegex.test(indexContent)) {
              if (card.currentYear) {
                // Replace existing data-year attribute
                indexContent = indexContent.replace(
                  new RegExp(`(<div class="project-card[^>]*?)data-year="${card.currentYear}"([^>]*?>)`, 'i'),
                  `$1data-year="${card.actualYear}"$2`
                );
              } else {
                // Add data-year attribute if missing
                indexContent = indexContent.replace(
                  new RegExp(`(<div class="project-card[^>]*?)(>)`, 'i'),
                  `$1 data-year="${card.actualYear}"$2`
                );
              }
            }
          }
        }
      } catch (err) {
        console.log(`Could not read info.md for ${card.id}: ${err.message}`);
      }
    }
    
    // Write updated content back to file
    await fs.writeFile(indexPath, indexContent, 'utf8');
    console.log('Updated year attributes in index.html successfully!');
    
  } catch (err) {
    console.error('Error fixing year attributes:', err);
  }
}

// Run the script
fixYearAttributes();