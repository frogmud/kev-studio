"use strict";
const fs = require('fs').promises;
const path = require('path');

async function updateLreiMetadata() {
  try {
    const projectPath = path.join(__dirname, 'portfolio', 'projects', 'lrei.html');
    
    let htmlContent = await fs.readFile(projectPath, 'utf8');
    
    // Update title and tagline
    htmlContent = htmlContent.replace(
      /<h1>LREI viewbook<\/h1>\s*<p class="tagline">Viewbook highlighting the 15-year experience at Little Red School House and Elisabeth Irwin High School \(LREI\).<\/p>/s,
      `<h1>LREI</h1>
            <p class="tagline">Viewbook highlighting the 15-year journey at Little Red School House & Elisabeth Irwin High School (LREI)</p>`
    );
    
    // Update main project description
    htmlContent = htmlContent.replace(
      /<div class="project-description">\s*<p>Little Red School House and Elisabeth Irwin High School \(LREI\) is a progressive.*?<\/p>\s*<p>Starting with a Flickr archive.*?<\/p>/s,
      `<div class="project-description">
                <p>LREI is a progressive, independent school in New York City serving students from pre-K through 12th grade. As design lead at Thackway McCord, I guided the creation of a compact, visually rich viewbook to help prospective families understand the full scope of the LREI experience. The aim was to capture the school's distinctive philosophy and the vibrancy of its community across all age groups.</p>
                <p>Working under creative director Kat McCord, I curated content from a Flickr archive of 5,000+ photos, emphasizing authentic student engagement, creativity, and milestones across the 15-year educational journey. My role included content curation, layout design, narrative structure, and production management—ensuring every spread brought LREI's values and approach to life.</p>
                <p>The finished, pocket-sized viewbook balanced dynamic photography with concise, accessible text, showcasing classroom moments, arts, athletics, and community service. With a print run of 10,000 copies, the viewbook quickly became a cornerstone of LREI's admissions and recruitment materials, praised for both its storytelling and design craft.</p>`
    );

    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('LREI metadata and main content updated successfully!');
  } catch (error) {
    console.error('Error updating LREI metadata:', error);
  }
}

updateLreiMetadata();