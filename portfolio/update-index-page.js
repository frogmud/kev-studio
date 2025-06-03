"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateIndexPage() {
  try {
    console.log('Starting index page update...');
    
    // Read taxonomy data
    const taxonomyPath = path.join(__dirname, 'data', 'taxonomy.json');
    const taxonomyData = JSON.parse(await fs.readFile(taxonomyPath, 'utf8'));
    
    // Read current index.html
    const indexPath = path.join(__dirname, 'index.html');
    let indexContent = await fs.readFile(indexPath, 'utf8');
    
    // Check if the UN project card already exists
    const unProjectExists = indexContent.includes('href="projects/un.html"');
    
    // Add UN project card if it doesn't exist
    if (!unProjectExists) {
      console.log('Adding UN project card to index...');
      const unProject = taxonomyData.projects.find(p => p.id === 'un');
      
      if (unProject) {
        const unProjectTags = unProject.tags.map(tag => {
          const tagObj = taxonomyData.tags.find(t => t.id === tag);
          return `<span class="project-tag" data-tag="${tag}" onclick="window.location.href='?filter=${tag}&filterType=tag'">${tagObj ? tagObj.name : tag}</span>`;
        }).join('\n');
        
        const unProjectCard = `
                <div class="project-card" data-categories="${unProject.categories.join(',')}" data-tags="${unProject.tags.join(',')}">
                    <div class="project-image">
                        <img loading="lazy" src="images/un/UN_Cover.gif" alt="United Nations">
                    </div>
                    <div class="project-content">
                        <h3>United Nations</h3>
                        <a href="projects/un.html" class="project-link">View project →</a>
                        <div class="project-tags">
                            ${unProjectTags}
                        </div>
                        <p>Branding for UN diplomatic initiative</p>
                    </div>
                </div>
                `;
        
        // Insert the UN project card after the opening project-grid div
        indexContent = indexContent.replace(
          '<div class="project-grid">',
          '<div class="project-grid">' + unProjectCard
        );
      }
    }
    
    // Update the filter categories in the navigation
    const categoriesHtml = taxonomyData.categories
      .map(cat => `<li class="filter-category${cat.id === 'all' ? ' active' : ''}" data-filter="${cat.id}" data-filter-type="category">${cat.name}</li>`)
      .join('\n');
    
    // Update the categories in the navigation
    indexContent = indexContent.replace(
      /<ul class="filter-categories">[\s\S]*?<\/ul>/,
      `<ul class="filter-categories">${categoriesHtml}</ul>`
    );
    
    // Update the JavaScript to handle both categories and tags
    const updatedScript = `
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const filterCategories = document.querySelectorAll('.filter-category');
        const projectCards = document.querySelectorAll('.project-card');
        const projectGrid = document.querySelector('.project-grid');
        const viewToggle = document.getElementById('view-toggle');
        
        // Function to filter projects
        function filterProjects(filter, filterType = 'category') {
          // Remove active class from all categories
          filterCategories.forEach(c => c.classList.remove('active'));
          
          // Find and add active class to clicked category if it exists
          const targetFilter = document.querySelector(\`.filter-category[data-filter="\${filter}"]\`);
          if (targetFilter) {
            targetFilter.classList.add('active');
          }
          
          // Filter projects
          projectCards.forEach(card => {
            if (filter === 'all') {
              card.classList.remove('hidden');
              setTimeout(() => {
                card.classList.add('animate-in');
              }, 10);
            } else {
              // For category filtering, check data-categories attribute
              if (filterType === 'category') {
                const categories = card.getAttribute('data-categories').split(',');
                
                if (categories.includes(filter)) {
                  card.classList.remove('hidden');
                  setTimeout(() => {
                    card.classList.add('animate-in');
                  }, 10);
                } else {
                  card.classList.add('hidden');
                  card.classList.remove('animate-in');
                }
              }
              // For tag filtering, check data-tags attribute (if it exists)
              else if (filterType === 'tag') {
                const tags = card.getAttribute('data-tags');
                if (tags && tags.split(',').includes(filter)) {
                  card.classList.remove('hidden');
                  setTimeout(() => {
                    card.classList.add('animate-in');
                  }, 10);
                } else {
                  card.classList.add('hidden');
                  card.classList.remove('animate-in');
                }
              }
            }
          });
        }
        
        // Check URL for parameters
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        const filterTypeParam = urlParams.get('filterType') || 'category';
        const viewParam = urlParams.get('view');
        
        // Initialize view mode from URL or localStorage
        const savedViewMode = localStorage.getItem('viewMode') || 'grid';
        if (viewParam === 'list' || savedViewMode === 'list') {
          projectGrid.classList.add('list-view');
          viewToggle.classList.add('list');
        }
        
        // Apply filter if in URL
        if (filterParam) {
          // Check if filter exists or default to 'all'
          const filterExists = [...filterCategories].some(
            el => el.getAttribute('data-filter') === filterParam
          );
          
          if (filterExists) {
            filterProjects(filterParam, filterTypeParam);
          } else {
            filterProjects('all', 'category');
            // Update URL to remove invalid filter
            const url = new URL(window.location);
            url.searchParams.delete('filter');
            url.searchParams.delete('filterType');
            window.history.replaceState({}, '', url);
          }
        }
        
        // Add click event to filter categories
        filterCategories.forEach(category => {
          category.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const filterType = this.getAttribute('data-filter-type') || 'category';
            filterProjects(filter, filterType);
            
            // Update URL with filter parameter without reloading the page
            const url = new URL(window.location);
            url.searchParams.set('filter', filter);
            url.searchParams.set('filterType', filterType);
            window.history.pushState({}, '', url);
          });
        });
        
        // Toggle view between grid and list
        viewToggle.addEventListener('click', function() {
          projectGrid.classList.toggle('list-view');
          this.classList.toggle('list');
          
          // Save preference to localStorage
          const isListView = projectGrid.classList.contains('list-view');
          localStorage.setItem('viewMode', isListView ? 'list' : 'grid');
          
          // Update URL with view parameter without reloading the page
          const url = new URL(window.location);
          url.searchParams.set('view', isListView ? 'list' : 'grid');
          window.history.pushState({}, '', url);
        });
        
        // Make project cards clickable
        projectCards.forEach(card => {
          card.addEventListener('click', function(e) {
            // Don't navigate if clicking on a link directly
            if (e.target.tagName === 'A') return;
            
            const link = this.querySelector('.project-link');
            if (link) {
              window.location.href = link.getAttribute('href');
            }
          });
        });
        
        // Detect portrait vs landscape images
        projectCards.forEach(card => {
          const img = card.querySelector('.project-image img');
          if (img) {
            img.onload = function() {
              if (this.naturalHeight > this.naturalWidth) {
                card.classList.add('portrait');
              } else {
                card.classList.add('landscape');
              }
            };
            
            // If image is already loaded
            if (img.complete) {
              if (img.naturalHeight > img.naturalWidth) {
                card.classList.add('portrait');
              } else {
                card.classList.add('landscape');
              }
            }
          }
        });
        
        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or use the system preference
        const currentTheme = localStorage.getItem('theme') || 
                          (prefersDarkScheme.matches ? 'dark' : 'light');
        
        // Apply the theme
        if (currentTheme === 'dark') {
          document.body.setAttribute('data-theme', 'dark');
          themeToggle.classList.add('dark');
        }
        
        // Toggle theme when clicking the theme toggle
        themeToggle.addEventListener('click', function() {
          let theme;
          if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            theme = 'light';
            themeToggle.classList.remove('dark');
          } else {
            document.body.setAttribute('data-theme', 'dark');
            theme = 'dark';
            themeToggle.classList.add('dark');
          }
          localStorage.setItem('theme', theme);
        });
      });
    </script>`;
    
    // Replace the script section
    indexContent = indexContent.replace(
      /<script>[\s\S]*?<\/script>/,
      updatedScript
    );
    
    // Update project cards to include data-tags attribute
    taxonomyData.projects.forEach(project => {
      if (project.tags && project.tags.length > 0) {
        const tagsString = project.tags.join(',');
        // Find the project card and add or update data-tags attribute
        const projectCardRegex = new RegExp(`<div class="project-card"[^>]*data-categories="[^"]*"[^>]*>\\s*<div class="project-image">\\s*<img[^>]*${project.id}[^>]*>`, 'i');

        if (projectCardRegex.test(indexContent)) {
          indexContent = indexContent.replace(
            projectCardRegex,
            match => {
              if (/data-tags="[^"]*"/i.test(match)) {
                // Replace existing data-tags
                return match.replace(/data-tags="[^"]*"/i, `data-tags="${tagsString}"`);
              }
              // Insert new data-tags attribute after data-categories
              return match.replace(
                /data-categories="([^"]*)"/,
                `data-categories="$1" data-tags="${tagsString}"`
              );
            }
          );
        }
        
        // Also update the project tags display
        const projectTagsRegex = new RegExp(`<div class="project-card"[^>]*data-categories="[^"]*"[^>]*>\\s*<div class="project-image">\\s*<img[^>]*${project.id}[^>]*>[\\s\\S]*?<div class="project-tags">([\\s\\S]*?)<\/div>`, 'i');
        
        if (projectTagsRegex.test(indexContent)) {
          const tagsHtml = project.tags.map(tag => {
            const tagObj = taxonomyData.tags.find(t => t.id === tag);
            return `<span class="project-tag" data-tag="${tag}" onclick="window.location.href='?filter=${tag}&filterType=tag'">${tagObj ? tagObj.name : tag}</span>`;
          }).join('\n');
          
          indexContent = indexContent.replace(
            projectTagsRegex,
            (match, tagSection) => {
              return match.replace(
                tagSection,
                `\n${tagsHtml}\n`
              );
            }
          );
        }
      }
    });
    
    // Write the updated content back to the file
    await fs.writeFile(indexPath, indexContent, 'utf8');
    console.log('Index page updated successfully!');
    
  } catch (error) {
    console.error('Error updating index page:', error);
  }
}

// Run the script
updateIndexPage();