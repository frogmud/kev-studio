"use strict";

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, '../portfolio/images/abra');
const optimizedDir = path.join(__dirname, '../portfolio/images/optimized/abra');
const webpDir = path.join(__dirname, '../portfolio/images/webp/abra');

// Make sure target directories exist
async function ensureDirExists(dir) {
  try {
    await fs.access(dir);
  } catch (error) {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function resizeAndOptimize() {
  console.log('Starting Abra image optimization with resizing...');
  
  // Ensure directories exist
  await ensureDirExists(optimizedDir);
  await ensureDirExists(webpDir);
  
  // Get list of all files in the source directory
  const files = await fs.readdir(sourceDir);
  
  // Process each file
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const optimizedPath = path.join(optimizedDir, file);
    const webpPath = path.join(webpDir, path.parse(file).name + '.webp');
    
    // Get file stats
    const stats = await fs.stat(sourcePath);
    
    // Skip directories
    if (stats.isDirectory()) continue;
    
    // Get file extension
    const ext = path.extname(file).toLowerCase();
    
    // Process based on file type
    try {
      if (ext === '.gif' || ext === '.mp4') {
        // For GIFs and videos, just copy them
        await fs.copyFile(sourcePath, optimizedPath);
        console.log(`Copied: ${file}`);
      } else if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        // Create Sharp instance
        let sharpInstance = sharp(sourcePath);
        
        // Get image metadata
        const metadata = await sharpInstance.metadata();
        
        // Resize if larger than 1200px on any dimension
        if (metadata.width > 1200 || metadata.height > 1200) {
          sharpInstance = sharpInstance.resize({
            width: Math.min(metadata.width, 1200),
            height: Math.min(metadata.height, 1200),
            fit: 'inside',
            withoutEnlargement: true
          });
          console.log(`Resizing ${file} to max 1200px`);
        }
        
        // Process based on file type
        if (ext === '.png') {
          // Save optimized PNG
          await sharpInstance
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(optimizedPath);
          console.log(`Optimized PNG: ${file}`);
          
          // Save WebP version
          await sharpInstance
            .webp({ quality: 75 })
            .toFile(webpPath);
          console.log(`Created WebP: ${path.parse(file).name}.webp`);
        } else {
          // Save optimized JPEG
          await sharpInstance
            .jpeg({ quality: 80, mozjpeg: true })
            .toFile(optimizedPath);
          console.log(`Optimized JPEG: ${file}`);
          
          // Save WebP version
          await sharpInstance
            .webp({ quality: 75 })
            .toFile(webpPath);
          console.log(`Created WebP: ${path.parse(file).name}.webp`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  console.log('Abra image optimization completed!');
}

// Run the script
resizeAndOptimize().catch(err => {
  console.error('Error in image optimization:', err);
  process.exit(1);
});