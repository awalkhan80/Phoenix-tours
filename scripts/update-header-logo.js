import fs from 'fs';
import path from 'path';

const distDir = 'dist';
const files = fs.readdirSync(distDir).filter(f => f.endsWith('.html'));

let updated = 0;
for (const file of files) {
  if (file === 'admin.html') continue; // Already uses phoenix-logo-white.svg
  const filePath = path.join(distDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace header logo with white variant for dark header
  const newHtml = html.replace(
    /(<header class="site-header">[\s\S]*?<a class="brand"[^>]*>[\s\S]*?<img class="brand-logo"[^>]*src=")[^"]*(")/,
    '$1/Logo.png$2'
  );

  if (newHtml !== html) {
    fs.writeFileSync(filePath, newHtml, 'utf8');
    updated++;
    console.log(`Updated header logo in ${file}`);
  }
}

console.log(`Finished: Updated header logo in ${updated} HTML files.`);
