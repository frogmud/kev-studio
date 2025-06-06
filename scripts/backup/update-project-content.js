"use strict";

const fs = require('fs').promises;
const path = require('path');

// Function to extract content sections from markdown
async function extractContentFromMarkdown(markdownPath) {
  const markdown = await fs.readFile(markdownPath, 'utf-8');
  
  // Split the markdown content into project sections
  const projectSections = markdown.split('---').filter(section => section.trim());
  
  // Map to store project data: key = filename, value = content sections
  const projectData = {};
  
  for (const section of projectSections) {
    // Extract filename from the section
    const filenameMatch = section.match(/# (.*?)\.html/);
    if (filenameMatch) {
      const filename = filenameMatch[1] + '.html';
      
      // Extract tagline
      const taglineMatch = section.match(/## Tagline\s+(.*?)(\s+##|$)/s);
      const tagline = taglineMatch ? taglineMatch[1].trim() : '';
      
      // Extract metadata
      const metadataMatch = section.match(/## Metadata\s+(.*?)(\s+##|$)/s);
      const metadata = metadataMatch ? metadataMatch[1].trim() : '';
      
      // Extract role, agency, year
      const roleMatch = metadata.match(/- \*\*Role\*\*: (.*?)(\n|$)/);
      const role = roleMatch ? roleMatch[1].trim() : '';
      
      const agencyMatch = metadata.match(/- \*\*Agency\*\*: (.*?)(\n|$)/);
      const agency = agencyMatch ? agencyMatch[1].trim() : '';
      
      const yearMatch = metadata.match(/- \*\*Year\*\*: (.*?)(\n|$)/);
      const year = yearMatch ? yearMatch[1].trim() : '';
      
      // Extract main content
      const mainContentMatch = section.match(/## Main Content\s+(.*?)(\s+##|$)/s);
      const mainContent = mainContentMatch ? mainContentMatch[1].trim() : '';
      
      // Extract timeline sections
      const timelineMatch = section.match(/## Timeline\s+(.*?)(\s+---|$)/s);
      const timelineContent = timelineMatch ? timelineMatch[1].trim() : '';
      
      // Process timeline entries
      const timelineEntries = {};
      if (timelineContent) {
        const timelineRegex = /### (.*?)\s+(.*?)(?=### |$)/gs;
        let match;
        while ((match = timelineRegex.exec(timelineContent)) !== null) {
          const heading = match[1].trim();
          const content = match[2].trim();
          timelineEntries[heading] = content;
        }
      }
      
      projectData[filename] = {
        tagline,
        metadata: {
          role,
          agency,
          year
        },
        mainContent,
        timelineEntries
      };
    }
  }
  
  return projectData;
}

// Function to update HTML with new content
async function updateProjectPage(htmlPath, projectData) {
  try {
    let html = await fs.readFile(htmlPath, 'utf-8');
    const filename = path.basename(htmlPath);
    
    if (!projectData[filename]) {
      console.log(`No data found for ${filename}, skipping...`);
      return false;
    }
    
    const data = projectData[filename];
    
    // Update tagline
    if (data.tagline) {
      const taglineRegex = /<p class="tagline">(.*?)<\/p>/s;
      html = html.replace(taglineRegex, `<p class="tagline">${data.tagline}</p>`);
    }
    
    // Update role and agency in metadata
    if (data.metadata.role) {
      const roleRegex = /<h3>Role<\/h3>\s*<p>(.*?)<\/p>/s;
      html = html.replace(roleRegex, `<h3>Role</h3>\n                        <p>${data.metadata.role}</p>`);
    }
    
    // Check if agency exists in the HTML before attempting to update
    if (data.metadata.agency) {
      const agencyExists = html.includes('<h3>Agency</h3>');
      
      if (agencyExists) {
        // Update existing agency
        const agencyRegex = /<h3>Agency<\/h3>\s*<p>(.*?)<\/p>/s;
        html = html.replace(agencyRegex, `<h3>Agency</h3>\n                        <p>${data.metadata.agency}</p>`);
      } else {
        // Add agency after role
        const roleEndRegex = /(<h3>Role<\/h3>\s*<p>.*?<\/p>[\s\n]*<\/div>)/s;
        const roleEndMatch = html.match(roleEndRegex);
        
        if (roleEndMatch) {
          const replacement = `${roleEndMatch[1]}\n                    <div class="metadata-item">\n                        <h3>Agency</h3>\n                        <p>${data.metadata.agency}</p>\n                    </div>`;
          html = html.replace(roleEndRegex, replacement);
        }
      }
    }
    
    // Update main content paragraph(s)
    if (data.mainContent) {
      // Find the start of the project description div
      const descStartIndex = html.indexOf('<div class="project-description">');
      
      if (descStartIndex !== -1) {
        // Find the end of the opening paragraph(s) before any div sections
        let descEndIndex = html.indexOf('<div', descStartIndex + 30);
        
        if (descEndIndex !== -1) {
          // Extract the section we want to replace
          const beforeSection = html.substring(0, descStartIndex + 33); // 33 = length of <div class="project-description">
          const afterSection = html.substring(descEndIndex);
          
          // Construct the new section with paragraphs properly formatted
          const paragraphs = data.mainContent.split('\n\n').filter(p => p.trim());
          const newContent = paragraphs.map(p => `                <p>${p}</p>`).join('\n');
          
          html = beforeSection + '\n' + newContent + '\n' + afterSection;
        }
      }
    }
    
    // Update timeline entries
    for (const [heading, content] of Object.entries(data.timelineEntries)) {
      const headingRegex = new RegExp(`<h3>${heading}</h3>\\s*<p>.*?</p>`, 's');
      const headingExists = html.match(headingRegex);
      
      if (headingExists) {
        html = html.replace(headingRegex, `<h3>${heading}</h3>\n                        <p>${content}</p>`);
      } else {
        // Look for similar headings (fuzzy match)
        const allHeadings = [...html.matchAll(/<h3>(.*?)<\/h3>/g)].map(match => match[1]);
        
        for (const existingHeading of allHeadings) {
          if (
            existingHeading.toLowerCase().includes(heading.toLowerCase()) ||
            heading.toLowerCase().includes(existingHeading.toLowerCase())
          ) {
            const existingHeadingRegex = new RegExp(`<h3>${existingHeading}</h3>\\s*<p>.*?</p>`, 's');
            html = html.replace(existingHeadingRegex, `<h3>${existingHeading}</h3>\n                        <p>${content}</p>`);
            break;
          }
        }
      }
    }
    
    await fs.writeFile(htmlPath, html);
    return true;
  } catch (error) {
    console.error(`Error updating ${htmlPath}:`, error);
    return false;
  }
}

// Main function to run the update process
async function main() {
  const markdownPath = path.resolve(__dirname, 'content-export/all-portfolio-content-edited.md');
  const projectsDir = path.resolve(__dirname, 'portfolio/projects');
  
  try {
    // Extract content from markdown
    const projectData = await extractContentFromMarkdown(markdownPath);
    
    // Get list of HTML files in projects directory
    const files = await fs.readdir(projectsDir);
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'project-template.html');
    
    // Statistics for reporting
    let updated = 0;
    let skipped = 0;
    let failed = 0;
    
    // Update each file
    for (const htmlFile of htmlFiles) {
      const htmlPath = path.join(projectsDir, htmlFile);
      console.log(`Updating ${htmlFile}...`);
      
      const success = await updateProjectPage(htmlPath, projectData);
      
      if (success) {
        updated++;
      } else if (!projectData[htmlFile]) {
        skipped++;
      } else {
        failed++;
      }
    }
    
    console.log(`
Update complete!
--------------
Updated: ${updated}
Skipped: ${skipped}
Failed: ${failed}
--------------
Total files: ${htmlFiles.length}
`);
  } catch (error) {
    console.error('Error in update process:', error);
  }
}

// Run the script
main().catch(console.error);