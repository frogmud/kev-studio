"use strict";

const fs = require('fs').promises;
const path = require('path');

async function fixMobileLayout() {
  try {
    const stylesPath = path.join(__dirname, 'portfolio', 'styles.css');
    
    // Read the current styles file
    const content = await fs.readFile(stylesPath, 'utf8');

    // New mobile styles to add at the end of the file
    const newMobileStyles = `
/* Mobile sort dropdown and toggle layout fix */
@media (max-width: 768px) {
  .sort-view-row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .sort-dropdown {
    flex: 1;
    min-width: 0;
    margin-right: var(--spacing-sm);
  }
  
  .sort-dropdown span {
    font-size: 0.85rem;
    white-space: nowrap;
  }
  
  .sort-dropdown select {
    width: auto;
    min-width: 120px;
    max-width: 150px;
  }
  
  .view-toggle {
    flex-shrink: 0;
    margin-left: var(--spacing-xs);
  }
}`;

    // Add new styles at the end of the file
    const updatedContent = content + newMobileStyles;
    
    // Write the updated content back to the file
    await fs.writeFile(stylesPath, updatedContent, 'utf8');
    
    console.log('Mobile layout fixed successfully');
  } catch (err) {
    console.error('Error fixing mobile layout:', err);
  }
}

fixMobileLayout();