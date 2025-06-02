# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Run portfolio downloader: `npm start` or `npm run download`
- Organize downloaded content: `npm run organize`
- Analyze and download portfolio: `npm run analyze`
- Install dependencies: `npm install`
- Direct download: `npm run direct`
- Download from kev.studio: `npm run kev-studio`
- Generate project pages: `npm run generate-pages`
- Run tests: `npm test` (in cargo-collective-exodus-main directory)

## Code Style Guidelines
- Use strict mode (`"use strict"`) at the top of each file
- Follow ES6+ conventions: prefer `const`/`let` over `var`
- Use 2-space indentation
- Use semicolons at the end of statements
- Use single quotes for strings (except where template literals needed)
- Use async/await for asynchronous operations
- Handle errors with try/catch blocks
- Use descriptive variable/function names with camelCase (e.g., `downloadImage`)
- Name files with kebab-case (e.g., `download-portfolio.js`)
- Break complex operations into focused helper functions
- Extract configuration into separate objects
- Use Node.js built-in modules (fs, path) with promisify for callbacks
- Log operations with meaningful messages for debugging
- Validate input data before processing
- Add JSDoc comments for function documentation
- Use defensive programming techniques to handle edge cases

## Other Instructions
- Always print full code blocks
- When modifying HTML templates, maintain consistent styling