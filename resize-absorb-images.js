"use strict";

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { promisify } = require('util');

const mkdirAsync = promisify(fs.mkdir);

// Image paths
const imagesDir = path.join(__dirname, 'portfolio/images/absorb');
const optimizedDir = path.join(__dirname, 'portfolio/images/optimized/absorb');

// Create directories if they don't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Define target max width for different image types
const MAX_WIDTH = 1200;  // Standard content images
const HERO_WIDTH = 1600; // Hero images

// Track all async operations
const pendingTasks = [];

async function resizeImage(inputPath, outputPath, maxWidth) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  // Only resize if image is larger than target width
  if (metadata.width > maxWidth) {
    await image
      .resize({ width: maxWidth, withoutEnlargement: true })
      .toFile(outputPath);
    console.log(`Resized: ${path.basename(inputPath)} to ${maxWidth}px width`);
  } else {
    // If image is already smaller, just optimize it
    if (metadata.format === 'png') {
      await sharp(inputPath)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(outputPath);
    } else if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      await sharp(inputPath)
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(outputPath);
    } else {
      // For other formats, just copy
      fs.copyFileSync(inputPath, outputPath);
    }
    console.log(`Optimized: ${path.basename(inputPath)} (already under ${maxWidth}px width)`);
  }

  // Create WebP version as well
  const webpPath = outputPath.replace(/\.(png|jpg|jpeg)$/, '.webp');
  await image
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webpPath);
  console.log(`Created WebP: ${path.basename(webpPath)}`);
}

async function processAbsorbImages() {
  console.log('Starting Absorb Software image resizing...');
  
  // Get all files in the absorb directory
  const files = fs.readdirSync(imagesDir);
  
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(imagesDir, file);
      const outputPath = path.join(optimizedDir, file);
      
      // Hero image gets larger width
      if (file === '02-absorb-guidelines-wide-blue.png') {
        pendingTasks.push(resizeImage(inputPath, outputPath, HERO_WIDTH));
      } else {
        pendingTasks.push(resizeImage(inputPath, outputPath, MAX_WIDTH));
      }
    }
  }
  
  // Wait for all operations to complete
  await Promise.all(pendingTasks);
  console.log('All Absorb Software image resizing tasks completed!');
}

// Run the script
processAbsorbImages().catch(err => {
  console.error('Error in image resizing:', err);
  process.exit(1);
});