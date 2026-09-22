-- =======================================================================
-- Phoenix Travel & Tours - Enterprise SEO, AEO & GEO Database Schema
-- Target Domain: https://desertsafaridxbpro.com
-- Head Office: Office 701, XL Tower, Business Bay, Dubai, UAE
-- WhatsApp: +971561505270
-- =======================================================================

CREATE DATABASE IF NOT EXISTS `phoenix_tours` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `phoenix_tours`;

-- 1. Site-wide settings & Local Business Entity Configuration
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `business_name` VARCHAR(150) NOT NULL DEFAULT 'Phoenix Travel & Tours',
  `domain_url` VARCHAR(255) NOT NULL DEFAULT 'https://desertsafaridxbpro.com',
  `office_address` VARCHAR(255) NOT NULL DEFAULT 'Office 701, XL Tower, Business Bay, Dubai, UAE',
  `locality` VARCHAR(100) NOT NULL DEFAULT 'Business Bay',
  `city` VARCHAR(100) NOT NULL DEFAULT 'Dubai',
  `country` VARCHAR(50) NOT NULL DEFAULT 'United Arab Emirates',
  `country_code` VARCHAR(10) NOT NULL DEFAULT 'AE',
  `postal_code` VARCHAR(20) DEFAULT '00000',
  `latitude` DECIMAL(10, 7) NOT NULL DEFAULT 25.1856000,
  `longitude` DECIMAL(10, 7) NOT NULL DEFAULT 55.2708000,
  `phone` VARCHAR(50) NOT NULL DEFAULT '+971561505270',
  `whatsapp` VARCHAR(50) NOT NULL DEFAULT '+971561505270',
  `email` VARCHAR(150) NOT NULL DEFAULT 'reservations@desertsafaridxbpro.com',
  `currency` VARCHAR(10) NOT NULL DEFAULT 'AED',
  `price_range` VARCHAR(50) NOT NULL DEFAULT 'AED 120 - AED 2,700',
  `opening_hours` VARCHAR(100) NOT NULL DEFAULT 'Mo-Su 07:00-23:00',
  `payment_accepted` VARCHAR(255) NOT NULL DEFAULT 'Cash on Arrival, Bank Transfer, Card on Arrival',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Site Settings
INSERT INTO `site_settings` (`id`, `business_name`, `domain_url`, `office_address`, `locality`, `city`, `phone`, `whatsapp`, `price_range`)
VALUES (1, 'Phoenix Travel & Tours', 'https://desertsafaridxbpro.com', 'Office 701, XL Tower, Business Bay, Dubai, UAE', 'Business Bay', 'Dubai', '+971561505270', '+971561505270', 'AED 120 - AED 2,700')
ON DUPLICATE KEY UPDATE `business_name`=VALUES(`business_name`), `domain_url`=VALUES(`domain_url`), `office_address`=VALUES(`office_address`);

