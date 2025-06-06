# Portfolio Content Update Plan

## Approach

After analyzing the structure of the project pages and content updates required, here's the strategy for efficiently updating each project:

1. **Project-Specific Update Script**: Create a dedicated update script for each project that:
   - Updates metadata (Year, Client, Role, Agency)
   - Updates tagline
   - Updates main content
   - Updates each timeline item individually while preserving images/media

2. **Workflow**:
   - Extract current project content from markdown file
   - Create a temporary markdown file for the specific project
   - Run the update script targeting just that project
   - Verify updates

## Challenges & Solutions

### Timeline Section Format Issues
- **Challenge**: Timeline sections in markdown need careful parsing to match with HTML sections
- **Solution**: Use direct regex replacement for each timeline item title/description while preserving media

### HTML Structure Preservation
- **Challenge**: Need to maintain image/video elements in timeline items
- **Solution**: Target only the text content (`<h3>` and `<p>` tags) in each timeline item

### Naming Variations
- **Challenge**: Some timeline items have slightly different titles in markdown vs HTML
- **Solution**: Create a mapping for each project to handle title variations

## Project List

1. ✅ Abra - COMPLETED
2. ✅ Absorb Software - COMPLETED
3. ✅ AIGA - COMPLETED
4. ✅ American Social - COMPLETED
5. ✅ Autonomy Capital - COMPLETED
6. ✅ Eyes Above - COMPLETED
7. ✅ Finseca - COMPLETED
8. ✅ Fiserv - COMPLETED
9. ✅ Hum Capital - COMPLETED
10. ✅ L3Harris - COMPLETED
11. ✅ Lifepoint Health - COMPLETED
12. ✅ LREI - COMPLETED
13. ✅ MN8 Energy - COMPLETED
14. ✅ Onity - COMPLETED
15. ✅ Sylvamo - COMPLETED
16. ✅ Thackway McCord Pets - COMPLETED
17. ✅ Tryitout - COMPLETED
18. ✅ UN - COMPLETED

## Timeline

- Estimated time per project: 5-10 minutes
- Total completion estimate: 2 hours

## Process Improvements

1. Created reusable script components that handle common content update patterns
2. Implemented direct timeline item targeting for more precise updates
3. Developed approach that preserves all visual media while updating text content

## Next Steps

- For project updates with more substantial content changes, consider a more granular approach
- If significant timeline item reordering is needed, may require manual editing
- Generate a report after updates to identify any sections that didn't update correctly

## Final Summary
- All 18 projects have been successfully updated
- Updates preserved all existing media elements and HTML structure
- Created standardized scripts for each project update
- Documented all changes in project-specific update summary files