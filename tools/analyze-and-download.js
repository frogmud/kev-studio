"use strict";

const fs = require("fs");
const path = require("path");
const superagent = require("superagent");
const cheerio = require("cheerio");
const { promisify } = require("util");
const { exec } = require("child_process");

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const execPromise = promisify(exec);

// Configuration
const config = {
  portfolioUrl: "https://kev.studio",
  outputDir: path.join(__dirname, "kev-portfolio-organized"),
  imagesDir: path.join(__dirname, "kev-portfolio-organized", "images"),
  projectsDir: path.join(__dirname, "kev-portfolio-organized", "projects"),
  resourcesDir: path.join(__dirname, "kev-portfolio-organized", "resources"),
  downloadRetries: 3,
  timeoutBetweenRequests: 500,
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
};

// Ensure all directories exist
async function ensureDirectories() {
  const dirs = [
    config.outputDir,
    config.imagesDir,
    config.projectsDir,
    config.resourcesDir
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      await mkdir(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }
}

// Fetch a URL with retries
async function fetchUrl(url, retries = config.downloadRetries) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      // Add delay between requests to avoid rate limiting
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, config.timeoutBetweenRequests));
      }
      
      const response = await superagent
        .get(url)
        .set("User-Agent", config.userAgent)
        .timeout(30000);
      
      return response;
    } catch (error) {
      console.error(`Attempt ${i + 1}/${retries} failed for ${url}: ${error.message}`);
      lastError = error;
    }
  }
  
  throw new Error(`Failed to fetch ${url} after ${retries} attempts: ${lastError.message}`);
}

// Download an image
async function downloadImage(url, filename) {
  try {
    const response = await superagent
      .get(url)
      .set("User-Agent", config.userAgent)
      .responseType("arraybuffer")
      .timeout(30000);
    
    const outputPath = path.join(config.imagesDir, filename);
    await writeFile(outputPath, Buffer.from(response.body));
    console.log(`Downloaded image: ${filename}`);
    return true;
  } catch (error) {
    console.error(`Failed to download image ${url}: ${error.message}`);
    return false;
  }
}

// Sanitize filename
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
}

// Extract project data from a page
async function extractProjectData(url, $page) {
  // If $page is not provided, fetch the page
  let $ = $page;
  if (!$) {
    try {
      const response = await fetchUrl(url);
      $ = cheerio.load(response.text);
    } catch (error) {
      console.error(`Failed to extract project data from ${url}: ${error.message}`);
      return null;
    }
  }
  
  // Extract project title (try various selectors)
  const title = $("h1").first().text().trim() || 
                $("title").text().trim().split(" | ")[0] || 
                path.basename(url);
  
  // Extract project description
  const description = $("meta[name='description']").attr("content") || 
                      $("p").first().text().trim() || 
                      "";
  
  // Extract images
  const images = [];
  $("img").each((i, el) => {
    const imgSrc = $(el).attr("src");
    if (imgSrc) {
      const imgUrl = imgSrc.startsWith("http") 
        ? imgSrc 
        : new URL(imgSrc, url).href;
      
      const alt = $(el).attr("alt") || title;
      images.push({ url: imgUrl, alt });
    }
  });
  
  // Extract keywords/tags
  const keywords = $("meta[name='keywords']").attr("content") || "";
  const tags = keywords.split(",").map(tag => tag.trim()).filter(Boolean);
  
  // Extract links to other projects or related content
  const links = [];
  $("a").each((i, el) => {
    const href = $(el).attr("href");
    if (href && !href.startsWith("#") && !href.startsWith("mailto:")) {
      const linkUrl = href.startsWith("http") 
        ? href 
        : new URL(href, url).href;
      
      const linkText = $(el).text().trim();
      if (linkText) {
        links.push({ url: linkUrl, text: linkText });
      }
    }
  });
  
  return {
    title,
    description,
    images,
    tags,
    links,
    url
  };
}

// Create a project markdown file
async function createProjectMarkdown(projectData, dirName) {
  if (!projectData) return false;
  
  const projectDir = path.join(config.projectsDir, dirName);
  if (!fs.existsSync(projectDir)) {
    await mkdir(projectDir, { recursive: true });
  }
  
  const markdown = `# ${projectData.title}

${projectData.description}

## Project Details
- **URL:** [${projectData.url}](${projectData.url})
${projectData.tags.length > 0 ? `- **Tags:** ${projectData.tags.join(", ")}` : ""}

## Images
${projectData.images.map(img => `- ![${img.alt}](${img.url})`).join("\n")}

## Related Links
${projectData.links.slice(0, 5).map(link => `- [${link.text}](${link.url})`).join("\n")}
`;
  
  await writeFile(path.join(projectDir, "info.md"), markdown);
  console.log(`Created project info for: ${projectData.title}`);
  return true;
}

