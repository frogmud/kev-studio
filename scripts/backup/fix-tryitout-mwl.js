"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateTryitoutMLW() {
  try {
    // Define the file path
    const filePath = path.join(__dirname, 'portfolio/projects/tryitout_with_major_league_wiffleball.html');
    
    // Read the HTML file
    let htmlContent = await fs.readFile(filePath, 'utf8');
    
    // Update metadata: Year field
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Year<\/h3>\s*<p>2018-2019<\/p>\s*<\/div>/,
      `<div class="metadata-item">
                        <h3>Year</h3>
                        <p>2019</p>
                    </div>`
    );
    
    // Update metadata: Client field
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Client<\/h3>\s*<p>Major League Wiffleball Tournament<\/p>\s*<\/div>/,
      `<div class="metadata-item">
                        <h3>Client</h3>
                        <p>Major League Wiffleball</p>
                    </div>`
    );
    
    // Update metadata: Role field
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Role<\/h3>\s*<p>Art direction, brand design, print, motion, ace pitcher<\/p>\s*<\/div>/,
      `<div class="metadata-item">
                        <h3>Role</h3>
                        <p>Art direction, brand design, print, motion, ace pitcher</p>
                    </div>`
    );
    
    // Update metadata: Replace "Team" with "Agency"
    htmlContent = htmlContent.replace(
      /<div class="metadata-item">\s*<h3>Team<\/h3>\s*<p>Photography: Dennis Yasar<br>Team Management: Kevin Lates, Leela Scott<\/p>\s*<\/div>/,
      `<div class="metadata-item">
                        <h3>Agency</h3>
                        <p>Personal project</p>
                    </div>`
    );
    
    // Update tagline
    htmlContent = htmlContent.replace(
      /<p class="tagline">Crafting a bold brand identity for a recreational sports league<\/p>/,
      `<p class="tagline">Crafting a bold brand identity for a recreational sports tournament</p>`
    );
    
    // Update main description
    htmlContent = htmlContent.replace(
      /<div class="project-description">\s*<p>Try It Out is a semi-professional wiffleball league[\s\S]*?<\/p>\s*<p>[\s\S]*?<\/p>/,
      `<div class="project-description">
                <p>Try It Out is a semi-professional wiffleball league formed by a group of friends in NJ who transformed a casual weekend activity into an organized competitive venture with its own distinctive visual identity. The brand development embraced both the DIY spirit of the league and the nostalgic connection to classic sports card collecting, creating a cohesive system that worked across physical and digital touchpoints.</p>
                
                <p>The core challenge was balancing the playful, grassroots nature of the sport with a professional-looking identity system that would elevate the experience for participants and spectators alike.</p>`
    );
    
    // Update timeline items
    
    // 1. Brand Identity Development
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Brand Identity Development<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Brand Identity Development</h3>
                        <p>The visual identity process began with exploring typography that could convey both athleticism and a sense of community. The resulting logo system features bold, condensed lettering with a distinctive angle that suggests forward momentum—a key attribute for a sports brand. The typography system was complemented by a color palette dominated by bold primary colors reminiscent of classic baseball design language.</p>`
    );
    
    // 2. Trading Card System
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Trading Card System<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Trading Card System</h3>
                        <p>The most distinctive aspect of the Try It Out brand was the player trading card system. Each league participant received their own personalized trading card featuring portrait photography against a vibrant background and custom stats. The cards served multiple purposes: they reinforced team identity, created collectible memorabilia, and provided a novel way to introduce players to one another at events.</p>`
    );
    
    // 3. Apparel & Merchandise
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Apparel & Merchandise<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Apparel & Merchandise</h3>
                        <p>To further establish the league's identity, a limited run of merchandise was created, including jerseys and t-shirts. The apparel featured the Try It Out logo prominently and used the established color palette consistently. These items weren't just promotional materials—they helped create a sense of community and team spirit among participants while increasing visibility in public spaces.</p>`
    );
    
    // 4. Digital Media & Promotion
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Digital Media & Promotion<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Digital Media & Promotion</h3>
                        <p>The league established a digital presence through social media and a simple website to announce game schedules, share results, and showcase player profiles. The digital content maintained the brand's visual language established in the physical assets, creating a consistent experience across all touchpoints. Short promotional videos were created for social sharing, featuring highlights from games and player interviews.</p>`
    );
    
    // 5. Game Day Experience
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Game Day Experience<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Game Day Experience</h3>
                        <p>The brand identity extended to the in-person experience at games, where branded scorecards, signage, and other game-day materials helped create an immersive atmosphere. These elements transformed what could have been a casual park gathering into a more structured sporting event, enhancing the experience for both players and spectators.</p>`
    );
    
    // 6. Impact & Community Building
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Impact & Community Building<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<div class="timeline-item">
                        <h3>Impact & Community Building</h3>
                        <p>What began as a casual weekend activity evolved into a recognizable brand with its own community. The Try It Out league demonstrates how thoughtful design can elevate even grassroots recreational activities into meaningful experiences. The project showcases the power of branding to transform simple gatherings into organized communities with shared identity and purpose.</p>`
    );
    
    // Write the updated HTML back to the file
    await fs.writeFile(filePath, htmlContent, 'utf8');
    
    console.log('Successfully updated tryitout_with_major_league_wiffleball.html');
    
  } catch (error) {
    console.error('Error updating tryitout_with_major_league_wiffleball.html:', error);
  }
}

updateTryitoutMLW();