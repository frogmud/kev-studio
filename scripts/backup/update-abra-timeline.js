"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateAbraTimeline() {
  try {
    console.log('Updating Abra timeline...');
    
    const htmlPath = path.join(__dirname, 'portfolio', 'projects', 'abra.html');
    let htmlContent = await fs.readFile(htmlPath, 'utf8');

    // Manual timeline updates - directly updating each section
    // Brand discovery
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand discovery<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Brand discovery</h3>\n                        <p>Drawing inspiration from the rich legacies of Avianca and GOL, we crafted a modern emblem symbolizing unity and forward momentum. The design balances simplicity with a nod to aviation heritage, ensuring memorability and versatility across various applications.</p>`
    );

    // Environmental applications/design
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Environmental applications<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Environmental design</h3>\n                        <p>We extended the new visual language to physical spaces, including offices and airport lounges, creating a consistent and welcoming environment for passengers and staff. Emphasis was placed on clarity, safety, and cultural relevance across diverse regions.</p>`
    );

    // Print collateral
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Print collateral<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Print collateral</h3>\n                        <p>Ticketing and loyalty program materials were redesigned with a clean, minimal aesthetic to reinforce trust and ease of use. The layouts prioritize essential information, enhancing readability and user engagement.</p>`
    );

    // Brand guidelines
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand guidelines<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Brand guidelines</h3>\n                        <p>Comprehensive guidelines were developed to ensure consistent application of the brand identity across all touchpoints. These guidelines serve as a resource for partner airlines and internal teams, facilitating cohesive brand representation.</p>`
    );

    // Digital experience
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital experience<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Digital experience</h3>\n                        <p>The responsive website was designed to streamline booking and account management processes. Emphasis was placed on intuitive navigation, multilingual support, and accessibility, reflecting Abra's commitment to serving a diverse customer base.</p>`
    );

    // Icon system/Iconography
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Icon system<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Icoography</h3>\n                        <p>A custom icon set was created to support the digital interface, focusing on universal symbols that transcend language barriers and enhance user comprehension.</p>`
    );

    // Vehicle/Aircraft livery
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Vehicle livery<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Aircraft livery</h3>\n                        <p>The unified livery design transforms each aircraft into a flying ambassador for the Abra brand. The design maintains individual airline identities while signaling their connection under the Abra umbrella.</p>`
    );

    // Environmental/Airport signage
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Environmental signage<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Airport signage</h3>\n                        <p>Wayfinding systems were updated to align with the new brand identity, improving passenger navigation through clear, modern signage that accommodates multiple languages and cultural contexts.</p>`
    );

    // Global/Launch campaign
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Global campaign<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Launch campaign</h3>\n                        <p>The brand launch was supported by a campaign that honored the histories of Avianca and GOL while highlighting the new group's vision for the future of air travel in Latin America.</p>`
    );

    // Brand animation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand animation<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Brand animation</h3>\n                        <p>We animated the mark subtly to highlight efficiency and connectivity without exposing executive details.</p>`
    );

    // Logo animation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Logo animation<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Logo animation</h3>\n                        <p>To convey movement and connectivity inherent in air travel, we introduced subtle animations to the logo. These animations enhance brand recognition without overwhelming the user experience.</p>`
    );

    // Logo development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Logo development<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">\n                        <h3>Logo development</h3>\n                        <p>The modern emblem channels the spirit of Pan Am while representing a unified network of carriers. I guided the design team to keep it simple and memorable.</p>`
    );

    // Write the updated HTML back to the file
    await fs.writeFile(htmlPath, htmlContent);
    console.log('Successfully updated Abra timeline');
  } catch (error) {
    console.error('Error updating Abra timeline:', error);
  }
}

// Run the script
updateAbraTimeline();