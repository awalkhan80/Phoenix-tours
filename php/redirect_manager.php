<?php
/**
 * Phoenix Travel & Tours - Enterprise Redirect & 404 Engine
 * Domain: https://desertsafaridxbpro.com
 * Head Office: Office 701, XL Tower, Business Bay, Dubai, UAE
 * WhatsApp: +971561505270
 */

class RedirectManager {
    /**
     * Exact 301 Permanent Redirect Dictionary
     */
    private static $exactRedirects = [
        // Safari variations
        '/safari' => '/desert-safari-dubai.html',
        '/safari/' => '/desert-safari-dubai.html',
        '/desert-safari' => '/desert-safari-dubai.html',
        '/desert-safari/' => '/desert-safari-dubai.html',
        '/dubai-desert-safari' => '/desert-safari-dubai.html',
        '/evening-desert-safari' => '/desert-safari-dubai.html',
        '/morning-desert-safari' => '/desert-safari-dubai.html',
        '/private-desert-safari' => '/desert-safari-dubai.html',
        '/tours/desert-safari' => '/desert-safari-dubai.html',
        '/safari.php' => '/desert-safari-dubai.html',

        // Quad bike variations
        '/quad' => '/rides/quad-bike',
        '/quad/' => '/rides/quad-bike',
        '/quad-bike' => '/rides/quad-bike',
        '/quad-bike/' => '/rides/quad-bike',
        '/quad-biking' => '/rides/quad-bike',
        '/atv' => '/rides/quad-bike',
        '/atv-rental' => '/rides/quad-bike',
        '/quad-bike-dubai.html' => '/rides/quad-bike',
        '/tours/quad-bike' => '/rides/quad-bike',

        // Dune buggy variations
        '/buggy' => '/rides/buggy',
        '/buggy/' => '/rides/buggy',
        '/dune-buggy' => '/rides/buggy',
        '/dune-buggy/' => '/rides/buggy',
        '/can-am' => '/rides/buggy',
        '/canam' => '/rides/buggy',
        '/dune-buggy-dubai.html' => '/rides/buggy',
        '/tours/dune-buggy' => '/rides/buggy',

        // City tour variations
        '/city-tour' => '/dubai-city-tour.html',
        '/city-tour/' => '/dubai-city-tour.html',
        '/dubai-city' => '/dubai-city-tour.html',
        '/sightseeing' => '/dubai-city-tour.html',
        '/tours/dubai-city' => '/dubai-city-tour.html',

        // Abu Dhabi tour variations
        '/abu-dhabi' => '/abu-dhabi-city-tour.html',
        '/abu-dhabi/' => '/abu-dhabi-city-tour.html',
        '/abudhabi' => '/abu-dhabi-city-tour.html',
        '/grand-mosque-tour' => '/abu-dhabi-city-tour.html',
        '/tours/abu-dhabi' => '/abu-dhabi-city-tour.html',

        // Skydive variations
        '/skydive' => '/sky-dive-dubai.html',
        '/skydive-dubai' => '/sky-dive-dubai.html',
        '/skydiving' => '/sky-dive-dubai.html',
        '/tandem-skydive' => '/sky-dive-dubai.html',

        // Lake ride variations
        '/burj-lake' => '/burj-khalifa-lake-ride.html',
        '/lake-ride' => '/burj-khalifa-lake-ride.html',
        '/dubai-fountain' => '/burj-khalifa-lake-ride.html',
        '/fountain-ride' => '/burj-khalifa-lake-ride.html',

        // Booking & Admin
        '/booking' => '/book',
        '/book.php' => '/book',
        '/reserve' => '/book',
        '/admin.php' => '/admin.html'
    ];

    /**
     * Pattern / Fuzzy keyword matchers for misspelled or nested paths
     */
    private static $patternRedirects = [
        'safari' => '/desert-safari-dubai.html',
        'quad' => '/rides/quad-bike',
        'atv' => '/rides/quad-bike',
        'buggy' => '/rides/buggy',
        'can-am' => '/rides/buggy',
        'canam' => '/rides/buggy',
        'abu-dhabi' => '/abu-dhabi-city-tour.html',
        'abudhabi' => '/abu-dhabi-city-tour.html',
        'city-tour' => '/dubai-city-tour.html',
        'skydive' => '/sky-dive-dubai.html',
        'fountain' => '/burj-khalifa-lake-ride.html',
        'lake-ride' => '/burj-khalifa-lake-ride.html',
        'book' => '/book'
    ];

    /**
     * Inspect URI and perform 301 redirect if matched, or return target URL
     */
    public static function handleRequest($requestUri = null) {
        if ($requestUri === null) {
            $requestUri = $_SERVER['REQUEST_URI'] ?? '/';
        }

        // Clean query strings & trailing parameters
        $cleanPath = parse_url($requestUri, PHP_URL_PATH);
        $cleanPath = strtolower(rtrim($cleanPath, '/'));
        if (empty($cleanPath)) {
            $cleanPath = '/';
        }

        // 1. Direct exact lookup
        if (isset(self::$exactRedirects[$cleanPath])) {
            self::do301(self::$exactRedirects[$cleanPath]);
            return;
        }

        // Check if path with slash exists
        if (isset(self::$exactRedirects[$cleanPath . '/'])) {
            self::do301(self::$exactRedirects[$cleanPath . '/']);
            return;
        }

        // 2. Keyword heuristic lookup for 404 recovery
        foreach (self::$patternRedirects as $keyword => $target) {
            if (strpos($cleanPath, $keyword) !== false) {
                // Ensure we are not already on the destination
                if ($cleanPath !== $target) {
                    self::do301($target);
                    return;
                }
            }
        }

        // No match found -> Proceed to 404
        return false;
    }

    /**
     * Send HTTP 301 Moved Permanently header and exit
     */
    public static function do301($destinationUrl) {
        header("HTTP/1.1 301 Moved Permanently");
        header("Location: " . $destinationUrl);
        header("X-Redirect-By: Phoenix-SEO-Engine");
        header("Cache-Control: public, max-age=86400");
        exit();
    }
}
