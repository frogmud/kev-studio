"use strict";

const fs = require('fs').promises;
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function fixYearAttributes() {
  try {
    console.log('Starting year attribute fix (v2)...');
    
    // Read the index.html file
    const indexPath = path.join(__dirname, '..', 'portfolio', 'index.html');
    const indexContent = await fs.readFile(indexPath, 'utf8');
    
    // Use JSDOM to parse the HTML
    const dom = new JSDOM(indexContent);
    const document = dom.window.document;
    
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    console.log(`Found ${projectCards.length} project cards in index.html`);
    
    // Track projects to update
    let updatedCount = 0;
    let missingCount = 0;
    
    // Process each project card
    for (const card of projectCards) {
      try {
        // Get the project ID from the link
        const link = card.querySelector('.project-link');
        if (!link) continue;
        
        const href = link.getAttribute('href');
        const projectId = href.replace('projects/', '').replace('.html', '');
        
        // Read the project's info.md file
        try {
          const infoPath = path.join(__dirname, '..', 'portfolio', 'projects', projectId, 'info.md');
          const infoContent = await fs.readFile(infoPath, 'utf8');
          
          // Extract the year
          const yearMatch = infoContent.match(/Year:\s*(20\d\d)/);
          if (yearMatch && yearMatch[1]) {
            const year = yearMatch[1];
            
            // Remove any existing data-year attributes
            if (card.hasAttribute('data-year')) {
              card.removeAttribute('data-year');
            }
            
            // Add the correct year attribute
            card.setAttribute('data-year', year);
            updatedCount++;
            
            console.log(`Updated ${projectId} with year ${year}`);
          } else {
            console.log(`Warning: No year found in info.md for ${projectId}`);
            missingCount++;
          }
        } catch (err) {
          console.log(`Warning: Could not read info.md for ${projectId}: ${err.message}`);
          missingCount++;
        }
      } catch (err) {
        console.error(`Error processing card:`, err);
      }
    }
    
    // Write the updated HTML back to the file
    const updatedHTML = dom.serialize();
    await fs.writeFile(indexPath, updatedHTML, 'utf8');
    
    console.log(`Updated ${updatedCount} project cards with correct year attributes`);
    if (missingCount > 0) {
      console.log(`Warning: ${missingCount} project cards could not be updated`);
    }
    
    console.log('Year attribute fix completed!');
    
  } catch (err) {
    console.error('Error fixing year attributes:', err);
  }
}

// Check if jsdom is installed, if not, suggest installing it
try {
  require('jsdom');
  // Run the script if jsdom is available
  fixYearAttributes();
} catch (err) {
  console.error('Error: The jsdom package is not installed. Please install it using:');
  console.error('npm install jsdom');
}