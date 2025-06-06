"use strict";

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

// First, copy SVG files to the portfolio directory
async function copySvgFiles() {
  try {
    // Create images directory if it doesn't exist
    await fs.mkdir(path.join(__dirname, 'portfolio', 'images'), { recursive: true });
    
    // Copy black SVG
    const blackSvg = await fs.readFile(path.join(__dirname, 'all_images_backup', 'kpfp-black.svg'), 'utf8');
    await fs.writeFile(path.join(__dirname, 'portfolio', 'images', 'kpfp-black.svg'), blackSvg);
    
    // Copy white SVG
    const whiteSvg = await fs.readFile(path.join(__dirname, 'all_images_backup', 'kpfp-white.svg'), 'utf8');
    await fs.writeFile(path.join(__dirname, 'portfolio', 'images', 'kpfp-white.svg'), whiteSvg);
    
    console.log('SVG files copied successfully');
  } catch (err) {
    console.error('Error copying SVG files:', err);
  }
}

// Update navigation in HTML files
async function updateNavigation() {
  // Define the pattern to match HTML files
  const pattern = 'portfolio/**/*.html';
  
  // Get all HTML files
  const files = glob.sync(pattern);
  
  let updatedCount = 0;
  
  for (const filePath of files) {
    try {
      let content = await fs.readFile(filePath, 'utf8');
      
      // Check if this is a main page or a project page
      const isProjectPage = filePath.includes('/projects/');
      
      // Create proper paths based on file location
      const imagesPath = isProjectPage ? '../images' : 'images';
      const indexPath = isProjectPage ? '../index.html' : 'index.html';
      
      // Define the regex patterns to match the navigation logo section
      // Pattern for main pages (with span)
      const mainNavLogoRegex = /<div class="sticky-nav-logo">\s*<span>Kevin Grzejka<\/span>\s*<\/div>/g;
      
      // Pattern for project pages (with a tag)
      const projectNavLogoRegex = /<div class="sticky-nav-logo">\s*<a href="\.\.\/index\.html">Kevin Grzejka<\/a>\s*<\/div>/g;
      
      // Create replacement with SVG logo that switches based on theme
      const mainSvgLogoHtml = `<div class="sticky-nav-logo">
                <a href="${indexPath}" class="logo-link">
                    <img src="${imagesPath}/kpfp-black.svg" alt="Kevin Grzejka" class="logo light-logo" width="40" height="40">
                    <img src="${imagesPath}/kpfp-white.svg" alt="Kevin Grzejka" class="logo dark-logo" width="40" height="40">
                </a>
            </div>`;
      
      // Check if the file contains any of the navigation patterns
      if (mainNavLogoRegex.test(content)) {
        // Replace the navigation logo with SVG
        content = content.replace(mainNavLogoRegex, mainSvgLogoHtml);
        
        // Write the updated content back to the file
        await fs.writeFile(filePath, content, 'utf8');
        
        updatedCount++;
        console.log(`Updated ${filePath} (main nav pattern)`);
      } else if (projectNavLogoRegex.test(content)) {
        // Replace the navigation logo with SVG
        content = content.replace(projectNavLogoRegex, mainSvgLogoHtml);
        
        // Write the updated content back to the file
        await fs.writeFile(filePath, content, 'utf8');
        
        updatedCount++;
        console.log(`Updated ${filePath} (project nav pattern)`);
      }
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err);
    }
  }
  
  console.log(`Updated ${updatedCount} files`);
}

// Update CSS to handle the logo display based on theme
async function updateCSS() {
  try {
    const cssPath = path.join(__dirname, 'portfolio', 'styles.css');
    let cssContent = await fs.readFile(cssPath, 'utf8');
    
    // Check if logo CSS already exists
    if (cssContent.includes('/* Logo styles for light/dark mode */')) {
      console.log('CSS already contains logo styles');
      return;
    }
    
    // Add CSS for logo display based on theme
    const logoCSS = `
/* Logo styles for light/dark mode */
.sticky-nav-logo .logo {
  display: block;
  width: 40px;
  height: 40px;
}

.logo-link {
  display: block;
  text-decoration: none;
}

/* Show/hide logos based on theme */
.dark-logo {
  display: none;
}

.light-logo {
  display: block;
}

[data-theme="dark"] .dark-logo {
  display: block;
}

[data-theme="dark"] .light-logo {
  display: none;
}
`;
    
    // Append the logo CSS to the end of the file
    cssContent += logoCSS;
    
    // Write the updated CSS back to the file
    await fs.writeFile(cssPath, cssContent, 'utf8');
    
    console.log('CSS updated successfully');
  } catch (err) {
    console.error('Error updating CSS:', err);
  }
}

// Main function to run all tasks
async function main() {
  try {
    await copySvgFiles();
    await updateNavigation();
    await updateCSS();
    console.log('Navigation update completed successfully');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the main function
main();