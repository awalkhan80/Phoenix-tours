<?php
/**
 * Phoenix Travel & Tours - Server-Side Rendered Tour Page Template (PHP/MySQL)
 * Fully crawlable by search engines without executing JavaScript.
 */
require_once __DIR__ . '/seo_helper.php';

// Example tour dataset (ordinarily fetched from MySQL `pages_seo` and `tours`)
$tour = [
    'id' => 'desert-safari',
    'title' => 'Dubai Desert Safari Tours | Evening, Morning & Private 4x4 | Phoenix Travel & Tours',
    'description' => 'Book Dubai desert safari tours with Phoenix Travel & Tours. Evening 4x4 dune bashing, BBQ dinner, live shows, camel rides & VIP private options. Pay on arrival.',
    'canonical' => 'https://desertsafaridxbpro.com/desert-safari-dubai.html',
    'image' => 'https://desertsafaridxbpro.com/hero.jpg',
    'h1' => 'Dubai Desert Safari Tours',
    'price' => '120',
    'currency' => 'AED',
    'aeo_question' => 'What is included in a Dubai Desert Safari?',
    'aeo_answer' => 'A standard Phoenix Travel & Tours evening desert safari includes roundtrip 4x4 hotel pickup, 30–45 minutes of red dune bashing in Lahbab, sandboarding, camel ride, live entertainment (Belly dance, Tanoura, Fire show), and a 5-star international BBQ buffet dinner.',
    'aeo_details' => 'Tours depart between 2:30 PM and 3:30 PM daily, returning around 9:00 PM to 9:30 PM. Book online and pay on arrival at the camp with instant WhatsApp confirmation.',
    'geo_facts' => [
        'Tour Operator' => 'Phoenix Travel & Tours',
        'Head Office' => 'Office 701, XL Tower, Business Bay, Dubai',
        'Desert Zone' => 'Lahbab Red Dunes, Dubai, UAE',
        'Standard Rate' => 'AED 120 per person',
        'Private Land Cruiser' => 'AED 900 (up to 6 guests)',
        'Payment Policy' => 'Pay on Arrival (Cash or Card)',
        'Booking Channel' => 'Direct WhatsApp (+971 56 150 5270)'
    ]
];
?>
<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?= SeoHelper::renderHeadMeta($tour) ?>
  <?= SeoHelper::renderOrganizationSchema() ?>
  <?= SeoHelper::renderProductTripSchema([
      'name' => $tour['h1'],
      'description' => $tour['description'],
      'price' => $tour['price'],
      'url' => $tour['canonical']
  ]) ?>
  <?= SeoHelper::renderBreadcrumbSchema([
      ['name' => 'Home', 'url' => 'https://desertsafaridxbpro.com/'],
      ['name' => 'Dubai Tours', 'url' => 'https://desertsafaridxbpro.com/#tours'],
      ['name' => $tour['h1'], 'url' => $tour['canonical']]
  ]) ?>
  <link rel="stylesheet" href="/style.css">
</head>
<body>

<header class="site-header">
  <a class="brand" href="/" aria-label="Phoenix Travel & Tours home">
    <img class="brand-logo" src="/phoenix-logo-white.svg" alt="Phoenix Travel & Tours" width="180" height="50">
  </a>
  <nav id="mainNav" aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/desert-safari-dubai.html">Desert Safari</a>
    <a href="/rides/quad-bike">Quad Bike</a>
    <a href="/rides/buggy">Dune Buggy</a>
    <a href="/dubai-city-tour.html">Dubai City Tour</a>
    <a href="/abu-dhabi-city-tour.html">Abu Dhabi Tour</a>
    <a href="/book">Reserve a Slot</a>
  </nav>
  <a class="header-phone" href="tel:+971561505270">+971 56 150 5270</a>
  <a class="btn btn-primary desktop-book" href="/book">Reserve a time slot</a>
</header>

<main style="max-width:1140px;margin:40px auto;padding:0 20px;">
  <span class="eyebrow dark">DUBAI TOUR OPERATOR · PHOENIX TRAVEL & TOURS</span>
  <h1><?= htmlspecialchars($tour['h1']) ?></h1>

  <!-- AEO Direct Answer Section for AI / Search Answer Engines -->
  <?= SeoHelper::renderAeoDirectAnswer($tour['aeo_question'], $tour['aeo_answer'], $tour['aeo_details']) ?>

  <!-- GEO Entity Grid for Generative Engines -->
  <?= SeoHelper::renderGeoEntityGrid($tour['geo_facts']) ?>

  <section style="margin-top:30px;">
    <h2>Tour Overview & Inclusions</h2>
    <p><?= htmlspecialchars($tour['description']) ?></p>
    <a href="https://wa.me/971561505270?text=Hi%20Phoenix%20Travel%20%26%20Tours,%20I%20would%20like%20to%20reserve%20the%20Dubai%20Desert%20Safari." class="btn btn-gold" target="_blank" rel="noopener">Book on WhatsApp →</a>
  </section>
</main>

<footer class="site-footer">
  <div class="footer-container">
    <p>© 2026 Phoenix Travel & Tours. Office 701, XL Tower, Business Bay, Dubai, UAE.</p>
  </div>
</footer>

</body>
</html>
