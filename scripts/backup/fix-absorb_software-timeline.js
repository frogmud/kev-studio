"use strict";
const fs = require('fs').promises;
const path = require('path');

(async function() {
  try {
    const projectId = 'absorb_software';
    const projectPath = path.join(__dirname, 'portfolio', 'projects', `${projectId}.html`);
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update each timeline item individually to preserve the images
    
    // Timeline item 1: Discovery
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Discovery<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Discovery</h3>
                        <p>Through collaborative research with Absorb's marketing and product teams, we identified a disconnect between the company's advanced LMS capabilities and its existing brand perception. The goal was to create a cohesive identity that reflects Absorb's commitment to delivering personalized, scalable, and engaging learning experiences.</p>`
    );
    
    // Timeline item 2: Brand development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand development<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Brand development</h3>
                        <p>We developed a new visual system centered around a 3D prism concept, symbolizing clarity and the multifaceted nature of learning. The refreshed identity featured a contemporary color palette, modern typography, and a flexible graphic system adaptable across various platforms and media.</p>`
    );
    
    // Timeline item 3: Marketing & collateral
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Marketing & collateral<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Marketing & collateral</h3>
                        <p>Collaborating closely with the marketing team, we produced comprehensive materials to showcase the new brand at trade shows, events, and digital platforms. This included branded merchandise and promotional items designed to enhance recognition and loyalty among existing and prospective clients.</p>`
    );
    
    // Timeline item 4: Digital presence
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital presence<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Digital presence</h3>
                        <p>I led the redesign of Absorb's website, focusing on user experience and conversion optimization. The new site effectively communicates Absorb's value proposition, highlights key features such as AI-powered upskilling and integrated mentorship programs, and serves as a robust lead generation tool.</p>`
    );
    
    // Timeline item 5: Product integration
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Product integration<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Product integration</h3>
                        <p>Extending the new brand language into the product interface, I partnered with the product team to ensure a seamless and cohesive experience from marketing touchpoints to actual product use. This integration reinforced Absorb's position as a unified platform for enterprise-wide learning.</p>`
    );
    
    // Timeline item 6: Team collaboration
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Team collaboration<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Team collaboration</h3>
                        <p>Throughout the project, I worked closely with cross-functional teams, including marketing, product, and sales, to ensure consistent implementation of the new brand across all touchpoints. This collaborative approach was instrumental in aligning the rebrand with Absorb's strategic goals and customer expectations.</p>`
    );
    
    await fs.writeFile(projectPath, htmlContent);
    console.log(`Updated timeline for ${projectId}`);
    
  } catch (error) {
    console.error('Error updating timeline:', error);
  }
})();