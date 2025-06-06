"use strict";

const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

const portfolioDir = '/Users/kevin/Desktop/WEBSITES/PORTFOLIO/portfolio';
const outputFile = '/Users/kevin/Desktop/WEBSITES/PORTFOLIO/content-export/all-portfolio-content.md';

async function getAllHtmlFiles(dir) {
  let files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      // Skip node_modules and other non-relevant directories
      if (item.name !== 'node_modules' && !item.name.startsWith('.')) {
        files = files.concat(await getAllHtmlFiles(fullPath));
      }
    } else if (item.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')
    .trim();
}

async function extractContentFromHtml(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const $ = cheerio.load(content);
  
  // Remove navigation, scripts, and other non-content elements
  $('nav, script, style, footer, .sticky-nav, .project-navigation').remove();
  
  const fileName = path.basename(filePath);
  let markdown = `# ${fileName}\n\n`;
  
  // Extract page title
  const pageTitle = $('title').text().trim();
  if (pageTitle) {
    markdown += `## Page Title: ${pageTitle}\n\n`;
  }
  
  // Extract project metadata if available
  const metadata = {};
  $('.metadata-item').each((i, elem) => {
    const key = $(elem).find('h3').text().trim();
    const value = $(elem).find('p').text().trim();
    if (key && value) {
      metadata[key] = value;
    }
  });
  
  if (Object.keys(metadata).length > 0) {
    markdown += '## Metadata\n\n';
    for (const [key, value] of Object.entries(metadata)) {
      markdown += `- **${key}**: ${value}\n`;
    }
    markdown += '\n';
  }
  
  // Extract project tagline
  const tagline = $('.tagline').text().trim();
  if (tagline) {
    markdown += `## Tagline\n\n${tagline}\n\n`;
  }
  
  // Extract main content
  markdown += '## Main Content\n\n';
  
  // Extract paragraphs from project description
  $('.project-description p').each((i, elem) => {
    const text = cleanText($(elem).text());
    if (text) {
      markdown += `${text}\n\n`;
    }
  });
  
  // Extract timeline items if available
  const timelineItems = $('.timeline-item');
  if (timelineItems.length > 0) {
    markdown += '## Timeline\n\n';
    
    timelineItems.each((i, elem) => {
      const heading = $(elem).find('h3').text().trim();
      const text = cleanText($(elem).find('p').text());
      
      if (heading) {
        markdown += `### ${heading}\n\n`;
      }
      
      if (text) {
        markdown += `${text}\n\n`;
      }
    });
  }
  
  return markdown;
}

async function main() {
  try {
    const htmlFiles = await getAllHtmlFiles(portfolioDir);
    
    // Sort files to group related content together
    htmlFiles.sort();
    
    let allContent = `# Portfolio Content Export\n\nGenerated: ${new Date().toLocaleString()}\n\n`;
    allContent += `Total files: ${htmlFiles.length}\n\n`;
    allContent += '---\n\n';
    
    for (const file of htmlFiles) {
      console.log(`Processing: ${file}`);
      const fileContent = await extractContentFromHtml(file);
      allContent += fileContent;
      allContent += '\n\n---\n\n';
    }
    
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, allContent);
    
    console.log(`Content extracted and saved to: ${outputFile}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();