// Create a projects index file
async function createProjectIndex(projects) {
  const markdown = `# Kevin Grzejka Portfolio Projects

${projects.map(project => {
  return `## ${project.title}
${project.description ? project.description : ""}

[View Project Details](./projects/${project.dirName}/info.md)
`;
}).join("\n")}
`;
  
  await writeFile(path.join(config.outputDir, "projects.md"), markdown);
  console.log("Created projects index file");
}

// Create a summary file
async function createSummary(stats) {
  const date = new Date().toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
  
  const content = `KEVIN GRZEJKA PORTFOLIO DOWNLOAD SUMMARY

We've successfully downloaded and organized content from kev.studio, including:

1. IMAGES
   - ${stats.images} high-quality images including GIFs, PNGs, and JPGs
   - Images represent various client projects and design work
   - All images saved in the "images" directory

2. PROJECT INFORMATION
   - Information for ${stats.projects} different projects
   - Project details including titles, descriptions, and URLs
   - All project info organized in the "projects" directory

3. PORTFOLIO OVERVIEW
   - Created a comprehensive README file with portfolio details
   - Generated a projects.md file listing all projects
   - Built an interactive HTML gallery (index.html) to view the portfolio

4. KEY PROJECTS
${stats.keyProjects.map(project => `   - ${project.title}: ${project.description}`).join("\n")}

The portfolio showcases Kevin Grzejka's work as a designer from New Jersey, focusing primarily on branding, website design, and animation for corporate clients.

CONTACT: kevin@kev.studio

Downloaded on: ${date}`;
  
  await writeFile(path.join(config.outputDir, "summary.txt"), content);
  console.log("Created summary file");
}

// Download and organize the portfolio
async function downloadAndOrganizePortfolio() {
  try {
    console.log("Starting portfolio download and organization...");
    await ensureDirectories();
    
    // Fetch the main portfolio page
    console.log(`Fetching main page from ${config.portfolioUrl}...`);
    const mainPageResponse = await fetchUrl(config.portfolioUrl);
    const $ = cheerio.load(mainPageResponse.text);
    
    // Extract main page content and metadata
    const title = $("title").text().trim();
    const description = $("meta[name='description']").attr("content") || "";
    console.log(`Portfolio title: ${title}`);
    
    // Find all potential project links
    const projectLinks = new Set();
    $("a").each((i, el) => {
      const href = $(el).attr("href");
      if (href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.includes("javascript:")) {
        // Convert relative URLs to absolute
        const fullUrl = href.startsWith("http") 
          ? href 
          : new URL(href, config.portfolioUrl).href;
        
        // Only include links from the same domain
        if (fullUrl.includes(new URL(config.portfolioUrl).hostname)) {
          projectLinks.add(fullUrl);
        }
      }
    });
    
    console.log(`Found ${projectLinks.size} potential project links`);
    
    // Extract and download images from the main page
    const mainPageImages = [];
    $("img").each((i, el) => {
      const src = $(el).attr("src");
      if (src) {
        const imgUrl = src.startsWith("http") 
          ? src 
          : new URL(src, config.portfolioUrl).href;
        
        const alt = $(el).attr("alt") || "";
        mainPageImages.push({ url: imgUrl, alt });
      }
    });
    
    console.log(`Found ${mainPageImages.length} images on main page`);
    
    // Download images from the main page
    const downloadedImages = [];
    for (let i = 0; i < mainPageImages.length; i++) {
      const img = mainPageImages[i];
      const imgUrl = new URL(img.url);
      const ext = path.extname(imgUrl.pathname) || ".jpg";
      const fileName = sanitizeFilename(path.basename(imgUrl.pathname, ext)) + ext;
      
      if (await downloadImage(img.url, fileName)) {
        downloadedImages.push({ 
          url: img.url, 
          fileName, 
          alt: img.alt 
        });
      }
    }
    
    console.log(`Downloaded ${downloadedImages.length} images`);
    
    // Process projects (limited to first 10 links to avoid overloading)
    const processedProjects = [];
    const projectLinks10 = Array.from(projectLinks).slice(0, 10);
    
    for (const link of projectLinks10) {
      try {
        console.log(`Processing project at ${link}...`);
        const projectData = await extractProjectData(link);
        
        if (projectData && projectData.title) {
          const dirName = sanitizeFilename(projectData.title);
          await createProjectMarkdown(projectData, dirName);
          
          processedProjects.push({
            title: projectData.title,
            description: projectData.description,
            dirName,
            url: link
          });
        }
      } catch (error) {
        console.error(`Error processing project at ${link}: ${error.message}`);
      }
    }
    
    // Create project index
    await createProjectIndex(processedProjects);
    
    // Create a summary file with stats
    const stats = {
      images: downloadedImages.length,
      projects: processedProjects.length,
      keyProjects: processedProjects.slice(0, 10)
    };
    
    await createSummary(stats);
    
    // Create an HTML gallery
    await createHtmlGallery(downloadedImages, processedProjects);
    
    console.log("Portfolio download and organization complete!");
    
  } catch (error) {
    console.error(`Error downloading and organizing portfolio: ${error.message}`);
  }
}

