# Image Optimization Guide

This document provides guidelines for optimizing images in the portfolio project to ensure fast loading times and good visual quality.

## General Guidelines

1. **Image Formats:**
   - Use PNG for graphics with transparency or sharp details
   - Use JPEG for photographs or complex images
   - Use WebP as an additional format for all images (created automatically)
   - Use GIF only for simple animations

2. **Image Dimensions:**
   - Resize all images to a maximum dimension of 1200px (width or height)
   - Maintain aspect ratio when resizing
   - Use smaller dimensions for thumbnails (600px max)

3. **File Size Guidelines:**
   - JPG/PNG images: Keep under 300KB where possible
   - WebP images: Keep under 100KB where possible
   - Animations: Use static previews with links to full animations

## Hero Images vs. Timeline Images

When optimizing images for the portfolio site, follow these special guidelines:

### Hero Images
- **Use original, high-quality images** for hero sections
- Hero images appear at the top of project pages and need to maintain full visual fidelity
- Don't apply aggressive optimization to hero images
- Path pattern: `../images/[project_folder]/image.png` (not in the optimized folder)

### Timeline/Content Images
- Can use optimized versions for timeline sections and other content areas
- Apply reasonable optimization to reduce file size while maintaining acceptable quality
- Path pattern: `../images/optimized/[project_folder]/image.png`

## Optimization Scripts

### Standard Image Optimization

Run the standard optimization script to process all images:

```bash
node tools/optimize-images.js
```

This script:
- Creates optimized versions of all images in the portfolio
- Generates WebP versions for modern browsers
- Maintains folder structure in both optimized/ and webp/ directories

### Enhanced Animation Optimization

For projects with large animated GIFs, use the specialized script:

```bash
node tools/extract-first-frames.js
```

This script:
- Extracts the first frame from GIF animations
- Creates static PNG and WebP versions of these frames
- Names them with the "_still" suffix

### Video Optimization

For MP4 files used in project pages, run the video still extraction script:

```bash
node tools/extract-video-stills.js
```

This script scans the `portfolio/images` directory for `.mp4` files, extracts the
first frame using `ffmpeg`, and saves PNG and WebP previews in the `optimized/` and
`webp/` directories.

## HTML Implementation

### Hero Images

Use this pattern for hero images (original, high-quality versions):

```html
<div class="project-hero">
    <img loading="lazy" src="../images/project/image.jpg" alt="Project Title">
</div>
```

### Timeline/Content Images

Use this pattern for timeline and content images (optimized versions):

```html
<img loading="lazy" src="../images/optimized/project/image.jpg" alt="Description" class="timeline-image">
```

### Animations with Static Previews

For large animations, use this pattern:

```html
<figure class="timeline-figure">
  <img loading="lazy" src="../images/optimized/project/animation_still.png" alt="Description" class="timeline-image">
  <figcaption><a href="../images/optimized/project/animation.gif" target="_blank">View Animation</a></figcaption>
</figure>
```

### Videos with Static Previews

Use the same pattern for MP4 files processed by `extract-video-stills.js`:

```html
<figure class="timeline-figure">
  <img loading="lazy" src="../images/optimized/project/video_still.png" alt="Description" class="timeline-image">
  <figcaption><a href="../images/project/video.mp4" target="_blank">View Video</a></figcaption>
</figure>
```

## Custom Optimization

For projects that need custom image optimization:

1. Create a specialized script (like `resize-project-images.js`)
2. Set appropriate quality settings (80% for PNG, 85% for JPEG)
3. Set dimensions specific to the project's needs
4. Generate both optimized originals and WebP versions

## Project Generator Updates

The unified project generator (`unified-project-generator.js`) has been updated to:

1. Prioritize original, high-quality images for hero sections
2. Use optimized images for timeline/content sections
3. Fall back to optimized images only if originals aren't available

If you need to manually update a project page with a blurry hero image:

1. Edit the HTML file to use the original image path
2. Keep the optimized versions for timeline images

## Best Practices

1. Always use the `loading="lazy"` attribute
2. Provide meaningful alt text for all images
3. Use CSS to control image display size, not HTML attributes
4. Keep original high-resolution images in the backup directory
5. Test page load performance after image optimization
6. For hero images, prioritize quality over file size
7. For timeline/content images, find a good balance of quality and file size
8. **IMPORTANT:** When updating image paths, always verify the file exists in the referenced location
9. When moving from optimized to original images, copy the file to the original location if it doesn't exist there

## CSS Support

Custom CSS has been added to support the static preview with animation link pattern:

```css
.timeline-figure {
  margin: var(--spacing-sm) 0 0 0;
}

.timeline-figure figcaption {
  font-size: 0.85rem;
  text-align: right;
  margin-top: 0.25rem;
}

.timeline-figure figcaption a {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
}

.timeline-figure figcaption a:hover {
  text-decoration: underline;
}
```