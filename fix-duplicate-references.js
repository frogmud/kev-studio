const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'projects');
const projectFiles = fs.readdirSync(projectsDir).filter(file => file.endsWith('.html'));

console.log(`Found ${projectFiles.length} project HTML files to check for duplicates`);

projectFiles.forEach(filename => {
  const filePath = path.join(projectsDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix duplicate CSS references
  if (content.includes('<link rel="stylesheet" href="../styles-mobile-project.css">\n    <link rel="stylesheet" href="../styles-mobile-project.css">')) {
    content = content.replace(
      '<link rel="stylesheet" href="../styles-mobile-project.css">\n    <link rel="stylesheet" href="../styles-mobile-project.css">',
      '<link rel="stylesheet" href="../styles-mobile-project.css">'
    );
    console.log(`Fixed duplicate CSS in ${filename}`);
  }
  
  // Fix duplicate JS references
  if (content.includes('<script src="../mobile-project-nav.js"></script>\n    <script src="../mobile-project-nav.js">')) {
    content = content.replace(
      '<script src="../mobile-project-nav.js"></script>\n    <script src="../mobile-project-nav.js">',
      '<script src="../mobile-project-nav.js">'
    );
    console.log(`Fixed duplicate JS in ${filename}`);
  }
  
  fs.writeFileSync(filePath, content);
});