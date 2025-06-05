"use strict";

const fs = require('fs');
const path = require('path');

// Paths
const sourceResumePath = path.join(__dirname, '..', 'all_images_backup', 'kevin-grzejka-resume-062025.pdf');
const destinationPath = path.join(__dirname, '..', 'portfolio', 'files');
const destinationResumePath = path.join(destinationPath, 'kevin-grzejka-resume-062025.pdf');

// Make sure the destination directory exists
if (!fs.existsSync(destinationPath)) {
  fs.mkdirSync(destinationPath, { recursive: true });
  console.log(`Created directory: ${destinationPath}`);
}

// Copy the resume file
try {
  fs.copyFileSync(sourceResumePath, destinationResumePath);
  console.log(`Successfully copied resume to: ${destinationResumePath}`);
} catch (error) {
  console.error(`Error copying resume file: ${error.message}`);
}

// Update the resume.html file
const resumeHtmlPath = path.join(__dirname, '..', 'portfolio', 'resume.html');
let resumeHtml;

try {
  resumeHtml = fs.readFileSync(resumeHtmlPath, 'utf8');

  // Check for existing path patterns and replace with the correct path
  const patterns = [
    /href="[^"]*kevin-grzejka-resume[^"]*\.pdf"/i,
    /href="\.\.\/all_images_backup\/kevin-grzejka-resume[^"]*\.pdf"/i,
    /href="files\/kevin-grzejka-resume[^"]*\.pdf"/i
  ];

  let foundMatch = false;
  let updatedHtml = resumeHtml;

  for (const pattern of patterns) {
    if (pattern.test(resumeHtml)) {
      updatedHtml = resumeHtml.replace(pattern, 'href="files/kevin-grzejka-resume-062025.pdf"');
      foundMatch = true;
      break;
    }
  }

  // Also check for Instagram handle and update if needed
  if (updatedHtml.includes('@k_gosh')) {
    updatedHtml = updatedHtml.replace(/@k_gosh/g, '@kevingrz');
    console.log('Updated Instagram handle from @k_gosh to @kevingrz');
  }

  if (foundMatch) {
    fs.writeFileSync(resumeHtmlPath, updatedHtml);
    console.log(`Updated resume.html with correct PDF path`);
  } else {
    console.log('No path patterns matched in resume.html. Check the HTML structure.');
  }

} catch (error) {
  console.error(`Error updating resume.html: ${error.message}`);
}

console.log('Resume update completed');