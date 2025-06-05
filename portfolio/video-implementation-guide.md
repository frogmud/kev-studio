# Video Implementation Guide

This document provides instructions for adding video content to project pages in your portfolio.

## Video Directory Structure

The portfolio now includes a structured video organization system:

```
portfolio/
├── videos/
│   ├── l3harris/
│   ├── sylvamo/
│   ├── lifepoint/
│   ├── eyes_above/
│   ├── abra/
│   └── tm/
```

## Adding Videos to a Project Page

### 1. Standard Video Player

Use this approach for most project videos that should have controls:

```html
<div class="video-container">
  <video controls preload="metadata">
    <source src="../videos/PROJECT_DIR/VIDEO_FILENAME.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
```

Example in a timeline item:

```html
<div class="timeline-item">
  <h3>Logo Animation</h3>
  <p>Description of the animation process.</p>
  <div class="video-container">
    <video controls preload="metadata">
      <source src="../videos/l3harris/02_L3Harris_LogoAnimation_YG21_Grzejka.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>
```

### 2. Hero Video (Project Header)

For replacing a project's hero image with video:

```html
<div class="project-hero">
  <video controls autoplay muted>
    <source src="../videos/PROJECT_DIR/VIDEO_FILENAME.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
```

### 3. Background Video

For decorative video backgrounds with no controls:

```html
<div class="hero-section">
  <video autoplay loop muted playsinline class="background-video">
    <source src="../videos/PROJECT_DIR/VIDEO_FILENAME.mp4" type="video/mp4">
  </video>
  <div class="hero-content">
    <h1>Project Title</h1>
    <p>Project description</p>
  </div>
</div>
```

## Video Attributes Explained

- `controls`: Shows video controls (play, pause, volume, etc.)
- `autoplay`: Automatically plays when page loads
- `muted`: Starts with no sound (required for autoplay on most browsers)
- `loop`: Continuously plays the video
- `playsinline`: Plays inline on iOS (instead of fullscreen)
- `preload="metadata"`: Only loads video metadata until play is clicked (improves page load time)
- `poster="path/to/image.jpg"`: Shows an image until video plays

## Performance Considerations

For optimal performance:

1. **File Size**: Keep videos under 10MB when possible
2. **Resolution**: 720p (1280×720) is sufficient for most project videos
3. **Video Length**: Keep videos under 30 seconds
4. **Lazy Loading**: 
   ```html
   <video controls preload="none">
   ```

5. **Poster Images**: Add a poster attribute to show an image while video loads
   ```html
   <video controls poster="../images/optimized/PROJECT_DIR/IMAGE.jpg">
   ```

## CSS Classes

The following CSS classes are already in your styles.css file:

```css
/* Standard responsive container */
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin-bottom: var(--spacing-md);
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Background video */
.background-video {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

/* Hero video */
.project-hero video {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

/* Timeline item videos */
.timeline-item .video-container {
  width: 100%;
  max-width: 800px;
  margin-bottom: var(--spacing-md);
}
```

## Adding New Videos

When adding new videos to the portfolio:

1. Copy MP4 files to the appropriate project directory in `portfolio/videos/`
2. Update the project HTML with the appropriate video container
3. Add a meaningful `alt` text equivalent in the fallback message
4. Consider adding a poster image for slower connections

## Adding Videos to Generated Project Pages

When using the unified-project-generator.js to create new project pages:

1. Create the video directory first: `portfolio/videos/PROJECT_NAME/`
2. Copy relevant videos to this directory
3. After generating the project page, add video containers at appropriate points in the timeline

## Browser Compatibility

HTML5 video is supported in all modern browsers. For maximum compatibility:
- Always include fallback text
- Consider using WebM format as a secondary source for some browsers
- Test in multiple browsers and devices

## Troubleshooting

If videos don't play:
- Check file paths
- Ensure the video format is supported (.mp4 is most widely supported)
- Verify that the video file isn't corrupted
- Check browser console for errors