# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure
- `portfolio/`: Main portfolio website files
- `tools/`: Utility scripts for managing and updating the portfolio
- `archive/`: Archived files (compressed in tar.gz format)

## Commands
- Run portfolio downloader: `npm start` or `npm run download`
- Organize downloaded content: `npm run organize`
- Analyze and download portfolio: `npm run analyze`
- Install dependencies: `npm install`
- Direct download: `npm run direct`
- Download from kev.studio: `npm run kev-studio`
- Generate project pages: `node portfolio/unified-project-generator.js`
- Optimize images: `npm run optimize-images`
- Update index page: `node portfolio/update-index-page.js`
- Fix duplicate tags: `node portfolio/fix-duplicate-tags.js`

## Code Style Guidelines
- Use strict mode (`"use strict"`) at the top of each file
- Follow ES6+ conventions: prefer `const`/`let` over `var`
- Use CommonJS require() imports with built-in modules first
- Use 2-space indentation and semicolons
- Use single quotes for strings (except where template literals needed)
- Use async/await for asynchronous operations
- Use try/catch blocks for error handling with detailed logging
- Use camelCase for variables/functions, kebab-case for filenames
- Break complex operations into focused helper functions
- Use descriptive variable names indicating type and purpose
- Use JSDoc comments for documenting function parameters/returns
- Use Node.js built-in modules (fs, path) with promises API
- Validate input data before processing

## HTML/CSS Guidelines
- Use modern-normalize for CSS reset
- Follow BEM-inspired CSS naming for components
- Maintain responsive design with mobile-first approach
- Use CSS variables for consistent theming (light/dark modes)
- Support both grid and list views for project displays
- Maintain consistent styling across all project pages
- Avoid duplicate data-tags attributes in project cards

## Project Page Creation
- Update taxonomy.json when adding new projects
- Create project info.md with standardized metadata
- Generate HTML using unified-project-generator.js
- Update index.html with proper project entries
- Ensure images are properly referenced and optimized

## Other Instructions
- Always print full code blocks
- Keep scripts in the tools/ directory
- Archive unused files instead of deleting them
- When adding projects, update the taxonomy.json data file
- Run fix-duplicate-tags.js if duplicate data-tags appear in HTML