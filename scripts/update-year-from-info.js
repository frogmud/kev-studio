const fs = require('fs').promises;
const path = require('path');

async function updateYears() {
  const portfolioDir = path.join(__dirname, '..', 'portfolio');
  const indexPath = path.join(portfolioDir, 'index.html');
  let html = await fs.readFile(indexPath, 'utf8');

  const projectsDir = path.join(portfolioDir, 'projects');
  const entries = await fs.readdir(projectsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const infoPath = path.join(projectsDir, entry.name, 'info.md');
    try {
      const info = await fs.readFile(infoPath, 'utf8');
      const match = info.match(/Year:\s*(\d{4})/);
      if (!match) {
        console.warn(`No year found for ${entry.name}`);
        continue;
      }
      const year = match[1];
      if (!/^\d{4}$/.test(year)) {
        console.warn(`Invalid year '${year}' for ${entry.name}`);
        continue;
      }

      const href = `projects/${entry.name}.html`;
      const idx = html.indexOf(href);
      if (idx === -1) continue;
      const divStart = html.lastIndexOf('<div class="project-card', idx);
      if (divStart === -1) continue;
      const tagEnd = html.indexOf('>', divStart);
      if (tagEnd === -1) continue;
      const openTag = html.slice(divStart, tagEnd + 1);

      let newOpenTag;
      if (/data-year="\d{4}"/.test(openTag)) {
        newOpenTag = openTag.replace(/data-year="\d{4}"/, `data-year="${year}"`);
      } else if (/data-tags="[^"]*"/.test(openTag)) {
        newOpenTag = openTag.replace(/data-tags="([^"]*)"/, `data-tags="$1" data-year="${year}"`);
      } else {
        newOpenTag = openTag.replace(/"\s*>$/, `" data-year="${year}">`);
      }
      html = html.slice(0, divStart) + newOpenTag + html.slice(tagEnd + 1);
      console.log(`Updated ${entry.name}.html to year ${year}`);
    } catch {}
  }

  await fs.writeFile(indexPath, html);
  console.log('Year attributes synced successfully.');
}

updateYears().catch(err => console.error(err));
