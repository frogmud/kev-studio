"use strict";

const fs = require('fs').promises;
const path = require('path');

/**
 * Update navigation in HTML files to use "Work" and "About" consistently
 */
async function updateNavigation() {
  console.log('Starting navigation update...');

  try {
    // Update index.html - if there's main navigation in the header
    const indexPath = path.join(__dirname, 'portfolio', 'index.html');
    let indexContent = await fs.readFile(indexPath, 'utf8');
    
    // Update any navigation components
    // The index page doesn't seem to have text navigation links in the top nav, 
    // but we'll update the footer link
    indexContent = indexContent.replace(
      /<a href="lets-work-together.html" class="footer-link">/g,
      '<a href="about.html" class="footer-link">'
    );
    
    await fs.writeFile(indexPath, indexContent, 'utf8');
    console.log('Updated index.html');

    // Update lets-work-together.html to about.html and update its content
    const aboutPath = path.join(__dirname, 'portfolio', 'lets-work-together.html');
    const newAboutPath = path.join(__dirname, 'portfolio', 'about.html');
    
    let aboutContent = await fs.readFile(aboutPath, 'utf8');
    
    // Update data-filter values and internal navigation logic
    aboutContent = aboutContent.replace(
      /data-filter="lets-work"/g,
      'data-filter="about"'
    );
    
    // Update navigation JavaScript
    aboutContent = aboutContent.replace(
      /else if \(filter === 'lets-work'\) {/g,
      'else if (filter === \'about\') {'
    );
    
    aboutContent = aboutContent.replace(
      /window\.location\.href = '\.\.\/lets-work-together\.html';/g,
      'window.location.href = \'../about.html\';'
    );
    
    aboutContent = aboutContent.replace(
      /window\.location\.href = 'lets-work-together\.html';/g,
      'window.location.href = \'about.html\';'
    );

    // Save as the new about.html file
    await fs.writeFile(newAboutPath, aboutContent, 'utf8');
    console.log('Created about.html from lets-work-together.html');

    // Update all project pages
    const projectsDir = path.join(__dirname, 'portfolio', 'projects');
    const projectFiles = await fs.readdir(projectsDir);
    
    for (const file of projectFiles) {
      if (file.endsWith('.html')) {
        const projectPath = path.join(projectsDir, file);
        let projectContent = await fs.readFile(projectPath, 'utf8');
        
        // Update navigation data-filter values 
        projectContent = projectContent.replace(
          /data-filter="lets-work"/g, 
          'data-filter="about"'
        );
        
        // Update link references in navigation JS
        projectContent = projectContent.replace(
          /else if \(filter === 'lets-work'\) {/g,
          'else if (filter === \'about\') {'
        );
        
        projectContent = projectContent.replace(
          /window\.location\.href = '\.\.\/lets-work-together\.html';/g,
          'window.location.href = \'../about.html\';'
        );
        
        // Update footer links
        projectContent = projectContent.replace(
          /<a href="\.\.\/lets-work-together\.html" class="footer-link">/g,
          '<a href="../about.html" class="footer-link">'
        );
        
        await fs.writeFile(projectPath, projectContent, 'utf8');
        console.log(`Updated ${file}`);
      }
    }

    // Update redirect pages (contact.html and resume.html)
    const contactPath = path.join(__dirname, 'portfolio', 'contact.html');
    const resumePath = path.join(__dirname, 'portfolio', 'resume.html');
    
    let contactContent = await fs.readFile(contactPath, 'utf8');
    let resumeContent = await fs.readFile(resumePath, 'utf8');
    
    // Update redirects
    contactContent = contactContent.replace(
      /url=lets-work-together\.html/g,
      'url=about.html'
    );
    
    contactContent = contactContent.replace(
      /href="lets-work-together\.html"/g,
      'href="about.html"'
    );
    
    resumeContent = resumeContent.replace(
      /url=lets-work-together\.html/g,
      'url=about.html'
    );
    
    resumeContent = resumeContent.replace(
      /href="lets-work-together\.html"/g,
      'href="about.html"'
    );
    
    await fs.writeFile(contactPath, contactContent, 'utf8');
    await fs.writeFile(resumePath, resumeContent, 'utf8');
    console.log('Updated redirect pages');

    console.log('Navigation update completed successfully!');
  } catch (error) {
    console.error('Error updating navigation:', error);
  }
}

// Run the update function
updateNavigation();