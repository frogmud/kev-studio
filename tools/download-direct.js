"use strict"

const fs = require("fs");
const path = require("path");
const superagent = require("superagent");

const outputDir = path.join(__dirname, "kev-studio-assets");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper function to download an image
async function downloadImage(url, filename) {
  try {
    console.log(`Downloading: ${url}`);
    const response = await superagent.get(url).responseType('arraybuffer');
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, response.body);
    console.log(`Saved: ${filename}`);
    return true;
  } catch (error) {
    console.error(`Failed to download ${url}: ${error.message}`);
    return false;
  }
}

// Helper function to sanitize filenames
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
}

// List of image URLs found on the site
const imageUrls = [
  "https://freight.cargo.site/t/original/i/b656386c7e764273111e7a17dee65986fde349ee94a49d8a32e9e61fb0602004/01-absorb-3d-prism-howto-wide-v2.gif",
  "https://freight.cargo.site/t/original/i/1859b8973c66f0f61e447e09fea32b7f659e0d678cf2ee075ba8af483a377650/10a-mn8-laptop-4x3-white.png",
  "https://freight.cargo.site/t/original/i/7490734c3371af107df2cda08600e5b242094f340d361ea7968c70af676c680b/Abra_plane_8k.png",
  "https://freight.cargo.site/t/original/i/0d3975195e9ed94f0ede6883d43790c5c891a546f7245059286202e8a8ad057f/z001_Lifepoint_01_Heart.gif",
  "https://freight.cargo.site/t/original/i/93e84b3daa371798849c6e2ff00e42630656d31858cfa9d4adc2fe0f252f8a4e/onity-logo-animation.gif",
  "https://freight.cargo.site/t/original/i/19582cf09de245414d3d043202ac2d6787b7da10e8b49b8648dcb718a96124ec/tmxmonotype_04d.gif",
  "https://freight.cargo.site/t/original/i/433862dcb238d14d2d82c3d250982ebb8443ba4a5bf42b3a01adcf3de2612883/04_EyesAbove_Cards_YG21_Grzejka.png",
  "https://freight.cargo.site/t/original/i/ea473a10c049c92d7c3d3a19989bf7951b50290ae6aecdede0e27ad3078c9a38/Hum_LogoBadge2.png",
  "https://freight.cargo.site/t/original/i/a9420301dea0d9ad74bcfd2778be19f8f2f9728381a4c64045e4a135aa99d119/background_alpha.png",
  "https://freight.cargo.site/t/original/i/8c52c3e87681f0abe3a784457920bfbf2d64070837bb73f64e12dd0c7a52637b/Sylvamo_CaseStudy_LogoAnimationShort.gif",
  "https://freight.cargo.site/t/original/i/226c3cb7c024b43d3b31d0c8ec2f9499236b3649e15d31df4b4b268fd2752aca/01_AMSO_splash.png",
  "https://freight.cargo.site/t/original/i/a833793d6ba0ab9054337ed9d693d51be95ef2c2a96392223b98d9a10ab1d2a8/Finseca_RenderBoomerang.gif",
  "https://freight.cargo.site/t/original/i/ee8b2dcee61a0d815155133e69326918b37d106402479dec33f8befa2bbd550a/LREI_1_BookFlipCut_1.gif",
  "https://freight.cargo.site/t/original/i/8384fcb96abe87691dc2f2b2f217eb3275f32ee3546b72f08de91a34273b4db2/amrop_cover.gif",
  "https://freight.cargo.site/t/original/i/e10962df91da8581c09f1791da096b5bdbfd80a2995961285d4aca835eae8472/Tryitout_2_Shirt.jpg",
  "https://freight.cargo.site/t/original/i/b450e21d974ee5945471131d09b5bbeed73cb03dfe14f1bae3c0a613d54aa5e9/l3h-sign-cover-4x3.jpg"
];

// Main function to download images
async function downloadImages() {
  try {
    console.log(`Starting direct download of ${imageUrls.length} images...`);
    
    // Create a manifest of all images
    const imageManifest = imageUrls.join('\n');
    fs.writeFileSync(path.join(outputDir, 'image_urls.txt'), imageManifest);
    
    // Download all images
    let successCount = 0;
    for (let i = 0; i < imageUrls.length; i++) {
      const imgUrl = imageUrls[i];
      const urlParts = new URL(imgUrl);
      const filename = sanitizeFilename(path.basename(urlParts.pathname));
      
      // Add index to ensure unique filenames
      const indexedFilename = `${i+1}_${filename}`;
      
      const success = await downloadImage(imgUrl, indexedFilename);
      if (success) successCount++;
      
      // Add a small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Also fetch and save the main page HTML for reference
    try {
      const mainRes = await superagent.get("https://kev.studio");
      fs.writeFileSync(path.join(outputDir, 'main_page.html'), mainRes.text);
      console.log('Saved main page HTML for reference');
    } catch (error) {
      console.error(`Failed to save main page HTML: ${error.message}`);
    }
    
    console.log(`\nComplete! Downloaded ${successCount} of ${imageUrls.length} images`);
    console.log(`All content saved to: ${outputDir}`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Run the download
downloadImages();