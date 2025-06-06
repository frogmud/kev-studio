"use strict";

const fs = require('fs').promises;
const path = require('path');

// Function to update HTML files
async function updateHtmlFiles(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file.name);
      
      if (file.isDirectory()) {
        // Skip node_modules and other special directories
        if (file.name !== 'node_modules' && !file.name.startsWith('.')) {
          await updateHtmlFiles(filePath);
        }
      } else if (file.name.endsWith('.html')) {
        console.log(`Processing ${filePath}`);
        
        let content = await fs.readFile(filePath, 'utf8');
        let modified = false;
        
        // Update title
        const titleRegex = /<title>.*?<\/title>/;
        if (titleRegex.test(content)) {
          content = content.replace(titleRegex, '<title>Kevin Grzejka</title>');
          modified = true;
        }
        
        // Update or add favicon link
        const faviconRegex = /<link rel="shortcut icon".*?>/;
        let faviconPath;
        
        // Determine favicon path based on file location
        if (filePath.includes('/projects/')) {
          faviconPath = '../favicon/k-fav-bigger.ico';
        } else {
          faviconPath = 'favicon/k-fav-bigger.ico';
        }
        
        const faviconLink = `<link rel="shortcut icon" href="${faviconPath}" type="image/x-icon">`;
        
        if (faviconRegex.test(content)) {
          content = content.replace(faviconRegex, faviconLink);
          modified = true;
        } else {
          // Add favicon link if not present (after the last link tag in head)
          const linkTagsRegex = /<link.*?>/g;
          let lastLinkMatch;
          let lastLinkMatchIndex = -1;
          let match;
          
          while ((match = linkTagsRegex.exec(content)) !== null) {
            lastLinkMatch = match;
            lastLinkMatchIndex = match.index + match[0].length;
          }
          
          if (lastLinkMatchIndex !== -1) {
            const beforeLastLink = content.substring(0, lastLinkMatchIndex);
            const afterLastLink = content.substring(lastLinkMatchIndex);
            content = beforeLastLink + '\n    ' + faviconLink + afterLastLink;
            modified = true;
          } else {
            // No link tags found, add after meta tags
            const metaTagsRegex = /<meta.*?>/g;
            let lastMetaMatch;
            let lastMetaMatchIndex = -1;
            let match;
            
            while ((match = metaTagsRegex.exec(content)) !== null) {
              lastMetaMatch = match;
              lastMetaMatchIndex = match.index + match[0].length;
            }
            
            if (lastMetaMatchIndex !== -1) {
              const beforeLastMeta = content.substring(0, lastMetaMatchIndex);
              const afterLastMeta = content.substring(lastMetaMatchIndex);
              content = beforeLastMeta + '\n    ' + faviconLink + afterLastMeta;
              modified = true;
            }
          }
        }
        
        // Write back changes if modified
        if (modified) {
          await fs.writeFile(filePath, content, 'utf8');
          console.log(`Updated ${filePath}`);
        } else {
          console.log(`No changes needed for ${filePath}`);
        }
      }
    }
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

// Main function
async function main() {
  const portfolioDir = path.join(__dirname, 'portfolio');
  console.log(`Starting to update HTML files in ${portfolioDir}`);
  await updateHtmlFiles(portfolioDir);
  console.log('Done updating HTML files');
}

main().catch(console.error);