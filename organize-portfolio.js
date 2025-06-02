"use strict"

const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "kev-studio-assets");
const outputDir = path.join(__dirname, "kev-portfolio-organized");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create images directory
const imagesDir = path.join(outputDir, "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create projects directory
const projectsDir = path.join(outputDir, "projects");
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// Helper function to read a file
function readFileIfExists(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return '';
  }
}

// Helper function to extract project descriptions
function extractProjectDescriptions(siteInfo) {
  const projects = {};
  const lines = siteInfo.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for project names followed by descriptions on the next line
    if (line && i < lines.length - 1) {
      const nextLine = lines[i + 1].trim();
      
      // Check if this is a project name (check against known project names)
      const projectDirs = fs.readdirSync(path.join(sourceDir, 'projects'))
        .filter(dir => dir !== 'index.md' && fs.statSync(path.join(sourceDir, 'projects', dir)).isDirectory());
      
      const matchingProject = projectDirs.find(dir => {
        const normalizedDirName = dir.toLowerCase().replace(/_/g, ' ');
        const normalizedLine = line.toLowerCase();
        return normalizedLine.includes(normalizedDirName) || normalizedDirName.includes(normalizedLine);
      });
      
      if (matchingProject && nextLine && !nextLine.includes('URL:')) {
        projects[matchingProject] = nextLine;
      }
    }
  }
  
  return projects;
}

// Main function to organize the portfolio
function organizePortfolio() {
  try {
    console.log(`Organizing portfolio content from ${sourceDir} to ${outputDir}...`);
    
    // Read site information
    const siteInfo = readFileIfExists(path.join(sourceDir, 'site_info.txt'));
    
    // Extract project descriptions
    const projectDescriptions = extractProjectDescriptions(siteInfo);
    
    // Copy all images to the images directory
    const imageFiles = fs.readdirSync(sourceDir)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext);
      });
    
    console.log(`Copying ${imageFiles.length} images to organized directory...`);
    
    imageFiles.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      // Remove the index prefix from filenames (e.g., "1_image.jpg" -> "image.jpg")
      const newFilename = file.replace(/^\d+_/, '');
      const destPath = path.join(imagesDir, newFilename);
      
      fs.copyFileSync(sourcePath, destPath);
    });
    
    // Organize project information
    const projectDirs = fs.readdirSync(path.join(sourceDir, 'projects'))
      .filter(dir => dir !== 'index.md' && fs.statSync(path.join(sourceDir, 'projects', dir)).isDirectory());
    
    console.log(`Organizing information for ${projectDirs.length} projects...`);
    
    // Create a project index markdown file
    let projectIndexMd = `# Kevin Grzejka Portfolio Projects\n\n`;
    
    projectDirs.forEach(projectDir => {
      // Read project info
      const projectInfoPath = path.join(sourceDir, 'projects', projectDir, 'info.md');
      let projectInfo = readFileIfExists(projectInfoPath);
      
      // Add description if available
      if (projectDescriptions[projectDir]) {
        projectInfo = projectInfo.replace('URL:', `Description: ${projectDescriptions[projectDir]}\nURL:`);
      }
      
      // Create project directory
      const outputProjectDir = path.join(projectsDir, projectDir);
      if (!fs.existsSync(outputProjectDir)) {
        fs.mkdirSync(outputProjectDir, { recursive: true });
      }
      
      // Save project info
      fs.writeFileSync(path.join(outputProjectDir, 'info.md'), projectInfo);
      
      // Extract project title and add to index
      const titleMatch = projectInfo.match(/# (.*)/);
      const title = titleMatch ? titleMatch[1] : projectDir.replace(/_/g, ' ');
      
      const description = projectDescriptions[projectDir] || '';
      
      projectIndexMd += `## ${title}\n`;
      if (description) {
        projectIndexMd += `${description}\n\n`;
      }
      projectIndexMd += `[View Project Details](./projects/${projectDir}/info.md)\n\n`;
    });
    
    // Save project index
    fs.writeFileSync(path.join(outputDir, 'projects.md'), projectIndexMd);
    
    // Create a main README file
    const readme = `# Kevin Grzejka Portfolio

## About

${siteInfo.split('\n').slice(2, 5).join('\n')}

## Projects

This portfolio contains ${projectDirs.length} projects and ${imageFiles.length} images downloaded from kev.studio.

[View All Projects](./projects.md)

## Directory Structure

- \`images/\` - All portfolio images
- \`projects/\` - Information organized by project
- \`projects.md\` - Project index

## Contact

grzejkakevin@gmail.com

---

Portfolio assets downloaded on ${new Date().toLocaleDateString()}
`;
    
    fs.writeFileSync(path.join(outputDir, 'README.md'), readme);
    
    console.log(`Portfolio organization complete! Content available at: ${outputDir}`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Run the organizer
organizePortfolio();