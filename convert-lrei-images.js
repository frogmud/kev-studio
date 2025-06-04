"use strict";

const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

async function convertToWebp(inputPath, outputPath) {
  try {
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });
    
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`Successfully converted image to WebP format: ${outputPath}`);
  } catch (error) {
    console.error(`Error converting image to WebP (${inputPath}):`, error);
  }
}

async function convertAllLreiImages() {
  const baseInputDir = '/Users/kevin/Desktop/WEBSITES/PORTFOLIO/portfolio/images/optimized/lrei';
  const baseOutputDir = '/Users/kevin/Desktop/WEBSITES/PORTFOLIO/portfolio/images/webp/lrei';
  
  const images = [
    'LREI_2_ViewBook.png',
    'LREI_3_ViewBook.png',
    'LREI_5_ViewBook.png',
    'LREI_6_ViewBook.png',
    'LREI_8_ViewBook.png',
    'LREI_9_Analog.png'
  ];
  
  for (const image of images) {
    const inputPath = path.join(baseInputDir, image);
    const outputPath = path.join(baseOutputDir, image.replace(/\.(png|jpg|jpeg)$/, '.webp'));
    
    await convertToWebp(inputPath, outputPath);
  }
  
  console.log('All LREI images converted to WebP format.');
}

convertAllLreiImages();