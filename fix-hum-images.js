"use strict";

const fs = require('fs').promises;
const path = require('path');

async function addHumImages() {
  const projectPath = path.join(__dirname, 'portfolio', 'projects', 'hum.html');

  try {
    console.log(`Reading ${projectPath}...`);
    let htmlContent = await fs.readFile(projectPath, 'utf8');

    // Add timeline-image class to project-timeline styles if not already present
    if (!htmlContent.includes(".timeline-image")) {
      const styleAddition = `
        .timeline-image {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: var(--spacing-md);
        }
        
        .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .image-grid img {
            margin-bottom: 0;
        }`;

      htmlContent = htmlContent.replace(
        /\.timeline-item p {\s*margin-bottom: var\(--spacing-md\);\s*}/,
        `.timeline-item p {
            margin-bottom: var(--spacing-md);
        }${styleAddition}`
      );
    }

    // Update the main hero image to use optimized path
    htmlContent = htmlContent.replace(
      /<div class="project-hero">\s*<img loading="lazy" src="\.\.\/images\/hum\/Hum_01\.png" alt="A better way to fund growth">/,
      `<div class="project-hero">
            <img loading="lazy" src="../images/optimized/hum/Hum_01.png" alt="Hum Capital branding and digital experience">`
    );

    // Add images to timeline items
    // 1. Logo & visual identity
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Logo & visual identity<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Logo & visual identity</h3>
                <p>Bianca Seong executed the logo under Kat McCord's direction, while I shaped the broader visual system. The identity balances tech innovation with financial credibility, featuring a distinctive wordmark with custom letterforms and a vibrant color palette that sets Hum apart from traditional financial institutions.</p>
                <figure>
                  <img loading="lazy" src="../images/optimized/hum/Hum_01.png" alt="Hum Capital logo and brand elements" class="timeline-image">
                  <figcaption>Hum Capital logo design with vibrant color treatments</figcaption>
                </figure>
              </div>`
    );

    // 2. Motion design principles
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Motion design principles<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Motion design principles</h3>
                <p>Developed a comprehensive motion language for Hum that reinforced brand values such as energy, connection, and forward momentum. Worked with Scyld Bowring to create animations that embodied these principles.</p>
                <figure>
                  <img loading="lazy" src="../images/optimized/hum/Hum_motion1.gif" alt="Hum Capital motion design examples" class="timeline-image">
                  <figcaption>Motion design principles applied to the Hum brand identity</figcaption>
                </figure>
              </div>`
    );

    // 3. Digital experience design
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital experience design<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Digital experience design</h3>
                <p>Worked with developer Dave Morreale to bring the UI to life. The responsive website design effectively communicates Hum's complex offerings in an accessible way, guiding potential clients through the funding process with clear navigation and compelling visual storytelling.</p>
                <figure>
                  <img loading="lazy" src="../images/optimized/hum/Hum_03.png" alt="Hum Capital website design" class="timeline-image">
                  <figcaption>Responsive web design for Hum's digital platform</figcaption>
                </figure>
              </div>`
    );

    // 4. Brand application system
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand application system<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Brand application system</h3>
                <p>Produced versatile templates and collateral to ensure consistent implementation across all touchpoints, including digital templates, presentation decks, social media assets, and print materials.</p>
                <div class="image-grid">
                  <figure>
                    <img loading="lazy" src="../images/optimized/hum/Hum_04.png" alt="Hum Capital brand applications" class="timeline-image">
                    <figcaption>Brand applications across various touchpoints</figcaption>
                  </figure>
                  <figure>
                    <img loading="lazy" src="../images/optimized/hum/Hum_05.png" alt="Hum Capital marketing materials" class="timeline-image">
                    <figcaption>Marketing collateral showing visual identity system</figcaption>
                  </figure>
                </div>
              </div>`
    );

    // 5. Brand guidelines & design system
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand guidelines & design system<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Brand guidelines & design system</h3>
                <p>Consolidated components into a Figma library, developing a robust design system with reusable components and clear documentation. The brand guidelines provide comprehensive rules for logo usage, typography, color application, photography style, and voice and tone.</p>
                <figure>
                  <img loading="lazy" src="../images/optimized/hum/Hum_08.png" alt="Hum Capital brand guidelines" class="timeline-image">
                  <figcaption>Brand guidelines showing color, typography and usage specifications</figcaption>
                </figure>
              </div>`
    );

    // 6. Launch & market reception
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Launch & market reception<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Launch & market reception</h3>
                <p>Scyld Bowring created energetic 3D assets for the launch. The phased rollout of the new brand across all channels was carefully coordinated to maximize impact. The rebrand was well-received in the market, helping Hum to secure additional funding and attract new clients. The project won multiple design awards, including Transform North America 2021 Rebrand (Gold), Indigo Awards 2021 Branding (Silver), and Wolda 2021 Rebrand (Gold).</p>
                <figure>
                  <img loading="lazy" src="../images/optimized/hum/Hum_motion4.gif" alt="Hum Capital launch materials" class="timeline-image">
                  <figcaption>Animated brand assets used for the Hum Capital launch campaign</figcaption>
                </figure>
              </div>`
    );

    // Save the updated HTML back to the file
    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Successfully added images to Hum timeline items.');

  } catch (error) {
    console.error('Error adding images:', error);
  }
}

addHumImages();