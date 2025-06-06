"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateSylvamoMetadata() {
  try {
    const filePath = path.join(__dirname, '..', 'portfolio', 'projects', 'sylvamo.html');
    
    // Read the HTML content
    let htmlContent = await fs.readFile(filePath, 'utf8');
    
    // 1. Add Agency field to metadata
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Role<\/h3>\s*<p>Design Lead, Logo, Motion, Print<\/p>\s*<\/div>\s*<\/div>/,
      `<div class="metadata-item">
                        <h3>Role</h3>
                        <p>Design Lead, Logo, Motion, Print</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Agency</h3>
                        <p>Thackway McCord</p>
                    </div>
                </div>`
    );
    
    // 2. Update main content
    htmlContent = htmlContent.replace(
      /<div class="project-description">\s*<p>As design lead at Thackway McCord[\s\S]*?<p>The brand combines[\s\S]*?<\/p>/,
      `<div class="project-description">
                <p>In 2021, International Paper spun off its $3 billion global uncoated freesheet paper business, forming Sylvamo—the world's largest pure-play paper company. As Design Lead at Thackway McCord, I collaborated closely with Executive Creative Director Kat McCord, Creative Director Steve Clarke, and strategists Simon Thackway and Jonathan Paisner to develop a brand that would position Sylvamo as a leader in the paper industry.</p>
                
                <p>The name "Sylvamo," derived from the Latin words silva (forest) and amo (love), reflects the company's commitment to sustainable forestry and its passion for paper. The visual identity features a distinctive paper plane icon symbolizing aspiration and progress, set against a vibrant purple palette that differentiates Sylvamo in a market often dominated by green hues.</p>
                
                <p>Throughout the engagement, I oversaw the development of the logo, motion graphics, and print materials, ensuring a cohesive and impactful brand presence across all touchpoints.</p>`
    );
    
    // Write the updated content back to the file
    await fs.writeFile(filePath, htmlContent, 'utf8');
    console.log('Successfully updated Sylvamo metadata and main content.');
  } catch (error) {
    console.error('Error updating file:', error);
  }
}

// Execute the function if this script is run directly
if (require.main === module) {
  updateSylvamoMetadata();
}

module.exports = { updateSylvamoMetadata };