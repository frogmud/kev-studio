"use strict"

const fs = require("fs");
const path = require("path");
const superagent = require("superagent");
const cheerio = require("cheerio");

const baseUrl = "https://kev.studio";
const outputDir = path.join(__dirname, "kev-studio-assets");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper function to download an image
async function downloadImage(url, filename) {
  try {
    console.log(`Downloading: ${url}`);
    const response = await superagent.get(url).responseType('arraybuffer');
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, response.body);
    console.log(`Saved: ${filename}`);
    return true;
  } catch (error) {
    console.error(`Failed to download ${url}: ${error.message}`);
    return false;
  }
}

// Helper function to sanitize filenames
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
}

// Function to extract project URLs
async function extractProjectUrls($) {
  const projectUrls = new Set();
  
  // Look for links that might be projects
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.startsWith('/') && !href.includes('#') && href !== '/') {
      projectUrls.add(new URL(href, baseUrl).href);
    }
  });
  
  return Array.from(projectUrls);
}

// Main function to scrape the site
async function scrapePortfolio() {
  try {
    console.log(`Fetching content from ${baseUrl}...`);
    
    // Get the main page
    const mainRes = await superagent.get(baseUrl);
    const $ = cheerio.load(mainRes.text);
    
    // Create a text file for content
    let contentText = "PORTFOLIO CONTENT FROM KEV.STUDIO\n\n";
    
    // Extract text content
    $('p, h1, h2, h3, h4, h5, h6, article').each((i, el) => {
      const text = $(el).text().trim();
      if (text) {
        contentText += text + "\n\n";
      }
    });
    
    // Save text content
    fs.writeFileSync(path.join(outputDir, 'content.txt'), contentText);
    console.log('Saved text content to content.txt');
    
    // Extract all image URLs from the main page
    const imageUrls = new Set();
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src) {
        const fullUrl = src.startsWith('http') ? src : new URL(src, baseUrl).href;
        imageUrls.add(fullUrl);
      }
    });
    
    // Find project pages
    const projectUrls = await extractProjectUrls($);
    console.log(`Found ${projectUrls.length} project URLs to explore`);
    
    // Visit each project page to find more images
    for (const projectUrl of projectUrls) {
      try {
        console.log(`Exploring: ${projectUrl}`);
        const projectRes = await superagent.get(projectUrl);
        const project$ = cheerio.load(projectRes.text);
        
        // Extract text content from project page
        let projectContent = `\n\n--- PROJECT: ${projectUrl} ---\n\n`;
        project$('p, h1, h2, h3, h4, h5, h6, article').each((i, el) => {
          const text = project$(el).text().trim();
          if (text) {
            projectContent += text + "\n\n";
          }
        });
        
        // Append project content to the main content file
        fs.appendFileSync(path.join(outputDir, 'content.txt'), projectContent);
        
        // Extract images from project page
        project$('img').each((i, el) => {
          const src = project$(el).attr('src');
          if (src) {
            const fullUrl = src.startsWith('http') ? src : new URL(src, baseUrl).href;
            imageUrls.add(fullUrl);
          }
        });
        
      } catch (error) {
        console.error(`Error exploring ${projectUrl}: ${error.message}`);
      }
    }
    
    // Convert Set to Array for easier handling
    const images = Array.from(imageUrls);
    console.log(`Found ${images.length} unique images to download`);
    
    // Create a manifest of all images
    const imageManifest = images.join('\n');
    fs.writeFileSync(path.join(outputDir, 'image_urls.txt'), imageManifest);
    
    // Download all images
    let successCount = 0;
    for (let i = 0; i < images.length; i++) {
      const imgUrl = images[i];
      const urlParts = new URL(imgUrl);
      const filename = sanitizeFilename(path.basename(urlParts.pathname));
      
      // Add index to ensure unique filenames
      const indexedFilename = `${i+1}_${filename}`;
      
      const success = await downloadImage(imgUrl, indexedFilename);
      if (success) successCount++;
      
      // Add a small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\nComplete! Downloaded ${successCount} of ${images.length} images`);
    console.log(`All content saved to: ${outputDir}`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Run the scraper
scrapePortfolio();