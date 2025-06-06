"use strict";

const fs = require('fs').promises;

async function fixFiservMetadata() {
  try {
    const filePath = 'portfolio/projects/fiserv.html';
    
    // Read the file
    let content = await fs.readFile(filePath, 'utf8');
    
    // Fix the metadata section by replacing it completely
    const metadataSection = `<div class="project-metadata">
                    <div class="metadata-item">
                        <h3>Year</h3>
                        <p>2016-2017</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Client</h3>
                        <p>Fiserv</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Role</h3>
                        <p>Design, Programming, QA</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Agency</h3>
                        <p>In-house (Statement Reporting team)</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Team</h3>
                        <p>Strategy: Mike Snizek<br>Lead programmer: Prital Patel</p>
                    </div>
            </div>`;
    
    // Replace the metadata section
    content = content.replace(
      /<div class="project-metadata">[\s\S]*?<\/div>\s*<\/div>/,
      metadataSection
    );
    
    // Fix extra </p> tag if it exists
    content = content.replace(/<p>([^<]+)<\/p><\/p>/g, '<p>$1</p>');
    
    // Write the fixed content back
    await fs.writeFile(filePath, content, 'utf8');
    console.log('Fixed Fiserv metadata');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

fixFiservMetadata();