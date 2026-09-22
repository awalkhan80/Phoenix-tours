<?php
/**
 * =======================================================================
 * Phoenix Travel & Tours - Enterprise Server-Side SEO, AEO & GEO Helper
 * Domain: https://desertsafaridxbpro.com
 * Address: Office 701, XL Tower, Business Bay, Dubai, UAE
 * WhatsApp: +971561505270
 * =======================================================================
 */

class SeoHelper {
    public static $domain = 'https://desertsafaridxbpro.com';
    public static $businessName = 'Phoenix Travel & Tours';
    public static $address = 'Office 701, XL Tower, Business Bay, Dubai, UAE';
    public static $locality = 'Business Bay';
    public static $city = 'Dubai';
    public static $country = 'United Arab Emirates';
    public static $countryCode = 'AE';
    public static $lat = 25.1856;
    public static $lng = 55.2708;
    public static $phone = '+971561505270';
    public static $whatsapp = '+971561505270';

    /**
     * Renders standard head metadata (Titles, Meta Description, Canonical, OG, Twitter)
     */
    public static function renderHeadMeta($data) {
        $title = htmlspecialchars($data['title'] ?? 'Dubai Desert Safari, Quad Bike & Buggy Tours | Phoenix Travel & Tours');
        $desc = htmlspecialchars($data['description'] ?? 'Book Dubai desert safari, quad bike, dune buggy and UAE city tours with Phoenix Travel & Tours.');
        $canonical = htmlspecialchars($data['canonical'] ?? self::$domain . '/');
        $ogImage = htmlspecialchars($data['image'] ?? self::$domain . '/hero.jpg');
        $robots = htmlspecialchars($data['robots'] ?? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');

        $html = "<!-- Master Technical & Social SEO Meta -->\n";
        $html .= "<title>{$title}</title>\n";
        $html .= "<meta name=\"description\" content=\"{$desc}\">\n";
        $html .= "<meta name=\"robots\" content=\"{$robots}\">\n";
        $html .= "<meta name=\"theme-color\" content=\"#063c49\">\n";
        $html .= "<link rel=\"canonical\" href=\"{$canonical}\">\n";
        $html .= "<link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.svg\">\n";
        $html .= "<link rel=\"apple-touch-icon\" href=\"/favicon.svg\">\n";
        $html .= "<link rel=\"sitemap\" type=\"application/xml\" href=\"/sitemap.xml\">\n";
        $html .= "<meta property=\"og:type\" content=\"website\">\n";
        $html .= "<meta property=\"og:locale\" content=\"en_AE\">\n";
        $html .= "<meta property=\"og:site_name\" content=\"" . self::$businessName . "\">\n";
        $html .= "<meta property=\"og:title\" content=\"{$title}\">\n";
        $html .= "<meta property=\"og:description\" content=\"{$desc}\">\n";
        $html .= "<meta property=\"og:url\" content=\"{$canonical}\">\n";
        $html .= "<meta property=\"og:image\" content=\"{$ogImage}\">\n";
        $html .= "<meta name=\"twitter:card\" content=\"summary_large_image\">\n";
        $html .= "<meta name=\"twitter:title\" content=\"{$title}\">\n";
        $html .= "<meta name=\"twitter:description\" content=\"{$desc}\">\n";
        $html .= "<meta name=\"twitter:image\" content=\"{$ogImage}\">\n";

        return $html;
    }

    /**
     * Renders LocalBusiness / TravelAgency JSON-LD with verified Business Bay address
     */
    public static function renderOrganizationSchema() {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'TravelAgency',
            '@id' => self::$domain . '/#organization',
            'name' => self::$businessName,
            'url' => self::$domain . '/',
            'telephone' => self::$phone,
            'image' => self::$domain . '/hero.jpg',
            'logo' => self::$domain . '/phoenix-logo.png',
            'priceRange' => 'AED 120 - AED 2,700',
            'currenciesAccepted' => 'AED',
            'paymentAccepted' => 'Cash on Arrival, Bank Transfer, Card on Arrival',
            'description' => 'Dubai-based tour and adventure operator offering desert safaris, quad biking, dune buggy rides, tandem skydiving, and UAE city excursions with transparent AED pricing and WhatsApp confirmation.',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'Office 701, XL Tower',
                'addressLocality' => self::$locality,
                'addressRegion' => self::$city,
                'addressCountry' => self::$countryCode
            ],
            'geo' => [
                '@type' => 'GeoCoordinates',
                'latitude' => self::$lat,
                'longitude' => self::$lng
            ],
            'areaServed' => [
                ['@type' => 'City', 'name' => 'Dubai'],
                ['@type' => 'City', 'name' => 'Abu Dhabi'],
                ['@type' => 'Country', 'name' => 'United Arab Emirates']
            ],
            'openingHoursSpecification' => [
                '@type' => 'OpeningHoursSpecification',
                'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                'opens' => '07:00',
                'closes' => '23:00'
            ],
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'telephone' => self::$phone,
                'contactType' => 'reservations',
                'availableLanguage' => ['English', 'Arabic']
            ]
        ];

        return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "</script>\n";
    }

    /**
     * Renders TouristTrip + Product + Offer Schema
     */
    public static function renderProductTripSchema($tour) {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'TouristTrip',
            'name' => $tour['name'],
            'description' => $tour['description'],
            'touristType' => ['Adventure Seekers', 'Couples', 'Families', 'Tourists'],
            'offers' => [
                '@type' => 'Offer',
                'price' => $tour['price'],
                'priceCurrency' => 'AED',
                'availability' => 'https://schema.org/InStock',
                'validFrom' => '2026-01-01',
                'priceValidUntil' => '2026-12-31',
                'url' => $tour['url'] ?? self::$domain . '/',
                'seller' => [
                    '@type' => 'TravelAgency',
                    'name' => self::$businessName,
                    'telephone' => self::$phone,
                    'address' => self::$address
                ]
            ],
            'provider' => [
                '@type' => 'TravelAgency',
                'name' => self::$businessName,
                'url' => self::$domain . '/'
            ]
        ];

        return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "</script>\n";
    }

    /**
     * Renders BreadcrumbList Schema
     */
    public static function renderBreadcrumbSchema($items) {
        $list = [];
        foreach ($items as $idx => $item) {
            $list[] = [
                '@type' => 'ListItem',
                'position' => $idx + 1,
                'name' => $item['name'],
                'item' => $item['url']
            ];
        }

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => $list
        ];

        return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "</script>\n";
    }

    /**
     * Renders FAQPage Schema
     */
    public static function renderFaqSchema($faqs) {
        $mainEntity = [];
        foreach ($faqs as $faq) {
            $mainEntity[] = [
                '@type' => 'Question',
                'name' => $faq['q'],
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => $faq['a']
                ]
            ];
        }

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => $mainEntity
        ];

        return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "</script>\n";
    }

    /**
     * Generates on-page AEO Direct Answer Section (Answer Engine Optimization)
     */
    public static function renderAeoDirectAnswer($question, $shortAnswer, $details = null) {
        $html = "<div class=\"aeo-direct-answer-box\" style=\"background:#ffffff;border:1.5px solid #c89a3f;border-radius:14px;padding:22px;margin:24px 0;box-shadow:0 8px 24px rgba(6,60,73,0.06);\">\n";
        $html .= "  <div style=\"display:flex;align-items:center;gap:8px;margin-bottom:10px;\">\n";
        $html .= "    <span style=\"background:#c89a3f;color:#fff;font-size:10px;font-weight:800;padding:3px 8px;border-radius:6px;text-transform:uppercase;letter-spacing:0.08em;\">Direct Answer</span>\n";
        $html .= "    <strong style=\"color:#063c49;font-size:15px;\">" . htmlspecialchars($question) . "</strong>\n";
        $html .= "  </div>\n";
        $html .= "  <p style=\"font-size:15px;line-height:1.6;color:#1e3d44;margin:0 0 10px;font-weight:600;\">" . htmlspecialchars($shortAnswer) . "</p>\n";
        if ($details) {
            $html .= "  <p style=\"font-size:13.5px;line-height:1.5;color:#4f6b70;margin:0;\">" . htmlspecialchars($details) . "</p>\n";
        }
        $html .= "</div>\n";
        return $html;
    }

    /**
     * Generates on-page GEO (Generative Engine Optimization) Entity Facts Grid
     */
    public static function renderGeoEntityGrid($facts) {
        $html = "<div class=\"geo-entity-grid\" style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:24px 0;\">\n";
        foreach ($facts as $label => $val) {
            $html .= "  <div style=\"background:#fbf7ee;border:1px solid #e7ded0;border-radius:10px;padding:12px;\">\n";
            $html .= "    <small style=\"display:block;font-size:11px;font-weight:800;color:#c89a3f;text-transform:uppercase;letter-spacing:0.06em;\">" . htmlspecialchars($label) . "</small>\n";
            $html .= "    <strong style=\"display:block;font-size:13.5px;color:#063c49;margin-top:2px;\">" . htmlspecialchars($val) . "</strong>\n";
            $html .= "  </div>\n";
        }
        $html .= "</div>\n";
        return $html;
    }
}
