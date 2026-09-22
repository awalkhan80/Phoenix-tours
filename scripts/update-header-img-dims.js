import fs from 'fs';
import path from 'path';

const distDir = 'dist';
const files = fs.readdirSync(distDir).filter(f => f.endsWith('.html'));

let updated = 0;
for (const file of files) {
  if (file === 'admin.html') continue;
  const filePath = path.join(distDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  const newHtml = html.replace(
    /(<img class="brand-logo"[^>]*?)width="180" height="50"/g,
    '$1width="220" height="70"'
  );

  if (newHtml !== html) {
    fs.writeFileSync(filePath, newHtml, 'utf8');
    updated++;
  }
}

console.log(`Updated width/height in ${updated} HTML files.`);