-- 2. Master SEO Metadata & Canonical Mapping Table
CREATE TABLE IF NOT EXISTS `pages_seo` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `page_path` VARCHAR(255) NOT NULL,
  `canonical_url` VARCHAR(255) NOT NULL,
  `seo_title` VARCHAR(200) NOT NULL,
  `meta_description` VARCHAR(320) NOT NULL,
  `primary_h1` VARCHAR(200) NOT NULL,
  `primary_keyword` VARCHAR(150) NOT NULL,
  `secondary_keywords` TEXT,
  `search_intent` ENUM('INFORMATIONAL', 'COMMERCIAL_INVESTIGATION', 'TRANSACTIONAL', 'LOCAL', 'NAVIGATIONAL') DEFAULT 'COMMERCIAL_INVESTIGATION',
  `og_title` VARCHAR(200) DEFAULT NULL,
  `og_description` VARCHAR(320) DEFAULT NULL,
  `og_image` VARCHAR(255) DEFAULT 'hero.jpg',
  `robots_meta` VARCHAR(100) NOT NULL DEFAULT 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  `schema_type` VARCHAR(100) NOT NULL DEFAULT 'TouristTrip',
  `sitemap_priority` DECIMAL(3, 2) NOT NULL DEFAULT 0.80,
  `sitemap_changefreq` VARCHAR(20) NOT NULL DEFAULT 'daily',
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Page SEO Definitions
INSERT INTO `pages_seo` (`slug`, `page_path`, `canonical_url`, `seo_title`, `meta_description`, `primary_h1`, `primary_keyword`, `search_intent`, `sitemap_priority`) VALUES
('home', '/', 'https://desertsafaridxbpro.com/', 'Dubai Desert Safari, Quad Bike & Buggy Tours | Phoenix Travel & Tours', 'Book Dubai desert safari, quad bike, dune buggy and UAE city tours with Phoenix Travel & Tours. Clear AED rates, instant WhatsApp confirmation & pay on arrival.', 'Dubai desert safari, quad bike & buggy adventures', 'Dubai desert safari', 'COMMERCIAL_INVESTIGATION', 1.00),
('desert-safari', '/desert-safari-dubai.html', 'https://desertsafaridxbpro.com/desert-safari-dubai.html', 'Dubai Desert Safari Tours | Evening, Morning & Private 4x4 | Phoenix Travel & Tours', 'Book Dubai desert safari tours with Phoenix Travel & Tours. Evening 4x4 dune bashing, BBQ dinner, live shows, camel rides & VIP private options. Pay on arrival.', 'Dubai Desert Safari Tours', 'Dubai desert safari tours', 'TRANSACTIONAL', 0.95),
('quad-bike', '/rides/quad-bike', 'https://desertsafaridxbpro.com/rides/quad-bike', 'Quad Bike Dubai | Desert ATV Rental from AED 150 | Phoenix Travel & Tours', 'Ride high-performance 220cc to 700cc quad bikes in Dubai Red Dunes with Phoenix Travel & Tours. Open desert tracks, safety gear & instant WhatsApp booking.', 'Quad Bike Dubai Desert Experience', 'quad bike Dubai', 'TRANSACTIONAL', 0.90),
('dune-buggy', '/rides/buggy', 'https://desertsafaridxbpro.com/rides/buggy', 'Dune Buggy Dubai | Can-Am Maverick Rentals from AED 1,000 | Phoenix Travel & Tours', 'Drive 2-seater and 4-seater Can-Am Maverick dune buggies across Dubai red dunes with Phoenix Travel & Tours. Guided desert trails, helmets & direct WhatsApp booking.', 'Dune Buggy Dubai Desert Adventures', 'dune buggy Dubai', 'TRANSACTIONAL', 0.90),
('dubai-city-tour', '/dubai-city-tour.html', 'https://desertsafaridxbpro.com/dubai-city-tour.html', 'Dubai City Tour | Private Sightseeing with Car & Driver | Phoenix Travel & Tours', 'Explore modern landmarks & historic heritage with a private Dubai city tour by Phoenix Travel & Tours. Door-to-door hotel pickup, customized itinerary & clear AED rates.', 'Dubai City Tour – Old & Modern Dubai Sightseeing', 'Dubai city tour', 'COMMERCIAL_INVESTIGATION', 0.85),
('abu-dhabi-city-tour', '/abu-dhabi-city-tour.html', 'https://desertsafaridxbpro.com/abu-dhabi-city-tour.html', 'Abu Dhabi City Tour from Dubai | Private Day Trip | Phoenix Travel & Tours', 'Book a private Abu Dhabi City Tour from Dubai with Phoenix Travel & Tours. Visit Sheikh Zayed Grand Mosque, Emirates Palace, Louvre Museum & Yas Island. Clear AED rates.', 'Abu Dhabi City Tour from Dubai', 'Abu Dhabi city tour from Dubai', 'COMMERCIAL_INVESTIGATION', 0.85),
('sky-dive-dubai', '/sky-dive-dubai.html', 'https://desertsafaridxbpro.com/sky-dive-dubai.html', 'Sky Dive Dubai | Tandem Skydive Palm Jumeirah | Phoenix Travel & Tours', 'Experience tandem skydiving over Palm Jumeirah with Phoenix Travel & Tours. Complete with outside camera video & photos, briefing & WhatsApp confirmation. AED 2,700.', 'Sky Dive Dubai & Tandem Experience', 'Sky Dive Dubai', 'TRANSACTIONAL', 0.80),
('burj-khalifa-lake-ride', '/burj-khalifa-lake-ride.html', 'https://desertsafaridxbpro.com/burj-khalifa-lake-ride.html', 'Burj Khalifa Lake Ride & Dubai Fountain Abra Boat Tour | Phoenix Travel & Tours', 'Book Burj Khalifa Lake Ride tickets and Dubai Fountain traditional abra boat tours with Phoenix Travel & Tours. Front-row dancing fountain views from AED 130.', 'Burj Khalifa Lake Ride & Dubai Fountain Abra Tour', 'Burj Khalifa Lake Ride', 'TRANSACTIONAL', 0.80),
('book', '/book', 'https://desertsafaridxbpro.com/book', 'Book Your Ride | Quad Bike & Dune Buggy Dubai | Phoenix Travel & Tours', 'Select your Dubai desert adventure date, time slot, and package. Pay on arrival with instant confirmation on WhatsApp by Phoenix Travel & Tours.', 'Book your ride', 'Dubai desert tour booking', 'TRANSACTIONAL', 0.75);

