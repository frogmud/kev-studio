"use strict";
const fs = require('fs').promises;
const path = require('path');

(async function() {
  try {
    const projectId = 'american_social';
    const projectPath = path.join(__dirname, 'portfolio', 'projects', `${projectId}.html`);
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update each timeline item individually to preserve the images and figures
    
    // Timeline item 1: Concept development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Concept development<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Concept development</h3>
                        <p>We established a visual language rooted in digital identity and social validation, reflecting the tension between authentic and curated lives. This approach informed the design of the title sequence and end credits, ensuring they complemented the narrative without overshadowing it.</p>`
    );
    
    // Timeline item 2: Title sequence design
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Title sequence design<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Title sequence design</h3>
                        <p>Employing a minimalist aesthetic inspired by social media interfaces, I designed a title sequence that evokes notification screens and feed layouts. The timing and pacing were meticulously crafted to draw viewers into the film's digital milieu.</p>`
    );
    
    // Timeline item 3: End credits animation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>End credits animation<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>End credits animation</h3>
                        <p>The end credits were animated to mimic the infinite scroll of social feeds, incorporating subtle transitions that reference likes, comments, and shares. This design choice reinforced the film's commentary on the pervasive nature of social media.</p>`
    );
    
    // Timeline item 4: Digital promotion
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital promotion<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Digital promotion</h3>
                        <p>I led the creation of promotional assets optimized for various social platforms, ensuring each piece captured the film's essence while standing out in crowded feeds. The materials were designed to build intrigue without revealing key plot elements.</p>`
    );
    
    // Timeline item 5: Website development 
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Website development<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Website development</h3>
                        <p>I developed a responsive landing page featuring key art, synopsis, trailer, cast and crew information, and festival dates. The design preserved the film's visual language and prioritized accessibility for mobile users.</p>`
    );
    
    // Timeline item 6: Impact & recognition
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Impact & recognition<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Impact & recognition</h3>
                        <p>American Social received a 5/5 review from Short Films Matter, highlighting its compelling narrative and technical excellence. The film's exploration of social media's impact on relationships resonated with audiences and critics alike.</p>`
    );
    
    await fs.writeFile(projectPath, htmlContent);
    console.log(`Updated timeline for ${projectId}`);
    
  } catch (error) {
    console.error('Error updating timeline:', error);
  }
})();