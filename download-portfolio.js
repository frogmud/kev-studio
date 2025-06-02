"use strict"

const fs = require("fs");
const path = require("path");
const superagent = require("superagent");
const cheerio = require("cheerio");
const { promisify } = require("util");

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const config = {
  baseUrl: "https://kev.studio",
  outputDir: path.join(__dirname, "kev-studio-assets"),
  projectsDir: path.join(__dirname, "kev-studio-assets", "projects"),
  imgQuality: "high", // Options: low, medium, high
  logDownloads: true,
  downloadImages: true,
  fetchProjectDetails: true,
  createIndexHtml: true,
  extractMetadata: true
};

// Create necessary directories
async function createDirectories() {
  const dirs = [
    config.outputDir,
    config.projectsDir
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      await mkdir(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }
}

// Helper function to download an image with retry
async function downloadImage(url, filename, retries = 3) {
  let attempts = 0;
  
  while (attempts < retries) {
    try {
      const response = await superagent.get(url).responseType('arraybuffer');
      const outputPath = path.join(config.outputDir, filename);
      await writeFile(outputPath, Buffer.from(response.body));
      if (config.logDownloads) {
        console.log(`Downloaded: ${filename}`);
      }
      return true;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts}/${retries} failed for ${url}: ${error.message}`);
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.error(`Failed to download ${url} after ${retries} attempts`);
  return false;
}

// Helper function to sanitize filenames
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
}

// Helper function to extract project data
async function extractProjectData($, project) {
  // Extract project details
  const title = project.find('h1, h2, h3').first().text().trim();
  const description = project.find('p').first().text().trim();
  
  // Extract images related to this project
  const images = [];
  project.find('img').each((i, el) => {
    let imgUrl = $(el).attr('src');
    
    // Handle relative URLs
    if (imgUrl && !imgUrl.startsWith('http')) {
      imgUrl = new URL(imgUrl, config.baseUrl).href;
    }
    
    if (imgUrl) {
      images.push({
        url: imgUrl,
        alt: $(el).attr('alt') || title
      });
    }
  });
  
  // Extract tags/keywords if available
  const tags = [];
  project.find('.tag, .keyword, .category').each((i, el) => {
    const tag = $(el).text().trim();
    if (tag) {
      tags.push(tag);
    }
  });
  
  return {
    title,
    description,
    images,
    tags,
    url: project.find('a').attr('href')
  };
}

// Create project directory and info files
async function createProjectFiles(projectData) {
  // Create sanitized directory name
  const dirName = sanitizeFilename(projectData.title);
  const projectDir = path.join(config.projectsDir, dirName);
  
  if (!fs.existsSync(projectDir)) {
    await mkdir(projectDir, { recursive: true });
  }
  
  // Create info.md file
  const infoContent = `# ${projectData.title}

${projectData.description || 'No description available'}

## Project Details
- Client: ${projectData.title}
${projectData.tags.length > 0 ? `- Tags: ${projectData.tags.join(', ')}` : ''}
${projectData.url ? `- Original URL: ${projectData.url}` : ''}

## Images
${projectData.images.map(img => `- ![${img.alt}](${img.url})`).join('\n')}
`;
  
  await writeFile(path.join(projectDir, 'info.md'), infoContent);
  
  // Create simple HTML page
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectData.title} - Kevin Grzejka Portfolio</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .project-images {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .image-container {
            border: 1px solid #eee;
            border-radius: 5px;
            overflow: hidden;
        }
        .image-container img {
            width: 100%;
            height: auto;
            display: block;
        }
        .back-link {
            display: inline-block;
            margin-top: 40px;
            color: #4299e1;
            text-decoration: none;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <a href="../../index.html" class="back-link">← Back to Portfolio</a>
    
    <h1>${projectData.title}</h1>
    <p>${projectData.description || ''}</p>
    
    ${projectData.tags.length > 0 ? `<p><strong>Tags:</strong> ${projectData.tags.join(', ')}</p>` : ''}
    
    <div class="project-images">
        ${projectData.images.map(img => `
        <div class="image-container">
            <img src="${img.url}" alt="${img.alt}">
        </div>
        `).join('')}
    </div>
    
    <a href="../../index.html" class="back-link">← Back to Portfolio</a>
</body>
</html>`;
  
  await writeFile(path.join(projectDir, 'page.html'), htmlContent);
  
  console.log(`Created project files for: ${projectData.title}`);
}

// Main function to scrape the site
async function scrapePortfolio() {
  try {
    console.log(`Starting portfolio download from ${config.baseUrl}...`);
    
    await createDirectories();
    
    // Get the main page
    const mainRes = await superagent.get(config.baseUrl);
    const $ = cheerio.load(mainRes.text);
    
    // Create a text file for site info
    let siteInfo = `# ${$('title').text()}\n\n`;
    
    // Extract metadata
    if (config.extractMetadata) {
      $('meta').each((i, el) => {
        const name = $(el).attr('name') || $(el).attr('property');
        const content = $(el).attr('content');
        if (name && content) {
          siteInfo += `${name}: ${content}\n`;
        }
      });
    }
    
    // Extract text content
    let contentText = "";
    $('p, h1, h2, h3, h4, h5, h6, .content, article').each((i, el) => {
      const text = $(el).text().trim();
      if (text) {
        contentText += text + "\n\n";
      }
    });
    
    // Save site info
    await writeFile(path.join(config.outputDir, 'site_info.txt'), siteInfo);
    console.log('Saved site info to site_info.txt');
    
    // Save text content
    await writeFile(path.join(config.outputDir, 'content.txt'), contentText);
    console.log('Saved text content to content.txt');
    
    // Create image URLs file
    let imageUrls = "";
    
    // Extract and download images
    const images = [];
    $('img').each((i, el) => {
      let imgUrl = $(el).attr('src');
      
      // Handle relative URLs
      if (imgUrl && !imgUrl.startsWith('http')) {
        imgUrl = new URL(imgUrl, config.baseUrl).href;
      }
      
      if (imgUrl) {
        images.push({
          url: imgUrl,
          alt: $(el).attr('alt') || ""
        });
        imageUrls += imgUrl + "\n";
      }
    });
    
    // Save image URLs
    await writeFile(path.join(config.outputDir, 'image_urls.txt'), imageUrls);
    console.log(`Found ${images.length} images to download`);
    
    // Download all images
    if (config.downloadImages) {
      for (let i = 0; i < images.length; i++) {
        const imgUrl = images[i].url;
        const urlParts = new URL(imgUrl);
        const filename = sanitizeFilename(path.basename(urlParts.pathname));
        
        // Add index to ensure unique filenames
        const indexedFilename = `${i+1}_${filename}`;
        
        await downloadImage(imgUrl, indexedFilename);
      }
    }
    
    // Extract projects
    if (config.fetchProjectDetails) {
      console.log("\nExtracting project details...");
      
      // Create a README file for the project collection
      let readmeContent = "# Kevin Grzejka Portfolio\n\n";
      readmeContent += "This directory contains a downloaded copy of Kevin Grzejka's portfolio from kev.studio.\n\n";
      readmeContent += "## Projects\n\n";
      
      // Find all project sections
      $('.project, article, .work-item, .portfolio-item').each(async (i, el) => {
        try {
          const projectData = await extractProjectData($, $(el));
          
          // Only process if we have a title
          if (projectData.title) {
            await createProjectFiles(projectData);
            
            // Add to README
            readmeContent += `### ${projectData.title}\n`;
            readmeContent += `${projectData.description || ''}\n\n`;
          }
        } catch (error) {
          console.error(`Error processing project: ${error.message}`);
        }
      });
      
      // Save README
      await writeFile(path.join(config.outputDir, 'README.md'), readmeContent);
      console.log('Created README.md with project index');
    }
    
    // Create a simple main page
    if (config.createIndexHtml) {
      console.log("\nCreating portfolio index page...");
      
      const mainPageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kevin Grzejka Portfolio</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            text-align: center;
            margin-bottom: 50px;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
        }
        .gallery-item {
            border: 1px solid #eee;
            border-radius: 5px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gallery-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .gallery-item img {
            width: 100%;
            height: auto;
            display: block;
        }
        .gallery-item-content {
            padding: 20px;
        }
        .gallery-item h2 {
            margin-top: 0;
            font-size: 1.5rem;
        }
        .gallery-item p {
            color: #666;
        }
        .gallery-item a {
            display: inline-block;
            margin-top: 10px;
            color: #4299e1;
            text-decoration: none;
        }
        .gallery-item a:hover {
            text-decoration: underline;
        }
        footer {
            margin-top: 60px;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <header>
        <h1>Kevin Grzejka Portfolio</h1>
        <p>A collection of design work and projects</p>
    </header>
    
    <div class="gallery">
        ${images.slice(0, 12).map((img, i) => `
        <div class="gallery-item">
            <img src="${i+1}_${sanitizeFilename(path.basename(new URL(img.url).pathname))}" alt="${img.alt}">
            <div class="gallery-item-content">
                <h2>Project ${i+1}</h2>
                <p>${img.alt || 'Portfolio work'}</p>
            </div>
        </div>
        `).join('')}
    </div>
    
    <footer>
        <p>Downloaded from kev.studio on ${new Date().toLocaleDateString()}</p>
    </footer>
</body>
</html>`;
      
      await writeFile(path.join(config.outputDir, 'main_page.html'), mainPageHtml);
      console.log('Created main_page.html');
    }
    
    console.log(`\nComplete! All content saved to: ${config.outputDir}`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Run the scraper
scrapePortfolio();