"use strict";

const fs = require('fs').promises;
const path = require('path');

// Function to update a specific project page
async function updateProjectPage(projectId, markdownContent) {
  try {
    console.log(`Updating project page for: ${projectId}`);
    
    // Parse the markdown content
    const metadata = {};
    let tagline = '';
    let mainContent = '';
    
    // Extract metadata
    const metadataSection = markdownContent.match(/## Metadata\s+([\s\S]*?)(?=##|$)/);
    if (metadataSection && metadataSection[1]) {
      const metadataLines = metadataSection[1].trim().split('\n');
      metadataLines.forEach(line => {
        const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
        if (match) {
          metadata[match[1].toLowerCase()] = match[2].trim();
        }
      });
    }
    
    // Extract tagline
    const taglineSection = markdownContent.match(/## Tagline\s+([\s\S]*?)(?=##|$)/);
    if (taglineSection && taglineSection[1]) {
      tagline = taglineSection[1].trim();
    }
    
    // Extract main content
    const mainContentSection = markdownContent.match(/## Main Content\s+([\s\S]*?)(?=##|$)/);
    if (mainContentSection && mainContentSection[1]) {
      mainContent = mainContentSection[1].trim();
    }
    
    // Read the HTML file
    const htmlPath = path.join(__dirname, 'portfolio', 'projects', `${projectId}.html`);
    let htmlContent = await fs.readFile(htmlPath, 'utf8');
    
    // Update metadata in HTML
    if (metadata.year) {
      htmlContent = htmlContent.replace(
        /<div class="metadata-item">\s*<h3>Year<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
        `<div class="metadata-item">\n                        <h3>Year</h3>\n                        <p>${metadata.year}</p>\n                    </div>`
      );
    }
    
    if (metadata.client) {
      htmlContent = htmlContent.replace(
        /<div class="metadata-item">\s*<h3>Client<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
        `<div class="metadata-item">\n                        <h3>Client</h3>\n                        <p>${metadata.client}</p>\n                    </div>`
      );
    }
    
    if (metadata.role) {
      htmlContent = htmlContent.replace(
        /<div class="metadata-item">\s*<h3>Role<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
        `<div class="metadata-item">\n                        <h3>Role</h3>\n                        <p>${metadata.role}</p>\n                    </div>`
      );
    }
    
    if (metadata.agency) {
      htmlContent = htmlContent.replace(
        /<div class="metadata-item">\s*<h3>Agency<\/h3>\s*<p>.*?<\/p>\s*<\/div>/s,
        `<div class="metadata-item">\n                        <h3>Agency</h3>\n                        <p>${metadata.agency}</p>\n                    </div>`
      );
    }
    
    // Update tagline
    if (tagline) {
      htmlContent = htmlContent.replace(
        /<p class="tagline">.*?<\/p>/s,
        `<p class="tagline">${tagline}</p>`
      );
    }
    
    // Update main content
    if (mainContent) {
      // Convert markdown paragraphs to HTML paragraphs
      const contentHTML = mainContent
        .split('\n\n')
        .filter(p => p.trim())
        .map(p => `<p>${p.trim()}</p>`)
        .join('\n                ');
      
      htmlContent = htmlContent.replace(
        /<div class="project-description">\s*<p>.*?<\/p>/s,
        `<div class="project-description">\n                ${contentHTML}`
      );
    }
    
    // Write the updated HTML back to the file
    await fs.writeFile(htmlPath, htmlContent);
    console.log(`Successfully updated metadata and main content for: ${projectId}`);
    return true;
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    return false;
  }
}

// Function to update timeline items - will be implemented separately for each project
async function updateProjectTimeline(projectId, markdownContent) {
  try {
    console.log(`Creating timeline update script for: ${projectId}`);
    
    // Extract timeline items with an improved approach
    const timelineSection = markdownContent.match(/## Timeline\s+([\s\S]*?)(?=##|$|$)/);
    if (!timelineSection || !timelineSection[1]) {
      console.log(`No timeline found for ${projectId}`);
      return false;
    }
    
    const timelineText = timelineSection[1];
    const lines = timelineText.split('\n');
    
    const timelineItems = [];
    let currentTitle = null;
    let currentDescription = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('### ')) {
        // If we were building a previous item, add it to our list
        if (currentTitle) {
          timelineItems.push({
            title: currentTitle,
            description: currentDescription.join('\n').trim()
          });
        }
        
        // Start new item
        currentTitle = line.replace('### ', '').trim();
        currentDescription = [];
      } else if (line && currentTitle) {
        currentDescription.push(line);
      }
    }
    
    // Add the last item
    if (currentTitle && currentDescription.length > 0) {
      timelineItems.push({
        title: currentTitle,
        description: currentDescription.join('\n').trim()
      });
    }
    
    console.log(`Found ${timelineItems.length} timeline items`);
    
    // Generate a script file to update this project's timeline
    let scriptContent = `"use strict";

const fs = require('fs').promises;
const path = require('path');

async function update${projectId.charAt(0).toUpperCase() + projectId.slice(1).replace(/_/g, '')}Timeline() {
  try {
    console.log('Updating ${projectId} timeline...');
    
    const htmlPath = path.join(__dirname, 'portfolio', 'projects', '${projectId}.html');
    let htmlContent = await fs.readFile(htmlPath, 'utf8');

    // Manual timeline updates - directly updating each section
`;

    // Add replacements for each timeline item
    for (const item of timelineItems) {
      const escapedTitle = item.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const escapedDescription = item.description.replace(/\$/g, '\\$');
      
      scriptContent += `
    // ${item.title}
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\\s*<h3>${escapedTitle}<\\/h3>\\s*<p>.*?<\\/p>/s,
      \`<div class="timeline-item">\\n                        <h3>${escapedTitle}</h3>\\n                        <p>${escapedDescription}</p>\`
    );
`;
    }

    scriptContent += `
    // Write the updated HTML back to the file
    await fs.writeFile(htmlPath, htmlContent);
    console.log('Successfully updated ${projectId} timeline');
  } catch (error) {
    console.error('Error updating ${projectId} timeline:', error);
  }
}

// Run the script
update${projectId.charAt(0).toUpperCase() + projectId.slice(1).replace(/_/g, '')}Timeline();`;

    const scriptPath = path.join(__dirname, `fix-${projectId}-timeline.js`);
    await fs.writeFile(scriptPath, scriptContent);
    
    console.log(`Created timeline update script at: ${scriptPath}`);
    return true;
  } catch (error) {
    console.error(`Error creating timeline script for ${projectId}:`, error);
    return false;
  }
}

// Process the given project from markdown
async function processProject(projectId, markdownContent) {
  const metadataUpdated = await updateProjectPage(projectId, markdownContent);
  const timelineScriptCreated = await updateProjectTimeline(projectId, markdownContent);
  
  if (metadataUpdated && timelineScriptCreated) {
    console.log(`Project ${projectId} processing complete. Run the timeline script to update timeline.`);
  }
}

// Main function to extract project content and process it
async function main() {
  try {
    if (process.argv.length < 3) {
      console.error('Please provide a project ID (e.g., node fix-metadata-issues.js abra)');
      process.exit(1);
    }
    
    const projectId = process.argv[2];
    
    // Read the full markdown content
    const markdownPath = path.join(__dirname, 'content-export', 'all-portfolio-content-edited.md');
    const markdownContent = await fs.readFile(markdownPath, 'utf8');
    
    // Find the specific project content
    const projectStartRegex = new RegExp(`# ${projectId}\\.html`, 'i');
    const contentSections = markdownContent.split(/^---$/m);
    
    let projectContent = '';
    for (const section of contentSections) {
      if (section.match(projectStartRegex)) {
        projectContent = section.trim();
        break;
      }
    }
    
    if (!projectContent) {
      console.error(`Could not find content for project: ${projectId}`);
      process.exit(1);
    }
    
    // Process the project
    await processProject(projectId, projectContent);
    
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the script
main();