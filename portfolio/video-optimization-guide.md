# Video Optimization Guide

## GitHub File Size Warnings

When pushing to GitHub, you may have received warnings about large files. GitHub recommends keeping files under 50MB:

```
warning: File portfolio/videos/tm/01_TM_Video1_YG21_Grzejka.mp4 is 63.05 MB
warning: File portfolio/videos/tm/04_TM_Boomerangs_YG21_Grzejka.mp4 is 53.40 MB
```

## Options for Handling Large Video Files

### 1. Optimize Videos (Recommended for Self-hosted Sites)

Use FFmpeg to compress videos while maintaining reasonable quality:

```bash
# Basic compression (target ~720p with lower bitrate)
ffmpeg -i input.mp4 -vf scale=1280:720 -b:v 1500k -c:v libx264 -preset slow -c:a aac -b:a 128k output.mp4

# For very short clips (like logo animations)
ffmpeg -i input.mp4 -vf scale=1280:720 -b:v 1000k -c:v libx264 -preset medium -c:a aac -b:a 96k output.mp4

# For background videos (no audio needed)
ffmpeg -i input.mp4 -vf scale=1280:720 -b:v 800k -c:v libx264 -preset medium -an output.mp4
```

### 2. Use Git LFS (For GitHub Storage)

Git Large File Storage (LFS) is designed for versioning large files:

1. Install Git LFS:
   ```bash
   brew install git-lfs
   ```

2. Initialize Git LFS:
   ```bash
   git lfs install
   ```

3. Track video files:
   ```bash
   git lfs track "*.mp4"
   git lfs track "*.mov"
   ```

4. Add .gitattributes:
   ```bash
   git add .gitattributes
   ```

5. Then continue with normal Git workflow.

### 3. External Video Hosting (For Production)

Consider using external hosting for production:

1. **Vimeo Pro/Business**
   - Professional quality
   - Customizable player
   - Background video options
   - No ads

2. **YouTube (Unlisted)**
   - Free
   - Less control over player
   - Potential for ads

3. **CDN-based Solutions**
   - Cloudinary
   - Amazon S3 + CloudFront
   - Bunny.net (video optimization)

## Implementation with External Hosting

Example with Vimeo player (private/hidden controls):

```html
<div class="video-container">
  <iframe src="https://player.vimeo.com/video/VIDEO_ID?background=1&autoplay=1&loop=1&byline=0&title=0"
    frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>
```

## Video Optimization Checklist

For all videos:
- [ ] Limit duration to what's necessary
- [ ] Compress to 720p for most content
- [ ] Use appropriate bitrate (1000-2000k for most content)
- [ ] Add poster images for all videos
- [ ] Use preload="metadata" to improve page load
- [ ] Consider webm format as alternative source

## Example FFmpeg Script

This script can be used to batch process videos:

```javascript
// save as tools/optimize-videos.js
"use strict";

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const videosDir = path.join(__dirname, '..', 'portfolio', 'videos');

function optimizeVideos(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      // Process subdirectories recursively
      optimizeVideos(fullPath);
    } else if (entry.name.toLowerCase().endsWith('.mp4')) {
      const stats = fs.statSync(fullPath);
      const fileSizeMB = stats.size / (1024 * 1024);
      
      if (fileSizeMB > 20) {
        console.log(`Processing large file (${fileSizeMB.toFixed(2)}MB): ${fullPath}`);
        
        const outputPath = fullPath.replace('.mp4', '_optimized.mp4');
        
        try {
          execSync(`ffmpeg -i "${fullPath}" -vf scale=1280:720 -b:v 1500k -c:v libx264 -preset slow -c:a aac -b:a 128k "${outputPath}"`, { stdio: 'inherit' });
          
          // Get new file size
          const newStats = fs.statSync(outputPath);
          const newFileSizeMB = newStats.size / (1024 * 1024);
          
          console.log(`✓ Optimized: ${fileSizeMB.toFixed(2)}MB → ${newFileSizeMB.toFixed(2)}MB (${((1 - newFileSizeMB/fileSizeMB) * 100).toFixed(1)}% reduction)`);
          
          // Optional: replace original with optimized
          // fs.unlinkSync(fullPath);
          // fs.renameSync(outputPath, fullPath);
        } catch (error) {
          console.error(`Error optimizing ${fullPath}:`, error.message);
        }
      }
    }
  }
}

// Make sure FFmpeg is installed
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
  console.log('Starting video optimization...');
  optimizeVideos(videosDir);
  console.log('Video optimization complete!');
} catch (error) {
  console.error('FFmpeg is not installed. Please install FFmpeg to use this script.');
  console.error('Install with: brew install ffmpeg (on macOS)');
}
```