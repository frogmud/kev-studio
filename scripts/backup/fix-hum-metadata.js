"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateHumMetadata() {
  const projectPath = path.join(__dirname, 'portfolio', 'projects', 'hum.html');

  try {
    console.log(`Reading ${projectPath}...`);
    let htmlContent = await fs.readFile(projectPath, 'utf8');

    // 1. Update project title and tagline
    htmlContent = htmlContent.replace(
      /<h1>A better way to fund growth<\/h1>\s*<p class="tagline">.*?<\/p>/s,
      `<h1>Hum Capital</h1>
            <p class="tagline">A better way to fund growth</p>`
    );

    // 2. Update metadata
    // Update Client
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Client<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="metadata-item">
                        <h3>Client</h3>
                        <p>Hum Capital</p>
                    </div>`
    );

    // Update Agency
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Agency<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="metadata-item">
                        <h3>Agency</h3>
                        <p>Thackway McCord</p>
                    </div>`
    );

    // 3. Update main description content
    htmlContent = htmlContent.replace(
      /<div class="project-description">\s*<p>.*?<\/p>\s*<p>.*?<\/p>\s*<p>.*?<\/p>\s*<div class="project-timeline">/s,
      `<div class="project-description">
                <p>Hum Capital is a fintech company that connects growth-stage businesses with the right capital, aiming to make fundraising more equitable, efficient, and accessible. Their Intelligent Capital Market (ICM) platform leverages AI and machine learning to match companies with investors and lenders based on performance data, rather than personal networks or vanity metrics.</p>
                
                <p>As the lead designer overseeing logo, design, and UI/UX, I collaborated closely with the Thackway McCord team throughout each phase of the project. Our goal was to create a brand identity and digital experience that reflected Hum's innovative approach to capital fundraising.</p>
                
                <div class="project-timeline">`
    );

    // Save the updated HTML back to the file
    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Successfully updated Hum metadata and content.');

  } catch (error) {
    console.error('Error updating metadata:', error);
  }
}

updateHumMetadata();