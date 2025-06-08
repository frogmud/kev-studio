const fs = require('fs').promises;
const path = require('path');
(async () => {
  const src = path.join(__dirname, 'portfolio');
  const dest = path.join(__dirname, 'deploy-ready');
  await fs.rm(dest, {recursive:true, force:true});
  await fs.mkdir(dest, {recursive:true});
  const files = ['index.html','about.html','contact.html','lets-work-together.html','resume.html','styles.css','mobile-menu.js'];
  for (const f of files) {
    await fs.copyFile(path.join(src, f), path.join(dest, f));
  }
  const dirs=['projects','data'];
  for (const d of dirs) {
    await fs.cp(path.join(src,d), path.join(dest,d), {recursive:true});
  }
})();
