const fs = require('fs');
const file = process.argv[2];
if (!file) { console.error('Usage: node test-video-containers.js file.html'); process.exit(1); }
const content = fs.readFileSync(file, 'utf8');
const regex = /<div class="video-container">\s*<video/gs;
const matches = content.match(regex);
if (matches && matches.length>0) {
  console.log(`Found ${matches.length} video containers with videos`);
} else {
  console.log('No matching video containers found');
}
