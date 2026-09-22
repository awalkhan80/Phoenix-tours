<?php
/**
 * Phoenix Travel & Tours - Enterprise 404 Recovery Handler
 * Domain: https://desertsafaridxbpro.com
 * Head Office: Office 701, XL Tower, Business Bay, Dubai, UAE
 * WhatsApp: +971561505270
 */

require_once __DIR__ . '/redirect_manager.php';

// First, check if this requested URL can be rescued via 301 Permanent Redirect
RedirectManager::handleRequest();

// If no redirect rule matches, emit true 404 HTTP status
http_response_code(404);
header("X-Robots-Tag: noindex, follow");
?>
<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>404 Page Not Found | Phoenix Travel & Tours Dubai</title>
  <meta name="description" content="The requested tour or page was not found. Browse Dubai desert safaris, quad biking, dune buggies and city tours with Phoenix Travel & Tours.">
  <meta name="robots" content="noindex, follow">
  <meta name="theme-color" content="#063c49">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/favicon.svg">
  <link rel="stylesheet" href="/style.css">
  <style>
    .not-found-main {
      min-height: calc(100vh - 80px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px 80px;
      background: radial-gradient(circle at 50% 20%, #fefcf8 0%, #f6f0e2 100%);
      text-align: center;
    }
    .not-found-container {
      max-width: 820px;
      width: 100%;
      margin: 0 auto;
    }
    .not-found-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(200, 154, 63, 0.15);
      border: 1px solid rgba(200, 154, 63, 0.35);
      color: #8c641b;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .not-found-glitch {
      font-size: clamp(72px, 16vw, 130px);
      font-weight: 900;
      line-height: 1;
      margin: 0;
      color: #063c49;
      letter-spacing: -0.04em;
    }
    .not-found-glitch span {
      color: #c89a3f;
    }
    .not-found-title {
      font-size: clamp(24px, 4vw, 36px);
      font-weight: 800;
      color: #063c49;
      margin: 16px 0 12px;
      line-height: 1.25;
    }
    .not-found-desc {
      font-size: clamp(15px, 2vw, 17px);
      color: #4b6369;
      line-height: 1.6;
      margin: 0 auto 28px;
      max-width: 580px;
    }
    .redirect-card {
      background: #ffffff;
      border: 1px solid rgba(6, 60, 73, 0.1);
      border-radius: 16px;
      padding: 32px 24px;
      box-shadow: 0 12px 32px rgba(6, 60, 73, 0.06);
      margin-top: 12px;
    }
    .redirect-card h2 {
      font-size: 18px;
      font-weight: 800;
      color: #063c49;
      margin: 0 0 16px;
    }
    .redirect-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      margin-top: 16px;
    }
    .redirect-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 16px;
      background: #fbfbf9;
      border: 1px solid rgba(6, 60, 73, 0.08);
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s ease;
      text-align: left;
    }
    .redirect-item:hover {
      background: #ffffff;
      border-color: #c89a3f;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(200, 154, 63, 0.15);
    }
    .redirect-item-title {
      font-weight: 700;
      font-size: 14px;
      color: #063c49;
      margin-bottom: 4px;
    }
    .redirect-item-price {
      font-size: 12px;
      font-weight: 800;
      color: #c89a3f;
    }
    .action-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-top: 28px;
    }
    .btn-404-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #063c49;
      color: #ffffff;
      font-weight: 700;
      padding: 12px 24px;
      border-radius: 999px;
      text-decoration: none;
      font-size: 14px;
      transition: background 0.2s;
    }
    .btn-404-primary:hover {
      background: #095062;
    }
    .btn-404-whatsapp {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #25D366;
      color: #ffffff;
      font-weight: 700;
      padding: 12px 24px;
      border-radius: 999px;
      text-decoration: none;
      font-size: 14px;
      transition: background 0.2s;
    }
    .btn-404-whatsapp:hover {
      background: #1ebd5a;
    }
    .aeo-entity-signal {
      margin-top: 36px;
      font-size: 12px;
      color: #64748b;
      line-height: 1.6;
    }
  </style>
