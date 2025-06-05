"use strict";

const fs = require('fs').promises;
const path = require('path');

const sourceDir = '/Users/kevin/Desktop/WEBSITES/PORTFOLIO/all_images_backup/_to_sort';
const targetBaseDir = '/Users/kevin/Desktop/WEBSITES/PORTFOLIO/portfolio/videos';

// Define project prefixes and their corresponding directories
const projectMap = {
  'L3Harris': 'l3harris',
  'Sylvamo': 'sylvamo',
  'TM': 'tm',
  'Abra': 'abra',
  'Lifepoint': 'lifepoint',
  'EyesAbove': 'eyes_above'
};

async function organizeVideos() {
  try {
    // Get list of all files in the source directory
    const files = await fs.readdir(sourceDir);
    
    // Filter for MP4 files only
    const videoFiles = files.filter(file => file.toLowerCase().endsWith('.mp4'));
    
    console.log(`Found ${videoFiles.length} MP4 files to organize`);
    
    for (const videoFile of videoFiles) {
      // Determine which project this file belongs to
      const project = determineProject(videoFile);
      
      if (project) {
        const sourcePath = path.join(sourceDir, videoFile);
        const destPath = path.join(targetBaseDir, project, videoFile);
        
        console.log(`Copying ${videoFile} to ${project} folder...`);
        
        // Copy the file to the appropriate destination
        await fs.copyFile(sourcePath, destPath);
        console.log(`✓ Successfully copied ${videoFile}`);
      } else {
        console.log(`! Could not determine project for: ${videoFile}`);
      }
    }
    
    console.log('Video organization complete!');
  } catch (error) {
    console.error('Error organizing videos:', error);
  }
}

function determineProject(filename) {
  // Check each project prefix
  for (const [projectName, dirName] of Object.entries(projectMap)) {
    if (filename.includes(projectName)) {
      return dirName;
    }
  }
  
  // Special case for Eyes Above
  if (filename.includes('EyesAbove')) {
    return 'eyes_above';
  }
  
  return null;
}

// Run the organization function
organizeVideos();