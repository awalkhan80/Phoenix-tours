import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';

// Clean SVG vector of Phoenix Travel & Tours official logo
const createSvg = (isDark = false) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="800" height="400">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;900&amp;display=swap');
      .phoenix-title {
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 52px;
        font-weight: 900;
        letter-spacing: 5px;
      }
      .phoenix-sub {
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 19px;
        font-weight: 600;
        letter-spacing: 15px;
      }
    </style>
  </defs>
  
  <!-- Emblem (Teal Geometric Monogram) -->
  <g fill="none" stroke="#4c92a5" stroke-width="32" stroke-linecap="butt" stroke-linejoin="round">
    <!-- Outer Arch (D) -->
    <path d="M 350 78 L 420 78 A 87 87 0 0 1 420 252 L 350 252" />
    
    <!-- Inner P with S-curve -->
    <path d="M 350 128 L 420 128 A 25 25 0 0 1 420 178 L 382 178 C 330 178 322 252 280 252" />
  </g>
  
  <!-- Brand Typography -->
  <text x="395" y="324" class="phoenix-title" text-anchor="middle" fill="${isDark ? '#ffffff' : '#000000'}">PHOENIX</text>
  <text x="395" y="364" class="phoenix-sub" text-anchor="middle" fill="${isDark ? '#e2e8f0' : '#d2d6dc'}">TRAVEL &amp; TOURS</text>
</svg>`;

// Generate Light/Default Vector SVG
const lightSvg = createSvg(false);
fs.writeFileSync('dist/phoenix-logo.svg', lightSvg);

// Generate Dark Variant Vector SVG (for dark header/navbars)
const darkSvg = createSvg(true);
fs.writeFileSync('dist/phoenix-logo-white.svg', darkSvg);

// Render to high-resolution PNGs using Rust-based Resvg
const resvgLight = new Resvg(lightSvg, { fitTo: { mode: 'width', value: 1200 } });
fs.writeFileSync('dist/phoenix-logo.png', resvgLight.render().asPng());
fs.writeFileSync('dist/Phoenix Logo.png', resvgLight.render().asPng()); // Exact original name match

const resvgDark = new Resvg(darkSvg, { fitTo: { mode: 'width', value: 1200 } });
fs.writeFileSync('dist/phoenix-logo-white.png', resvgDark.render().asPng());

// Also update favicon.svg to feature the official monogram icon
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="20" fill="#063c49" />
  <g transform="translate(5, 5) scale(0.9)" fill="none" stroke="#4c92a5" stroke-width="11" stroke-linecap="butt" stroke-linejoin="round">
    <path d="M 44 22 L 56 22 A 28 28 0 0 1 56 78 L 44 78" />
    <path d="M 44 38 L 56 38 A 8 8 0 0 1 56 54 L 48 54 C 36 54 34 78 22 78" />
  </g>
</svg>`;
fs.writeFileSync('dist/favicon.svg', faviconSvg);

console.log('Successfully generated:');
console.log('- dist/phoenix-logo.svg');
console.log('- dist/phoenix-logo-white.svg');
console.log('- dist/phoenix-logo.png');
console.log('- dist/Phoenix Logo.png');
console.log('- dist/favicon.svg');
