"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateHumTimeline() {
  const projectPath = path.join(__dirname, 'portfolio', 'projects', 'hum.html');

  try {
    console.log(`Reading ${projectPath}...`);
    let htmlContent = await fs.readFile(projectPath, 'utf8');

    // Update each timeline item individually to preserve the images

    // 1. Discovery & strategy
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Discovery & strategy<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Discovery & strategy</h3>
                <p>Partnered with strategists Simon Thackway and Jonathan Paisner to conduct stakeholder interviews and market analysis, identifying the need for a brand that stood out in the crowded fintech space while communicating complex financial offerings in an approachable manner.</p>
              </div>`
    );

    // 2. Naming development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Naming development<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Naming development</h3>
                <p>Collaborated with creative director Kat McCord and lead designer Bianca Seong to transition the company's name from "Capital" to "Hum," evoking technological connectivity and the constant flow of capital central to the company's value proposition.</p>
              </div>`
    );

    // 3. Logo & visual identity
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Logo & visual identity<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Logo & visual identity</h3>
                <p>Bianca Seong executed the logo under Kat McCord's direction, while I shaped the broader visual system. The identity balances tech innovation with financial credibility, featuring a distinctive wordmark with custom letterforms and a vibrant color palette that sets Hum apart from traditional financial institutions.</p>
              </div>`
    );

    // 4. App icon & mobile interface
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>App icon & mobile interface<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>App icon & mobile interface</h3>
                <p>Led the design of the Hum mobile experience and app icon, ensuring brand consistency across platforms. Collaborated with Scyld Bowring to craft an app icon that balanced recognizability with mobile interface constraints.</p>
              </div>`
    );

    // 5. Motion design principles
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Motion design principles<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Motion design principles</h3>
                <p>Developed a comprehensive motion language for Hum that reinforced brand values such as energy, connection, and forward momentum. Worked with Scyld Bowring to create animations that embodied these principles.</p>
              </div>`
    );

    // 6. Digital experience design
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital experience design<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Digital experience design</h3>
                <p>Worked with developer Dave Morreale to bring the UI to life. The responsive website design effectively communicates Hum's complex offerings in an accessible way, guiding potential clients through the funding process with clear navigation and compelling visual storytelling.</p>
              </div>`
    );

    // 7. Brand application system
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand application system<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Brand application system</h3>
                <p>Produced versatile templates and collateral to ensure consistent implementation across all touchpoints, including digital templates, presentation decks, social media assets, and print materials.</p>
              </div>`
    );

    // 8. Interactive presentations
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Interactive presentations<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Interactive presentations</h3>
                <p>Designed interactive presentation templates that helped the Hum team convey their story to investors and clients, incorporating subtle animations and data visualizations to explain Hum's AI-driven matching process.</p>
              </div>`
    );

    // 9. Brand guidelines & design system
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand guidelines & design system<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Brand guidelines & design system</h3>
                <p>Consolidated components into a Figma library, developing a robust design system with reusable components and clear documentation. The brand guidelines provide comprehensive rules for logo usage, typography, color application, photography style, and voice and tone.</p>
              </div>`
    );

    // 10. Digital advertising
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital advertising<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Digital advertising</h3>
                <p>Developed a cohesive digital advertising system that maintained the Hum brand across various platforms while adapting to different format requirements, effectively communicating Hum's value proposition to target audiences.</p>
              </div>`
    );

    // 11. Launch & market reception
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Launch & market reception<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Launch & market reception</h3>
                <p>Scyld Bowring created energetic 3D assets for the launch. The phased rollout of the new brand across all channels was carefully coordinated to maximize impact. The rebrand was well-received in the market, helping Hum to secure additional funding and attract new clients. The project won multiple design awards, including Transform North America 2021 Rebrand (Gold), Indigo Awards 2021 Branding (Silver), and Wolda 2021 Rebrand (Gold).</p>
              </div>`
    );

    // 12. Project credits - Replace the credit section with normal awards section
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Agency: Thackway McCord.*?<\/p>\s*<\/div>/s,
      `<div class="timeline-item">
                <h3>Project credits</h3>
                <p>Agency: Thackway McCord<br>
                Client: Hum Capital<br>
                Role: Logo, Design, UI/UX<br>
                Creative Director: Kat McCord<br>
                Lead Designer: Bianca Seong<br>
                Strategy: Simon Thackway, Jonathan Paisner<br>
                Programming: Dave Morreale<br>
                3D Work: Scyld Bowring</p>
              </div>`
    );

    // 13. Remove the awards section since we integrated it with Launch & market reception
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Awards:.*?<\/div>/s,
      ``
    );

    // Save the updated HTML back to the file
    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Successfully updated Hum timeline items.');

  } catch (error) {
    console.error('Error updating timeline:', error);
  }
}

updateHumTimeline();