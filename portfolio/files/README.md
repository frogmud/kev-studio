# Files Directory

This directory contains downloadable files for the portfolio website, such as:

- Resume PDFs
- Case study documents
- Design guidelines
- Other downloadable resources

## Current Files

- `kevin-grzejka-resume-062025.pdf`: Latest version of Kevin's resume (June 2025)

## File Management Guidelines

1. **File Naming Conventions**:
   - Use lowercase letters and hyphens for file names
   - Include version dates in format MMYYYY (e.g., 062025 for June 2025)
   - Keep filenames descriptive and concise

2. **PDF Files**:
   - Ensure PDFs are optimized for web viewing
   - Target file size under 1MB when possible
   - Include proper metadata (author, title, description)

3. **Resume Updates**:
   - When adding a new resume version, use the `update-resume-pdf.js` script:
   ```
   node tools/update-resume-pdf.js
   ```
   - This script will copy the latest resume from the source location and update HTML references

4. **Other Downloadable Resources**:
   - Place case studies, guidelines, and other resources in this directory
   - Update corresponding HTML links when adding new files
   - Consider creating subdirectories if the number of files grows significantly