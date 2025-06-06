"use strict";

const fs = require('fs').promises;
const path = require('path');

async function fixHtmlSyntax() {
  try {
    console.log('Starting HTML syntax fix...');
    
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
            console.log(`Project ${dir}: Year ${yearMatch[1]}`);
          }
        } catch (err) {
          // Skip if info.md doesn't exist
        }
      } catch (err) {
        // Skip if error
      }
    }
    
    // Read the index.html file
    const indexPath = path.join(__dirname, 'portfolio', 'index.html');
    let html = await fs.readFile(indexPath, 'utf8');
    
    // Look for malformed HTML in the first project card (with multiple data-year attributes)
    const badSyntaxRegex = /<div class="project-card data-year=/;
    if (badSyntaxRegex.test(html)) {
      console.log('Found malformed project card - fixing...');
      
      // Fix by replacing the opening div with a corrected version
      html = html.replace(
        /<div class="project-card data-year=[^>]*>/,
        '<div class="project-card landscape" data-categories="direction" data-tags="branding,web,storyboarding,motion,strategy" data-year="2021">'
      );
    }
    
    // Fix any cards with missing data-year attributes by looking for the project ID
    for (const [projectId, year] of Object.entries(projectYears)) {
      const projectRegex = new RegExp(`<a href="projects/${projectId}\\.html"`);
      
      if (projectRegex.test(html)) {
        // Find the project card containing this link
        const cardStartRegex = new RegExp(
          `<div class="project-card[^>]*>([\\s\\S]*?)<a href="projects/${projectId}\\.html"`, 
          'g'
        );
        
        let cardMatch;
        while ((cardMatch = cardStartRegex.exec(html)) !== null) {
          const cardOpening = cardMatch[0].split('<a href')[0];
          
          // Check if it has a data-year attribute
          if (!/data-year=/.test(cardOpening)) {
            console.log(`Adding missing data-year=${year} to ${projectId}`);
            
            // Add the data-year attribute
            const fixedCardOpening = cardOpening.replace(
              /(<div class="project-card[^>]*?)>/,
              `$1 data-year="${year}">`
            );
            
            // Replace in the HTML
            html = html.replace(cardOpening, fixedCardOpening);
          }
        }
      }
    }
    
    // Write the fixed HTML back to the file
    await fs.writeFile(indexPath, html, 'utf8');
    console.log('HTML syntax fixed successfully!');
    
  } catch (err) {
    console.error('Error fixing HTML syntax:', err);
  }
}

// Run the script
fixHtmlSyntax();