"use strict";

const fs = require('fs').promises;
const path = require('path');

/**
 * Updates the Thackway McCord Pets project page with new content
 */
async function updateThackwayMcCordPets() {
  try {
    // Define the file path
    const filePath = path.join(__dirname, '../portfolio/projects/thackway_mccord_pets.html');
    
    // Read the HTML file
    let htmlContent = await fs.readFile(filePath, 'utf8');
    
    // Update the metadata: Add Agency field
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Role<\/h3>\s*<p>[\s\S]*?<\/p>\s*<\/div>\s*<\/div>/,
      `<div class="metadata-item">
                        <h3>Role</h3>
                        <p>Art Direction, Design, Illustration, Motion, Programming, Packaging, Promo</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Agency</h3>
                        <p>Thackway McCord</p>
                    </div>
                </div>`
    );
    
    // Update the main description
    htmlContent = htmlContent.replace(
      /<div class="project-description">\s*<p>Every holiday season[\s\S]*?<\/p>/,
      `<div class="project-description">
                <p>In 2021, Thackway McCord continued its tradition of collaborating with artists to create unique holiday gifts for clients. The concept centered around transforming functional QR codes into engaging pet portraits, each linking to a personalized digital experience. The project encompassed art direction, design, illustration, motion graphics, development, packaging, and promotional materials. The innovative approach garnered industry recognition, including an Indigo Design Award in 2021 and a Communication Arts Illustration shortlist.</p>`
    );
    
    // Update each timeline item
    
    // 1. Concept development & creative direction
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Concept development & creative direction<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Concept development & creative direction</h3>
                        <p>The project began with the idea of reimagining QR codes—ubiquitous during the pandemic—as playful, hand-drawn pet portraits. This approach aimed to infuse a sense of delight into a typically utilitarian element.</p>`
    );
    
    // 2. QR code illustration & development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>QR code illustration & development<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>QR code illustration & development</h3>
                        <p>Each QR code was meticulously illustrated to resemble a pet while maintaining scannability. This required careful consideration of the error correction capabilities inherent in QR codes, allowing for creative manipulation without compromising functionality.</p>`
    );
    
    // 3. Packaging design & typography
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Packaging design & typography<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Packaging design & typography</h3>
                        <p>The chocolate bar packaging was designed to highlight the illustrated QR codes, complemented by Monotype's Cotford typeface. The combination of elegant typography and whimsical illustrations created a distinctive aesthetic that aligned with the brand's values.</p>`
    );
    
    // 4. Animation & digital experience
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Animation & digital experience<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Animation & digital experience</h3>
                        <p>Scanning each QR code directed recipients to a custom landing page featuring an 8-bit animated version of the pet portrait. These animations provided an interactive bridge between the physical product and the digital experience.</p>`
    );
    
    // 5. Companion stickers & physical assets
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Companion stickers & physical assets<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Companion stickers & physical assets</h3>
                        <p>A series of stickers featuring the pet illustrations were produced as supplementary gifts. These tangible items extended the campaign's reach beyond the initial interaction, offering recipients a lasting memento.</p>`
    );
    
    // 6. Social media & campaign extension
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Social media & campaign extension<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Social media & campaign extension</h3>
                        <p>The animated pet portraits were shared on platforms like Giphy, enhancing the project's visibility and engagement. This organic spread extended the campaign's reach beyond the immediate recipients of the chocolate bars.</p>`
    );
    
    // 7. Results & recognition
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Results & recognition<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Results & recognition</h3>
                        <p>The project was well-received by clients and the design community, earning accolades such as an Indigo Design Award in 2021 and a Communication Arts Illustration shortlist. The innovative use of QR codes demonstrated the potential for creativity in everyday elements, reinforcing the brand's commitment to thoughtful design.</p>`
    );
    
    // Write the updated HTML back to the file
    await fs.writeFile(filePath, htmlContent, 'utf8');
    
    console.log('Successfully updated thackway_mccord_pets.html');
    
  } catch (error) {
    console.error('Error updating thackway_mccord_pets.html:', error);
  }
}

// Export functions for reuse
module.exports = {
  updateThackwayMcCordPets
};

// Run if this script is executed directly
if (require.main === module) {
  updateThackwayMcCordPets();
}