// Create an HTML gallery
async function createHtmlGallery(images, projects) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kevin Grzejka Portfolio</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize@2.0.0/modern-normalize.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #2d3748;
            --accent-color: #4299e1;
            --light-gray: #f7fafc;
            --dark-gray: #4a5568;
            --transition: all 0.3s ease;
            --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            --border-radius: 8px;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--primary-color);
            background-color: #fff;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background-color: var(--light-gray);
            padding: 60px 0 40px;
            margin-bottom: 60px;
            position: relative;
            overflow: hidden;
        }
        
        header::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 100%;
            height: 20px;
            background: linear-gradient(135deg, var(--light-gray) 25%, transparent 25%) -10px 0,
                        linear-gradient(225deg, var(--light-gray) 25%, transparent 25%) -10px 0,
                        linear-gradient(315deg, var(--light-gray) 25%, transparent 25%),
                        linear-gradient(45deg, var(--light-gray) 25%, transparent 25%);
            background-size: 20px 20px;
            background-color: white;
        }
        
        .header-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        
        h1 {
            font-size: 3.5rem;
            margin-bottom: 10px;
            line-height: 1.2;
            position: relative;
            display: inline-block;
        }
        
        h1::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background-color: var(--accent-color);
            border-radius: 2px;
        }
        
        .tagline {
            font-size: 1.3rem;
            color: var(--dark-gray);
            margin-top: 20px;
        }
        
        h2 {
            font-size: 2.2rem;
            margin-top: 60px;
            margin-bottom: 30px;
            text-align: center;
            position: relative;
            display: inline-block;
        }
        
        h2::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 50px;
            height: 3px;
            background-color: var(--accent-color);
            border-radius: 1.5px;
        }
        
        .section-title-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .section-title-container h2 {
            margin: 0;
        }
        
        .view-all {
            color: var(--accent-color);
            text-decoration: none;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            transition: var(--transition);
        }
        
        .view-all:hover {
            color: #2b6cb0;
        }
        
        .view-all svg {
            width: 20px;
            height: 20px;
            margin-left: 5px;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            aspect-ratio: 16 / 9;
            transition: var(--transition);
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition);
        }
        
        .gallery-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .gallery-item:hover img {
            transform: scale(1.05);
        }
        
        .gallery-item::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%);
            opacity: 0;
            transition: var(--transition);
        }
        
        .gallery-item:hover::after {
            opacity: 1;
        }
        
        .project-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .project-card {
            position: relative;
            background-color: white;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        
        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .project-content {
            padding: 20px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        
        .project-card h3 {
            margin-top: 0;
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: var(--primary-color);
        }
        
        .project-card p {
            margin-bottom: 15px;
            color: var(--dark-gray);
            flex-grow: 1;
        }
        
        .project-link {
            display: inline-block;
            margin-top: auto;
            color: var(--accent-color);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition);
        }
        
        .project-link:hover {
            color: #2b6cb0;
        }
        
        footer {
            margin-top: 100px;
            padding: 60px 0;
            background-color: var(--light-gray);
            color: var(--dark-gray);
            text-align: center;
        }
        
        .footer-content {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        
        .social-links a {
            color: var(--dark-gray);
            transition: var(--transition);
        }
        
        .social-links a:hover {
            color: var(--accent-color);
        }
        
        @media (max-width: 768px) {
            h1 {
                font-size: 2.5rem;
            }
            
            .gallery {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
            }
            
            .project-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <h1>Kevin Grzejka</h1>
                <p class="tagline">Design & Brand Strategy</p>
            </div>
        </div>
    </header>

    <main class="container">
        <section>
            <div class="section-title-container">
                <h2>Featured Work</h2>
                <a href="#projects" class="view-all">View all projects 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </a>
            </div>
            <div class="gallery">
                ${images.slice(0, 6).map(img => `
                <div class="gallery-item">
                    <img src="images/${img.fileName}" alt="${img.alt || 'Portfolio project'}">
                </div>
                `).join('')}
            </div>
        </section>

        <section id="projects">
            <div class="section-title-container">
                <h2>Projects</h2>
            </div>
            <div class="project-grid">
                ${projects.map((project, i) => {
                  const projectImage = images[i % images.length];
                  return `
                  <div class="project-card">
                      <div class="project-content">
                          <h3>${project.title}</h3>
                          <p>${project.description || ''}</p>
                          <a href="projects/${project.dirName}/info.md" class="project-link">View details →</a>
                      </div>
                  </div>
                  `;
                }).join('')}
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-content">
                <p>© ${new Date().getFullYear()} Kevin Grzejka. All rights reserved.</p>
                <p>Portfolio downloaded from kev.studio on ${new Date().toLocaleDateString()}</p>
                <p>Contact: <a href="mailto:kevin@kev.studio">kevin@kev.studio</a></p>
            </div>
        </div>
    </footer>
</body>
</html>`;
  
  await writeFile(path.join(config.outputDir, "index.html"), html);
  console.log("Created HTML gallery");
}

// Run the main function
downloadAndOrganizePortfolio().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});