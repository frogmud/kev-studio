"use strict";

const fs = require('fs').promises;
const path = require('path');

async function fixOnityHtmlStructure() {
  const filePath = path.join(__dirname, 'portfolio', 'projects', 'onity.html');
  
  try {
    // Read the current HTML content
    const htmlContent = await fs.readFile(filePath, 'utf8');
    
    // Extract all timeline items to reorder them properly
    const timelineItems = htmlContent.match(/<div class="timeline-item">[\s\S]*?<\/div>(?=\s*<div class="timeline-item">|<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div class="project-navigation">)/g);
    
    // Get the content before timeline items
    const contentBeforeTimeline = htmlContent.match(/([\s\S]*)<div class="project-timeline">/)[1];
    
    // Get the content after timeline items
    const contentAfterTimeline = htmlContent.match(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*(<div class="project-navigation">[\s\S]*)/)[1];
    
    // If we have timeline items and surrounding content
    if (timelineItems && contentBeforeTimeline && contentAfterTimeline) {
      // Extract the Final deliverables item separately to place at the end
      const finalDeliverablesItem = timelineItems.find(item => item.includes('<h3>Final deliverables</h3>'));
      
      // Filter out the Final deliverables item from the main array
      const otherItems = timelineItems.filter(item => !item.includes('<h3>Final deliverables</h3>'));
      
      // Add the Final deliverables item to the end
      const allItems = [...otherItems];
      if (finalDeliverablesItem) {
        allItems.push(finalDeliverablesItem);
      }
      
      // Join all timeline items
      const newTimelineContent = allItems.join('\n');
      
      // Build the new HTML content
      const newHtmlContent = `${contentBeforeTimeline}<div class="project-timeline">
                    ${newTimelineContent}
                </div>
            </div>
        </div>
    ${contentAfterTimeline}`;
      
      // Write the updated content back to the file
      await fs.writeFile(filePath, newHtmlContent, 'utf8');
      console.log('Successfully restructured the HTML in onity.html');
    } else {
      console.error('Failed to extract necessary content parts');
    }
  } catch (error) {
    console.error('Error updating the file:', error);
  }
}

fixOnityHtmlStructure();