const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '../kev-portfolio-organized/images');
const outputDir = path.join(imagesDir, 'webp');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const exts = ['.jpg', '.jpeg', '.png', '.gif'];

function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'webp') walk(full);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (exts.includes(ext)) {
        const out = path.join(outputDir, path.parse(item).name + '.webp');
        sharp(full)
          .webp({ quality: 80 })
          .toFile(out)
          .then(() => console.log(`Optimized ${item}`))
          .catch(err => console.error(`Failed ${item}:`, err));
      }
    }
  }
}

walk(imagesDir);
