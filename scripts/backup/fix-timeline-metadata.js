"use strict";

const fs = require('fs').promises;
const path = require('path');

/**
 * Fixes issues with timeline content appearing in metadata fields
 * and truncated timeline headings in project HTML files.
 */
async function fixTimelineMetadataMixing() {
  try {
    console.log('Starting to fix timeline/metadata mixing issues...');
    
    const projectsDir = path.join(__dirname, 'portfolio/projects');
    
    // Get all HTML files in the projects directory
    const files = await fs.readdir(projectsDir);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    for (const file of htmlFiles) {
      const filePath = path.join(projectsDir, file);
      let content = await fs.readFile(filePath, 'utf8');
      let modified = false;
      
      // Fix Fiserv client metadata
      if (file === 'fiserv.html') {
        const originalContent = content;
        content = content.replace(
          /<div class="metadata-item">\s*<h3>Client<\/h3>\s*<p>preparation & sales support\s+(.+?)<\/p>\s*<\/div>/s,
          '<div class="metadata-item">\n                        <h3>Client</h3>\n                        <p>Fiserv</p>\n                    </div>'
        );
        
        if (content !== originalContent) {
          modified = true;
          console.log('  Fixed client metadata in fiserv.html');
        }
        
        // Fix truncated timeline headings
        const headingFixes = [
          {
            pattern: /<h3>Regulatory research & analysis<\/h3>\s*<p>research & analysis\s+(.+?)<\/p>/s,
            replacement: '<h3>Regulatory research & analysis</h3>\n                        <p>Collaborated with legal and compliance teams to interpret the DOL\'s Fiduciary Rule, translating complex regulatory requirements into actionable design and functionality specifications. This foundational work ensured our solutions met both legal standards and user needs.</p>'
          },
          {
            pattern: /<h3>Development & programming<\/h3>\s*<p>& programming\s+(.+?)<\/p>/s,
            replacement: '<h3>Development & programming</h3>\n                        <p>Implemented new functions in APL to extract and process necessary data points from financial systems. Developed templates populated dynamically, ensuring accurate and personalized reporting for each client.</p>'
          },
          {
            pattern: /<h3>Testing & quality assurance<\/h3>\s*<p>& quality assurance\s+(.+?)<\/p>/s,
            replacement: '<h3>Testing & quality assurance</h3>\n                        <p>Conducted rigorous testing across various data conditions and edge cases to ensure reliability and compliance. Performed load testing to verify the system\'s capability to handle nationwide deployment demands.</p>'
          },
          {
            pattern: /<h3>Lessons & impact<\/h3>\s*<p>& impact\s+(.+?)<\/p>/s,
            replacement: '<h3>Lessons & impact</h3>\n                        <p>This project underscored the challenges of developing solutions in a rapidly changing regulatory environment. While the Fiduciary Rule was ultimately withdrawn, the experience enhanced Fiserv\'s capabilities in creating transparent financial reporting systems and prepared the company for future regulatory changes in the financial industry.</p>'
          }
        ];
        
        for (const fix of headingFixes) {
          const contentBefore = content;
          content = content.replace(fix.pattern, fix.replacement);
          
          if (content !== contentBefore) {
            modified = true;
            console.log(`  Fixed timeline heading in fiserv.html`);
          }
        }
      }
      
      // Fix L3Harris agency metadata
      if (file === 'l3harris.html') {
        const originalContent = content;
        content = content.replace(
          /<div class="metadata-item">\s*<h3>Agency<\/h3>\s*<p>Agency: Thackway McCord Creative Direction: Kat McCord Design Lead: David Weiss Strategy: Simon Thackway, Jonathan Paisner Logo Animation: Scyld Bowring Original geodesic dome script: aadebdeb<\/p>\s*<\/div>/s,
          '<div class="metadata-item">\n                        <h3>Agency</h3>\n                        <p>Thackway McCord</p>\n                    </div>'
        );
        
        if (content !== originalContent) {
          modified = true;
          console.log('  Fixed agency metadata in l3harris.html');
        }
      }
      
      // Check for other projects with similar issues
      // Pattern: Check metadata sections with multi-line or overly long content
      const metadataItemPattern = /<div class="metadata-item">\s*<h3>([^<]+)<\/h3>\s*<p>([^<]{100,}|[\s\S]{200,}?)<\/p>\s*<\/div>/g;
      let match;
      
      // Create a copy for regex iteration
      const contentCopy = content;
      
      while ((match = metadataItemPattern.exec(contentCopy)) !== null) {
        const fullMatch = match[0];
        const heading = match[1].trim();
        const metadataValue = match[2];
        
        // If metadata value is too long, it's likely mixed with timeline content
        if (metadataValue.includes('\n\n') || metadataValue.length > 300) {
          console.log(`  Potential issue in ${file}: ${heading} metadata contains long text`);
          
          // Extract the first line/sentence as the likely intended metadata
          const firstLine = metadataValue.split(/[\r\n.]/)[0].trim();
          
          if (firstLine && firstLine.length < 100) {
            content = content.replace(
              fullMatch,
              `<div class="metadata-item">\n                        <h3>${heading}</h3>\n                        <p>${firstLine}</p>\n                    </div>`
            );
            modified = true;
            console.log(`  Fixed ${heading} metadata in ${file}`);
          }
        }
      }
      
      // Save changes if modified
      if (modified) {
        await fs.writeFile(filePath, content);
        console.log(`✅ Saved changes to ${file}`);
      } else {
        console.log(`⏭️ No issues found in ${file}`);
      }
    }
    
    console.log('\nAll files processed successfully! 🎉');
  } catch (error) {
    console.error('Error fixing timeline/metadata mixing issues:', error);
  }
}

// Run the script
fixTimelineMetadataMixing();