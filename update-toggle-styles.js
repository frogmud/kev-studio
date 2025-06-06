"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateToggleStyles() {
  try {
    const stylesPath = path.join(__dirname, 'portfolio', 'styles.css');
    
    // Read the current styles file
    const content = await fs.readFile(stylesPath, 'utf8');

    // Define the styles to replace
    const oldToggleStyles = `.theme-toggle, .view-toggle {
  width: 44px;
  height: 24px;
  background-color: var(--light-gray);
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: var(--spacing-md);
}

.theme-toggle::before, .view-toggle::before {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--primary-color);
  top: 2px;
  left: 2px;
  transition: var(--transition);
}`;

    // New, lighter styles with transparent background
    const newToggleStyles = `.theme-toggle, .view-toggle {
  width: 44px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: var(--spacing-md);
  backdrop-filter: blur(2px);
}

.theme-toggle::before, .view-toggle::before {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--background-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  top: 2px;
  left: 2px;
  transition: var(--transition);
}`;

    // Dark mode styles update
    const oldDarkModeStyles = `[data-theme="dark"] .sort-dropdown select {
  background-color: var(--light-gray);
  color: var(--primary-color);
}`;

    const newDarkModeStyles = `[data-theme="dark"] .sort-dropdown select {
  background-color: var(--light-gray);
  color: var(--primary-color);
}

[data-theme="dark"] .theme-toggle, 
[data-theme="dark"] .view-toggle {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: var(--border-color);
}

[data-theme="dark"] .theme-toggle::before, 
[data-theme="dark"] .view-toggle::before {
  background-color: var(--background-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}`;

    // Replace the styles
    let updatedContent = content.replace(oldToggleStyles, newToggleStyles);
    updatedContent = updatedContent.replace(oldDarkModeStyles, newDarkModeStyles);
    
    // Write the updated content back to the file
    await fs.writeFile(stylesPath, updatedContent, 'utf8');
    
    console.log('Toggle styles updated successfully');
  } catch (err) {
    console.error('Error updating toggle styles:', err);
  }
}

updateToggleStyles();