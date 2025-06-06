"use strict";
const fs = require('fs').promises;
const path = require('path');

async function updateMN8Metadata() {
  try {
    const projectPath = path.join(__dirname, 'portfolio', 'projects', 'mn8_energy.html');
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update client name in metadata
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Client<\/h3>\s*<p>MN8 Energy \(formerly Goldman Sachs Renewable Power\)<\/p>\s*<\/div>/s,
      `<div class="metadata-item">
                        <h3>Client</h3>
                        <p>MN8 Energy / Goldman Sachs</p>
                    </div>`
    );
    
    // Add Web to Role and update the metadata section
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Role<\/h3>\s*<p>Design, Logo, Motion, UI\/UX<\/p>\s*<\/div>/s,
      `<div class="metadata-item">
                        <h3>Role</h3>
                        <p>Design, Logo, Motion, UI/UX, Web</p>
                    </div>`
    );
    
    // Add Agency field if it doesn't exist
    if (!htmlContent.includes('<h3>Agency</h3>')) {
      htmlContent = htmlContent.replace(
        /<div class="project-metadata">[\s\S]*?<\/div>\s*<\/div>/m,
        `<div class="project-metadata">
                    <div class="metadata-item">
                        <h3>Year</h3>
                        <p>2022</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Client</h3>
                        <p>MN8 Energy / Goldman Sachs</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Role</h3>
                        <p>Design, Logo, Motion, UI/UX, Web</p>
                    </div>
                    <div class="metadata-item">
                        <h3>Agency</h3>
                        <p>Thackway McCord</p>
                    </div>
                </div>
            </div>`
      );
    }
    
    // Update main project description
    htmlContent = htmlContent.replace(
      /<div class="project-description">\s*<p>MN8 Energy emerged from Goldman Sachs's decision.*?<\/p>\s*<p>The name "MN8".*?<\/p>\s*<p>The logo design features.*?<\/p>\s*<p>As the design, logo, motion, and UI\/UX lead.*?<\/p>\s*<p>I worked extensively on naming exploration.*?<\/p>/s,
      `<div class="project-description">
                <p>MN8 Energy was established in 2022 as an independent entity following its spin-off from Goldman Sachs Renewable Power LLC. As a leading enterprise renewable energy company, MN8 is committed to making energy smarter, cleaner, more accessible, and more efficient. The company's portfolio includes approximately 4 GW of operational and under-construction solar projects, over 1.1 GWh of battery energy storage capacity, and a growing network of EV charging stations across the United States.</p>
                <p>The name "MN8" (pronounced "minute") symbolizes both the constant motion of energy and the company's innovative approach to power generation and distribution. The logo features a clever negative space design where the "8" doubles as both a colon and a power socket, visually communicating the company's core business of energy delivery. The bold, all-orange brand identity sets MN8 apart in an industry often dominated by conservative blue and green palettes.</p>
                <p>As the design, logo, motion, and UI/UX lead, I collaborated with the Thackway McCord team—including Kat McCord, Steve Clarke, Lucinda Quartararo, Dave Morreale, Simon Thackway, and Jonathan Paisner—to guide the brand from naming through launch. My contributions encompassed naming exploration, logo concepting, website design, design systems implementation, and brand guidelines development, translating the strategic vision into cohesive visual assets that positioned MN8 as a forward-thinking energy innovator.</p>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('MN8 Energy metadata and main content updated successfully!');
  } catch (error) {
    console.error('Error updating MN8 Energy metadata:', error);
  }
}

updateMN8Metadata();