</head>
<body>

  <!-- Minimal Brand Header -->
  <header style="background:#063c49;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;">
    <a href="/" style="display:flex;align-items:center;text-decoration:none;">
      <img src="/phoenix-logo-white.svg" alt="Phoenix Travel & Tours" style="height:44px;width:auto;">
    </a>
    <a href="https://wa.me/971561505270?text=Hi%20Phoenix%20Travel,%20I%20need%20help%20finding%20a%20tour" class="btn-404-whatsapp" style="padding:8px 16px;font-size:12px;">
      WhatsApp Concierge
    </a>
  </header>

  <main class="not-found-main" id="main-content">
    <div class="not-found-container">
      <div class="not-found-badge">Error 404 · Destination Not Found</div>
      <h1 class="not-found-glitch">4<span>0</span>4</h1>
      <div class="not-found-title">Looks like this trail shifted into the dunes</div>
      <p class="not-found-desc">
        The page you are looking for may have been moved, renamed, or is temporarily unavailable. 
        Browse our top-rated Dubai desert adventures or speak directly with our tour concierge.
      </p>

      <div class="redirect-card">
        <h2>Popular Dubai Tours & Off-Road Adventures</h2>
        <div class="redirect-grid">
          <a href="/desert-safari-dubai.html" class="redirect-item">
            <span class="redirect-item-title">Dubai Desert Safari</span>
            <span class="redirect-item-price">From AED 120 / Person</span>
          </a>
          <a href="/rides/quad-bike" class="redirect-item">
            <span class="redirect-item-title">Quad Bike Dubai</span>
            <span class="redirect-item-price">From AED 150 / 30 Mins</span>
          </a>
          <a href="/rides/buggy" class="redirect-item">
            <span class="redirect-item-title">Dune Buggy Dubai</span>
            <span class="redirect-item-price">From AED 1,000 / Hour</span>
          </a>
          <a href="/dubai-city-tour.html" class="redirect-item">
            <span class="redirect-item-title">Dubai City Tour</span>
            <span class="redirect-item-price">From AED 450 / Vehicle</span>
          </a>
          <a href="/abu-dhabi-city-tour.html" class="redirect-item">
            <span class="redirect-item-title">Abu Dhabi Day Trip</span>
            <span class="redirect-item-price">From AED 650 / Vehicle</span>
          </a>
          <a href="/sky-dive-dubai.html" class="redirect-item">
            <span class="redirect-item-title">Sky Dive Dubai</span>
            <span class="redirect-item-price">AED 2,700 All Inclusive</span>
          </a>
        </div>

        <div class="action-row">
          <a href="/" class="btn-404-primary">Return to Home</a>
          <a href="/book" class="btn-404-primary" style="background:#c89a3f;color:#063c49;">Book Instant Ride</a>
          <a href="https://wa.me/971561505270?text=Hi%20Phoenix%20Travel,%20I%20am%20looking%20for%20a%20tour" class="btn-404-whatsapp" target="_blank" rel="noopener">
            Chat on WhatsApp (+971 56 150 5270)
          </a>
        </div>
      </div>

      <div class="aeo-entity-signal">
        <strong>Phoenix Travel & Tours</strong> · Office 701, XL Tower, Business Bay, Dubai, UAE · Tel: +971 56 150 5270<br>
        Licensed Dubai Tour Operator · Instant WhatsApp Confirmation · Pay on Arrival
      </div>
    </div>
  </main>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "404 Page Not Found",
    "description": "The requested page was not found. Browse Dubai desert safaris, quad biking, dune buggies and city tours with Phoenix Travel & Tours.",
    "publisher": {
      "@type": "TravelAgency",
      "name": "Phoenix Travel & Tours",
      "url": "https://desertsafaridxbpro.com",
      "telephone": "+971561505270",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office 701, XL Tower, Business Bay",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      }
    }
  }
  </script>

</body>
</html>
