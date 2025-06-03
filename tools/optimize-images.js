"use strict";

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { promisify } = require('util');

const copyFileAsync = promisify(fs.copyFile);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const mkdirAsync = promisify(fs.mkdir);

const imagesDir = path.join(__dirname, '../portfolio/images');
const webpDir = path.join(imagesDir, 'webp');
const optimizedDir = path.join(imagesDir, 'optimized');

// Create output directories if they don't exist
if (!fs.existsSync(webpDir)) {
  fs.mkdirSync(webpDir, { recursive: true });
}

if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

const exts = ['.jpg', '.jpeg', '.png', '.gif'];

// Track all async operations
const pendingTasks = [];

// Process subdirectories recursively
async function walk(dir) {
  console.log(`Scanning directory: ${dir}`);
  
  const items = await readdirAsync(dir);
  
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = await statAsync(full);
    
    if (stat.isDirectory()) {
      // Skip webp and optimized directories to avoid recursion
      if (item !== 'webp' && item !== 'optimized') {
        pendingTasks.push(walk(full));
      }
    } else {
      const ext = path.extname(item).toLowerCase();
      if (exts.includes(ext)) {
        // Create relative path for output to maintain directory structure
        const relativePath = path.relative(imagesDir, dir);
        
        // Process file as WebP
        const webpOut = path.join(webpDir, path.join(relativePath, path.parse(item).name + '.webp'));
        
        // Create subdirectories in webp dir if needed
        if (relativePath) {
          const webpSubdir = path.join(webpDir, relativePath);
          if (!fs.existsSync(webpSubdir)) {
            await mkdirAsync(webpSubdir, { recursive: true });
          }
        }
        
        // Create WebP version (skip for GIFs since Sharp doesn't handle them well)
        if (ext !== '.gif') {
          pendingTasks.push(
            sharp(full)
              .webp({ quality: 80 })
              .toFile(webpOut)
              .then(() => console.log(`WebP: ${item}`))
              .catch(err => console.error(`Failed WebP ${item}:`, err))
          );
        } else {
          console.log(`Skipping WebP for GIF: ${item}`);
        }
          
        // Create optimized version in original format
        const optimizedOut = path.join(optimizedDir, path.join(relativePath, item));
        
        // Create subdirectories in optimized dir if needed
        if (relativePath) {
          const optimizedSubdir = path.join(optimizedDir, relativePath);
          if (!fs.existsSync(optimizedSubdir)) {
            await mkdirAsync(optimizedSubdir, { recursive: true });
          }
        }
        
        // For GIFs, just copy them as we can't process with sharp
        if (ext === '.gif') {
          pendingTasks.push(
            copyFileAsync(full, optimizedOut)
              .then(() => console.log(`Copied: ${item}`))
              .catch(err => console.error(`Failed to copy GIF ${item}:`, err))
          );
        } else {
          // Use appropriate optimization based on file type
          if (ext === '.png') {
            pendingTasks.push(
              sharp(full)
                .png({ quality: 85, compressionLevel: 9 })
                .toFile(optimizedOut)
                .then(() => console.log(`Optimized PNG: ${item}`))
                .catch(err => console.error(`Failed PNG ${item}:`, err))
            );
          } else {
            // For JPG/JPEG
            pendingTasks.push(
              sharp(full)
                .jpeg({ quality: 85, mozjpeg: true })
                .toFile(optimizedOut)
                .then(() => console.log(`Optimized JPEG: ${item}`))
                .catch(err => console.error(`Failed JPEG ${item}:`, err))
            );
          }
        }
      }
    }
  }
}

// Main function to run the optimization
async function optimizeImages() {
  console.log('Starting image optimization...');
  await walk(imagesDir);
  
  // Wait for all operations to complete
  await Promise.all(pendingTasks);
  console.log('All image optimization tasks completed!');
}

// Run the script
optimizeImages().catch(err => {
  console.error('Error in image optimization:', err);
  process.exit(1);
});