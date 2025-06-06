"use strict";
const fs = require('fs').promises;
const path = require('path');

async function updateLreiTimeline() {
  try {
    const projectPath = path.join(__dirname, 'portfolio', 'projects', 'lrei.html');
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update timeline items individually to preserve images and containers
    
    // Discovery & research
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Discovery & research<\/h3>\s*<p>The project began with an immersive research phase.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Discovery & research</h3>
                        <p>Partnered with the Thackway McCord team to immerse in LREI's culture through interviews with faculty, parents, and students. The goal: distill 15 years of progressive education into a format that would resonate with prospective families.</p>`
    );
    
    // Content curation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Content curation<\/h3>\s*<p>In my role as design lead, I curated thousands of archival photos.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Content curation</h3>
                        <p>Curated thousands of archival images, selecting authentic moments that represented student engagement and the school's holistic approach. Ensured all age groups and key transitions were included.</p>`
    );
    
    // Design concept
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Design concept<\/h3>\s*<p>As design lead, I emphasized accessibility and narrative flow.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Design concept</h3>
                        <p>Developed a compact, parent-friendly format emphasizing narrative flow. Balanced immersive photography with concise copy blocks that highlighted LREI's progressive pedagogy and sense of community.</p>`
    );
    
    // Visual storytelling
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Visual storytelling<\/h3>\s*<p>In my role as design lead, I structured the viewbook as a thematic journey.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Visual storytelling</h3>
                        <p>Structured the viewbook as a thematic journey, not just a grade-level progression. Each spread focused on an aspect of student life—from academics to arts and community service—communicating the holistic nature of LREI's education.</p>`
    );
    
    // Production & refinement
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Production & refinement<\/h3>\s*<p>As design lead, I guided the entire production phase.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Production & refinement</h3>
                        <p>Oversaw production, working closely with printers to select paper stock and finishing details. Refined layouts and imagery to create a premium, durable piece.</p>`
    );
    
    // Final outcome
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Final outcome<\/h3>\s*<p>The final design captured LREI's progressive approach.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Final outcome</h3>
                        <p>The result was a visually compelling viewbook that quickly became LREI's key recruitment tool, distributed at open houses and admissions events. The project demonstrates how thoughtful content curation and design can distill a complex educational journey into a format that resonates with families.</p>`
    );
    
    // Impact & legacy
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Impact & legacy<\/h3>\s*<p>The LREI viewbook I designed has proven to have remarkable longevity.*?<\/p>\s*<p>This project demonstrates how my strategic content curation.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Impact & legacy</h3>
                        <p>Years after its launch, the LREI viewbook continues to be used as an effective recruiting piece. My leadership showcases how strategic design and narrative thinking can encapsulate the essence of a school's experience and values.</p>`
    );
    
    // Agency & credits
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Agency & credits<\/h3>\s*<p>Agency: Thackway McCord.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Agency & credits</h3>
                        <p>Agency: Thackway McCord<br>
                        Client: LREI<br>
                        Role: Design lead, print, motion<br>
                        Creative direction: Kat McCord</p>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('LREI timeline updated successfully!');
  } catch (error) {
    console.error('Error updating LREI timeline:', error);
  }
}

updateLreiTimeline();