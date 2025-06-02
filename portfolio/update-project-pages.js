"use strict";

const fs = require('fs');
const path = require('path');

// Base directory for projects
const projectsDir = path.join(__dirname, 'projects');

// Template for the new navigation
const navTemplate = `
    <!-- Sticky navigation with filter categories -->
    <nav class="sticky-nav visible">
        <div class="container">
            <div class="sticky-nav-content">
                <div class="sticky-nav-logo">
                    <a href="../index.html">Kevin Grzejka</a>
                </div>
                <ul class="filter-categories">
                    <li class="filter-category" data-filter="all">All</li>
                    <li class="filter-category" data-filter="branding">Branding</li>
                    <li class="filter-category" data-filter="web">Web Design</li>
                    <li class="filter-category" data-filter="animation">Animation</li>
                    <li class="filter-category" data-filter="print">Print</li>
                    <li class="filter-category" data-filter="strategy">Strategy</li>
                </ul>
                <div class="theme-toggle" id="theme-toggle">
                    <span class="sun">☀️</span>
                    <span class="moon">🌙</span>
                </div>
            </div>
        </div>
    </nav>
`;

// Script to be added at the end of each file
const scriptTemplate = `
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Theme toggle functionality
            const themeToggle = document.getElementById('theme-toggle');
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Check for saved theme preference or use the system preference
            const currentTheme = localStorage.getItem('theme') || 
                              (prefersDarkScheme.matches ? 'dark' : 'light');
            
            // Apply the theme
            if (currentTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                themeToggle.classList.add('dark');
            }
            
            // Toggle theme when clicking the theme toggle
            themeToggle.addEventListener('click', function() {
                let theme;
                if (document.body.getAttribute('data-theme') === 'dark') {
                    document.body.removeAttribute('data-theme');
                    theme = 'light';
                    themeToggle.classList.remove('dark');
                } else {
                    document.body.setAttribute('data-theme', 'dark');
                    theme = 'dark';
                    themeToggle.classList.add('dark');
                }
                localStorage.setItem('theme', theme);
            });
            
            // Filter category links to main page
            const filterCategories = document.querySelectorAll('.filter-category');
            
            filterCategories.forEach(category => {
                category.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    window.location.href = '../index.html?filter=' + filter;
                });
            });
        });
    </script>
`;

// Read all HTML files in the projects directory
fs.readdir(projectsDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter out only HTML files
    const htmlFiles = files.filter(file => path.extname(file) === '.html');

    // Process each HTML file
    htmlFiles.forEach(file => {
        const filePath = path.join(projectsDir, file);
        
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
                return;
            }

            // Replace the header section with our new navigation
            let newContent = content;
            
            // Remove the back link section if it exists
            newContent = newContent.replace(/<a href="\.\.\/index\.html" class="back-link">[\s\S]*?<\/a>/g, '');
            
            // Replace the header section
            newContent = newContent.replace(/<header class="project-header">[\s\S]*?<\/header>/, `${navTemplate}
    <main class="container project-detail">
        <div class="project-header">`);
            
            // Make sure the closing main tag is in the right place
            newContent = newContent.replace(/<\/main>/, '</main>');
            
            // Replace the script section or add it if it doesn't exist
            if (newContent.includes('<script>')) {
                newContent = newContent.replace(/<script>[\s\S]*?<\/script>/, scriptTemplate);
            } else {
                newContent = newContent.replace('</body>', `${scriptTemplate}\n</body>`);
            }
            
            // Write the updated content back to the file
            fs.writeFile(filePath, newContent, 'utf8', err => {
                if (err) {
                    console.error(`Error writing file ${file}:`, err);
                    return;
                }
                console.log(`Updated ${file} successfully`);
            });
        });
    });
});

console.log('Starting to update project pages...');