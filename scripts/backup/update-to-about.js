"use strict";

const fs = require('fs').promises;
const path = require('path');

/**
 * Update lets-work-together.html to about.html across the site
 */
async function updateToAbout() {
  console.log('Starting update from lets-work-together.html to about.html...');

  try {
    // Create about.html from lets-work-together.html
    const letsWorkPath = path.join(__dirname, 'portfolio', 'lets-work-together.html');
    const aboutPath = path.join(__dirname, 'portfolio', 'about.html');
    
    console.log('Reading lets-work-together.html...');
    const letsWorkContent = await fs.readFile(letsWorkPath, 'utf8');
    
    // Update title and metadata
    let aboutContent = letsWorkContent.replace(
      /<meta property="og:url" content="https:\/\/kevingrzejka\.com\/lets-work-together\.html">/g,
      '<meta property="og:url" content="https://kevingrzejka.com/about.html">'
    );
    
    console.log('Creating about.html...');
    await fs.writeFile(aboutPath, aboutContent, 'utf8');
    
    // Don't remove the original yet until fully testing the changes
    // Update files that reference lets-work-together.html
    
    // 1. Update index.html
    const indexPath = path.join(__dirname, 'portfolio', 'index.html');
    let indexContent = await fs.readFile(indexPath, 'utf8');
    
    indexContent = indexContent.replace(
      /href="lets-work-together.html"/g,
      'href="about.html"'
    );
    
    await fs.writeFile(indexPath, indexContent, 'utf8');
    console.log('Updated index.html');
    
    // 2. Update all project files
    const projectsDir = path.join(__dirname, 'portfolio', 'projects');
    const projectFiles = await fs.readdir(projectsDir);
    
    for (const file of projectFiles) {
      if (file.endsWith('.html')) {
        const projectPath = path.join(projectsDir, file);
        let projectContent = await fs.readFile(projectPath, 'utf8');
        
        projectContent = projectContent.replace(
          /href="\.\.\/lets-work-together\.html"/g,
          'href="../about.html"'
        );
        
        await fs.writeFile(projectPath, projectContent, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
    
    // 3. Update redirect files
    const contactPath = path.join(__dirname, 'portfolio', 'contact.html');
    const resumePath = path.join(__dirname, 'portfolio', 'resume.html');
    
    let contactContent = await fs.readFile(contactPath, 'utf8');
    let resumeContent = await fs.readFile(resumePath, 'utf8');
    
    contactContent = contactContent.replace(
      /url=lets-work-together\.html/g,
      'url=about.html'
    ).replace(
      /href="lets-work-together\.html"/g,
      'href="about.html"'
    );
    
    resumeContent = resumeContent.replace(
      /url=lets-work-together\.html/g,
      'url=about.html'
    ).replace(
      /href="lets-work-together\.html"/g,
      'href="about.html"'
    );
    
    await fs.writeFile(contactPath, contactContent, 'utf8');
    await fs.writeFile(resumePath, resumeContent, 'utf8');
    console.log('Updated redirect pages');
    
    console.log('Update completed successfully\!');
    console.log('IMPORTANT: After testing, you should remove lets-work-together.html and create a redirect from that file to about.html');
  } catch (error) {
    console.error('Error updating to about.html:', error);
  }
}

// Execute the function
updateToAbout();
EOF < /dev/null
