"use strict";

const fs = require('fs').promises;
const path = require('path');

// Project directories to process
const projectDirs = [
  'abra',
  'absorb_software',
  'aiga',
  'american_social',
  'amrop',
  'eyes_above',
  'finseca',
  'fiserv',
  'hum',
  'l3harris',
  'lifepoint_health',
  'lrei',
  'mn8_energy',
  'onity',
  'sylvamo',
  'thackway_mccord_pets',
  'tryitout_with_major_league_wiffleball'
];

// Project order for navigation
const projectOrder = [
  'absorb_software',
  'mn8_energy',
  'abra',
  'lifepoint_health',
  'onity',
  'eyes_above',
  'hum',
  'sylvamo',
  'american_social',
  'finseca',
  'lrei',
  'amrop',
  'aiga',
  'fiserv',
  'l3harris',
  'thackway_mccord_pets',
  'tryitout_with_major_league_wiffleball'
];

// Helper function to get next and previous projects
function getNavLinks(currentProject) {
  const currentIndex = projectOrder.indexOf(currentProject);
  
  if (currentIndex === -1) {
    return { prev: projectOrder[0], next: projectOrder[0] };
  }
  
  const prevIndex = currentIndex === 0 ? projectOrder.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === projectOrder.length - 1 ? 0 : currentIndex + 1;
  
  return {
    prev: projectOrder[prevIndex],
    next: projectOrder[nextIndex]
  };
}

// Read project template
async function readTemplate() {
  try {
    const templatePath = path.join(__dirname, 'project-template-unified.html');
    const template = await fs.readFile(templatePath, 'utf8');
    return template;
  } catch (error) {
    console.error('Error reading template:', error);
    throw error;
  }
}

// Process each project
async function processProject(projectDir, template) {
  try {
    // Read project info
    const infoPath = path.join(__dirname, 'projects', projectDir, 'info.md');
    const infoContent = await fs.readFile(infoPath, 'utf8');
    
    // Extract project details
    const projectTitle = infoContent.split('\n')[0].replace('# ', '');
    
    // Get description
    let projectDescription = '';
    if (infoContent.includes('Description:')) {
      projectDescription = infoContent.split('Description:')[1].split('\n')[0].trim();
    }
    
    // Get year
    let projectYear = '2024';
    const yearMatch = infoContent.match(/20\d\d/);
    if (yearMatch) {
      projectYear = yearMatch[0];
    }
    
    // Get client and role
    let projectClient = projectTitle;
    let projectRole = 'Design';
    
    if (infoContent.includes('Client:')) {
      projectClient = infoContent.split('Client:')[1].split('\n')[0].trim();
    }
    
    if (infoContent.includes('Role:')) {
      projectRole = infoContent.split('Role:')[1].split('\n')[0].trim();
    }
    
    // Extract content
    let projectContent = '';
    if (infoContent.includes('--- CONTENT ---')) {
      const contentSection = infoContent.split('--- CONTENT ---')[1].trim();
      const paragraphs = contentSection
        .split('\n\n')
        .filter(p => p.trim() && !p.includes('©2025') && !p.includes('grzejkakevin@gmail.com'))
        .map(p => `<p>${p.trim()}</p>`)
        .join('\n');
      
      if (paragraphs) {
        projectContent = paragraphs;
      } else {
        projectContent = '<p>More details coming soon.</p>';
      }
    } else {
      projectContent = '<p>More details coming soon.</p>';
    }
    
    // Get image path
    let projectImage = '';
    const imageFiles = await fs.readdir(path.join(__dirname, 'images'));
    
    // Try to find an image that matches the project name
    const projectImageFile = imageFiles.find(file => 
      file.toLowerCase().includes(projectDir.replace(/_/g, '').toLowerCase()) ||
      file.toLowerCase().includes(projectTitle.replace(/-/g, '').toLowerCase())
    );
    
    if (projectImageFile) {
      projectImage = `../images/${projectImageFile}`;
    } else {
      // Default image from the first image in the directory
      projectImage = `../images/${imageFiles[0]}`;
    }
    
    // Get navigation links
    const navLinks = getNavLinks(projectDir);
    
    // Fill template
    let projectHTML = template
      .replace(/{{PROJECT_TITLE}}/g, projectTitle)
      .replace(/{{PROJECT_DESCRIPTION}}/g, projectDescription)
      .replace(/{{PROJECT_YEAR}}/g, projectYear)
      .replace(/{{PROJECT_CLIENT}}/g, projectClient)
      .replace(/{{PROJECT_ROLE}}/g, projectRole)
      .replace(/{{PROJECT_CONTENT}}/g, projectContent)
      .replace(/{{PROJECT_IMAGE}}/g, projectImage)
      .replace(/{{PREV_PROJECT_LINK}}/g, `${navLinks.prev}.html`)
      .replace(/{{NEXT_PROJECT_LINK}}/g, `${navLinks.next}.html`);
    
    // Write to file
    const outputPath = path.join(__dirname, 'projects', `${projectDir}.html`);
    await fs.writeFile(outputPath, projectHTML);
    console.log(`Generated: ${outputPath}`);
    
  } catch (error) {
    console.error(`Error processing project ${projectDir}:`, error);
  }
}

// Main function
async function generateProjectPages() {
  try {
    console.log('Starting project page generation...');
    const template = await readTemplate();
    
    // Process each project
    for (const projectDir of projectDirs) {
      await processProject(projectDir, template);
    }
    
    console.log('All project pages generated successfully!');
  } catch (error) {
    console.error('Error generating project pages:', error);
  }
}

// Run the script
generateProjectPages();