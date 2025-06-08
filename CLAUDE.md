# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure
- `portfolio/`: Main portfolio website files
- `tools/`: Utility scripts for managing and updating the portfolio
- `archive/`: Archived files (compressed in tar.gz format)
- `deploy-ready/`: Prepared files for production deployment

## Commands
- Start local server: `npm run serve` (runs on port 3000)
- Run portfolio downloader: `npm start` or `npm run download`
- Organize downloaded content: `npm run organize`
- Generate project pages: `node portfolio/unified-project-generator.js`
- Update index page: `node portfolio/update-index-page.js`
- Optimize images: `npm run optimize-images`
- Fix duplicate tags: `node portfolio/fix-duplicate-tags.js`
- Extract video stills: `node tools/extract-video-stills.js`
- Prepare for deployment: `node prepare-for-launch.js`
- Deploy to production: `./deploy.sh` or `./deploy-to-dreamhost.sh`

## Code Style Guidelines
- Use strict mode (`"use strict"`) at top of each file
- Follow ES6+ conventions: prefer `const`/`let` over `var`
- Use CommonJS require() with built-in modules first
- Use 2-space indentation and semicolons
- Use single quotes for strings, template literals when needed
- Use async/await with try/catch for error handling
- Use camelCase for variables/functions, kebab-case for filenames
- Use Node.js fs.promises API for file operations
- Validate input data before processing
- Include descriptive comments at the top of each file

## HTML/CSS Guidelines
- Use modern-normalize for CSS reset
- Follow BEM-inspired CSS naming for components
- Maintain responsive design with mobile-first approach
- Use CSS variables for consistent theming
- Avoid duplicate data-tags attributes in project cards

## Project Page Creation
- Update taxonomy.json when adding new projects
- Create project info.md with standardized metadata
- Generate HTML using unified-project-generator.js
- Ensure images are properly referenced and optimized