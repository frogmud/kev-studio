"use strict";

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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

// Process subdirectories recursively
function walk(dir) {
  console.log(`Scanning directory: ${dir}`);
  
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    
    if (stat.isDirectory()) {
      // Skip webp and optimized directories to avoid recursion
      if (item !== 'webp' && item !== 'optimized') {
        walk(full);
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
            fs.mkdirSync(webpSubdir, { recursive: true });
          }
        }
        
        // Create WebP version (skip for GIFs since Sharp doesn't handle them well)
        if (ext !== '.gif') {
          sharp(full)
            .webp({ quality: 80 })
            .toFile(webpOut)
            .then(() => console.log(`WebP: ${item}`))
            .catch(err => console.error(`Failed WebP ${item}:`, err));
        } else {
          console.log(`Skipping WebP for GIF: ${item}`);
        }
          
        // Create optimized version in original format
        const optimizedOut = path.join(optimizedDir, path.join(relativePath, item));
        
        // Create subdirectories in optimized dir if needed
        if (relativePath) {
          const optimizedSubdir = path.join(optimizedDir, relativePath);
          if (!fs.existsSync(optimizedSubdir)) {
            fs.mkdirSync(optimizedSubdir, { recursive: true });
          }
        }
        
        // For GIFs, just copy them as we can't process with sharp
        if (ext === '.gif') {
          fs.copyFile(full, optimizedOut, (err) => {
            if (err) {
              console.error(`Failed to copy GIF ${item}:`, err);
            } else {
              console.log(`Copied: ${item}`);
            }
          });
        } else {
          // Use appropriate optimization based on file type
          if (ext === '.png') {
            sharp(full)
              .png({ quality: 85, compressionLevel: 9 })
              .toFile(optimizedOut)
              .then(() => console.log(`Optimized PNG: ${item}`))
              .catch(err => console.error(`Failed PNG ${item}:`, err));
          } else {
            // For JPG/JPEG
            sharp(full)
              .jpeg({ quality: 85, mozjpeg: true })
              .toFile(optimizedOut)
              .then(() => console.log(`Optimized JPEG: ${item}`))
              .catch(err => console.error(`Failed JPEG ${item}:`, err));
          }
        }
      }
    }
  }
}

console.log('Starting image optimization...');
walk(imagesDir);