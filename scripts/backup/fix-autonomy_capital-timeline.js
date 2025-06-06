"use strict";
const fs = require('fs').promises;
const path = require('path');

(async function() {
  try {
    const projectId = 'autonomy_capital';
    const projectPath = path.join(__dirname, 'portfolio', 'projects', `${projectId}.html`);
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update each timeline item individually to preserve the images
    
    // Timeline item 1: Brand identity development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand identity development<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Brand identity development</h3>
                        <p>Led the design direction to develop a comprehensive identity that balances professionalism with a forward-thinking approach. The system was designed to work across various touchpoints while maintaining consistency.</p>`
    );
    
    // Timeline item 2: Digital experience
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital experience<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Digital experience</h3>
                        <p>Guided the digital strategy to shape a website that showcases Autonomy's expertise and approach to investment management. The responsive interface prioritizes clear communication and easy navigation.</p>`
    );
    
    // Timeline item 3: Print materials
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Print materials<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Print materials</h3>
                        <p>Collaborated with print designers to extend the brand into materials such as business cards, reports, and presentation decks, each maintaining the visual language while adapting to specific communication needs.</p>`
    );
    
    // Timeline item 4: Brand guidelines
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand guidelines<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Brand guidelines</h3>
                        <p>Authored comprehensive brand guidelines covering logo usage, typography, color palette, and application examples across various media, assisting Autonomy's team in consistently rolling out the new look.</p>`
    );
    
    await fs.writeFile(projectPath, htmlContent);
    console.log(`Updated timeline for ${projectId}`);
    
  } catch (error) {
    console.error('Error updating timeline:', error);
  }
})();