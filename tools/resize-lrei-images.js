"use strict";

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, '../portfolio/images/lrei');
const optimizedDir = path.join(__dirname, '../portfolio/images/optimized/lrei');
const webpDir = path.join(__dirname, '../portfolio/images/webp/lrei');

// Make sure target directories exist
async function ensureDirExists(dir) {
  try {
    await fs.access(dir);
  } catch (error) {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function resizeAndOptimize() {
  console.log('Starting LREI image optimization with resizing...');
  
  // Ensure directories exist
  await ensureDirExists(optimizedDir);
  await ensureDirExists(webpDir);
  
  // Get list of all files in the source directory
  const files = await fs.readdir(sourceDir);
  
  // Also check for any 'additional' subdirectory
  const additionalDir = path.join(sourceDir, 'additional');
  let additionalFiles = [];
  try {
    const additionalDirExists = await fs.access(additionalDir).then(() => true).catch(() => false);
    if (additionalDirExists) {
      additionalFiles = (await fs.readdir(additionalDir)).map(file => path.join('additional', file));
      console.log(`Found ${additionalFiles.length} files in additional directory`);
    }
  } catch (error) {
    console.log('No additional directory found or error accessing it:', error);
  }
  
  // Combine all files
  const allFiles = [...files, ...additionalFiles];
  
  // Process each file
  for (const file of allFiles) {
    const sourcePath = path.join(sourceDir, file);
    const optimizedPath = path.join(optimizedDir, file);
    const webpPath = path.join(webpDir, 
      file.includes('/') 
        ? path.join(path.dirname(file), path.parse(file).name + '.webp')
        : path.parse(file).name + '.webp'
    );
    
    // Ensure parent directory exists for nested files
    if (file.includes('/')) {
      const optimizedParentDir = path.dirname(optimizedPath);
      const webpParentDir = path.dirname(webpPath);
      await ensureDirExists(optimizedParentDir);
      await ensureDirExists(webpParentDir);
    }
    
    // Get file stats
    const stats = await fs.stat(sourcePath);
    
    // Skip directories
    if (stats.isDirectory()) continue;
    
    // Get file extension
    const ext = path.extname(file).toLowerCase();
    
    // Process based on file type
    try {
      if (ext === '.gif') {
        // For GIFs, use sharp to resize if possible
        try {
          let sharpInstance = sharp(sourcePath, { animated: true });
          
          // Get image metadata
          const metadata = await sharpInstance.metadata();
          
          // Resize if larger than 800px on any dimension
          if (metadata.width > 800 || metadata.height > 800) {
            await sharpInstance
              .resize({
                width: Math.min(metadata.width, 800),
                height: Math.min(metadata.height, 800),
                fit: 'inside',
                withoutEnlargement: true
              })
              .toFile(optimizedPath);
            console.log(`Resized GIF: ${file} to max 800px`);
            
            // Try to create a WebP version of the GIF
            try {
              await sharpInstance
                .webp({ quality: 65 })
                .toFile(webpPath);
              console.log(`Created animated WebP: ${path.parse(file).name}.webp`);
            } catch (webpError) {
              console.error(`Couldn't create animated WebP for ${file}:`, webpError);
            }
          } else {
            // If not resizing, just copy
            await fs.copyFile(sourcePath, optimizedPath);
            console.log(`Copied GIF (already small): ${file}`);
            
            // Still try to create a WebP version
            try {
              await sharp(sourcePath, { animated: true })
                .webp({ quality: 65 })
                .toFile(webpPath);
              console.log(`Created animated WebP: ${path.parse(file).name}.webp`);
            } catch (webpError) {
              console.error(`Couldn't create animated WebP for ${file}:`, webpError);
            }
          }
        } catch (error) {
          // If resizing fails, just copy the original
          console.error(`Error resizing GIF ${file}, copying original instead:`, error);
          await fs.copyFile(sourcePath, optimizedPath);
          console.log(`Copied GIF (couldn't resize): ${file}`);
        }
      } else if (ext === '.mp4') {
        // For videos, just copy them
        await fs.copyFile(sourcePath, optimizedPath);
        console.log(`Copied: ${file}`);
      } else if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        // Create Sharp instance
        let sharpInstance = sharp(sourcePath);
        
        // Get image metadata
        const metadata = await sharpInstance.metadata();
        
        // Resize if larger than 800px on any dimension
        if (metadata.width > 800 || metadata.height > 800) {
          sharpInstance = sharpInstance.resize({
            width: Math.min(metadata.width, 800),
            height: Math.min(metadata.height, 800),
            fit: 'inside',
            withoutEnlargement: true
          });
          console.log(`Resizing ${file} to max 800px`);
        }
        
        // Process based on file type
        if (ext === '.png') {
          // Save optimized PNG
          await sharpInstance
            .png({ quality: 70, compressionLevel: 9 })
            .toFile(optimizedPath);
          console.log(`Optimized PNG: ${file}`);
          
          // Save WebP version
          await sharpInstance
            .webp({ quality: 65 })
            .toFile(webpPath);
          console.log(`Created WebP: ${path.parse(file).name}.webp`);
        } else {
          // Save optimized JPEG
          await sharpInstance
            .jpeg({ quality: 70, mozjpeg: true })
            .toFile(optimizedPath);
          console.log(`Optimized JPEG: ${file}`);
          
          // Save WebP version
          await sharpInstance
            .webp({ quality: 65 })
            .toFile(webpPath);
          console.log(`Created WebP: ${path.parse(file).name}.webp`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  console.log('LREI image optimization completed!');
}

// Run the script
resizeAndOptimize().catch(err => {
  console.error('Error in image optimization:', err);
  process.exit(1);
});