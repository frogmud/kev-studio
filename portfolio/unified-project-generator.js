"use strict";

const fs = require('fs').promises;
const path = require('path');

// Main function
async function generateUnifiedProjectPages() {
  try {
    console.log('Starting unified project page generation...');
    
    // Load taxonomy data
    const taxonomyPath = path.join(__dirname, 'data', 'taxonomy.json');
    const taxonomyData = JSON.parse(await fs.readFile(taxonomyPath, 'utf8'));
    
    // Read template
    const templatePath = path.join(__dirname, 'project-template-unified.html');
    const template = await fs.readFile(templatePath, 'utf8');
    
    // Generate categories HTML for navigation
    const categoriesHtml = taxonomyData.categories
      .map(cat => `<li class="filter-category" data-filter="${cat.id}" data-filter-type="category">${cat.name}</li>`)
      .join('\n');
      
    // Add tag categories 
    const tagsHtml = taxonomyData.tags
      .map(tag => `<li class="filter-category" data-filter="${tag.id}" data-filter-type="tag">${tag.name}</li>`)
      .join('\n');
    
    const filterCategoriesHtml = categoriesHtml + '\n' + tagsHtml;
    
    // Process each project
    for (const projectData of taxonomyData.projects) {
      try {
        // Skip if no project directory exists
        const projectDirPath = path.join(__dirname, 'projects', projectData.id);
        try {
          await fs.access(projectDirPath);
        } catch (error) {
          console.log(`Skipping ${projectData.id}: Directory not found`);
          continue;
        }
        
        // Read project info file if it exists
        const infoPath = path.join(projectDirPath, 'info.md');
        let infoContent;
        try {
          infoContent = await fs.readFile(infoPath, 'utf8');
        } catch (error) {
          infoContent = `# ${projectData.title}\n\nDescription: ${projectData.title}\n\nClient: ${projectData.title}\n\nRole: Design\n\nYear: 2025`;
        }
        
        // Extract project details
        const projectTitle = projectData.title || infoContent.split('\n')[0].replace('# ', '');
        
        // Get description
        let projectDescription = '';
        if (infoContent.includes('Description:')) {
          projectDescription = infoContent.split('Description:')[1].split('\n')[0].trim();
        }
        
        // Get year
        let projectYear = '2025';
        const yearMatch = infoContent.match(/Year:\s*(20\d\d)/);
        if (yearMatch) {
          projectYear = yearMatch[1];
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
        
        // Extract timeline if it exists
        let projectTimeline = '';
        if (infoContent.includes('--- TIMELINE ---')) {
          const timelineSection = infoContent.split('--- TIMELINE ---')[1].trim();
          const timelineItems = timelineSection
            .split('\n\n')
            .filter(item => item.trim())
            .map(item => {
              const lines = item.split('\n');
              const title = lines[0].replace('### ', '');
              const description = lines.slice(1).join('\n').trim();
              return `<div class="timeline-item">
                <h3>${title}</h3>
                <p>${description}</p>
              </div>`;
            })
            .join('\n');
          
          if (timelineItems) {
            projectTimeline = timelineItems;
          }
        }
        
        // Get project tags
        const projectTagsHtml = projectData.tags && projectData.tags.length > 0 
          ? projectData.tags.map(tag => {
              const tagObj = taxonomyData.tags.find(t => t.id === tag);
              const tagName = tagObj ? tagObj.name : tag;
              return `<span class="project-tag" data-tag="${tag}" onclick="window.location.href='../index.html?filter=${tag}&filterType=tag'">${tagName}</span>`;
            }).join('\n')
          : '';
        
        // Get image path
        let projectImage = '';
        
        // Map specific projects to their optimized images
        const imageMap = {
          'absorb_software': '../images/optimized/02-absorb-guidelines-wide-blue.png',
          'mn8_energy': '../images/optimized/10a-mn8-laptop-4x3-white.png',
          'l3harris': '../images/optimized/l3h-sign-cover-4x3.jpg',
          'lifepoint_health': '../images/optimized/Lifepoint_HQSign.png',
          'amrop': '../images/optimized/amrop_logo_rgb.svg',
          'thackway_mccord_pets': '../images/optimized/chocolate-hero-v2.jpg',
        };
        
        // Check if we have a mapped image for this project
        if (imageMap[projectData.id]) {
          projectImage = imageMap[projectData.id];
        } else {
          // Check optimized images folder first
          try {
            const optimizedImageFiles = await fs.readdir(path.join(__dirname, 'images', 'optimized'));
            
            // Try to find an optimized image that matches the project name
            const optimizedImageFile = optimizedImageFiles.find(file => 
              file.toLowerCase().includes(projectData.id.replace(/_/g, '').toLowerCase()) ||
              file.toLowerCase().includes(projectTitle.replace(/-/g, '').toLowerCase())
            );
            
            if (optimizedImageFile) {
              projectImage = `../images/optimized/${optimizedImageFile}`;
            }
          } catch (error) {
            // Optimized folder might not exist or be inaccessible
            console.log(`No optimized image found for ${projectData.id}`);
          }
          
          // If no optimized image found, check regular images
          if (!projectImage) {
            const imageFiles = await fs.readdir(path.join(__dirname, 'images'));
            
            // Try to find an image that matches the project name
            const projectImageFile = imageFiles.find(file => 
              file.toLowerCase().includes(projectData.id.replace(/_/g, '').toLowerCase()) ||
              file.toLowerCase().includes(projectTitle.replace(/-/g, '').toLowerCase())
            );
            
            if (projectImageFile) {
              projectImage = `../images/${projectImageFile}`;
            } else {
              // Default image
              projectImage = '../images/optimized/background_alpha.png';
            }
          }
        }
        
        // Get navigation links
        const currentIndex = taxonomyData.projects.findIndex(p => p.id === projectData.id);
        const prevIndex = currentIndex === 0 ? taxonomyData.projects.length - 1 : currentIndex - 1;
        const nextIndex = currentIndex === taxonomyData.projects.length - 1 ? 0 : currentIndex + 1;
        
        const prevProject = taxonomyData.projects[prevIndex];
        const nextProject = taxonomyData.projects[nextIndex];
        
        // Fill template
        let projectHTML = template
          .replace(/{{PROJECT_TITLE}}/g, projectTitle)
          .replace(/{{PROJECT_DESCRIPTION}}/g, projectDescription)
          .replace(/{{PROJECT_YEAR}}/g, projectYear)
          .replace(/{{PROJECT_CLIENT}}/g, projectClient)
          .replace(/{{PROJECT_ROLE}}/g, projectRole)
          .replace(/{{PROJECT_CONTENT}}/g, projectContent)
          .replace(/{{PROJECT_TIMELINE}}/g, projectTimeline)
          .replace(/{{PROJECT_IMAGE}}/g, projectImage)
          .replace(/{{PROJECT_TAGS}}/g, projectTagsHtml)
          .replace(/{{FILTER_CATEGORIES}}/g, filterCategoriesHtml)
          .replace(/{{PREV_PROJECT_LINK}}/g, `${prevProject.id}.html`)
          .replace(/{{NEXT_PROJECT_LINK}}/g, `${nextProject.id}.html`);
        
        // Write to file
        const outputPath = path.join(__dirname, 'projects', `${projectData.id}.html`);
        await fs.writeFile(outputPath, projectHTML);
        console.log(`Generated: ${outputPath}`);
        
      } catch (error) {
        console.error(`Error processing project ${projectData.id}:`, error);
      }
    }
    
    console.log('All unified project pages generated successfully!');
  } catch (error) {
    console.error('Error generating unified project pages:', error);
  }
}

// Run the script
generateUnifiedProjectPages();