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
              .resize({
                width: 800,
                height: 800,
                fit: 'inside',
                withoutEnlargement: true
              })
              .webp({ quality: 70 })
              .toFile(webpOut)
              .then(() => console.log(`Created WebP (max 800px): ${item}`))
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
        
        // For GIFs, try to resize them with sharp
        if (ext === '.gif') {
          pendingTasks.push(
            (async () => {
              try {
                // First check the dimensions
                const metadata = await sharp(full, { animated: true }).metadata();
                
                // Resize if larger than 800px on any dimension
                if (metadata.width > 800 || metadata.height > 800) {
                  await sharp(full, { animated: true })
                    .resize({
                      width: 800,
                      height: 800,
                      fit: 'inside',
                      withoutEnlargement: true
                    })
                    .toFile(optimizedOut);
                  console.log(`Resized GIF: ${item} to max 800px`);
                  
                  // Try to create a WebP version
                  const webpAnimated = path.join(webpDir, path.join(relativePath, path.parse(item).name + '.webp'));
                  await sharp(optimizedOut, { animated: true })
                    .webp({ quality: 70 })
                    .toFile(webpAnimated);
                  console.log(`Created animated WebP: ${path.parse(item).name}.webp`);
                } else {
                  // If already small, just copy
                  await copyFileAsync(full, optimizedOut);
                  console.log(`Copied GIF (already small): ${item}`);
                }
              } catch (err) {
                // Fallback to copying if sharp can't process
                console.error(`Failed to resize GIF ${item}, copying original instead:`, err);
                await copyFileAsync(full, optimizedOut);
                console.log(`Copied GIF (couldn't resize): ${item}`);
              }
            })()
          );
        } else {
          // Use appropriate optimization based on file type
          if (ext === '.png') {
            pendingTasks.push(
              sharp(full)
                .resize({
                  width: 800,
                  height: 800,
                  fit: 'inside',
                  withoutEnlargement: true
                })
                .png({ quality: 70, compressionLevel: 9 })
                .toFile(optimizedOut)
                .then(() => console.log(`Optimized PNG (max 800px): ${item}`))
                .catch(err => console.error(`Failed PNG ${item}:`, err))
            );
          } else {
            // For JPG/JPEG
            pendingTasks.push(
              sharp(full)
                .resize({
                  width: 800,
                  height: 800,
                  fit: 'inside',
                  withoutEnlargement: true
                })
                .jpeg({ quality: 70, mozjpeg: true })
                .toFile(optimizedOut)
                .then(() => console.log(`Optimized JPEG (max 800px): ${item}`))
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