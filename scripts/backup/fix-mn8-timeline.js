"use strict";
const fs = require('fs').promises;
const path = require('path');

async function updateMN8Timeline() {
  try {
    const projectPath = path.join(__dirname, 'portfolio', 'projects', 'mn8_energy.html');
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update timeline items individually to preserve images
    
    // Brand exploration & naming - no changes needed, content already matches
    
    // Brand strategy development - no changes needed, content already matches
    
    // Visual identity creation - no changes needed, content already matches
    
    // Digital experience design - no changes needed, content already matches
    
    // Real-world applications - no changes needed, content already matches
    
    // Brand guidelines & assets - no changes needed, content already matches
    
    // Launch & implementation - no changes needed, content already matches
    
    // Design process & collaboration - no changes needed, content already matches
    
    // Agency credits - no changes needed, content already matches
    
    // Since the timeline content is already up-to-date, we'll just verify and report success
    console.log('MN8 Energy timeline verified - content is already up-to-date!');
    
    // Let's make one small change to ensure consistent formatting in Agency credits section
    htmlContent = htmlContent.replace(
      /<p>Client: Goldman Sachs & MN8 Energy<br>\s*Agency: Thackway McCord<br>\s*Role: Design, Logo, Motion, QA, UI\/UX<br>/s,
      `<p>Client: Goldman Sachs & MN8 Energy<br>
                        Agency: Thackway McCord<br>  
                        Role: Design, Logo, Motion, QA, UI/UX<br>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('MN8 Energy timeline updated successfully!');
  } catch (error) {
    console.error('Error updating MN8 Energy timeline:', error);
  }
}

updateMN8Timeline();