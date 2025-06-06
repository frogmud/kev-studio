"use strict";

const fs = require('fs').promises;
const path = require('path');

/**
 * Updates the UN project page timeline content
 */
async function updateUNProjectTimeline() {
  try {
    // Define the file path
    const filePath = path.join(__dirname, 'portfolio/projects/un.html');
    
    // Read the HTML file
    let htmlContent = await fs.readFile(filePath, 'utf8');
    
    // Add the project timeline section since it was accidentally removed
    htmlContent = htmlContent.replace(
      /<div class="project-description">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
      `<div class="project-description">
                <p>In 2018, the United Nations President of the General Assembly (PGA) introduced "Morning Minga," a new diplomatic dialogue format aimed at fostering collaborative and informal exchanges among UN representatives. This initiative required a comprehensive brand identity that honored the UN's diplomatic gravitas while introducing a fresh, approachable visual language.</p>
                <p>The term "Minga" refers to a South American tradition of community gatherings, reflecting the initiative's collaborative spirit and the Ecuadorian heritage of the 73rd PGA, María Fernanda Espinosa Garcés. The design team at Thackway McCord, including creative director Kat McCord, strategist Simon Thackway, and design lead Kevin Grzejka, developed a complete brand identity package encompassing logo design, digital applications, and print collateral.</p>
                <p>The resulting identity system centered on a vibrant, multi-colored logo symbolizing dialogue and diversity, while maintaining clear connections to UN visual traditions. This branding was implemented across various platforms, including environmental graphics within UN spaces, digital media, and printed materials, ensuring a cohesive and inclusive representation of the Morning Minga initiative.</p>
            
                <div class="project-timeline">
                    <div class="timeline-item">
                        <h3>Strategic briefing & concept development</h3>
                        <p>The project commenced with in-depth research into UN protocols and the PGA's vision for the Morning Minga dialogues. The name "Minga" provided an authentic connection to the President's Ecuadorian heritage and embodied the collaborative essence of the initiative.</p>
                        <img loading="lazy" src="../images/optimized/un/UN_PGA_CaseStudy_Slide8.png" alt="UN General Assembly Hall with visual identity concepts" class="timeline-image">
                    </div>

                    <div class="timeline-item">
                        <h3>Logo design & visual system</h3>
                        <p>A vibrant, multi-colored logo system was developed to represent dialogue, diversity, and the global nature of the UN community. The design balanced formal diplomatic requirements with a contemporary approach, distinguishing it from traditional UN communications.</p>
                        <figure class="timeline-figure">
                            <img loading="lazy" src="../images/optimized/un/additional/MoningMinga.jpg" alt="Morning Minga logo display at UN Headquarters" class="timeline-image">
                            <figcaption>Morning Minga logo displayed at UN Headquarters in New York</figcaption>
                        </figure>
                    </div>

                    <div class="timeline-item">
                        <h3>Logo animation</h3>
                        <p>An animated version of the logo was created to bring energy and movement to digital applications. The animation concept reflected the gathering of diverse perspectives central to the Morning Minga concept.</p>
                        <figure class="timeline-figure">
                            <img loading="lazy" src="../images/optimized/un/UN_1.png" alt="Static frame from the Morning Minga logo animation" class="timeline-image">
                            <figcaption><a href="../images/optimized/un/additional/MorningMinga_LogoAnimation.gif" target="_blank">View Animation</a></figcaption>
                        </figure>
                    </div>

                    <div class="timeline-item">
                        <h3>Printed materials</h3>
                        <p>A comprehensive suite of materials, including banners, leaflets, and diplomatic correspondence templates, was produced. These materials adhered to UN protocol and functioned in multiple languages while conveying the inclusive spirit of the Morning Minga sessions.</p>
                        <img loading="lazy" src="../images/optimized/un/UN_2.png" alt="Morning Minga printed materials including banners and leaflets" class="timeline-image">
                    </div>

                    <div class="timeline-item">
                        <h3>Digital applications</h3>
                        <p>The brand extended to digital platforms, encompassing social media graphics, email templates, and presentation decks. These assets were designed for adaptability by the UN's internal communications team, ensuring visual consistency across all touchpoints.</p>
                        <img loading="lazy" src="../images/optimized/un/additional/UN_PGA_MorningMinga_SocialMediaCard_110618.png" alt="Social media card template for Morning Minga" class="timeline-image">
                    </div>

                    <div class="timeline-item">
                        <h3>Environmental graphics</h3>
                        <p>The identity was implemented throughout key UN spaces, such as the General Assembly hall and meeting rooms. Environmental applications respected the historic architecture while establishing a recognizable presence for the Morning Minga initiative.</p>
                        <img loading="lazy" src="../images/optimized/un/UN_3.png" alt="Morning Minga environmental graphics at UN Headquarters" class="timeline-image">
                    </div>

                    <div class="timeline-item">
                        <h3>Success & expansion</h3>
                        <p>The Morning Minga identity received positive feedback from diplomats and UN staff for effectively balancing tradition with innovation. The format and branding became a signature initiative of the 73rd PGA, promoting more collaborative dialogue among member states.</p>
                        <img loading="lazy" src="../images/optimized/un/UN_4.png" alt="Morning Minga session in progress with branded materials" class="timeline-image">
                    </div>

                    <div class="timeline-item">
                        <h3>Agency: Thackway McCord</h3>
                        <p>Creative Direction: Kat McCord<br>
                        Design Lead: Kevin Grzejka<br>
                        Strategy: Simon Thackway<br>
                        Brand Implementation: Maria Fernanda Espinosa Garces, President of the UN General Assembly</p>
                    </div>
                </div>
            </div>`
    );
    
    // Write the updated HTML back to the file
    await fs.writeFile(filePath, htmlContent, 'utf8');
    
    console.log('Successfully updated UN project timeline');
    
  } catch (error) {
    console.error('Error updating UN project timeline:', error);
  }
}

// Export functions for reuse
module.exports = {
  updateUNProjectTimeline
};

// Run if this script is executed directly
if (require.main === module) {
  updateUNProjectTimeline();
}