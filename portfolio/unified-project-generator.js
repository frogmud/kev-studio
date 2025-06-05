"use strict";

const fs = require('fs').promises;
const path = require('path');

// List of projects to skip (enhanced projects that shouldn't be overwritten)
const PROTECTED_PROJECTS = [
  'absorb_software',
  'mn8_energy', 
  'eyes_above',
  'lifepoint_health',
  'sylvamo',
  'finseca',
  'aiga',
  'l3harris',
  'abra'
];

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
        // Skip if in protected list
        if (PROTECTED_PROJECTS.includes(projectData.id)) {
          console.log(`Skipping protected project: ${projectData.id}`);
          continue;
        }
        
        // Skip if no project directory exists
        const projectDirPath = path.join(__dirname, 'projects', projectData.id);
        try {
          await fs.access(projectDirPath);
        } catch (error) {
          console.log(`Skipping ${projectData.id}: Directory not found`);
          continue;
        }
        
        // Check if the output file already exists and contains <!-- ENHANCED -->
        const outputPath = path.join(__dirname, 'projects', `${projectData.id}.html`);
        try {
          const existingContent = await fs.readFile(outputPath, 'utf8');
          if (existingContent.includes('<!-- ENHANCED -->')) {
            console.log(`Skipping ${projectData.id}: File contains ENHANCED marker`);
            continue;
          }
        } catch (error) {
          // File doesn't exist, we can proceed with generation
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
          let contentSection = infoContent.split('--- CONTENT ---')[1];
          if (contentSection.includes('--- TIMELINE ---')) {
            contentSection = contentSection.split('--- TIMELINE ---')[0];
          }
          contentSection = contentSection.trim();
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
        
        // Build project tags from categories and tags
        const combinedTags = [
          ...(projectData.categories || []),
          ...(projectData.tags || [])
        ];

        const projectTagsHtml = combinedTags
          .map(tag => {
            const tagObj = taxonomyData.tags.find(t => t.id === tag) ||
                           taxonomyData.categories.find(c => c.id === tag);
            const tagName = tagObj ? tagObj.name : tag;
            const filterType = taxonomyData.categories.some(c => c.id === tag)
              ? 'category'
              : 'tag';
            return `<span class="project-tag" data-tag="${tag}" onclick="window.location.href='../index.html?filter=${tag}&filterType=${filterType}'">${tagName}</span>`;
          })
          .join('\n');
        
        // Get image path
        let projectImage = '';
        
        // Map specific projects to their optimized images
        const imageMap = {
          'absorb_software': '../images/optimized/absorb/02-absorb-guidelines-wide-blue.png',
          'mn8_energy': '../images/optimized/mn8/10a-mn8-laptop-4x3-white.png',
          'l3harris': '../images/optimized/l3h-sign-cover-4x3.jpg',
          'lifepoint_health': '../images/optimized/lifepoint/Lifepoint_HQSign.png',
          'amrop': '../images/optimized/amrop/amrop_logo_rgb.svg',
          'thackway_mccord_pets': '../images/optimized/chocolates/chocolate-hero-v2.jpg',
          'american_social': '../images/optimized/american_social/01_amso_splash.png',
        };
        
        // Check if we have a mapped image for this project
        if (imageMap[projectData.id]) {
          projectImage = imageMap[projectData.id];
        } else {
          // Check for project-specific folder in optimized images
          try {
            const optimizedProjectDir = path.join(__dirname, 'images', 'optimized', projectData.id);
            try {
              await fs.access(optimizedProjectDir);
              // Folder exists, find first image with proper extension
              const files = await fs.readdir(optimizedProjectDir);
              const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];
              
              const imageFile = files.find(file => {
                const ext = path.extname(file).toLowerCase();
                return validExtensions.includes(ext);
              });
              
              if (imageFile) {
                projectImage = `../images/optimized/${projectData.id}/${imageFile}`;
              }
            } catch (error) {
              // Project folder doesn't exist in optimized, check general optimized folder
              const optimizedDir = path.join(__dirname, 'images', 'optimized');
              const files = await fs.readdir(optimizedDir);
              
              const imageFile = files.find(file => {
                return (file.toLowerCase().includes(projectData.id.replace(/_/g, '').toLowerCase()) ||
                       file.toLowerCase().includes(projectTitle.replace(/-/g, '').toLowerCase())) &&
                       /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file);
              });
              
              if (imageFile) {
                projectImage = `../images/optimized/${imageFile}`;
              }
            }
          } catch (error) {
            console.log(`Error checking optimized images for ${projectData.id}: ${error.message}`);
          }
          
          // If still no image, check regular images folder
          if (!projectImage) {
            try {
              // Check for project-specific folder in regular images
              const projectDir = path.join(__dirname, 'images', projectData.id);
              try {
                await fs.access(projectDir);
                const files = await fs.readdir(projectDir);
                const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];
                
                const imageFile = files.find(file => {
                  const ext = path.extname(file).toLowerCase();
                  return validExtensions.includes(ext);
                });
                
                if (imageFile) {
                  projectImage = `../images/${projectData.id}/${imageFile}`;
                }
              } catch (error) {
                // Project folder doesn't exist, check general images folder
                const imagesDir = path.join(__dirname, 'images');
                const files = await fs.readdir(imagesDir);
                
                const imageFile = files.find(file => {
                  return (file.toLowerCase().includes(projectData.id.replace(/_/g, '').toLowerCase()) ||
                         file.toLowerCase().includes(projectTitle.replace(/-/g, '').toLowerCase())) &&
                         /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file);
                });
                
                if (imageFile) {
                  projectImage = `../images/${imageFile}`;
                }
              }
            } catch (error) {
              console.log(`Error checking regular images for ${projectData.id}: ${error.message}`);
            }
          }
          
          // If still no image found, use default
          if (!projectImage) {
            projectImage = '../images/optimized/background_alpha.png';
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