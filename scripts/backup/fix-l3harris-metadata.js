"use strict";
const fs = require('fs').promises;
const path = require('path');

async function updateL3HarrisMetadata() {
  try {
    const projectPath = path.join(__dirname, 'portfolio', 'projects', 'l3harris.html');
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update title, tagline, and description
    htmlContent = htmlContent.replace(
      /<h1>L3Harris<\/h1>\s*<p class="tagline">Brand identity for the largest defense merger in history<\/p>/s,
      `<h1>L3Harris</h1>
            <p class="tagline">Brand identity for a multi-billion dollar defense merger. Fast. Forward.</p>`
    );
    
    // Update the project metadata to include the Agency
    htmlContent = htmlContent.replace(
      /<div class="project-metadata">\s*<div class="metadata-item">\s*<h3>Year<\/h3>\s*<p>2018<\/p>\s*<\/div>\s*<div class="metadata-item">\s*<h3>Client<\/h3>\s*<p>L3Harris<\/p>\s*<\/div>\s*<div class="metadata-item">\s*<h3>Role<\/h3>\s*<p>Design, Logo, Motion, UI\/UX<\/p>\s*<\/div>\s*<\/div>/s,
      `<div class="project-metadata">
                    <div class="metadata-item">
                        <h3>Year</h3>
                        <p>2018</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Client</h3>
                        <p>L3Harris</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Role</h3>
                        <p>Design, Logo, Motion, UI/UX</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Agency</h3>
                        <p>Thackway McCord</p>
                    </div>
                </div>`
    );
    
    // Update main project description
    htmlContent = htmlContent.replace(
      /<div class="project-description">\s*<p>When L3 Technologies.*?<\/p>\s*<p>The new L3Harris brand.*?<\/p>\s*<p>- Unite the shared.*?<\/p>\s*<p>As the design, logo.*?<\/p>\s*<p>The logo design.*?<\/p>/s,
      `<div class="project-description">
                <p>In 2018, L3 Technologies and Harris Corporation merged to form L3Harris Technologies, creating the sixth-largest defense contractor globally. This merger necessitated a new brand identity that would reflect the combined entity's scale, innovation, and commitment to delivering advanced defense and aerospace solutions.</p>
                <p>In 2018, L3 Technologies and Harris Corporation merged to form L3Harris Technologies, creating the sixth-largest defense contractor globally. This merger necessitated a new brand identity that would reflect the combined entity's scale, innovation, and commitment to delivering advanced defense and aerospace solutions.</p>
                <p>blog.brandor.com</p>
                <p>As the lead designer responsible for design, logo, motion, and UI/UX at Thackway McCord, I collaborated closely with Creative Director Kat McCord and Design Lead David Weiss to develop a comprehensive brand system. Our objective was to create a visual identity that embodied technological advancement, interoperability, and global connectivity.</p>
                <p>The resulting logo, particularly when animated, conveys fast-paced interconnectivity in a global context, serving as the cornerstone of the new visual identity. This system extended across various applications, including digital platforms, physical environments, and communication materials, ensuring consistency and adaptability.</p>
                <p>The branding project received industry recognition, earning a Silver award at the Transform Awards North America 2020 for Best Corporate Rebrand Following a Merger or Acquisition.</p>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('L3Harris metadata and main content updated successfully!');
  } catch (error) {
    console.error('Error updating L3Harris metadata:', error);
  }
}

updateL3HarrisMetadata();