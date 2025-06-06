"use strict";

const fs = require('fs').promises;
const path = require('path');

async function addMoreHumImages() {
  const projectPath = path.join(__dirname, 'portfolio', 'projects', 'hum.html');

  try {
    console.log(`Reading ${projectPath}...`);
    let htmlContent = await fs.readFile(projectPath, 'utf8');

    // Add images to remaining timeline items
    // 1. Discovery & strategy
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Discovery & strategy<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Discovery & strategy</h3>
                <p>Partnered with strategists Simon Thackway and Jonathan Paisner to conduct stakeholder interviews and market analysis, identifying the need for a brand that stood out in the crowded fintech space while communicating complex financial offerings in an approachable manner.</p>
                <figure>
                  <img loading="lazy" src="../images/optimized/hum/Hum_09.png" alt="Hum Capital strategy session" class="timeline-image">
                  <figcaption>Strategic brand positioning for the fintech marketplace</figcaption>
                </figure>
              </div>`
    );

    // 2. Naming development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Naming development<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Naming development</h3>
                <p>Collaborated with creative director Kat McCord and lead designer Bianca Seong to transition the company's name from "Capital" to "Hum," evoking technological connectivity and the constant flow of capital central to the company's value proposition.</p>
                <figure>
                  <img loading="lazy" src="../images/optimized/hum/Hum_02.png" alt="Hum Capital naming exploration" class="timeline-image">
                  <figcaption>Naming exploration and development process</figcaption>
                </figure>
              </div>`
    );

    // 3. App icon & mobile interface
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>App icon & mobile interface<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>App icon & mobile interface</h3>
                <p>Led the design of the Hum mobile experience and app icon, ensuring brand consistency across platforms. Collaborated with Scyld Bowring to craft an app icon that balanced recognizability with mobile interface constraints.</p>
                <figure>
                  <img loading="lazy" src="../images/optimized/hum/Hum_06.png" alt="Hum Capital mobile interface" class="timeline-image">
                  <figcaption>Mobile interface design showing app icon and key screens</figcaption>
                </figure>
              </div>`
    );

    // 4. Interactive presentations
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Interactive presentations<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Interactive presentations</h3>
                <p>Designed interactive presentation templates that helped the Hum team convey their story to investors and clients, incorporating subtle animations and data visualizations to explain Hum's AI-driven matching process.</p>
                <figure>
                  <img loading="lazy" src="../images/optimized/hum/Hum_07.png" alt="Hum Capital presentation templates" class="timeline-image">
                  <figcaption>Presentation templates with data visualization components</figcaption>
                </figure>
              </div>`
    );

    // 5. Digital advertising
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital advertising<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Digital advertising</h3>
                <p>Developed a cohesive digital advertising system that maintained the Hum brand across various platforms while adapting to different format requirements, effectively communicating Hum's value proposition to target audiences.</p>
                <figure>
                  <img loading="lazy" src="../images/optimized/hum/Hum_10.png" alt="Hum Capital digital advertising" class="timeline-image">
                  <figcaption>Digital advertising formats optimized for multiple platforms</figcaption>
                </figure>
              </div>`
    );

    // 6. Fix favicon path
    htmlContent = htmlContent.replace(
      /<link rel="shortcut icon" href="favicon\/k-fav-bigger.ico" type="image\/x-icon">/,
      `<link rel="shortcut icon" href="../favicon/k-fav-bigger.ico" type="image/x-icon">`
    );

    // Save the updated HTML back to the file
    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Successfully added more images to Hum timeline items.');

  } catch (error) {
    console.error('Error adding images:', error);
  }
}

addMoreHumImages();