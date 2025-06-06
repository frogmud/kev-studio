"use strict";

const fs = require('fs').promises;
const path = require('path');

async function removeSylvamoImage() {
  try {
    const filePath = path.join(__dirname, 'portfolio', 'projects', 'sylvamo.html');
    
    // Read the HTML content
    let htmlContent = await fs.readFile(filePath, 'utf8');
    
    // Remove the specific image
    htmlContent = htmlContent.replace(
      /<img loading="lazy" src="\.\.\/images\/optimized\/sylvamo\/Sylvamo_IndigoAwards21_08\.gif" alt="Sylvamo social media animation" class="timeline-image">\s*/,
      ``
    );
    
    // Write the updated content back to the file
    await fs.writeFile(filePath, htmlContent, 'utf8');
    console.log('Successfully removed the specified image from the Sylvamo page.');
  } catch (error) {
    console.error('Error updating file:', error);
  }
}

removeSylvamoImage();