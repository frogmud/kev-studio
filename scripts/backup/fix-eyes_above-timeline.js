"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateEyesAboveTimeline() {
  try {
    const projectPath = path.join(__dirname, 'portfolio/projects/eyes_above.html');
    let htmlContent = await fs.readFile(projectPath, 'utf8');

    console.log('Updating Eyes Above timeline content...');

    // Timeline item: Concept & story development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Concept & story development<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Concept & story development</h3>
                <p>Collaborated with my brother, James Grzejka, to adapt his short story into a rich fantasy world. Developed character designs and world-building elements that captured the essence of our shared fantastical experiences.</p>`
    );

    // Timeline item: Character animation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Character animation<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Character animation</h3>
                <p>Hand-drew hundreds of frames for character movements and interactions. Utilized bright, saturated colors with thick outlines to ensure quality across various scales and maintain a cohesive, playful vibe.</p>`
    );

    // Timeline item: Game design & prototyping
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Game design & prototyping<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Game design & prototyping</h3>
                <p>Designed game mechanics and interfaces, creating sprite sheets and other assets aimed at developing a playable demo that would showcase the full-color intro sequence.</p>`
    );

    // Timeline item: Environmental design
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Environmental design<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Environmental design</h3>
                <p>Constructed immersive backgrounds and scenery that complemented the characters. Ensured the consistent art style maintained the fantasy aesthetic while adapting to different game environments.</p>`
    );

    // Timeline item: Marketing & promotion
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Marketing & promotion<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Marketing & promotion</h3>
                <p>Developed promotional materials, including subway advertisements, social media assets, and presentation boards. Created mock-ups of the game in various contexts to visualize the final product.</p>`
    );

    // Timeline item: Animation showcase
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Animation showcase<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Animation showcase</h3>
                <p>Compiled animation sequences for display on various platforms. Submitted the work to Young Guns 21 to showcase the project's progress and quality.</p>`
    );

    // Timeline item: Project credits
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Project credits<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                <h3>Project credits</h3>
                <p>Story: James Grzejka<br>
                Design & Animation: Kevin Grzejka<br>
                Special Thanks: Brian Appleby, Keith Hagins, Chris Stratton, Ryan Hawk</p>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Eyes Above timeline content updated successfully!');
  } catch (error) {
    console.error('Error updating Eyes Above timeline:', error);
  }
}

updateEyesAboveTimeline();