import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';

// Tight viewBox: bounds from X: 185 to 605 (width 420), Y: 55 to 380 (height 325)
const createTightSvg = (isDark = false) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="185 55 420 325" width="420" height="325">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;900&amp;display=swap');
      .phoenix-title {
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 54px;
        font-weight: 900;
        letter-spacing: 5.5px;
      }
      .phoenix-sub {
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 13px;
      }
    </style>
  </defs>
  
  <!-- Emblem (Teal Geometric Monogram) -->
  <g fill="none" stroke="${isDark ? '#22d3ee' : '#0d9488'}" stroke-width="32" stroke-linecap="butt" stroke-linejoin="round">
    <!-- Outer Arch (D) -->
    <path d="M 350 78 L 420 78 A 87 87 0 0 1 420 252 L 350 252" />
    
    <!-- Inner P with S-curve -->
    <path d="M 350 128 L 420 128 A 25 25 0 0 1 420 178 L 382 178 C 330 178 322 252 280 252" />
  </g>
  
  <!-- Brand Typography -->
  <text x="395" y="324" class="phoenix-title" text-anchor="middle" fill="${isDark ? '#ffffff' : '#063c49'}">PHOENIX</text>
  <text x="395" y="364" class="phoenix-sub" text-anchor="middle" fill="${isDark ? '#e0f2fe' : '#334155'}">TRAVEL &amp; TOURS</text>
</svg>`;

// Generate Light/Default Vector SVG
const lightSvg = createTightSvg(false);
fs.writeFileSync('dist/phoenix-logo.svg', lightSvg);

// Generate Dark Variant Vector SVG (for dark header/navbars)
const darkSvg = createTightSvg(true);
fs.writeFileSync('dist/phoenix-logo-white.svg', darkSvg);

// Render to high-resolution PNGs using Rust-based Resvg
const resvgLight = new Resvg(lightSvg, { fitTo: { mode: 'width', value: 1200 } });
const lightPng = resvgLight.render().asPng();
const resvgDark = new Resvg(darkSvg, { fitTo: { mode: 'width', value: 1200 } });
const darkPng = resvgDark.render().asPng();

fs.writeFileSync('dist/phoenix-logo.png', lightPng);
fs.writeFileSync('dist/Phoenix Logo.png', lightPng);
fs.writeFileSync('dist/phoenix-logo-white.png', darkPng);
fs.writeFileSync('dist/Logo.png', darkPng);
fs.writeFileSync('dist/logo.png', darkPng);

console.log('Successfully regenerated tight-viewBox logos with vivid contrast!');
