"use strict";

const fs = require('fs').promises;
const path = require('path');
const { execFile, spawn } = require('child_process');
const util = require('util');
const sharp = require('sharp');

const execFileAsync = util.promisify(execFile);

// Default configuration
const CONFIG = {
  maxWidth: 1200,
  webpQuality: 75,
  pngQuality: 90
};

/**
 * Check if ffmpeg is installed and available
 * @returns {Promise<boolean>} True if ffmpeg is available
 */
async function checkFfmpegAvailability() {
  try {
    await execFileAsync('ffmpeg', ['-version']);
    return true;
  } catch (error) {
    console.error('Error: ffmpeg is not installed or not in PATH.');
    console.error('Please install ffmpeg to use this script: https://ffmpeg.org/download.html');
    return false;
  }
}

/**
 * Extract the first frame from a video file
 * @param {string} videoPath Path to the video file
 * @param {string} outputPath Path to save the extracted frame
 * @returns {Promise<void>}
 */
async function extractStill(videoPath, outputPath) {
  await execFileAsync('ffmpeg', ['-y', '-i', videoPath, '-vframes', '1', outputPath]);
}

/**
 * Process all video files in the portfolio/images directory
 * @returns {Promise<void>}
 */
async function processVideos() {
  // Check if ffmpeg is available
  const ffmpegAvailable = await checkFfmpegAvailability();
  if (!ffmpegAvailable) {
    return;
  }

  const baseDir = path.join(__dirname, '../portfolio/images');
  const optimizedDir = path.join(baseDir, 'optimized');
  const webpDir = path.join(baseDir, 'webp');

  let processedCount = 0;
  let successCount = 0;
  let errorCount = 0;

  console.log('Starting video still extraction...');
  console.log(`Using settings: max width=${CONFIG.maxWidth}px, WebP quality=${CONFIG.webpQuality}%`);

  const projects = await fs.readdir(baseDir);
  for (const project of projects) {
    const projectDir = path.join(baseDir, project);
    const stat = await fs.stat(projectDir).catch(() => null);
    if (!stat || !stat.isDirectory() || project === 'optimized' || project === 'webp') {
      continue;
    }

    const files = await fs.readdir(projectDir);
    const videoFiles = files.filter(file => path.extname(file).toLowerCase() === '.mp4');
    
    if (videoFiles.length > 0) {
      console.log(`Found ${videoFiles.length} video file(s) in ${project}/`);
    }

    for (const file of videoFiles) {
      processedCount++;
      const baseName = path.parse(file).name;
      const stillDir = path.join(optimizedDir, project);
      const webpDirProject = path.join(webpDir, project);
      await fs.mkdir(stillDir, { recursive: true });
      await fs.mkdir(webpDirProject, { recursive: true });

      const pngOutput = path.join(stillDir, `${baseName}_still.png`);
      const webpOutput = path.join(webpDirProject, `${baseName}_still.webp`);

      console.log(`Processing: ${project}/${file}...`);
      try {
        await extractStill(path.join(projectDir, file), pngOutput);
        console.log(`Created PNG: ${pngOutput}`);
        
        await sharp(pngOutput)
          .resize({ width: CONFIG.maxWidth, withoutEnlargement: true })
          .webp({ quality: CONFIG.webpQuality })
          .toFile(webpOutput);
          
        console.log(`Created WebP: ${webpOutput}`);
        successCount++;
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
        errorCount++;
      }
    }
  }

  // Print summary
  console.log('\n===== Video Still Extraction Summary =====');
  console.log(`Total videos processed: ${processedCount}`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${errorCount}`);
  console.log('=========================================');
}

processVideos().catch(err => {
  console.error('Error extracting video stills:', err);
  process.exit(1);
});
