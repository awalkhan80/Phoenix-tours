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
      /src="\/[^\"]*logo[^\"]*"/gi,
      `src="/Logo.svg"`
    );
  } else {
    // Replace all logo image sources in header and footer
    html = html.replace(
      /src="\/(phoenix-logo|phoenix-logo-white|logo)\.(svg|png)"/gi,
      `src="/Logo.svg"`
    );

    // Update schema logo URL
    html = html.replace(
      /"logo":\s*"https:\/\/desertsafaridxbpro\.com\/[^\"]*"/g,
      `"logo":"https://desertsafaridxbpro.com/Logo.svg"`
    );
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedCount++;
    console.log(`Updated logo in ${file}`);
  }
}

console.log(`Finished: ${updatedCount} files updated.`);
