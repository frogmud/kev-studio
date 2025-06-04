# Portfolio Project Enhancement Plan

This document outlines the systematic approach to enhancing each project page in the portfolio by adding timeline images and improving visual storytelling.

## General Enhancement Checklist

For each project page:

1. **CSS Updates**
   - [ ] Add `.timeline-image` CSS class if not present
   - [ ] Ensure proper styling for timeline images

2. **Timeline Structure**
   - [ ] Organize timeline into 4-7 clear sections
   - [ ] Add appropriate headings for each section
   - [ ] Format content with proper spacing and line breaks
   - [ ] Add relevant images to each timeline section

3. **Image Optimization**
   - [ ] Locate appropriate images for each timeline section
   - [ ] Copy images to `portfolio/images/optimized/[project_name]/` directory
   - [ ] Add proper `loading="lazy"` attribute and alt text
   - [ ] Use the `timeline-image` class for consistent styling

4. **Content Review**
   - [ ] Ensure consistent storytelling flow
   - [ ] Format agency/credits section properly
   - [ ] Check for spelling and grammar issues
   - [ ] Verify all image paths are working

## Project Status Tracking

| Project Name | Status | Notes |
|--------------|--------|-------|
| Absorb Software | ✅ Complete | Used as initial template |
| MN8 Energy | ✅ Complete | Enhanced with timeline images |
| L3Harris | ✅ Complete | Added timeline images, improved formatting |
| Lifepoint Health | ✅ Complete | Added timeline images, improved formatting, added mobile section |
| Eyes Above | ✅ Complete | Added timeline sections with images, improved formatting, enhanced link styling |
| Sylvamo | ✅ Complete | Added timeline images, improved formatting of credits and awards sections |
| AIGA | 🔄 Pending | |
| Finseca | 🔄 Pending | |
| Amrop | 🔄 Pending | |
| Abra | 🔄 Pending | |
| UN | 🔄 Pending | |
| Thackway McCord Pets | 🔄 Pending | |
| Onity | 🔄 Pending | |
| Hum | 🔄 Pending | |
| American Social | 🔄 Pending | |
| TryItOut | 🔄 Pending | |
| Fiserv | 🔄 Pending | |
| LREI | 🔄 Pending | |
| Autonomy Capital | 🔄 Pending | |

## Next Steps

1. Focus on highest priority projects first (those with most complete image assets)
2. Implement enhancements one project at a time
3. Verify changes on different screen sizes
4. Update this tracking document as each project is completed

## Image Paths Convention

For consistency, we'll follow this convention for image paths:
- Optimized images: `../images/optimized/[project_name]/[image-filename]`
- Image filenames should follow consistent naming: `[number]-[project-name]-[descriptor].[extension]`

## Timeline Section Template

For consistency, each timeline item should follow this structure:

```html
<div class="timeline-item">
    <h3>Section Title</h3>
    <p>Section description with relevant details about this phase of the project.</p>
    <img loading="lazy" src="../images/optimized/project-name/image-filename.jpg" alt="Descriptive alt text" class="timeline-image">
</div>
```