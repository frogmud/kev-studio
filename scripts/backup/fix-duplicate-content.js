#!/usr/bin/env node
"use strict";

const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Directory containing project HTML files
const PROJECTS_DIR = path.join(__dirname, 'portfolio', 'projects');

// Function to get all HTML files in the projects directory
async function getProjectFiles() {
  try {
    const files = await fs.readdir(PROJECTS_DIR);
    return files.filter(file => file.endsWith('.html'));
  } catch (error) {
    console.error('Error reading project directory:', error);
    return [];
  }
}

// Function to fix duplicate content in a file
async function fixDuplicateContent(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let modified = false;
    
    // Pattern 1: <p>word\n\n - Duplicated heading in paragraph text
    const pattern1 = /<p>([a-z][a-z\s]*)\n\n/g;
    const matches1 = content.match(pattern1);
    
    if (matches1 && matches1.length > 0) {
      // Replace the pattern with just the paragraph opening tag
      content = content.replace(pattern1, '<p>');
      modified = true;
      console.log(`Fixed ${matches1.length} heading-in-paragraph duplication(s) in ${path.basename(filePath)}`);
    }

    // Pattern 2: <p>credits\n\n - Credits duplication in agency section
    const creditsPattern = /<p>credits\n\n/g;
    if (content.match(creditsPattern)) {
      // Replace with appropriate formatting
      content = content.replace(creditsPattern, '<p>');
      modified = true;
      console.log(`Fixed credits duplication in ${path.basename(filePath)}`);
    }
    
    // Pattern 3: Duplicate paragraphs (common in L3Harris)
    if (filePath.includes('l3harris')) {
      const paragraphDupe = content.match(/<p>In 2018, L3 Technologies and Harris Corporation merged[^<]*<\/p>\s*<p>In 2018, L3 Technologies and Harris Corporation merged[^<]*<\/p>/);
      if (paragraphDupe) {
        content = content.replace(paragraphDupe[0], paragraphDupe[0].split('</p>')[0] + '</p>');
        modified = true;
        console.log(`Fixed duplicate paragraph in ${path.basename(filePath)}`);
      }
    }
    
    // If modifications were made, write the file back
    if (modified) {
      await fs.writeFile(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error);
    return false;
  }
}

// Main function to fix all project files
async function main() {
  try {
    const files = await getProjectFiles();
    
    console.log(`Found ${files.length} project HTML files to check.`);
    
    let fixedFiles = 0;
    let modifiedFiles = [];
    
    for (const file of files) {
      const filePath = path.join(PROJECTS_DIR, file);
      const wasFixed = await fixDuplicateContent(filePath);
      
      if (wasFixed) {
        fixedFiles++;
        modifiedFiles.push(file);
      }
    }
    
    console.log('\nSummary:');
    console.log(`- Checked ${files.length} HTML files`);
    console.log(`- Fixed duplication issues in ${fixedFiles} files`);
    
    if (modifiedFiles.length > 0) {
      console.log('\nModified files:');
      modifiedFiles.forEach(file => console.log(`- ${file}`));
    }
    
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

main();