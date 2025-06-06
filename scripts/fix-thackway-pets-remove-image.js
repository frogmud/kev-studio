"use strict";

const fs = require('fs').promises;
const path = require('path');

/**
 * Removes the chocolate bar image from the results and recognition section
 * of the Thackway McCord Pets project page
 */
async function removeResultsImage() {
  try {
    console.log('Removing chocolate bar image from results section...');
    
    // Define the file path
    const filePath = path.join(__dirname, '../portfolio/projects/thackway_mccord_pets.html');
    
    // Read the HTML file
    let htmlContent = await fs.readFile(filePath, 'utf8');
    
    // Remove the chocolate bar image from the results and recognition section
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Results & recognition<\/h3>\s*<p>The project was well-received[\s\S]*?<\/p>\s*<figure class="timeline-figure">[\s\S]*?<img loading="lazy" src="\.\.\/images\/optimized\/chocolates\/TM_IndigoAwards21_06\.jpg"[\s\S]*?<\/figure>/,
      `<div class="timeline-item">
                        <h3>Results & recognition</h3>
                        <p>The project was well-received by clients and the design community, earning accolades such as an Indigo Design Award in 2021 and a Communication Arts Illustration shortlist. The innovative use of QR codes demonstrated the potential for creativity in everyday elements, reinforcing the brand's commitment to thoughtful design.</p>`
    );
    
    // Write the updated HTML back to the file
    await fs.writeFile(filePath, htmlContent, 'utf8');
    
    console.log('✅ Successfully removed chocolate bar image from results section');
    
  } catch (error) {
    console.error('❌ Error updating thackway_mccord_pets.html:', error);
  }
}

// Export function for reuse
module.exports = {
  removeResultsImage
};

// Run if this script is executed directly
if (require.main === module) {
  removeResultsImage();
}