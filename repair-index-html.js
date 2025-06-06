"use strict";

const fs = require('fs').promises;
const path = require('path');

async function repairIndexHtml() {
  try {
    console.log('Starting index.html repair...');
    
    // Read the index.html file
    const indexPath = path.join(__dirname, 'portfolio', 'index.html');
    let indexContent = await fs.readFile(indexPath, 'utf8');
    
    // First repair: Fix malformed opening div tag on first card
    const malformedRegex = /<div class="project-card data-year="[^>]*>/;
    if (malformedRegex.test(indexContent)) {
      console.log('Fixing malformed first card...');
      
      // Replace with proper opening tag
      indexContent = indexContent.replace(
        malformedRegex,
        '<div class="project-card landscape" data-categories="direction" data-tags="branding,web,storyboarding,motion,strategy" data-year="2021">'
      );
    }
    
    // Add missing data-year attributes to projects that need them
    const projectsWithYears = {
      'american_social': '2020',
      'finseca': '2020', 
      'lrei': '2018',
      'aiga': '2021',
      'hum': '2021',
      'fiserv': '2019', // Defaulting to 2019 if not found
      'thackway_mccord_pets': '2022',
      'tryitout_with_major_league_wiffleball': '2018',
      'autonomy_capital': '2025'
    };
    
    // Update projects missing data-year attribute
    for (const [projectId, year] of Object.entries(projectsWithYears)) {
      const projectRegex = new RegExp(
        `<div class="project-card[^>]*?(?!data-year)[^>]*>\\s*<div class="project-image">[\\s\\S]*?<a href="projects/${projectId}\\.html"`,
        'i'
      );
      
      if (projectRegex.test(indexContent)) {
        console.log(`Adding data-year="${year}" to ${projectId}`);
        
        // Replace opening div with one that includes data-year
        indexContent = indexContent.replace(
          new RegExp(`(<div class="project-card[^>]*?)>(?=\\s*<div class="project-image">[\\s\\S]*?<a href="projects/${projectId}\\.html")`, 'i'),
          `$1 data-year="${year}">`
        );
      }
    }
    
    // Write updated content back to file
    await fs.writeFile(indexPath, indexContent, 'utf8');
    console.log('Index.html has been repaired successfully!');
    
  } catch (err) {
    console.error('Error repairing index.html:', err);
  }
}

// Run the repair
repairIndexHtml();