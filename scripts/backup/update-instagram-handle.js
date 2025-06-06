"use strict";

const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function findFilesWithPattern(pattern) {
  try {
    const { stdout } = await exec(`grep -l "${pattern}" --include="*.html" -r ./portfolio/`);
    return stdout.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error finding files:', error.message);
    return [];
  }
}

async function replaceInFile(filePath, oldText, newText) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Replace the Instagram handle in the footer social link section
    const updatedContent = content.replace(
      new RegExp(`<a href="https://instagram.com/${oldText}" class="footer-link social-link">([\\s\\S]*?)${oldText}`, 'g'),
      `<a href="https://instagram.com/${newText}" class="footer-link social-link">$1${newText}`
    );
    
    if (content !== updatedContent) {
      await fs.writeFile(filePath, updatedContent, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  const oldHandle = 'k_gosh';
  const newHandle = 'kevingrz';
  
  console.log(`Searching for files containing "@${oldHandle}"...`);
  const files = await findFilesWithPattern(`@${oldHandle}`);
  
  if (files.length === 0) {
    console.log('No files found containing the Instagram handle.');
    return;
  }
  
  console.log(`Found ${files.length} files to update.`);
  
  let updatedCount = 0;
  for (const file of files) {
    const wasUpdated = await replaceInFile(file, oldHandle, newHandle);
    if (wasUpdated) {
      updatedCount++;
      console.log(`Updated: ${file}`);
    }
  }
  
  console.log(`\nCompleted! Updated ${updatedCount} of ${files.length} files.`);
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});