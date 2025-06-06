"use strict";
const fs = require('fs').promises;
const path = require('path');

async function updateL3HarrisTimeline() {
  try {
    const projectPath = path.join(__dirname, 'portfolio', 'projects', 'l3harris.html');
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update timeline items individually to preserve images
    
    // Strategic assessment
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Strategic assessment<\/h3>\s*<p>Conducted extensive research into both legacy brands.*?<\/p>/s,
      `<div class="timeline-item">
            <h3>Strategic assessment</h3>
            <p>Conducted in-depth research into the legacy brands of L3 Technologies and Harris Corporation, analyzed competitors, and engaged with stakeholders to identify strengths and opportunities. This assessment informed the strategic approach to the new brand's visual positioning.</p>`
    );
    
    // Identity system creation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Identity system creation<\/h3>\s*<p>Designed the core identity elements.*?<\/p>/s,
      `<div class="timeline-item">
            <h3>Identity system creation</h3>
            <p>Designed core identity elements, including the logo, typography, color palette, and graphic language. Developed a dynamic system adaptable to both digital and physical applications, from aircraft components to trade show displays.</p>`
    );
    
    // Environmental & exhibition design
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Environmental & exhibition design<\/h3>\s*<p>Developed signage systems and exhibition booth designs.*?<\/p>/s,
      `<div class="timeline-item">
            <h3>Environmental & exhibition design</h3>
            <p>Developed signage systems and exhibition booth designs for major industry events. Created immersive brand experiences that showcased L3Harris technologies while reinforcing the new brand identity.</p>`
    );
    
    // Signage implementation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Signage implementation<\/h3>\s*<p>Created signage systems for L3Harris facilities worldwide.*?<\/p>/s,
      `<div class="timeline-item">
            <h3>Signage implementation</h3>
            <p>Created signage systems for L3Harris facilities worldwide, ensuring consistency in brand application across diverse global locations. Developed specifications for illuminated signs, directional systems, and interior brand elements.</p>`
    );
    
    // Brand guidelines & governance
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand guidelines & governance<\/h3>\s*<p>Created comprehensive brand guidelines.*?<\/p>/s,
      `<div class="timeline-item">
            <h3>Brand guidelines & governance</h3>
            <p>Developed comprehensive brand guidelines and asset management systems. Provided training and support for global marketing teams to ensure consistent application of the new identity across all touchpoints.</p>`
    );
    
    // Digital & print applications
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital & print applications<\/h3>\s*<p>Extended the brand system across a wide range.*?<\/p>/s,
      `<div class="timeline-item">
            <h3>Digital & print applications</h3>
            <p>Extended the brand system across a wide range of digital and print touchpoints, including website, social media, and collateral materials. Created templates and assets for ongoing brand application across global teams.</p>`
    );
    
    // Logo animation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Logo animation<\/h3>\s*<p>Created dynamic brand animations.*?<\/p>/s,
      `<div class="timeline-item">
            <h3>Logo animation</h3>
            <p>Created dynamic brand animations to introduce the new identity at the merger launch event. These animations visualized the technological sophistication of the new L3Harris entity.</p>`
    );
    
    // Add text after the first video container
    htmlContent = htmlContent.replace(
      /<\/video>\s*<\/div>\s*<p>The design process included/s,
      `</video>
            </div>
            <p>The design process included`
    );
    
    // Brand evolution
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand evolution<\/h3>\s*<p>The logo design went through multiple iterations.*?<\/p>/s,
      `<div class="timeline-item">
            <h3>Brand evolution</h3>
            <p>The logo design underwent multiple iterations and refinements. The final mark successfully represents the merger of two major companies while positioning the new entity for the future.</p>`
    );
    
    // Agency credits
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Agency credits<\/h3>\s*<p>Agency: Thackway McCord.*?<\/p>/s,
      `<div class="timeline-item">
            <h3>Agency credits</h3>
            <p>Agency: Thackway McCord<br>
            Creative Direction: Kat McCord<br>
            Design Lead: David Weiss<br>
            Strategy: Simon Thackway, Jonathan Paisner<br>
            Logo Animation: Scyld Bowring<br>
            Original geodesic dome script: aadebdeb</p>`
    );
    
    // Add missing brand architecture section after Strategic assessment
    // Find the strategic assessment timeline item and insert brand architecture after it
    const strategicAssessmentItem = htmlContent.match(/<div class="timeline-item">\s*<h3>Strategic assessment<\/h3>.*?<\/div>/s);
    if (strategicAssessmentItem) {
      const brandArchitectureItem = `
            <div class="timeline-item">
                <h3>Brand architecture development</h3>
                <p>Designed core identity elements, including the logo, typography, color palette, and graphic language. Developed a dynamic system adaptable to both digital and physical applications, from aircraft components to trade show displays.</p>
            </div>`;
      
      htmlContent = htmlContent.replace(
        strategicAssessmentItem[0],
        strategicAssessmentItem[0] + brandArchitectureItem
      );
    }

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('L3Harris timeline updated successfully!');
  } catch (error) {
    console.error('Error updating L3Harris timeline:', error);
  }
}

updateL3HarrisTimeline();