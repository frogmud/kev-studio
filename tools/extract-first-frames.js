"use strict";

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

async function extractFirstFrames() {
  console.log('Extracting first frames from Abra animated files...');
  
  const sourceDir = path.join(__dirname, '../portfolio/images/abra');
  const optimizedDir = path.join(__dirname, '../portfolio/images/optimized/abra');
  const webpDir = path.join(__dirname, '../portfolio/images/webp/abra');
  
  // Ensure directories exist
  try {
    await fs.access(optimizedDir);
  } catch (error) {
    await fs.mkdir(optimizedDir, { recursive: true });
  }
  
  try {
    await fs.access(webpDir);
  } catch (error) {
    await fs.mkdir(webpDir, { recursive: true });
  }
  
  // Files to extract first frames from
  const files = [
    '04_Abra_TrainPosters_YG21_Grzejka.gif',
    '12_Abra_LogoSketches_YG21_Grzejka.gif'
  ];
  
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const baseName = path.parse(file).name;
    const pngOutput = path.join(optimizedDir, `${baseName}_still.png`);
    const webpOutput = path.join(webpDir, `${baseName}_still.webp`);
    
    try {
      // Extract first frame from GIF
      const image = sharp(sourcePath, { page: 0 });
      
      // Get metadata
      const metadata = await image.metadata();
      
      // Resize if larger than 1200px on any dimension
      if (metadata.width > 1200 || metadata.height > 1200) {
        image.resize({
          width: Math.min(metadata.width, 1200),
          height: Math.min(metadata.height, 1200),
          fit: 'inside',
          withoutEnlargement: true
        });
      }
      
      // Save as PNG
      await image
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(pngOutput);
      console.log(`Extracted first frame as PNG: ${pngOutput}`);
      
      // Save as WebP
      await image
        .webp({ quality: 75 })
        .toFile(webpOutput);
      console.log(`Extracted first frame as WebP: ${webpOutput}`);
      
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  console.log('First frame extraction completed!');
}

// Run the script
extractFirstFrames().catch(err => {
  console.error('Error extracting frames:', err);
  process.exit(1);
});