"use strict";

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Paths
const sourcePath = path.join(__dirname, 'all_images_backup', 'Autonomy');
const optimizedPath = path.join(__dirname, 'portfolio', 'images', 'optimized', 'autonomy_capital');
const webpPath = path.join(__dirname, 'portfolio', 'images', 'webp', 'autonomy_capital');

// Create directories if they don't exist
if (!fs.existsSync(optimizedPath)) {
  fs.mkdirSync(optimizedPath, { recursive: true });
}

if (!fs.existsSync(webpPath)) {
  fs.mkdirSync(webpPath, { recursive: true });
}

// Process images
async function processImages() {
  try {
    // Get list of image files
    const files = fs.readdirSync(sourcePath).filter(file => 
      file.toLowerCase().endsWith('.png') || 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg')
    );

    console.log(`Found ${files.length} images to process`);

    // Process each image
    for (const file of files) {
      const sourceFp = path.join(sourcePath, file);
      const optimizedFp = path.join(optimizedPath, file);
      const webpFp = path.join(webpPath, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

      console.log(`Processing ${file}...`);

      // Copy the optimized version (PNG/JPG)
      await sharp(sourceFp)
        .resize({ width: 1920, withoutEnlargement: true })
        .toFile(optimizedFp);

      // Create WebP version
      await sharp(sourceFp)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(webpFp);

      console.log(`✓ Processed ${file}`);
    }

    console.log('All images processed successfully!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();