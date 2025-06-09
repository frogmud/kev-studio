const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'projects');
const projectFiles = fs.readdirSync(projectsDir).filter(file => file.endsWith('.html'));

console.log(`Found ${projectFiles.length} project HTML files to update`);

projectFiles.forEach(filename => {
  const filePath = path.join(projectsDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add CSS link if not present
  if (!content.includes('styles-mobile-project.css')) {
    content = content.replace(
      /<link rel="stylesheet" href="\.\.\/styles\.css">/,
      '<link rel="stylesheet" href="../styles.css">\n    <link rel="stylesheet" href="../styles-mobile-project.css">'
    );
  }
  
  // Add JS script if not present
  if (!content.includes('mobile-project-nav.js')) {
    content = content.replace(
      /<script src="\.\.\/mobile-menu\.js"><\/script>/,
      '<script src="../mobile-menu.js"></script>\n    <script src="../mobile-project-nav.js"></script>'
    );
  }
  
  // Add hide-menu-immediately script if not present
  if (!content.includes('hide-menu-immediately.js')) {
    content = content.replace(
      /<head>/,
      '<head>\n    <script src="../hide-menu-immediately.js"></script>'
    );
  }
  
  // Remove duplicate CSS links
  while (content.includes('<link rel="stylesheet" href="../styles-mobile-project.css">\n    <link rel="stylesheet" href="../styles-mobile-project.css">')) {
    content = content.replace(
      '<link rel="stylesheet" href="../styles-mobile-project.css">\n    <link rel="stylesheet" href="../styles-mobile-project.css">',
      '<link rel="stylesheet" href="../styles-mobile-project.css">'
    );
  }
  
  // Remove duplicate JS scripts
  while (content.includes('<script src="../mobile-project-nav.js"></script>\n    <script src="../mobile-project-nav.js">')) {
    content = content.replace(
      '<script src="../mobile-project-nav.js"></script>\n    <script src="../mobile-project-nav.js">',
      '<script src="../mobile-project-nav.js">'
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filename}`);
});

console.log('All project files updated successfully');