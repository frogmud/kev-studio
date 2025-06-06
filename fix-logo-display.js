"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateCSS() {
  try {
    const cssPath = path.join(__dirname, 'portfolio', 'styles.css');
    let cssContent = await fs.readFile(cssPath, 'utf8');
    
    // Find the logo CSS section
    const logoStylesStart = cssContent.indexOf('/* Logo styles for light/dark mode */');
    
    if (logoStylesStart === -1) {
      console.error('Logo styles section not found in CSS');
      return;
    }
    
    // Replace the logo display CSS
    const oldCss = `/* Show/hide logos based on theme */
.dark-logo {
  display: none;
}

.light-logo {
  display: block;
}

[data-theme="dark"] .dark-logo {
  display: block;
}

[data-theme="dark"] .light-logo {
  display: none;
}`;

    const newCss = `/* Show/hide logos based on theme */
/* Only black logo is shown in light mode, white logo in dark mode */
.dark-logo {
  display: none; /* White logo hidden by default */
}

.light-logo {
  display: block; /* Black logo shown by default */
}

[data-theme="dark"] .dark-logo {
  display: block; /* Show white logo in dark mode */
}

[data-theme="dark"] .light-logo {
  display: none; /* Hide black logo in dark mode */
}`;
    
    // Replace the CSS
    cssContent = cssContent.replace(oldCss, newCss);
    
    // Write the updated CSS back to the file
    await fs.writeFile(cssPath, cssContent, 'utf8');
    
    console.log('CSS updated successfully to fix logo display');
  } catch (err) {
    console.error('Error updating CSS:', err);
  }
}

updateCSS();