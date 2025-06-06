"use strict";

const fs = require('fs').promises;
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function fixDuplicateYearAttributes() {
  try {
    console.log('Starting duplicate year attribute fix...');
    
    // Read the index.html file
    const indexPath = path.join(__dirname, 'portfolio', 'index.html');
    const html = await fs.readFile(indexPath, 'utf8');
    
    // Use JSDOM to parse the HTML
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    let fixedCount = 0;
    
    console.log(`Found ${projectCards.length} project cards`);
    
    // Read project info files to get correct years
    const projectYears = {};
    const projectsDir = path.join(__dirname, 'portfolio', 'projects');
    const dirs = await fs.readdir(projectsDir);
    
    for (const dir of dirs) {
      try {
        const stat = await fs.stat(path.join(projectsDir, dir));
        if (!stat.isDirectory()) continue;
        
        const infoPath = path.join(projectsDir, dir, 'info.md');
        try {
          const infoContent = await fs.readFile(infoPath, 'utf8');
          const yearMatch = infoContent.match(/Year:\s*(20\d\d)/);
          if (yearMatch && yearMatch[1]) {
            projectYears[dir] = yearMatch[1];
          }
        } catch (err) {
          // Skip if info.md doesn't exist
        }
      } catch (err) {
        // Skip if error
      }
    }
    
    // Process each card
    projectCards.forEach(card => {
      const link = card.querySelector('.project-link');
      if (!link) return;
      
      const href = link.getAttribute('href');
      const projectId = href.replace('projects/', '').replace('.html', '');
      
      // Check for multiple data-year attributes
      const attributes = card.getAttributeNames();
      const yearAttributes = attributes.filter(attr => attr.includes('data-year'));
      
      if (yearAttributes.length > 1) {
        // Has multiple data-year attributes - fix it
        console.log(`Card for ${projectId} has ${yearAttributes.length} data-year attributes - fixing`);
        
        // Remove all data-year attributes
        yearAttributes.forEach(attr => {
          card.removeAttribute(attr);
        });
        
        // Add back one correct data-year attribute
        const correctYear = projectYears[projectId] || '2021';  // Default to 2021 if not found
        card.setAttribute('data-year', correctYear);
        
        fixedCount++;
      }
    });
    
    // Write the fixed HTML back
    await fs.writeFile(indexPath, dom.serialize(), 'utf8');
    console.log(`Fixed ${fixedCount} cards with duplicate data-year attributes`);
    console.log('HTML fixed successfully!');
    
  } catch (err) {
    console.error('Error fixing duplicate year attributes:', err);
  }
}

// Check if jsdom is installed, if not, suggest installing it
try {
  require('jsdom');
  // Run the script if jsdom is available
  fixDuplicateYearAttributes();
} catch (err) {
  console.error('Error: The jsdom package is not installed. Please install it using:');
  console.error('npm install jsdom');
}