"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateFinsecaTimeline() {
  try {
    const projectPath = path.join(__dirname, 'portfolio/projects/finseca.html');
    let htmlContent = await fs.readFile(projectPath, 'utf8');

    console.log('Updating Finseca timeline content...');

    // Timeline item: Strategic discovery
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Strategic discovery<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Strategic discovery</h3>
                        <p>Conducted stakeholder interviews, competitive analysis, and member research with the Thackway McCord team to identify key opportunities for the merged organization. Explored the evolving landscape of financial security advocacy to position Finseca effectively.</p>`
    );

    // Timeline item: Naming & brand development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Naming & brand development<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Naming & brand development</h3>
                        <p>Led the creation of the distinctive "Finseca" name through a collaborative process with leadership from both legacy organizations. Developed a comprehensive brand strategy centered around the concept of "financial security for all."</p>`
    );

    // Timeline item: Visual identity creation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Visual identity creation<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Visual identity creation</h3>
                        <p>Designed the shield-based logo with integrated double-F symbolism, representing both protection and the merger of two organizations. Collaborated with Fuchen Kuang to develop a strategic color system with politically neutral purple as the primary brand color.</p>`
    );

    // Timeline item: Digital experience design
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital experience design<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Digital experience design</h3>
                        <p>Shaped the website architecture, user interface, and content strategy to communicate Finseca's mission. Partnered with WDG to create dynamic digital templates for ongoing content development.</p>`
    );

    // Timeline item: Motion & 3D development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Motion & 3D development<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Motion & 3D development</h3>
                        <p>Created distinctive 3D animations of the shield mark for video content and digital applications. Worked with Scyld Bowring to develop motion guidelines for consistent animation across platforms.</p>`
    );

    // Timeline item: Launch campaign
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Launch campaign<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Launch campaign</h3>
                        <p>Designed comprehensive launch materials, including announcement videos, digital marketing assets, and member communications. Coordinated rollout across multiple channels to effectively introduce the new organization.</p>`
    );

    // Timeline item: Agency credits
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Agency: Thackway McCord<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Agency: Thackway McCord</h3>
                        <p>Creative Direction: Kat McCord<br>
                        Design: Fuchen Kuang<br>
                        Strategy: Simon Thackway, Jonathan Paisner<br>
                        Website: WDG<br>
                        3D Work: Scyld Bowring<br>
                        Awards: Indigo Design Awards 2021 (Silver), Wolda 2020 (Gold)</p>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Finseca timeline content updated successfully!');
  } catch (error) {
    console.error('Error updating Finseca timeline:', error);
  }
}

updateFinsecaTimeline();