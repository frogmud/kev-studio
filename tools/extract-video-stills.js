"use strict";

const fs = require('fs').promises;
const path = require('path');
const { execFile } = require('child_process');
const util = require('util');
const sharp = require('sharp');

const execFileAsync = util.promisify(execFile);

async function extractStill(videoPath, outputPath) {
  await execFileAsync('ffmpeg', ['-y', '-i', videoPath, '-vframes', '1', outputPath]);
}

async function processVideos() {
  const baseDir = path.join(__dirname, '../portfolio/images');
  const optimizedDir = path.join(baseDir, 'optimized');
  const webpDir = path.join(baseDir, 'webp');

  const projects = await fs.readdir(baseDir);
  for (const project of projects) {
    const projectDir = path.join(baseDir, project);
    const stat = await fs.stat(projectDir).catch(() => null);
    if (!stat || !stat.isDirectory() || project === 'optimized' || project === 'webp') {
      continue;
    }

    const files = await fs.readdir(projectDir);
    for (const file of files) {
      if (path.extname(file).toLowerCase() === '.mp4') {
        const baseName = path.parse(file).name;
        const stillDir = path.join(optimizedDir, project);
        const webpDirProject = path.join(webpDir, project);
        await fs.mkdir(stillDir, { recursive: true });
        await fs.mkdir(webpDirProject, { recursive: true });

        const pngOutput = path.join(stillDir, `${baseName}_still.png`);
        const webpOutput = path.join(webpDirProject, `${baseName}_still.webp`);

        console.log(`Extracting first frame from ${project}/${file}...`);
        try {
          await extractStill(path.join(projectDir, file), pngOutput);
          console.log(`Created PNG: ${pngOutput}`);
          await sharp(pngOutput)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(webpOutput);
          console.log(`Created WebP: ${webpOutput}`);
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
        }
      }
    }
  }

  console.log('Video still extraction completed!');
}

processVideos().catch(err => {
  console.error('Error extracting video stills:', err);
  process.exit(1);
});