-- 3. AEO (Answer Engine Optimization) Direct Answer Knowledge Base
CREATE TABLE IF NOT EXISTS `aeo_answers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_slug` VARCHAR(150) NOT NULL,
  `question` VARCHAR(255) NOT NULL,
  `short_answer` TEXT NOT NULL,
  `supporting_details` TEXT,
  `display_order` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed AEO Direct Answers
INSERT INTO `aeo_answers` (`page_slug`, `question`, `short_answer`, `supporting_details`, `display_order`) VALUES
('desert-safari', 'What is included in a Dubai Desert Safari?', 'A standard Phoenix Travel & Tours evening desert safari includes roundtrip 4x4 hotel pickup, 30–45 minutes of red dune bashing, sandboarding, camel rides, live entertainment (Belly Dance, Tanoura, Fire Show), and a 5-star international BBQ buffet dinner with vegetarian and non-vegetarian selections.', 'Tours depart between 2:30 PM and 3:30 PM daily, with return to your hotel around 9:00 PM to 9:30 PM. Private Land Cruiser vehicles are available for families and private groups.', 1),
('desert-safari', 'How much does a Dubai desert safari cost?', 'Dubai desert safari prices start from AED 120 per guest for sharing transfers with full BBQ camp activities, AED 250 for safaris bundled with quad biking, and AED 900 for a private luxury 4x4 vehicle accommodating up to 6 guests.', 'Payment is made upon arrival at the desert base camp with no upfront credit card required on our website.', 2),
('quad-bike', 'How much does quad biking in Dubai cost?', 'Quad bike rentals in the Dubai Lahbab desert start at AED 150 for a 30-minute self-drive session on a 220cc ATV. Upgraded 400cc and 700cc Raptor bikes range from AED 250 to AED 450 per session.', 'All quad biking packages include safety helmets, protective goggles, professional briefing, and desert guide accompaniment. No formal driver license is required.', 1),
('dune-buggy', 'How much does a dune buggy rental cost in Dubai?', 'Dune buggy rental in Dubai starts at AED 1,000 per hour for a 2-seater Can-Am Maverick X3 Turbo, and AED 1,400 per hour for a 4-seater model. Packages include safety equipment, fuel, and private lead desert guides.', 'All buggies feature full roll-cages, racing 4-point harnesses, automatic transmission, and high-travel off-road suspension engineered for high dunes.', 1),
('dubai-city-tour', 'What is included in a Dubai City Tour?', 'A private Dubai city tour includes a dedicated air-conditioned vehicle with licensed chauffeur visiting Old Dubai, Dubai Gold & Spice Souks, Dubai Creek Abra crossing, Dubai Frame photo stop, Burj Al Arab view from Jumeirah Beach, and Downtown Burj Khalifa.', 'Half-day tours last 4 to 5 hours, while comprehensive full-day tours last 8 to 9 hours with flexible photo stops at your own pace.', 1),
('abu-dhabi-city-tour', 'Can I visit Abu Dhabi from Dubai in one day?', 'Yes, Phoenix Travel & Tours provides full-day 8 to 9-hour day trips from Dubai to Abu Dhabi including roundtrip hotel pickup, guided entry to Sheikh Zayed Grand Mosque, Emirates Palace photo stop, Abu Dhabi Corniche, Heritage Village, and Yas Island.', 'Tours depart between 8:00 AM and 9:00 AM from any Dubai hotel and return by 6:00 PM.', 1);

