"use strict";

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

// Styles to update
const oldTimelineStyle = `.project-timeline::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20px;
            width: 2px;
            background-color: #e2e8f0;
        }`;

const newTimelineStyle = `.project-timeline::before {
            content: '';
            position: absolute;
            top: 8px;
            bottom: 0;
            left: 8px;
            width: 0.5px;
            background-color: #e2e8f0;
        }`;

const oldDotStyle = `.timeline-item::before {
            content: '';
            position: absolute;
            left: -50px;
            top: 8px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: var(--accent-color);
            border: 4px solid white;
            box-shadow: 0 0 0 2px #e2e8f0;
        }`;

const newDotStyle = `.timeline-item::before {
            content: '';
            position: absolute;
            left: -46px;
            top: 8px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--accent-color);
            border: 2px solid white;
            box-shadow: 0 0 0 1px #e2e8f0;
        }`;

const oldMediaQueryStyle = `@media (max-width: 768px) {
            .project-timeline {
                padding-left: 30px;
            }

            .timeline-item::before {
                left: -30px;
            }`;

const newMediaQueryStyle = `@media (max-width: 768px) {
            .project-timeline {
                padding-left: 36px;
            }

            .timeline-item::before {
                left: -32px;
            }`;

async function updateFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    
    // Skip files we've already updated (MN8, Onity, Absorb)
    const skipFiles = ['mn8_energy.html', 'onity.html', 'absorb_software.html'];
    const fileName = path.basename(filePath);
    if (skipFiles.includes(fileName)) {
      console.log(`Skipping already updated file: ${fileName}`);
      return;
    }
    
    // Replace timeline styles
    let updated = false;
    
    if (content.includes(oldTimelineStyle)) {
      content = content.replace(oldTimelineStyle, newTimelineStyle);
      updated = true;
    }
    
    if (content.includes(oldDotStyle)) {
      content = content.replace(oldDotStyle, newDotStyle);
      updated = true;
    }
    
    if (content.includes(oldMediaQueryStyle)) {
      content = content.replace(oldMediaQueryStyle, newMediaQueryStyle);
      updated = true;
    }
    
    if (updated) {
      await fs.writeFile(filePath, content, 'utf8');
      console.log(`Updated timeline styles in: ${fileName}`);
    } else {
      console.log(`No timeline styles found to update in: ${fileName}`);
    }
  } catch (error) {
    console.error(`Error updating file ${filePath}:`, error);
  }
}

async function main() {
  const projectsDir = '/Users/kevin/Desktop/WEBSITES/PORTFOLIO/portfolio/projects';
  
  // Get all HTML files in the projects directory
  const files = glob.sync(path.join(projectsDir, '*.html'));
  
  // Process each file
  for (const file of files) {
    await updateFile(file);
  }
  
  console.log('Timeline style update completed!');
}

main();