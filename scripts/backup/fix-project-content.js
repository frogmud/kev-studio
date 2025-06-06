"use strict";

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Function to update all project content
async function updateAllProjects() {
  try {
    // Get a list of all HTML files in the projects directory
    const projectsPath = path.join(__dirname, 'portfolio', 'projects');
    const files = await fs.readdir(projectsPath);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    // Process each project
    for (const htmlFile of htmlFiles) {
      const projectId = htmlFile.replace('.html', '');
      console.log(`\n--- Processing ${projectId} ---`);
      
      // Update metadata and generate timeline script
      try {
        execSync(`node fix-metadata-issues.js ${projectId}`, { stdio: 'inherit' });
        
        // Check if the timeline script was created and run it
        const timelineScriptPath = path.join(__dirname, `fix-${projectId}-timeline.js`);
        try {
          await fs.access(timelineScriptPath);
          console.log(`Running timeline script for ${projectId}...`);
          execSync(`node fix-${projectId}-timeline.js`, { stdio: 'inherit' });
        } catch (e) {
          console.log(`No timeline script found for ${projectId}, skipping timeline update.`);
        }
      } catch (error) {
        console.error(`Error processing ${projectId}:`, error.message);
      }
    }
    
    console.log('\nAll projects processed!');
  } catch (error) {
    console.error('Error updating all projects:', error);
  }
}

// Process a specific project
async function updateSingleProject(projectId) {
  console.log(`\n--- Processing ${projectId} ---`);
  
  // Update metadata and generate timeline script
  try {
    execSync(`node fix-metadata-issues.js ${projectId}`, { stdio: 'inherit' });
    
    // Check if the timeline script was created and run it
    const timelineScriptPath = path.join(__dirname, `fix-${projectId}-timeline.js`);
    try {
      await fs.access(timelineScriptPath);
      console.log(`Running timeline script for ${projectId}...`);
      execSync(`node fix-${projectId}-timeline.js`, { stdio: 'inherit' });
    } catch (e) {
      console.log(`No timeline script found for ${projectId}, skipping timeline update.`);
    }
  } catch (error) {
    console.error(`Error processing ${projectId}:`, error.message);
  }
}

// Main function
async function main() {
  try {
    if (process.argv.length < 3) {
      console.error('Please provide a project ID or "all" to process all projects');
      console.error('Usage: node fix-project-content.js [projectId|all]');
      process.exit(1);
    }
    
    const arg = process.argv[2];
    
    if (arg === 'all') {
      await updateAllProjects();
    } else {
      await updateSingleProject(arg);
    }
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the script
main();