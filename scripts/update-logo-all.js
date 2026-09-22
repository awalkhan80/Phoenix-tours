import fs from 'fs';
import path from 'path';

const distDir = 'dist';
const files = fs.readdirSync(distDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(distDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;

  if (file === 'admin.html') {
    html = html.replace(
      /<a class="admin-brand"[^>]*>[\s\S]*?<\/a>/i,
      `<a class="admin-brand" href="index.html" aria-label="Phoenix Travel &amp; Tours"><img class="admin-brand-logo" src="/phoenix-logo-white.svg" alt="Phoenix Travel &amp; Tours" style="height:46px;width:auto;max-width:190px;object-fit:contain;"></a>`
    );
  } else {
    // Replace header brand
    html = html.replace(
      /<a class="brand" href="\/" aria-label="Phoenix Travel & Tours home">[\s\S]*?<span class="brand-mark">P<\/span>[\s\S]*?<span class="brand-copy"><strong>PHOENIX<\/strong><small>TRAVEL & TOURS<\/small><\/span>[\s\S]*?<\/a>/gi,
      `<a class="brand" href="/" aria-label="Phoenix Travel &amp; Tours home"><img class="brand-logo" src="/phoenix-logo.svg" alt="Phoenix Travel &amp; Tours" width="180" height="50"></a>`
    );

    // Replace footer brand
    html = html.replace(
      /<a class="brand footer-brand" href="[^"]*">[\s\S]*?<span class="brand-mark">P<\/span>[\s\S]*?<span class="brand-copy"><strong>PHOENIX<\/strong><small>TRAVEL & TOURS<\/small><\/span>[\s\S]*?<\/a>/gi,
      `<a class="brand footer-brand" href="/" aria-label="Phoenix Travel &amp; Tours home"><img class="brand-logo footer-logo" src="/phoenix-logo.svg" alt="Phoenix Travel &amp; Tours" width="210" height="56"></a>`
    );

    // Any remaining brand-mark tags
    html = html.replace(
      /<a class="brand" href="[^"]*">[\s\S]*?<span class="brand-mark">P<\/span>[\s\S]*?<span class="brand-copy"><strong>PHOENIX<\/strong><small>TRAVEL & TOURS<\/small><\/span>[\s\S]*?<\/a>/gi,
      `<a class="brand" href="/" aria-label="Phoenix Travel &amp; Tours home"><img class="brand-logo" src="/phoenix-logo.svg" alt="Phoenix Travel &amp; Tours" width="180" height="50"></a>`
    );

    // Update schema logo
    html = html.replace(
      /"logo":\s*"https:\/\/desertsafaridxbpro\.com\/favicon\.svg"/g,
      `"logo":"https://desertsafaridxbpro.com/phoenix-logo.png"`
    );
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedCount++;
    console.log(`Updated logo in ${file}`);
  }
}

console.log(`Finished: ${updatedCount} files updated.`);
