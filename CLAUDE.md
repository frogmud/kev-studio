# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Testing Commands
- Static site: Open HTML files directly in browser for testing
- JS: Use browser console for debugging JavaScript
- CSS: Refresh browser to see style changes

## Code Style Guidelines
- HTML: Semantic HTML5 elements, proper nesting, accessibility attributes
- CSS: BEM naming (.block__element--modifier), CSS variables for theming
- JavaScript:
  - ES6+ syntax (arrow functions, template literals, destructuring)
  - Event delegation patterns for DOM manipulation
  - Defensive coding with null checks
  - Consistent console logging for debugging
  - DOM manipulation only after DOMContentLoaded
- File Organization:
  - Project pages in /projects directory
  - Images in /images with subfolders by project
  - Shared CSS in styles.css
- Error Handling: Use console.warn for non-critical errors, check element existence
- Comments: Document complex logic, function purpose, and major sections

Always maintain responsive design patterns and consider mobile-first approach.