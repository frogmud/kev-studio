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
- Generate project pages: `npm run generate-pages`
- Optimize images: `npm run optimize-images`
- Update index page: `node portfolio/update-index-page.js`
- Generate unified project pages: `node portfolio/unified-project-generator.js`

## Code Style Guidelines
- Use strict mode (`"use strict"`) at the top of each file
- Follow ES6+ conventions: prefer `const`/`let` over `var`
- Use 2-space indentation
- Use semicolons at the end of statements
- Use single quotes for strings (except where template literals needed)
- Use async/await for asynchronous operations
- Handle errors with try/catch blocks for file operations and data parsing
- Use descriptive variable/function names with camelCase (e.g., `downloadImage`)
- Name files with kebab-case (e.g., `download-portfolio.js`)
- Break complex operations into focused helper functions
- Extract configuration into separate objects
- Use Node.js built-in modules (fs, path) with promises (fs.promises)
- Log operations with meaningful messages for debugging
- Validate input data before processing
- Add JSDoc comments for function documentation
- Use defensive programming techniques to handle edge cases

## HTML/CSS Guidelines
- Use modern-normalize for CSS reset
- Follow BEM-inspired CSS naming for components
- Maintain responsive design with mobile-first approach
- Use CSS variables for consistent theming (light/dark modes)
- Support both grid and list views for project displays
- Maintain consistent styling across all project pages

## Other Instructions
- Always print full code blocks
- Keep scripts in the tools/ directory
- Archive unused files instead of deleting them
- When adding projects, update the taxonomy.json data file