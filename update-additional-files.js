"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateAdditionalFiles() {
  try {
    // Files with different navigation structure
    const filesToUpdate = [
      path.join(__dirname, 'portfolio', 'projects', 'amrop.html'),
      path.join(__dirname, 'portfolio', 'projects', 'autonomy_capital.html'),
      path.join(__dirname, 'portfolio', 'projects', 'tryitout.html')
    ];
    
    console.log(`Updating ${filesToUpdate.length} files with custom navigation structure`);
    
    for (const filePath of filesToUpdate) {
      const fileName = path.basename(filePath);
      console.log(`Updating ${fileName}...`);
      
      // Read the file content
      let content = await fs.readFile(filePath, 'utf8');
      
      // Check if the file has the old navigation structure
      if (content.includes('<li class="filter-category" data-filter="all" data-filter-type="category">All</li>')) {
        console.log(`  - Updating navigation menu in ${fileName}`);
        
        // Update navigation menu to match the standard pattern
        content = content.replace(
          /<ul class="filter-categories">\s+<!-- Categories will be primary filters -->\s+<li class="filter-category" data-filter="all" data-filter-type="category">All<\/li>\s+<li class="filter-category" data-filter="digital" data-filter-type="category">Digital<\/li>\s+<li class="filter-category" data-filter="print" data-filter-type="category">Print<\/li>/g,
          '<ul class="filter-categories">\n                <li class="filter-category" data-filter="portfolio" data-filter-type="category">Work</li>\n                <li class="filter-category" data-filter="lets-work" data-filter-type="category">About</li>'
        );
        
        // Update JavaScript to match standard navigation
        if (content.includes('// Filter category links to main page with proper filter type')) {
          console.log(`  - Updating navigation JavaScript in ${fileName}`);
          
          content = content.replace(
            /\/\/ Filter category links to main page with proper filter type\s+const filterCategories = document\.querySelectorAll\('\.filter-category'\);\s+filterCategories\.forEach\(category => \{\s+category\.addEventListener\('click', function\(\) \{\s+const filter = this\.getAttribute\('data-filter'\);\s+const filterType = this\.getAttribute\('data-filter-type'\) \|\| 'category';\s+\s+\/\/ Navigate to index with filter parameters\s+window\.location\.href = `\.\.\/index\.html\?filter=\${filter}&filterType=\${filterType}`;\s+\}\);\s+\}\);/g,
            '// Nav category links\n        const navCategories = document.querySelectorAll(\'nav .filter-category\');\n\n        navCategories.forEach(category => {\n            category.addEventListener(\'click\', function() {\n                const filter = this.getAttribute(\'data-filter\');\n                if (filter === \'portfolio\') {\n                    window.location.href = \'../index.html\';\n                } else if (filter === \'lets-work\') {\n                    window.location.href = \'../lets-work-together.html\';\n                }\n            });\n        });'
          );
        }
        
        // Write the updated content back to the file
        await fs.writeFile(filePath, content, 'utf8');
      } else {
        console.log(`  - No updates needed for ${fileName}`);
      }
    }
    
    console.log('Additional files have been updated successfully.');
  } catch (error) {
    console.error('Error updating additional files:', error);
  }
}

// Execute the function
updateAdditionalFiles();