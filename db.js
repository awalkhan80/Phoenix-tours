import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data
const initialData = {
  users: [
    {
      id: 'usr_admin',
      username: 'admin',
      passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // 'admin123'
      name: 'Phoenix Admin',
      email: 'admin@phoenix-tours.ae',
      role: 'Super Admin',
      createdAt: '2026-01-01T00:00:00.000Z'
    }
  ],
  settings: {
    siteName: 'Phoenix Travel & Tours',
    siteUrl: 'https://desertsafaridxbpro.com',
    logoUrl: '/Logo.svg',
    faviconUrl: '/favicon.svg',
    phone: '+971 56 150 5270',
    whatsapp: '+971 56 150 5270',
    email: 'bookings@phoenix-tours.ae',
    address: 'Office 701, XL Tower, Business Bay, Dubai, UAE',
    googleMapsUrl: 'https://maps.google.com/?q=XL+Tower+Business+Bay+Dubai',
    currency: 'AED',
    timezone: 'Asia/Dubai',
    social: {
      facebook: 'https://facebook.com/phoenixtoursdubai',
      instagram: 'https://instagram.com/phoenixtoursdubai',
      tripadvisor: 'https://tripadvisor.com/phoenixtoursdubai',
      tiktok: 'https://tiktok.com/@phoenixtoursdubai'
    },
    analytics: {
      googleAnalyticsId: 'G-PX12345678',
      facebookPixelId: 'PX-987654321',
      searchConsoleVerification: 'px-verification-code'
    },
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      user: 'bookings@phoenix-tours.ae',
      fromEmail: 'bookings@phoenix-tours.ae',
      fromName: 'Phoenix Travel & Tours Concierge'
    }
  },
  homepage: {
    hero: {
      eyebrow: 'PREMIUM DUBAI ADVENTURES',
      heading: 'Experience The Ultimate Dubai Desert & City Tours',
      subheading: 'Self-drive quad bikes, luxury Can-Am dune buggies, red dune desert safaris, and private city excursions. Pay on arrival with zero advance deposit required.',
      bgImage: 'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ctaPrimaryText: 'Reserve Your Ride →',
      ctaPrimaryLink: '/book',
      ctaSecondaryText: 'WhatsApp Concierge',
      ctaSecondaryLink: 'https://wa.me/971561505270'
    },
    sectionsVisibility: {
      topQa: true,
      featuredTours: true,
      whyChooseUs: true,
      counters: true,
      testimonials: true,
      faq: true,
      contactMap: true
    },
    sectionsOrder: ['topQa', 'featuredTours', 'whyChooseUs', 'counters', 'testimonials', 'faq', 'contactMap'],
    counters: [
      { label: 'Happy Adventurers', value: '50,000+' },
      { label: '5-Star Reviews', value: '12,400+' },
      { label: 'Luxury 4x4 Fleet', value: '35+' },
      { label: 'Safety Record', value: '100%' }
    ],
    about: {
      title: 'About Phoenix Travel & Tours',
      content: 'Licensed Dubai Tour Operator delivering top-rated desert safaris, quad biking, and private sightseeing tours across the UAE.'
    }
  },
  tours: [
    {
      id: 'desert-safari',
      name: 'Evening Desert Safari Dubai',
      slug: 'desert-safari-dubai',
      category: 'Desert Safari',
      shortDescription: '4x4 Lahbab red dune bashing, camel riding, sandboarding, live Tanoura & belly dance, plus 5-star BBQ dinner buffet.',
      fullDescription: 'Experience the magic of Lahbab Red Dunes with roll-caged Toyota Land Cruiser 4x4 dune bashing, camel riding, sandboarding, live Tanoura and fire shows, and a 5-star international BBQ dinner.',
      duration: '6 Hours',
      location: 'Lahbab Red Dunes, Dubai',
      tourType: 'Sharing / Private 4x4',
      featured: true,
      status: 'Published',
      pricing: {
        regularPrice: 150,
        salePrice: 120,
        adultPrice: 120,
        childPrice: 90,
        sharingPrice: 120,
        privatePrice: 900
      },
      variants: [
        { id: 'v1', name: 'Standard Sharing 4x4', price: 120, unit: 'person' },
        { id: 'v2', name: 'VIP Majlis Service', price: 180, unit: 'person' },
        { id: 'v3', name: 'Private Luxury 4x4 (6 Seats)', price: 900, unit: 'vehicle' }
      ],
      details: {
        highlights: ['4x4 Dune Bashing in Lahbab Red Dunes', 'Sandboarding down high dunes', 'Camel Ride & Falcon Photography', 'Live Belly Dance, Tanoura & Fire Show', '5-Star BBQ Dinner Buffet'],
        inclusions: ['Door-to-door hotel pickup & drop-off', 'Roll-caged Toyota Land Cruiser transfers', 'Unlimited soft drinks, tea & coffee', 'Buffet dinner with Veg & Non-Veg options'],
        exclusions: ['Quad bike ATV rental (optional add-on)', 'Alcoholic beverages', 'Souvenir photographs'],
        itinerary: '02:30 PM Pickup -> 04:00 PM Red Dunes Dune Bashing & Sandboarding -> 05:30 PM Camel Ride & Sunset Photos -> 06:30 PM Desert Camp Dinner & Live Shows -> 09:00 PM Drop-off',
        pickupInfo: 'Hotel pickup included from anywhere in Dubai, Sharjah, or Ajman.',
        terms: 'Free cancellation up to 12 hours before tour start time. Pay on arrival accepted.'
      },
      media: {
        featuredImage: 'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=800',
        gallery: ['https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=800']
      },
      seo: {
        title: 'Dubai Desert Safari Tours | Evening, Morning & Private 4x4 | Phoenix Travel & Tours',
        metaDescription: 'Book top-rated Dubai desert safari tours with Phoenix Travel & Tours. Lahbab red dune bashing, BBQ dinner, camel rides & live shows. Clear AED rates & pay on arrival.',
        keywords: 'Dubai desert safari, dune bashing, evening desert safari, Lahbab red dunes',
        canonicalUrl: 'https://desertsafaridxbpro.com/desert-safari-dubai.html'
      }
    },
    {
      id: 'quad-bike',
      name: 'Quad Bike ATV Rental Dubai',
      slug: 'quad-bike-dubai',
      category: 'Quad Bikes',
      shortDescription: 'Conquer open desert dunes on high-performance 220cc to 700cc Raptor ATVs. No driving license required.',
      fullDescription: 'Ride powerful 220cc to 700cc Raptor quad bikes over Dubai\'s high red dunes. Full safety gear, instructor briefing, and desert guide supervision included.',
      duration: '30 Min - 1 Hour',
      location: 'Open Red Dunes, Dubai',
      tourType: 'Self-Drive ATV',
      featured: true,
      status: 'Published',
      pricing: {
        regularPrice: 200,
        salePrice: 150,
        adultPrice: 150,
        childPrice: 150,
        sharingPrice: 150,
        privatePrice: 250
      },
      variants: [
        { id: 'qv1', name: '30 Min ATV Session (220cc)', price: 150, unit: 'bike' },
        { id: 'qv2', name: '60 Min ATV Session (220cc)', price: 250, unit: 'bike' },
        { id: 'qv3', name: '60 Min Raptor 700cc Monster ATV', price: 450, unit: 'bike' }
      ],
      details: {
        highlights: ['Self-drive automatic quad bikes', 'Open red dune riding area', 'Professional desert marshals', 'Safety helmets & goggles included'],
        inclusions: ['Safety gear & goggles', 'Fuel & quad bike rental', 'Instructor briefing'],
        exclusions: ['Hotel transfers (optional extra)', 'Insurance coverage'],
        itinerary: 'Arrival at desert base camp -> Safety briefing & gear fitting -> 30/60 min open dune riding -> Photo session -> Return',
        pickupInfo: 'Self-drive to desert base camp or request private 4x4 hotel transfer.',
        terms: 'Must be 16+ for open dune riding. Signed waiver required.'
      },
      media: {
        featuredImage: 'https://images.pexels.com/photos/33041/quad-bike-atv-all-terrain-vehicle-quad.jpg?auto=compress&cs=tinysrgb&w=800',
        gallery: ['https://images.pexels.com/photos/33041/quad-bike-atv-all-terrain-vehicle-quad.jpg?auto=compress&cs=tinysrgb&w=800']
      },
      seo: {
        title: 'Quad Bike Dubai | Desert ATV Rental from AED 150 | Phoenix Travel & Tours',
        metaDescription: 'Self-drive quad bike in Dubai desert dunes. 30 min & 1 hour ATV rentals from AED 150 with Phoenix Travel & Tours. No driving license required.',
        keywords: 'Quad bike Dubai, ATV rental Dubai, desert quad biking',
        canonicalUrl: 'https://desertsafaridxbpro.com/rides/quad-bike'
      }
    },
    {
      id: 'buggy',
      name: 'Can-Am Dune Buggy Dubai',
      slug: 'dune-buggy-dubai',
      category: 'Buggy',
      shortDescription: 'Drive 2-seater or 4-seater Can-Am Maverick X3 Turbo buggies with roll cages, 4-point harnesses, and desert guides.',
      fullDescription: 'Drive state-of-the-art Can-Am Maverick X3 Turbo buggies with tubular roll-cages, 4-point harnesses, automatic transmission, and private desert lead guides.',
      duration: '1 Hour',
      location: 'Lahbab Red Dunes, Dubai',
      tourType: 'Guided Off-Road Buggy',
      featured: true,
      status: 'Published',
      pricing: {
        regularPrice: 1200,
        salePrice: 1000,
        adultPrice: 1000,
        childPrice: 1000,
        sharingPrice: 1000,
        privatePrice: 1400
      },
      variants: [
        { id: 'bv1', name: '60 Min 2-Seater Can-Am Maverick X3', price: 1000, unit: 'buggy' },
        { id: 'bv2', name: '60 Min 4-Seater Can-Am Maverick Family', price: 1400, unit: 'buggy' }
      ],
      details: {
        highlights: ['High-powered Can-Am Maverick Turbo buggy', 'Tubular roll cage & 4-point safety harness', 'Private lead guide marshal on separate bike', 'Deep dune desert trails'],
        inclusions: ['Can-Am Buggy rental & fuel', 'Full face helmet & goggles', 'Refreshments & water'],
        exclusions: ['Personal damages optional waiver'],
        itinerary: 'Base camp arrival -> Gear up -> Guided dune convoy -> High dune photo stop -> Base camp return',
        pickupInfo: 'Base camp meeting point or hotel transfer available on request.',
        terms: 'Min age for driver 18+. Valid ID required.'
      },
      media: {
        featuredImage: 'https://images.pexels.com/photos/12318029/pexels-photo-12318029.jpeg?auto=compress&cs=tinysrgb&w=800',
        gallery: ['https://images.pexels.com/photos/12318029/pexels-photo-12318029.jpeg?auto=compress&cs=tinysrgb&w=800']
      },
      seo: {
        title: 'Dune Buggy Dubai | Can-Am Maverick Rentals from AED 1,000 | Phoenix Travel & Tours',
        metaDescription: 'Drive 2-seater and 4-seater Can-Am Maverick dune buggies across Dubai red dunes with Phoenix Travel & Tours. Guided desert trails, helmets & direct WhatsApp booking.',
        keywords: 'Dune buggy Dubai, Can-Am Maverick rental, off-road buggy',
        canonicalUrl: 'https://desertsafaridxbpro.com/rides/buggy'
      }
    },
    {
      id: 'dubai-city',
      name: 'Private Dubai City Tour',
      slug: 'dubai-city-tour',
      category: 'City Tours',
      shortDescription: 'Explore modern landmarks & historic heritage with a private Dubai city tour by Phoenix Travel & Tours.',
      fullDescription: 'Discover Dubai Frame, Museum of the Future, Burj Al Arab, Palm Jumeirah, and Downtown Dubai with a private vehicle and licensed guide.',
      duration: '4.5 Hours',
      location: 'Dubai Landmarks',
      tourType: 'Private Sightseeing',
      featured: false,
      status: 'Published',
      pricing: {
        regularPrice: 500,
        salePrice: 450,
        adultPrice: 450,
        childPrice: 350,
        sharingPrice: 450,
        privatePrice: 450
      },
      variants: [
        { id: 'dc1', name: 'Half Day Private Tour (Up to 6 guests)', price: 450, unit: 'vehicle' },
        { id: 'dc2', name: 'Full Day Private Tour (8 Hours)', price: 800, unit: 'vehicle' }
      ],
      details: {
        highlights: ['Burj Khalifa & Downtown Dubai', 'Museum of the Future Photo Stop', 'Dubai Frame & Zabeel Palace', 'Palm Jumeirah & Atlantis Hotel'],
        inclusions: ['Private air-conditioned vehicle', 'Licensed English chauffeur guide', 'Hotel pickup & drop-off'],
        exclusions: ['Entry tickets to attractions unless requested'],
        itinerary: 'Pickup -> Dubai Frame -> Zabeel Palace -> Jumeirah Mosque -> Burj Al Arab -> Palm Jumeirah -> Downtown Dubai -> Dropoff',
        pickupInfo: 'Pickup from all Dubai hotels and residences.',
        terms: 'Flexible timing. Free cancellation up to 24 hours prior.'
      },
      media: {
        featuredImage: 'https://images.pexels.com/photos/3767673/pexels-photo-3767673.jpeg?auto=compress&cs=tinysrgb&w=800',
        gallery: ['https://images.pexels.com/photos/3767673/pexels-photo-3767673.jpeg?auto=compress&cs=tinysrgb&w=800']
      },
      seo: {
        title: 'Dubai City Tour | Private Sightseeing with Car & Driver | Phoenix Travel & Tours',
        metaDescription: 'Explore modern landmarks & historic heritage with a private Dubai city tour by Phoenix Travel & Tours. Door-to-door hotel pickup, customized itinerary & clear AED rates.',
        keywords: 'Dubai city tour, private sightseeing Dubai, Burj Khalifa tour',
        canonicalUrl: 'https://desertsafaridxbpro.com/dubai-city-tour.html'
      }
    },
    {
      id: 'abu-dhabi-city',
      name: 'Abu Dhabi City Tour from Dubai',
      slug: 'abu-dhabi-city-tour',
      category: 'City Tours',
      shortDescription: 'Full-day private excursion to Abu Dhabi featuring Sheikh Zayed Grand Mosque, Emirates Palace, and Yas Island.',
      fullDescription: 'Full-day private excursion to Abu Dhabi featuring guided entry to Sheikh Zayed Grand Mosque, Emirates Palace photo stop, Abu Dhabi Corniche, and Yas Island.',
      duration: '8 - 9 Hours',
      location: 'Abu Dhabi, UAE',
      tourType: 'Full-Day Day Trip',
      featured: false,
      status: 'Published',
      pricing: {
        regularPrice: 750,
        salePrice: 650,
        adultPrice: 650,
        childPrice: 500,
        sharingPrice: 650,
        privatePrice: 650
      },
      variants: [
        { id: 'ad1', name: 'Private Abu Dhabi Day Trip (6 Seats)', price: 650, unit: 'vehicle' }
      ],
      details: {
        highlights: ['Sheikh Zayed Grand Mosque guided visit', 'Emirates Palace photo stop', 'Abu Dhabi Corniche promenade', 'Yas Island & Ferrari World photo stop'],
        inclusions: ['Private roundtrip luxury vehicle', 'Fuel, toll fees & parking', 'Sheikh Zayed Mosque entry assistance'],
        exclusions: ['Meals & personal expenses'],
        itinerary: '08:30 AM Departure from Dubai -> 10:15 AM Sheikh Zayed Grand Mosque -> 12:30 PM Emirates Palace -> 02:00 PM Heritage Village & Corniche -> 04:00 PM Yas Island -> 06:00 PM Return Dubai',
        pickupInfo: 'Hotel pickup in Dubai included.',
        terms: 'Mosque dress code mandatory (modest clothing fully covering arms and legs, women scarf required).'
      },
      media: {
        featuredImage: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800',
        gallery: ['https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800']
      },
      seo: {
        title: 'Abu Dhabi City Tour from Dubai | Private Day Trip | Phoenix Travel & Tours',
        metaDescription: 'Book a private Abu Dhabi City Tour from Dubai with Phoenix Travel & Tours. Visit Sheikh Zayed Grand Mosque, Emirates Palace, Louvre Museum & Yas Island.',
        keywords: 'Abu Dhabi city tour, Sheikh Zayed Mosque tour from Dubai',
        canonicalUrl: 'https://desertsafaridxbpro.com/abu-dhabi-city-tour.html'
      }
    },
    {
      id: 'skydive',
      name: 'Tandem Sky Dive Palm Jumeirah',
      slug: 'sky-dive-dubai',
      category: 'Extreme Sports',
      shortDescription: 'Freefall from 13,000 feet over Palm Jumeirah at 120 mph with a professional instructor and dedicated outside camera flyer.',
      fullDescription: 'Experience tandem skydiving over Palm Jumeirah with Phoenix Travel & Tours. Complete with outside camera video & photos, briefing & WhatsApp confirmation. AED 2,700.',
      duration: '3 Hours Total',
      location: 'Palm Jumeirah Dropzone, Dubai',
      tourType: 'Tandem Skydive',
      featured: false,
      status: 'Published',
      pricing: {
        regularPrice: 2800,
        salePrice: 2700,
        adultPrice: 2700,
        childPrice: 2700,
        sharingPrice: 2700,
        privatePrice: 2700
      },
      variants: [
        { id: 'sd1', name: 'Tandem Skydive + HD Video & Photo Package', price: 2700, unit: 'person' }
      ],
      details: {
        highlights: ['13,000 ft tandem jump over Palm Jumeirah', '60 seconds 120mph freefall', 'Dedicated camera flyer video & photos'],
        inclusions: ['Pre-flight briefing', 'Safety harness & goggles', 'Edited HD video & photos'],
        exclusions: ['Transportation to dropzone'],
        itinerary: 'Arrival & check-in -> Safety briefing & harness fitting -> Board plane -> 13,000ft jump -> 5-min parachute canopy ride -> Landing & video transfer',
        pickupInfo: 'Self-arrival at Skydive Dubai Palm Dropzone.',
        terms: 'BMI and weight limits apply. Must be 18+ with original passport.'
      },
      media: {
        featuredImage: 'https://images.pexels.com/photos/2873671/pexels-photo-2873671.jpeg?auto=compress&cs=tinysrgb&w=800',
        gallery: ['https://images.pexels.com/photos/2873671/pexels-photo-2873671.jpeg?auto=compress&cs=tinysrgb&w=800']
      },
      seo: {
        title: 'Sky Dive Dubai | Tandem Skydive Palm Jumeirah | Phoenix Travel & Tours',
        metaDescription: 'Experience tandem skydiving over Palm Jumeirah with Phoenix Travel & Tours. Complete with outside camera video & photos, briefing & WhatsApp confirmation.',
        keywords: 'Skydive Dubai, Palm Jumeirah tandem skydive',
        canonicalUrl: 'https://desertsafaridxbpro.com/sky-dive-dubai.html'
      }
    }
  ],
  media: [
    {
      id: 'med_1',
      name: 'evening_desert_safari.jpg',
      url: 'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=800',
      folder: 'Desert Safari',
      size: '184 KB',
      dimensions: '800x533',
      alt: 'Evening Desert Safari Dubai dune bashing',
      title: 'Desert Safari Red Dunes',
      caption: 'Toyota Land Cruiser 4x4 dune bashing in Lahbab',
      createdAt: '2026-01-10T12:00:00.000Z'
    },
    {
      id: 'med_2',
      name: 'quad_bike_atv.jpg',
      url: 'https://images.pexels.com/photos/33041/quad-bike-atv-all-terrain-vehicle-quad.jpg?auto=compress&cs=tinysrgb&w=800',
      folder: 'Quad Bikes',
      size: '210 KB',
      dimensions: '800x600',
      alt: 'Quad Bike ATV rental in Dubai sand dunes',
      title: 'Yamaha Quad Bike ATV',
      caption: 'Self drive quad biking adventure in Dubai',
      createdAt: '2026-01-11T14:30:00.000Z'
    },
    {
      id: 'med_3',
      name: 'can_am_dune_buggy.jpg',
      url: 'https://images.pexels.com/photos/12318029/pexels-photo-12318029.jpeg?auto=compress&cs=tinysrgb&w=800',
      folder: 'Buggy',
      size: '240 KB',
      dimensions: '800x533',
      alt: 'Can-Am Maverick X3 Turbo Dune Buggy',
      title: 'Can-Am Dune Buggy Dubai',
      caption: 'High powered off road buggy in Lahbab desert',
      createdAt: '2026-01-12T09:15:00.000Z'
    },
    {
      id: 'med_4',
      name: 'dubai_skyline_city_tour.jpg',
      url: 'https://images.pexels.com/photos/3767673/pexels-photo-3767673.jpeg?auto=compress&cs=tinysrgb&w=800',
      folder: 'City Tours',
      size: '195 KB',
      dimensions: '800x533',
      alt: 'Dubai skyline and Burj Khalifa sightseeing',
      title: 'Dubai City Landmarks',
      caption: 'Private Dubai city tour sightseeing',
      createdAt: '2026-01-14T11:20:00.000Z'
    }
  ],
  bookings: [
    {
      id: 'PX-88219401',
      confirmationCode: 'PX-88219401',
      createdAt: '2026-03-22T10:15:00.000Z',
      tour: 'Evening Desert Safari Dubai',
      rideName: 'Evening Desert Safari Dubai',
      package: 'Standard Sharing 4x4',
      duration: 'Standard Experience',
      unit: 'person',
      date: '2026-03-25',
      time: '02:30 PM',
      rate: 120,
      name: 'Marcus Vance',
      email: 'marcus.vance@example.com',
      phone: '+971 50 123 4567',
      riders: 4,
      quantity: 4,
      pickup: 'JW Marriott Marquis, Business Bay, Dubai',
      total: 480,
      collectionAmount: 480,
      paymentStatus: 'Pay on Arrival',
      status: 'Confirmed',
      source: 'Website Booking Form',
      notes: 'Need vegetarian food options at camp'
    },
    {
      id: 'PX-74109283',
      confirmationCode: 'PX-74109283',
      createdAt: '2026-03-22T14:40:00.000Z',
      tour: 'Quad Bike ATV Rental Dubai',
      rideName: 'Quad Bike ATV Rental Dubai',
      package: '60 Min ATV Session',
      duration: '60 Min',
      unit: 'bike',
      date: '2026-03-26',
      time: '09:00 AM',
      rate: 250,
      name: 'Sarah Connor',
      email: 's.connor@example.com',
      phone: '+44 7700 900077',
      riders: 2,
      quantity: 2,
      pickup: 'Atlantis The Palm, Dubai',
      total: 500,
      collectionAmount: 500,
      paymentStatus: 'Pay on Arrival',
      status: 'New',
      source: 'WhatsApp Concierge',
      notes: 'First time quad bikers'
    }
  ],
  faqs: [
    {
      id: 'faq_1',
      question: 'What is included in a Dubai Desert Safari and how much does it cost?',
      answer: 'A standard Evening Desert Safari with Phoenix Travel & Tours costs AED 120 per person. Inclusions feature door-to-door 4x4 pickup in a Toyota Land Cruiser, 35–45 minutes of red dune bashing in Lahbab Desert, sandboarding, camel riding, live entertainment (Tanoura, Belly Dance & Fire Show), and a 5-star international BBQ dinner buffet with vegetarian & non-vegetarian options. Pay on arrival with zero deposit.',
      category: 'Desert Safari',
      active: true,
      order: 1
    },
    {
      id: 'faq_2',
      question: 'How much do self-drive Quad Bike ATV and Can-Am Dune Buggy rentals cost?',
      answer: 'Self-drive Quad Bike ATV rentals start from AED 150 for 30 minutes (220cc to 700cc Raptor ATVs). High-powered 2-seater Can-Am Maverick X3 Turbo dune buggies start from AED 1,000 per hour. All off-road rentals include full safety helmets, goggles, professional instructor briefings, and lead desert guides. No driver\'s license is required.',
      category: 'Quad & Buggy',
      active: true,
      order: 2
    },
    {
      id: 'faq_3',
      question: 'Where is Phoenix Travel & Tours located and how do I book a tour?',
      answer: 'Phoenix Travel & Tours is headquartered at Office 701, XL Tower, Business Bay, Dubai, UAE. You can reserve any tour without credit card prepayment by messaging our official WhatsApp concierge at +971 56 150 5270 or submitting the online reservation form. Payment is accepted on arrival via Cash or Card.',
      category: 'General',
      active: true,
      order: 3
    }
  ],
  testimonials: [
    {
      id: 'test_1',
      customerName: 'David & Emily R.',
      country: 'United Kingdom',
      rating: 5,
      review: 'Incredible desert safari experience! The red dune bashing in the 4x4 Land Cruiser was thrilling and the BBQ dinner camp was 5 stars. Pay on arrival gave us complete peace of mind!',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      active: true,
      order: 1
    },
    {
      id: 'test_2',
      customerName: 'Alexander Petrov',
      country: 'Germany',
      rating: 5,
      review: 'Rented the Can-Am Maverick dune buggy for 1 hour. The machine was brand new and super fast. Lead guide kept us safe on the deep dunes. Highly recommended tour operator in Dubai!',
      photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      active: true,
      order: 2
    }
  ],
  leads: [
    {
      id: 'lead_101',
      name: 'Chloe Bennett',
      email: 'chloe.b@example.com',
      phone: '+1 415 555 0199',
      message: 'Looking for a private desert safari for a group of 12 people on April 5th. Please send private 4x4 quotes.',
      source: 'Website Contact Form',
      date: '2026-03-21T18:00:00.000Z',
      status: 'New',
      notes: 'Send private vehicle quotation via WhatsApp'
    }
  ],
  menus: {
    header: [
      { id: 'm1', label: 'Home', url: '/', active: true, order: 1 },
      { id: 'm2', label: 'Desert Safari', url: '/desert-safari-dubai.html', active: true, order: 2 },
      { id: 'm3', label: 'Quad Bike', url: '/rides/quad-bike', active: true, order: 3 },
      { id: 'm4', label: 'Dune Buggy', url: '/rides/buggy', active: true, order: 4 },
      { id: 'm5', label: 'Dubai City Tour', url: '/dubai-city-tour.html', active: true, order: 5 },
      { id: 'm6', label: 'Abu Dhabi Tour', url: '/abu-dhabi-city-tour.html', active: true, order: 6 },
      { id: 'm7', label: 'Reserve a Slot', url: '/book', active: true, order: 7 },
      { id: 'm8', label: 'Dashboard', url: '/admin.html', active: true, order: 8 }
    ],
    footer: [
      { id: 'f1', label: 'Desert Safari Dubai', url: '/desert-safari-dubai.html', active: true, order: 1 },
      { id: 'f2', label: 'Quad Bike Dubai', url: '/rides/quad-bike', active: true, order: 2 },
      { id: 'f3', label: 'Dune Buggy Dubai', url: '/rides/buggy', active: true, order: 3 },
      { id: 'f4', label: 'Dubai City Tour', url: '/dubai-city-tour.html', active: true, order: 4 },
      { id: 'f5', label: 'Admin Dashboard', url: '/admin.html', active: true, order: 5 }
    ]
  },
  activityLogs: [
    {
      id: 'act_1',
      user: 'Phoenix Admin',
      action: 'System Initialization',
      details: 'Admin Dashboard v2.0 initialized successfully.',
      timestamp: '2026-03-22T20:00:00.000Z'
    }
  ]
};

class Database {
  constructor() {
    this.data = initialData;
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        this.data = { ...initialData, ...parsed };
      } else {
        this.save();
      }
    } catch (err) {
      console.error('Error loading database:', err);
      this.data = initialData;
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving database:', err);
    }
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    this.save();
  }

  logActivity(user, action, details) {
    const log = {
      id: `act_${Date.now()}_${Math.floor(Math.random()*1000)}`,
      user: user || 'Phoenix Admin',
      action,
      details,
      timestamp: new Date().toISOString()
    };
    if (!this.data.activityLogs) this.data.activityLogs = [];
    this.data.activityLogs.unshift(log);
    if (this.data.activityLogs.length > 200) {
      this.data.activityLogs = this.data.activityLogs.slice(0, 200);
    }
    this.save();
    return log;
  }
}

export const db = new Database();
