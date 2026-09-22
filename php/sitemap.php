<?php
/**
 * Dynamic XML Sitemap Generator
 * Outputs valid XML conforming to sitemaps.org standards
 */
header('Content-Type: application/xml; charset=utf-8');

$domain = 'https://desertsafaridxbpro.com';
$today = date('Y-m-d');

$pages = [
    ['loc' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
    ['loc' => '/desert-safari-dubai.html', 'priority' => '0.95', 'changefreq' => 'daily'],
    ['loc' => '/rides/quad-bike', 'priority' => '0.90', 'changefreq' => 'daily'],
    ['loc' => '/rides/buggy', 'priority' => '0.90', 'changefreq' => 'daily'],
    ['loc' => '/dubai-city-tour.html', 'priority' => '0.85', 'changefreq' => 'weekly'],
    ['loc' => '/abu-dhabi-city-tour.html', 'priority' => '0.85', 'changefreq' => 'weekly'],
    ['loc' => '/sky-dive-dubai.html', 'priority' => '0.80', 'changefreq' => 'weekly'],
    ['loc' => '/burj-khalifa-lake-ride.html', 'priority' => '0.80', 'changefreq' => 'weekly'],
    ['loc' => '/book', 'priority' => '0.75', 'changefreq' => 'weekly']
];

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($pages as $p): ?>
  <url>
    <loc><?= htmlspecialchars($domain . $p['loc']) ?></loc>
    <lastmod><?= $today ?></lastmod>
    <changefreq><?= $p['changefreq'] ?></changefreq>
    <priority><?= $p['priority'] ?></priority>
  </url>
<?php endforeach; ?>
</urlset>
