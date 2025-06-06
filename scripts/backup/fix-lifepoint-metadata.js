"use strict";
const fs = require('fs').promises;
const path = require('path');

async function updateLifepointMetadata() {
  try {
    const projectPath = path.join(__dirname, 'portfolio', 'projects', 'lifepoint_health.html');
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update tagline (remove the long description)
    htmlContent = htmlContent.replace(
      /<h1>Lifepoint Health<\/h1>\s*<p class="tagline">Great care lives here. Lifepoint is a national for-profit healthcare provider currently operating in 89 locations across the United States. As design lead at Thackway&nbsp;McCord, I oversaw logo development, motion design, environmental graphics and print applications across the network.<\/p>/s,
      `<h1>Lifepoint Health</h1>
            <p class="tagline">Great care lives here.</p>`
    );
    
    // Update the project metadata to ensure the Agency is included
    htmlContent = htmlContent.replace(
      /<div class="project-metadata">\s*<div class="metadata-item">\s*<h3>Year<\/h3>\s*<p>2023<\/p>\s*<\/div>\s*<div class="metadata-item">\s*<h3>Client<\/h3>\s*<p>Lifepoint Health<\/p>\s*<\/div>\s*<div class="metadata-item">\s*<h3>Role<\/h3>\s*<p>Design Lead, Logo, Motion, Environments, Print<\/p>\s*<\/div>\s*<\/div>/s,
      `<div class="project-metadata">
                    <div class="metadata-item">
                        <h3>Year</h3>
                        <p>2023</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Client</h3>
                        <p>Lifepoint Health</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Role</h3>
                        <p>Design Lead, Logo, Motion, Environments, Print</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Agency</h3>
                        <p>Thackway McCord</p>
                    </div>
                </div>`
    );
    
    // Update main project description
    htmlContent = htmlContent.replace(
      /<div class="project-description">\s*<p>Lifepoint is a national for-profit healthcare provider.*?<\/p>\s*<p>Working closely with creative director.*?<\/p>\s*<p>The heart motif created the foundation.*?<\/p>/s,
      `<div class="project-description">
                <p>Lifepoint Health is a national healthcare provider operating in 89 communities across the United States. The network is deeply connected to the towns it serves, where hospitals are as vital to local infrastructure as roads and schools.</p>
                <p>Working closely with creative director Kat McCord, strategist Simon Thackway, and the wider Thackway McCord team, I guided the branding effort from discovery through rollout.</p>
                <p>The heart motif created the foundation for a flexible identity system applied through a palette of clean white and vibrant colors. A rigorously developed library of crop configurations originates from the dot motif. The identity system needed to be immediately recognizable while also accommodating diverse healthcare facilities across the country.</p>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Lifepoint Health metadata and main content updated successfully!');
  } catch (error) {
    console.error('Error updating Lifepoint Health metadata:', error);
  }
}

updateLifepointMetadata();