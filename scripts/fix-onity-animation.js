"use strict";

const fs = require('fs').promises;
const path = require('path');

async function addFinalAnimation() {
  const filePath = path.join(__dirname, '..', 'portfolio', 'projects', 'onity.html');
  
  try {
    // Read the HTML content
    let content = await fs.readFile(filePath, 'utf8');
    
    // Create the new final deliverable section with the animation
    const finalDeliverableSection = `
                    <div class="timeline-item">
                        <h3>Final deliverables</h3>
                        <p>The final logo animation brings together all the design elements, creating a dynamic brand expression that communicates Onity's values of reliability, innovation, and customer focus in the mortgage servicing industry.</p>
                        <figure class="timeline-figure">
                            <img loading="lazy" src="../images/optimized/onity/onity-logo-animation.gif" alt="Final Onity logo animation" class="timeline-image">
                            <figcaption>Final logo animation with motion elements</figcaption>
                        </figure>
                    </div>`;
      
    // Find the proper position to add this (end of timeline)
    const timeline = content.match(/<div class="project-timeline">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
    
    if (timeline) {
      // Replace the timeline with itself plus our new section
      const updatedTimeline = timeline[0].replace(/<\/div>\s*<\/div>\s*<\/div>$/, `${finalDeliverableSection}\n                </div>\n            </div>\n        </div>`);
      content = content.replace(timeline[0], updatedTimeline);
      
      // Write the updated content back to the file
      await fs.writeFile(filePath, content, 'utf8');
      console.log('Successfully added the final animation section to onity.html');
    } else {
      console.error('Could not find the project-timeline section');
    }
  } catch (error) {
    console.error('Error updating the file:', error);
  }
}

// Execute the function if this script is run directly
if (require.main === module) {
  addFinalAnimation();
}

module.exports = { addFinalAnimation };