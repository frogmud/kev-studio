"use strict";

const fs = require('fs').promises;
const path = require('path');

async function addFinalAnimation() {
  const filePath = path.join(__dirname, 'portfolio', 'projects', 'onity.html');
  
  try {
    // Read the HTML content
    let content = await fs.readFile(filePath, 'utf8');
    
    // Find the last timeline item to insert after
    const lastTimelineItem = content.match(/<div class="timeline-item">[\s\S]*?<figure class="timeline-figure">[\s\S]*?<figcaption>Presentation design system<\/figcaption>[\s\S]*?<\/figure>[\s\S]*?<\/div>/);
    
    if (lastTimelineItem) {
      // Create the new final deliverable section with the animation
      const finalDeliverableSection = `
                    <div class="timeline-item">
                        <h3>Final deliverables</h3>
                        <p>The final logo animation brings together all the design elements, creating a dynamic brand expression that communicates Onity's values of reliability, innovation, and customer focus in the mortgage servicing industry.</p>
                        <figure class="timeline-figure">
                            <img loading="lazy" src="../images/optimized/onity/onity-logo-animation.gif" alt="Final Onity logo animation" class="timeline-image">
                            <figcaption>Final logo animation with motion elements</figcaption>
                        </figure>
                    </div>
                </div>`;
      
      // Replace the closing div of the project-timeline with our new section + closing div
      content = content.replace(/(<\/figure>[\s\S]*?<\/div>[\s\S]*?)(<\/div>[\s\S]*?<div class="project-navigation">)/, `$1${finalDeliverableSection}$2`);
      
      // Write the updated content back to the file
      await fs.writeFile(filePath, content, 'utf8');
      console.log('Successfully added the final animation section to onity.html');
    } else {
      console.error('Could not find the last timeline item to add after');
    }
  } catch (error) {
    console.error('Error updating the file:', error);
  }
}

addFinalAnimation();