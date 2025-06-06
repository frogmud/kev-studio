"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateHumTimelineStyles() {
  const projectPath = path.join(__dirname, 'portfolio', 'projects', 'hum.html');

  try {
    console.log(`Reading ${projectPath}...`);
    let htmlContent = await fs.readFile(projectPath, 'utf8');

    // Update the timeline styles to match the other project pages
    const updatedTimelineStyles = `
    <style>
        /* Timeline styles for project pages */
        .project-timeline {
            margin: var(--spacing-xl) 0;
            position: relative;
            padding-left: 50px;
        }

        .project-timeline::before {
            content: '';
            position: absolute;
            top: 8px;
            bottom: 0;
            left: 8px;
            width: 0.5px;
            background-color: #e2e8f0;
        }

        .timeline-item {
            position: relative;
            margin-bottom: var(--spacing-xl);
        }

        .timeline-item::before {
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
        }

        .timeline-item h3 {
            margin-top: 0;
            margin-bottom: var(--spacing-sm);
        }

        .timeline-item p {
            margin-bottom: var(--spacing-md);
        }
        
        .timeline-image {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: var(--spacing-md);
        }
        
        .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .image-grid img {
            margin-bottom: 0;
        }

        @media (max-width: 768px) {
            .project-timeline {
                padding-left: 36px;
            }

            .timeline-item::before {
                left: -32px;
            }
        }
    </style>`;

    // Replace the existing timeline styles
    htmlContent = htmlContent.replace(
      /<style>\s*\/\* Timeline styles for project pages \*\/[\s\S]*?@media \(max-width: 768px\) {[\s\S]*?}<\/style>/,
      updatedTimelineStyles
    );

    // Save the updated HTML back to the file
    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Successfully updated Hum timeline styles.');

  } catch (error) {
    console.error('Error updating timeline styles:', error);
  }
}

updateHumTimelineStyles();