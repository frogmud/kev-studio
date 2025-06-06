"use strict";
const fs = require('fs').promises;
const path = require('path');

async function updateOnityMetadata() {
  try {
    const projectPath = path.join(__dirname, 'portfolio', 'projects', 'onity.html');
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update year, client name and tagline
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Year<\/h3>\s*<p>2025<\/p>\s*<\/div>/s,
      `<div class="metadata-item">
                        <h3>Year</h3>
                        <p>2022</p>
                    </div>`
    );
    
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Client<\/h3>\s*<p>Onity<\/p>\s*<\/div>/s,
      `<div class="metadata-item">
                        <h3>Client</h3>
                        <p>Onity Group</p>
                    </div>`
    );
    
    // Update tagline
    htmlContent = htmlContent.replace(
      /<h1>Onity<\/h1>\s*<p class="tagline">Storyboarding and direction for the Onity logo animation<\/p>/s,
      `<h1>Onity</h1>
            <p class="tagline">Visual storytelling for a reimagined mortgage servicing brand</p>`
    );
    
    // Add Agency field if it doesn't exist
    if (!htmlContent.includes('<h3>Agency</h3>')) {
      htmlContent = htmlContent.replace(
        /<div class="project-metadata">[\s\S]*?<\/div>\s*<\/div>/m,
        `<div class="project-metadata">
                    <div class="metadata-item">
                        <h3>Year</h3>
                        <p>2022</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Client</h3>
                        <p>Onity Group</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Role</h3>
                        <p>Animation & Storyboarding</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Agency</h3>
                        <p>Thackway McCord</p>
                    </div>
                </div>
            </div>`
      );
    }
    
    // Update main project description
    htmlContent = htmlContent.replace(
      /<div class="project-description">\s*<p>Onity provides digital locking systems.*?<\/p>\s*<p>I worked with Onity to create a short logo animation.*?<\/p>\s*<p>Although the overall direction was led by a studio art director.*?<\/p>/s,
      `<div class="project-description">
                <p>In 2024, Ocwen Financial Corporation rebranded as Onity Group Inc., marking a significant transformation in its corporate identity. As a leading non-bank mortgage servicer and originator, Onity sought a logo animation that encapsulated its renewed commitment to innovation, reliability, and customer-centric solutions.</p>
                
                <p>Collaborating with Onity's design team and under the direction of the studio's art director, I contributed to the development of a concise logo animation. My responsibilities included storyboarding and shaping the motion sequence to align with Onity's brand attributes. The animation emphasizes energy flow and simplicity, reinforcing the brand's commitment to dependable and cutting-edge financial services.</p>

                <p>Although I departed the studio midway through the engagement, I ensured the preparation of comprehensive case study assets, including the brand animation, to facilitate the project's completion.</p>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Onity metadata and main content updated successfully!');
  } catch (error) {
    console.error('Error updating Onity metadata:', error);
  }
}

updateOnityMetadata();