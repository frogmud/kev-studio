"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateSylvamoTimeline() {
  try {
    const filePath = path.join(__dirname, '..', 'portfolio', 'projects', 'sylvamo.html');
    
    // Read the HTML content
    let htmlContent = await fs.readFile(filePath, 'utf8');
    
    // 1. Update Strategic opportunity assessment
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Strategic opportunity assessment<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                <h3>Strategic opportunity assessment</h3>
                <p>Conducted in-depth analysis of the paper industry landscape to identify positioning opportunities for the spin-off. Engaged with stakeholders to understand the vision for Sylvamo and differentiate it from the parent organization.</p>`
    );
    
    // 2. Update Naming & verbal identity
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Naming & verbal identity<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                <h3>Naming & verbal identity</h3>
                <p>Collaborated with the strategy team to develop the name "Sylvamo," capturing the essence of the company's relationship with forests and its dedication to paper.</p>`
    );
    
    // 3. Update Visual identity development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Visual identity development<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                <h3>Visual identity development</h3>
                <p>Designed a comprehensive visual system, including the paper plane logo, typography, color palette, and graphic elements. The system balances professionalism with accessibility, avoiding industry clichés.</p>`
    );
    
    // 4. Replace the h4 Logo animation section with new Motion graphics & animation section
    htmlContent = htmlContent.replace(
      /<h4>Logo animation<\/h4>\s*<p>[\s\S]*?<\/p>/,
      `</div>
<div class="timeline-item">
                <h3>Motion graphics & animation</h3>
                <p>Partnered with 3D artist Scyld Bowring to create dynamic animations that bring the brand to life across digital platforms. The paper airplane motif was enhanced through detailed rendering and motion design.</p>`
    );
    
    // 5. Update Brand guidelines creation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand guidelines creation<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                <h3>Brand guidelines creation</h3>
                <p>Developed comprehensive brand guidelines documenting all identity elements and applications, ensuring consistent implementation across global markets and diverse touchpoints.</p>`
    );
    
    // 6. Update Launch planning & implementation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Launch planning & implementation<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                <h3>Launch planning & implementation</h3>
                <p>Coordinated with International Paper and Sylvamo leadership on a phased implementation strategy. Developed launch materials, including website assets, videos, social media content, and investor relations materials.</p>`
    );
    
    // 7. Replace the h4 IPO day celebration section with updated content
    htmlContent = htmlContent.replace(
      /<h4>IPO day celebration<\/h4>\s*<p>[\s\S]*?<\/p>/,
      `</div>
<div class="timeline-item">
                <h3>IPO day celebration</h3>
                <p>Created special animated content for Sylvamo's IPO day celebration at the New York Stock Exchange, bringing the brand to life in a high-energy sequence.</p>`
    );
    
    // 8. Update Environmental & experiential design section
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Environmental & experiential design<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                <h3>Environmental & experiential design</h3>
                <p>Designed environmental applications for Sylvamo headquarters and production facilities, along with trade show materials, signage systems, and experiential elements for global implementation.</p>`
    );
    
    // 9. Update Agency & credits section
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Agency & credits<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                <h3>Agency & credits</h3>
                <p>Agency: Thackway McCord<br>
Client: Sylvamo / International Paper<br>
Role: Design lead, logo, motion, print<br>
Executive Creative Director: Kat McCord<br>
Creative Director: Steve Clarke<br>
Strategy: Simon Thackway, Jonathan Paisner<br>
3D Work: Scyld Bowring</p>`
    );
    
    // 10. Update Awards & recognition section
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Awards & recognition<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                <h3>Awards & recognition</h3>
                <p>• Indigo Design Awards 2022 (Gold – Branding)<br>
• 12th Wolda Design Awards (Gold – The Americas)<br>
• LogoLounge Book 13</p>`
    );
    
    // Write the updated content back to the file
    await fs.writeFile(filePath, htmlContent, 'utf8');
    console.log('Successfully updated Sylvamo timeline content.');
  } catch (error) {
    console.error('Error updating file:', error);
  }
}

// Execute the function if this script is run directly
if (require.main === module) {
  updateSylvamoTimeline();
}

module.exports = { updateSylvamoTimeline };