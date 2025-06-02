"use strict"

const fs = require('fs');
const path = require('path');
const superagent = require('superagent');
const cheerio = require('cheerio');

// Create images directory if it doesn't exist
const outputDir = path.join(__dirname, 'kev-studio-images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Keep track of downloaded images to avoid duplicates
const downloadedImages = new Set();

// The base URL for kev.studio
const baseUrl = 'https://kev.studio';

// Process a page and extract all images
async function processPage(url) {
  try {
    console.log(`Processing page: ${url}`);
    
    // Set a user agent to mimic a browser
    const response = await superagent
      .get(url)
      .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36')
      .timeout(15000);
    
    const $ = cheerio.load(response.text);
    
    // Find all image sources - including data-src for lazy loading
    const images = [];
    
    // Regular img tags
    $('img').each(function(i, el) {
      const src = $(el).attr('src');
      const dataSrc = $(el).attr('data-src');
      if (src) images.push(src);
      if (dataSrc) images.push(dataSrc);
    });
    
    // Background images
    $('[style*="background"]').each(function(i, el) {
      const style = $(el).attr('style');
      if (style) {
        const matches = style.match(/url\(['"]?([^'")]+)['"]?\)/g);
        if (matches) {
          matches.forEach(match => {
            const imageUrl = match.replace(/url\(['"]?([^'")]+)['"]?\)/, '$1');
            images.push(imageUrl);
          });
        }
      }
    });
    
    // Check for Cargo Collective freight URLs in the HTML
    const html = response.text;
    const freightMatches = html.match(/https:\/\/freight\.cargo\.site\/[^"'\\s]+/g);
    if (freightMatches) {
      freightMatches.forEach(url => {
        images.push(url);
      });
    }
    
    console.log(`Found ${images.length} potential image URLs on ${url}`);
    
    // Process and download each image
    for (const imageUrl of images) {
      try {
        let fullImageUrl = imageUrl;
        
        // Make URL absolute if it's relative
        if (imageUrl.startsWith('/')) {
          fullImageUrl = `${baseUrl}${imageUrl}`;
        } else if (!imageUrl.startsWith('http')) {
          continue; // Skip data URLs or other non-http URLs
        }
        
        // Extract filename from URL
        let filename;
        try {
          const urlObj = new URL(fullImageUrl);
          const pathname = urlObj.pathname;
          filename = pathname.substring(pathname.lastIndexOf('/') + 1);
          
          // If no filename found, use the hash part of the URL
          if (!filename || filename === '') {
            const urlParts = pathname.split('/');
            const lastPart = urlParts[urlParts.length - 1];
            const secondLastPart = urlParts[urlParts.length - 2];
            filename = `${secondLastPart}_${lastPart}.jpg`;
          }
        } catch (err) {
          console.error(`Error parsing URL ${fullImageUrl}: ${err.message}`);
          continue;
        }
        
        // Skip if filename doesn't have an extension
        if (!filename.includes('.')) {
          filename += '.jpg'; // Add a default extension
        }
        
        // Clean up filename (remove query parameters)
        const cleanFilename = filename.split('?')[0];
        
        // Skip if we've already downloaded this image
        if (downloadedImages.has(cleanFilename)) {
          continue;
        }
        
        const outputPath = path.join(outputDir, cleanFilename);
        
        // Skip if file already exists
        if (fs.existsSync(outputPath)) {
          console.log(`Skipping existing image: ${cleanFilename}`);
          downloadedImages.add(cleanFilename);
          continue;
        }
        
        console.log(`Downloading: ${fullImageUrl} as ${cleanFilename}`);
        
        try {
          // Download the image
          const imageResponse = await superagent
            .get(fullImageUrl)
            .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36')
            .timeout(15000)
            .responseType('arraybuffer');
          
          // Check if it's an image by looking at content-type
          const contentType = imageResponse.headers['content-type'];
          if (!contentType || !contentType.startsWith('image/')) {
            console.log(`Skipping non-image content: ${fullImageUrl} (${contentType})`);
            continue;
          }
          
          // Save the image
          fs.writeFileSync(outputPath, Buffer.from(imageResponse.body));
          console.log(`Successfully downloaded: ${cleanFilename}`);
          downloadedImages.add(cleanFilename);
          
          // Small delay to be respectful to the server
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err) {
          console.error(`Error downloading image ${fullImageUrl}: ${err.message}`);
        }
      } catch (err) {
        console.error(`Error processing image URL: ${err.message}`);
      }
    }
    
    // Find all links to other pages on the same domain
    const links = [];
    $('a').each(function(i, el) {
      const href = $(el).attr('href');
      if (href && href.startsWith('/')) {
        links.push(`${baseUrl}${href}`);
      } else if (href && href.includes('kev.studio')) {
        links.push(href);
      }
    });
    
    return links;
  } catch (err) {
    console.error(`Error processing page ${url}: ${err.message}`);
    return [];
  }
}

// Crawl the website starting from the homepage
async function crawlSite() {
  const visited = new Set();
  const toVisit = [
    baseUrl,
    `${baseUrl}/programming`,
    `${baseUrl}/about`,
    `${baseUrl}/contact`
  ];
  
  console.log('Starting crawl with initial URLs:', toVisit);
  
  while (toVisit.length > 0) {
    const url = toVisit.shift();
    
    // Skip if already visited
    if (visited.has(url)) continue;
    
    console.log(`Queue length: ${toVisit.length}, Processing: ${url}`);
    
    // Mark as visited
    visited.add(url);
    
    // Process the page and get links
    const links = await processPage(url);
    console.log(`Found ${links.length} links on page ${url}`);
    
    // Add new links to the queue
    for (const link of links) {
      if (!visited.has(link) && !toVisit.includes(link)) {
        console.log(`Adding to queue: ${link}`);
        toVisit.push(link);
      }
    }
    
    // Small delay to be respectful to the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Visited pages:', Array.from(visited));
  console.log(`Total downloaded images: ${downloadedImages.size}`);
}

console.log('Starting to download images from kev.studio...');
crawlSite().then(() => {
  console.log('Finished downloading images from kev.studio');
}).catch(err => {
  console.error('Error during crawling:', err);
});