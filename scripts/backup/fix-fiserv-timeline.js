"use strict";

const fs = require('fs').promises;
const path = require('path');

async function updateFiservTimeline() {
  const projectPath = path.join(__dirname, 'portfolio', 'projects', 'fiserv.html');

  try {
    console.log(`Reading ${projectPath}...`);
    let htmlContent = await fs.readFile(projectPath, 'utf8');

    // Update each timeline item individually to preserve the images

    // 1. Regulatory research & analysis
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Regulatory research & analysis<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Regulatory research & analysis</h3>
                        <p>Collaborated with legal and compliance teams to interpret the DOL's Fiduciary Rule, translating complex regulatory requirements into actionable design and functionality specifications. This foundational work ensured our solutions met both legal standards and user needs.</p>`
    );

    // 2. Technical architecture
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Technical architecture<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Technical architecture</h3>
                        <p>Developed a technical framework utilizing APL (A Programming Language) and PostScript to generate dynamic, personalized reports. The architecture was designed to handle high volumes of data and integrate seamlessly with existing financial advisor workflows.</p>`
    );

    // 3. User experience design
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>User experience design<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>User experience design</h3>
                        <p>Designed a modular report structure emphasizing clarity and usability. Incorporated plain-language explanations and visual representations of fee structures and investment performance to make complex financial data understandable to clients.</p>`
    );

    // 4. Development & programming
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Development & programming<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Development & programming</h3>
                        <p>Implemented new functions in APL to extract and process necessary data points from financial systems. Developed templates populated dynamically, ensuring accurate and personalized reporting for each client.</p>`
    );

    // 5. Testing & quality assurance
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Testing & quality assurance<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Testing & quality assurance</h3>
                        <p>Conducted rigorous testing across various data conditions and edge cases to ensure reliability and compliance. Performed load testing to verify the system's capability to handle nationwide deployment demands.</p>`
    );

    // 6. Client preparation & sales support
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Client preparation & sales support<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Client preparation & sales support</h3>
                        <p>Created sales and marketing materials to aid Fiserv's account teams in preparing financial institution clients for the new regulatory environment. Developed demonstration materials, implementation guides, and training resources to facilitate client onboarding.</p>`
    );

    // 7. Project resolution
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Project resolution<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Project resolution</h3>
                        <p>After months of development, our solution was ready for deployment. However, following the 2016 election, the incoming administration delayed and eventually nullified the Fiduciary Rule. Despite this, the systems and insights developed were repurposed for other financial transparency initiatives within Fiserv.</p>`
    );

    // 8. Design process documentation
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Design process documentation<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Design process documentation</h3>
                        <p>Maintained comprehensive documentation of the design and development process, including sketches, wireframes, and notes. These assets served as valuable references for future financial reporting projects.</p>`
    );

    // 9. Lessons & impact
    htmlContent = htmlContent.replace(
      /<div class="timeline-item">\s*<h3>Lessons & impact<\/h3>\s*<p>.*?<\/p>/s,
      `<div class="timeline-item">
                        <h3>Lessons & impact</h3>
                        <p>This project underscored the challenges of developing solutions in a rapidly changing regulatory environment. While the Fiduciary Rule was ultimately withdrawn, the experience enhanced Fiserv's capabilities in creating transparent financial reporting systems and prepared the company for future regulatory changes in the financial industry.</p>`
    );

    // Save the updated HTML back to the file
    await fs.writeFile(projectPath, htmlContent, 'utf8');
    console.log('Successfully updated Fiserv timeline items.');

  } catch (error) {
    console.error('Error updating timeline:', error);
  }
}

updateFiservTimeline();