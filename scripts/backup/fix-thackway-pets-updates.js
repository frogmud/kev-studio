"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateThackwayMcCordPetsContent() {
  try {
    // Define the file path
    const filePath = path.join(__dirname, 'portfolio/projects/thackway_mccord_pets.html');
    
    // Read the HTML file
    let htmlContent = await fs.readFile(filePath, 'utf8');
    
    // Update client from "Thackway McCord" to "Rosie and Bean"
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Client<\/h3>\s*<p>Thackway McCord<\/p>\s*<\/div>/,
      `<div class="metadata-item">
                        <h3>Client</h3>
                        <p>Rosie and Bean</p>
                    </div>`
    );
    
    // Update the packaging design section to use the updated content
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Packaging design &amp; typography<\/h3>\s*<p>The chocolate bar packaging was designed to highlight the illustrated QR codes[\s\S]*?<\/p>[\s\S]*?<figure class="timeline-figure">[\s\S]*?<img loading="lazy" src="\.\.\/images\/optimized\/chocolates\/02_TM_Chocolates_YG21_Grzejka\.jpg" alt="Chocolate bar packaging design" class="timeline-image">[\s\S]*?<figcaption>.*?<\/figcaption>[\s\S]*?<\/figure>/,
      `<div class="timeline-item">
                        <h3>Packaging design &amp; typography</h3>
                        <p>I designed the chocolate bar packaging to showcase the illustrated QR codes, using a clean typographic approach with Monotype's Cotford typeface. The contrast between elegant typography and playful, glitchy codes created a distinctive look that reflected our team's aesthetic values.</p>
                        <figure class="timeline-figure">
                            <img loading="lazy" src="../images/optimized/chocolates/02_TM_Chocolates_YG21_Grzejka.jpg" alt="Chocolate bar packaging design" class="timeline-image">
                            <figcaption>Final chocolate bar packaging showcasing the illustrated QR codes</figcaption>
                        </figure>`
    );
    
    // Write the updated HTML back to the file
    await fs.writeFile(filePath, htmlContent, 'utf8');
    
    console.log('Successfully updated thackway_mccord_pets.html with new client name and packaging section');
    
  } catch (error) {
    console.error('Error updating thackway_mccord_pets.html:', error);
  }
}

updateThackwayMcCordPetsContent();