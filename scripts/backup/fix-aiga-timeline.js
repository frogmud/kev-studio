"use strict";
const fs = require('fs').promises;
const path = require('path');

(async function() {
  try {
    const projectId = 'aiga';
    const projectPath = path.join(__dirname, 'portfolio', 'projects', `${projectId}.html`);
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update each timeline item individually to preserve the images
    
    // Timeline item 1: Concept development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Concept development<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Concept development</h3>
                        <p>Collaborated with the Thackway McCord design team to explore the intersection of functional QR technology with decorative holiday motifs. Developed multiple approaches to create scannable yet visually cohesive patterns that embodied the "joy" theme.</p>`
    );
    
    // Timeline item 2: Technical exploration
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Technical exploration<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Technical exploration</h3>
                        <p>Tested various QR code modifications to determine the threshold of visual alteration while maintaining functionality. Developed a system that ensured all codes would scan reliably across different devices.</p>`
    );
    
    // Timeline item 3: Animation production
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Animation production<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Animation production</h3>
                        <p>Created lightweight Lottie animations that autoplayed immediately after scanning, providing a seamless transition from physical to digital experience. Optimized for mobile performance to ensure quick loading.</p>`
    );
    
    // Timeline item 4: Pattern design
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Pattern design<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Pattern design</h3>
                        <p>Developed repeating patterns using the festive QR codes as the primary motif. Created variations that worked visually while maintaining the interactive functionality of each code in the pattern.</p>`
    );
    
    // Timeline item 5: Print production
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Print production<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Print production</h3>
                        <p>Prepared specifications for high-quality wrapping paper production. Collaborated with manufacturers to ensure print quality preserved the scannable functionality of the embedded codes.</p>`
    );
    
    // Timeline item 6: Digital implementation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital implementation<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Digital implementation</h3>
                        <p>Built a responsive landing page at joyjoyjoyjoyjoy.com to host the animations. Created a streamlined user experience that worked instantly after scanning the QR codes from the wrapping paper.</p>`
    );
    
    // Timeline item 7: Agency & credits
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Agency & credits<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Agency & credits</h3>
                        <p>Agency: Thackway McCord Creative Direction: Kat McCord Role: Design, Programming, Motion, Print QR Link: joyjoyjoyjoyjoy.com</p>`
    );
    
    await fs.writeFile(projectPath, htmlContent);
    console.log(`Updated timeline for ${projectId}`);
    
  } catch (error) {
    console.error('Error updating timeline:', error);
  }
})();