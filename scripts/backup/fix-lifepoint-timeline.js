"use strict";
const fs = require('fs').promises;
const path = require('path');

async function updateLifepointTimeline() {
  try {
    const projectPath = path.join(__dirname, 'portfolio', 'projects', 'lifepoint_health.html');
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update timeline items individually to preserve images
    
    // Discovery & analysis
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Discovery & analysis<\/h3>\s*<p>As design lead, I partnered with the strategy team to conduct.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Discovery & analysis</h3>
                <p>As design lead, I partnered with the strategy team to conduct extensive research across stakeholders, patients, and healthcare professionals. We audited existing brand assets across numerous facilities to uncover challenges and inconsistencies in the system.</p>`
    );
    
    // Brand strategy development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand strategy development<\/h3>\s*<p>Together with designers Bianca Seong and Fuchen Kuang.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Brand strategy development</h3>
                <p>Together with designers Bianca Seong and Fuchen Kuang, I crafted a unified brand platform that accommodated both corporate and local market needs. We developed messaging hierarchies and tone of voice guidelines that supported Lifepoint's positioning as a leader in community healthcare.</p>`
    );
    
    // Visual identity system
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Visual identity system<\/h3>\s*<p>I designed a comprehensive visual identity.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Visual identity system</h3>
                <p>Designed a comprehensive visual identity including logo, typography, color palette, and supportive graphic elements. Our flexible system could be implemented across diverse facilities while maintaining brand cohesion.</p>`
    );
    
    // Digital experience design
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital experience design<\/h3>\s*<p>As lead designer I oversaw.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Digital experience design</h3>
                <p>As lead designer I oversaw the redesign of the corporate website and digital touchpoints. We developed user-friendly tools that enhanced patient experience while showcasing Lifepoint's services and expertise.</p>`
    );
    
    // Environmental application
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Environmental application<\/h3>\s*<p>Guiding the environmental design effort.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Environmental application</h3>
                <p>Guiding the environmental design effort, I created signage systems, wayfinding, and environmental graphics for hospitals and healthcare facilities. This cohesive approach to physical spaces improved navigation while reinforcing brand recognition.</p>`
    );
    
    // Implementation & rollout
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Implementation & rollout<\/h3>\s*<p>I developed comprehensive guidelines.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Implementation & rollout</h3>
                <p>Developed comprehensive guidelines and asset management systems, coordinating phased implementation across multiple facilities and providing training and support for marketing teams throughout the network.</p>`
    );
    
    // Update the Brand guidelines paragraph
    htmlContent = htmlContent.replace(
      /<h4>Brand guidelines<\/h4>\s*<p>Created detailed brand guidelines to ensure consistent application.*?<\/p>/s,
      `<h4>Brand guidelines</h4>
                <p>Created detailed brand guidelines to ensure consistent application across all touchpoints. My video presentation walked stakeholders through key elements of the identity system.</p>`
    );
    
    // Mobile & digital presence
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Mobile & digital presence<\/h3>\s*<p>I extended the brand identity into.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Mobile & digital presence</h3>
                <p>Extended the brand identity into mobile applications and digital signage, creating a consistent patient experience across all touchpoints. Animated assets were designed for use in digital displays throughout hospital facilities.</p>`
    );
    
    // Agency credits
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Agency: Thackway McCord<\/h3>\s*<p>Creative Direction: Kat McCord.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Agency: Thackway McCord</h3>
                <p>Creative Direction: Kat McCord<br>
Design: Kevin Grzejka, Bianca Seong, Fuchen Kuang<br>
Strategy: Simon Thackway, Jonathan Paisner</p>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Lifepoint Health timeline updated successfully!');
  } catch (error) {
    console.error('Error updating Lifepoint Health timeline:', error);
  }
}

updateLifepointTimeline();