-- 4. Tour Catalog and Pricing Schema
CREATE TABLE IF NOT EXISTS `tours` (
  `id` VARCHAR(100) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `category` ENUM('safari', 'quad', 'buggy', 'city', 'attraction') NOT NULL,
  `headline` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `starting_price` DECIMAL(10, 2) NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'AED',
  `duration` VARCHAR(100) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `pickup_type` VARCHAR(100) NOT NULL DEFAULT 'Hotel Pickup Included',
  `cancellation_policy` VARCHAR(255) NOT NULL DEFAULT 'Free cancellation up to 24 hours before tour start time',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Tours
INSERT INTO `tours` (`id`, `name`, `category`, `headline`, `description`, `starting_price`, `duration`, `image_url`, `pickup_type`) VALUES
('evening-safari', 'Evening Desert Safari with BBQ Dinner', 'safari', 'Dune bashing, camel ride, live entertainment & BBQ dinner', 'The quintessential Dubai desert adventure in Lahbab Red Dunes with 4x4 dune bashing, sandboarding, camel ride, henna painting, live Tanoura & fire shows, and full buffet dinner.', 120.00, '6 Hours (2:30 PM - 9:00 PM)', 'hero.jpg', 'Hotel Pickup Included'),
('private-safari', 'Private Luxury 4x4 Desert Safari', 'safari', 'Exclusive Land Cruiser for your family or private group', 'Enjoy total privacy and customized pace in a dedicated Toyota Land Cruiser with VIP camp seating and personalized service.', 900.00, '6 Hours', 'hero.jpg', 'Private Hotel Pickup'),
('quad-bike-30', '30-Min Desert Quad Biking (220cc)', 'quad', 'Self-drive open desert ATV ride with full safety gear', 'Drive through open desert tracks with helmet, goggles and support marshals. Ideal for beginners and thrill-seekers.', 150.00, '30 Minutes', 'https://images.pexels.com/photos/36713570/pexels-photo-36713570.jpeg?auto=compress&cs=tinysrgb&w=800', 'Base Camp Meeting / Transfer Available'),
('dune-buggy-canam', 'Can-Am Maverick X3 Dune Buggy (2-Seater)', 'buggy', 'High-powered turbo buggy across deep red dunes', 'Drive a genuine Can-Am Maverick with roll-cage and racing harness, guided by a lead marshal across Dubai desert trails.', 1000.00, '1 Hour', 'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=800', 'Base Camp Meeting / Transfer Available'),
('dubai-city-halfday', 'Half-Day Dubai City Sightseeing Tour', 'city', 'Old & Modern Dubai landmarks with private chauffeur', 'Explore Dubai Creek, traditional souks, Jumeirah Mosque, Burj Al Arab, and Burj Khalifa photo stops with air-conditioned private vehicle.', 450.00, '4.5 Hours', 'dubai.jpg', 'Hotel Pickup Included'),
('abu-dhabi-daytrip', 'Abu Dhabi City Tour from Dubai', 'city', 'Sheikh Zayed Grand Mosque, Emirates Palace & Yas Island', 'Comprehensive day excursion from Dubai exploring the UAE capital, magnificent Grand Mosque, and cultural highlights.', 650.00, '8 - 9 Hours', 'abudhabi.jpg', 'Hotel Pickup Included');

-- 5. FAQ Table for On-Page & Schema Generation
CREATE TABLE IF NOT EXISTS `faqs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_slug` VARCHAR(150) NOT NULL,
  `question` VARCHAR(255) NOT NULL,
  `answer` TEXT NOT NULL,
  `display_order` INT NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
