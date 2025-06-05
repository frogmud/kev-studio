# Kevin Grzejka Work

This repository contains the complete portfolio website and tools for Kevin Grzejka's design work.

## Repository Structure

- **portfolio/**: Main portfolio website
  - Clean, responsive design showcasing projects
  - Dedicated project pages with detailed information
  - Resume and contact information
  
- **tools/**: Utility scripts for managing the portfolio
  - `download-portfolio.js`: Download content from kev.studio
  - `organize-portfolio.js`: Organize downloaded content
  - `analyze-and-download.js`: Analyze and download portfolio content
  - And more utility scripts

## Branch Structure

- **main**: Primary branch with the latest stable version of the portfolio
- **pending-assets-and-scripts**: Branch containing utility scripts and tools for portfolio management
- **optimized-images**: Branch with placeholder for optimized image assets
- Various feature branches prefixed with `codex/`: Individual feature implementations

## Getting Started

1. Clone this repository: `git clone https://github.com/frogmud/kev-studio.git`
2. Install dependencies: `npm install`
3. Run the portfolio: Open `portfolio/index.html` in your browser or use `npm run serve` for local development

## Development Commands

- `npm start` or `npm run download`: Run portfolio downloader
- `npm run organize`: Organize downloaded content
- `npm run analyze`: Analyze and download portfolio
- `npm run direct`: Direct download
- `npm run kev-studio`: Download from kev.studio
- `npm run generate-pages`: Generate project pages
- `npm run optimize-images`: Convert images to optimized WebP versions
- `node tools/extract-video-stills.js`: Create preview images for MP4 files
- `npm run serve`: Run a local development server

## License

This codebase is licensed under MIT, but all design assets and content remain the property of Kevin Grzejka.

## Contact

Kevin Grzejka: grzejkakevin@gmail.com

