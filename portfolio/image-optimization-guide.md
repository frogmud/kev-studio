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

## HTML Implementation

### Standard Images

Use this pattern for standard images:

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

## Custom Optimization

For projects that need custom image optimization:

1. Create a specialized script (like `resize-project-images.js`)
2. Set appropriate quality settings (80% for PNG, 85% for JPEG)
3. Set dimensions specific to the project's needs
4. Generate both optimized originals and WebP versions

## Best Practices

1. Always use the `loading="lazy"` attribute
2. Provide meaningful alt text for all images
3. Use CSS to control image display size, not HTML attributes
4. Keep original high-resolution images in the backup directory
5. Test page load performance after image optimization

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