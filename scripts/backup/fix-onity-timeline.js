"use strict";
const fs = require('fs').promises;
const path = require('path');

async function updateOnityTimeline() {
  try {
    const projectPath = path.join(__dirname, 'portfolio', 'projects', 'onity.html');
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update timeline items individually to preserve images and formatting
    
    // Logo animation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Logo animation<\/h3>\s*<p>The final animation brings energy and motion.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Logo animation</h3>
                        <p>Collaborated with Onity's design team to conceptualize and storyboard a logo animation that embodies the secure and continuous flow characteristic of mortgage servicing systems.</p>`
    );
    
    // Brand applications - rename from existing timeline item
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand applications<\/h3>\s*<p>The Onity brand is applied across a variety.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Brand applications</h3>
                        <p>Worked with the internal marketing team to ensure the animation elements could be adapted for various digital and physical touchpoints, maintaining consistency across platforms.</p>`
    );
    
    // Social media integration
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Social media integration<\/h3>\s*<p>The brand system was designed to be adaptable.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Social media integration</h3>
                        <p>Developed detailed storyboards focusing on circular reveal and energy flow elements, which became signature aspects of the brand's motion language.</p>`
    );
    
    // Digital experience
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital experience<\/h3>\s*<p>The project included digital experience design elements.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Digital experience</h3>
                        <p>The project included digital experience design elements, such as this custom 404 error page animation that incorporates the brand's visual language while creating a memorable user interaction.</p>`
    );
    
    // Brand guidelines
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand guidelines<\/h3>\s*<p>Comprehensive brand guidelines were developed.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Brand guidelines</h3>
                        <p>Comprehensive brand guidelines were developed to ensure consistent application of the visual system across all touchpoints. These guidelines included detailed specifications for logo usage, color palette, typography, and motion principles.</p>`
    );
    
    // Marketing collateral
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Marketing collateral<\/h3>\s*<p>The visual identity system was applied to various marketing materials.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Marketing collateral</h3>
                        <p>The visual identity system was applied to various marketing materials, creating a cohesive brand experience across different touchpoints and reinforcing the brand's positioning in the security technology sector.</p>`
    );
    
    // Update "Storyboarding process" from "Visual identity exploration"
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Visual identity exploration<\/h3>\s*<p>The animation was developed as part of a broader visual identity system.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Storyboarding process</h3>
                        <p>I created detailed storyboards to map out the animation sequence in partnership with our creative director, focusing on the circular reveal and energy flow that would become signature elements of the brand's motion language. These boards helped communicate the concept to stakeholders before moving into production.</p>`
    );
    
    // Update "Final deliverables" from "Extended identity system"
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Extended identity system<\/h3>\s*<p>Beyond the logo animation, we developed a complete motion system.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Final deliverables</h3>
                        <p>Prepared a comprehensive set of animation assets and guidelines, enabling the Onity team to implement the logo animation across their website, digital products, and marketing materials.</p>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Onity timeline updated successfully!');
  } catch (error) {
    console.error('Error updating Onity timeline:', error);
  }
}

updateOnityTimeline();