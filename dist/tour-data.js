// Phoenix Tours - Default catalog and CMS data
window.PHOENIX_DEFAULT_TOURS = [
  {
    id: 'evening',
    name: 'Evening Desert Safari',
    type: 'Safari',
    category: 'safari',
    badge: 'BEST SELLER',
    duration: 'Evening (6 hrs)',
    bestFor: 'Sunset, BBQ & Live Shows',
    description: 'Classic Dubai desert evening with sharing and private booking options.',
    active: true,
    meetingPoint: false,
    image: 'https://images.pexels.com/photos/28730135/pexels-photo-28730135.jpeg?auto=compress&cs=tinysrgb&w=1200',
    source: 'https://www.pexels.com/photo/dubai-desert-safari-adventure-at-sunset-28730135/',
    packages: [
      { id: 'sharing', name: 'Sharing', price: 120, unit: 'person' },
      { id: 'private', name: 'Private', price: 650, unit: 'vehicle' }
    ]
  },
  {
    id: 'morning',
    name: 'Morning Desert Safari',
    type: 'Safari',
    category: 'safari',
    badge: 'MORNING ADVENTURE',
    duration: 'Morning (4 hrs)',
    bestFor: 'Sunrise & Morning Desert',
    description: 'A relaxed private morning desert experience for families and small groups.',
    active: true,
    meetingPoint: false,
    image: 'https://images.pexels.com/photos/33669944/pexels-photo-33669944.jpeg?auto=compress&cs=tinysrgb&w=1200',
    source: 'https://www.pexels.com/photo/breathtaking-dubai-desert-sunset-with-sand-dunes-33669944/',
    packages: [
      { id: 'private', name: 'Private', price: 550, unit: 'vehicle' }
    ]
  },
  {
    id: 'premium',
    name: 'Premium Desert Safari',
    type: 'Safari',
    category: 'safari',
    badge: 'PREMIUM CAMP',
    duration: 'Evening (6 hrs)',
    bestFor: 'VIP Comfort & Red Dunes',
    description: 'Upgrade your desert evening with premium service, table seating, and VIP treatment.',
    active: true,
    meetingPoint: false,
    image: 'https://images.pexels.com/photos/35039929/pexels-photo-35039929.jpeg?auto=compress&cs=tinysrgb&w=1200',
    source: 'https://www.pexels.com/photo/desert-safari-adventure-in-dubai-s-sunset-35039929/',
    packages: [
      { id: 'sharing', name: 'Sharing', price: 220, unit: 'person' },
      { id: 'private', name: 'Private', price: 850, unit: 'vehicle' }
    ]
  },
  {
    id: 'quad',
    name: 'Premium Quad Bike Dubai',
    type: 'Self-Drive Quad',
    category: 'quad',
    badge: 'ADRENALINE',
    duration: '30 min / 1 hour',
    bestFor: 'Thrill Seekers & Self-Drive',
    description: 'Premium self-drive desert quad bike ride with automatic transmission, helmet, goggles & guide. Direct meeting point.',
    active: true,
    meetingPoint: true,
    image: 'https://images.pexels.com/photos/36713570/pexels-photo-36713570.jpeg?auto=compress&cs=tinysrgb&w=1200',
    source: 'https://www.pexels.com/photo/atv-adventure-across-the-dubai-desert-dunes-36713570/',
    packages: [
      { id: 'quad30', name: '1 Bike · 30 Minutes', price: 150, unit: 'bike', duration: '30 min' },
      { id: 'quad60', name: '1 Bike · 60 Minutes', price: 250, unit: 'bike', duration: '1 hour' }
    ]
  },
  {
    id: 'canam2',
    name: 'Premium Can-Am Buggy Dubai · 2 Seater',
    type: 'Turbocharged Buggy',
    category: 'buggy',
    badge: 'CAN-AM 2-SEATER',
    duration: '30 min / 1 hour',
    bestFor: 'High-Power Off-Road Speed',
    description: 'High-powered turbocharged Can-Am Maverick 2-seater desert buggy with roll-cage and racing harnesses.',
    active: true,
    meetingPoint: true,
    image: 'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=1200',
    source: 'https://www.pexels.com/photo/couple-riding-quad-on-desert-20734798/',
    packages: [
      { id: 'buggy2-30', name: '2 Seater · 30 Minutes', price: 1000, unit: 'buggy', duration: '30 min' },
      { id: 'buggy2-60', name: '2 Seater · 60 Minutes', price: 1800, unit: 'buggy', duration: '1 hour' }
    ]
  },
  {
    id: 'canam4',
    name: 'Premium Can-Am Buggy Dubai · 4 Seater',
    type: 'Turbocharged Buggy',
    category: 'buggy',
    badge: 'CAN-AM 4-SEATER',
    duration: '30 min / 1 hour',
    bestFor: 'Families & Group Adventure',
    description: 'Premium 4-seater Can-Am Maverick desert buggy adventure for groups and families across open dunes.',
    active: true,
    meetingPoint: true,
    image: 'https://images.pexels.com/photos/20734778/pexels-photo-20734778.jpeg?auto=compress&cs=tinysrgb&w=1200',
    source: 'https://www.pexels.com/photo/couple-riding-quad-on-desert-20734798/',
    packages: [
      { id: 'buggy4-30', name: '4 Seater · 30 Minutes', price: 1500, unit: 'buggy', duration: '30 min' },
      { id: 'buggy4-60', name: '4 Seater · 60 Minutes', price: 2800, unit: 'buggy', duration: '1 hour' }
    ]
  },
  {
    id: 'burj-lake',
    name: 'Burj Khalifa Lake Ride & Fountain Abra',
    type: 'Sightseeing & Cruise',
    category: 'other',
    badge: 'ICONIC DUBAI',
    duration: '30 Mins Ride',
    bestFor: 'Fountain Show Front Row',
    description: 'Traditional wooden abra boat cruise on the 30-acre Burj Lake with dancing fountain views.',
    active: true,
    meetingPoint: true,
    image: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=1200',
    source: 'https://www.pexels.com/photo/dubai-tower-arab-khalifa-162031/',
    packages: [
      { id: 'abra-sharing', name: 'Sharing Abra Ticket', price: 120, unit: 'person', duration: '30 min' },
      { id: 'abra-fountain', name: 'Dubai Fountain Water Experience', price: 85, unit: 'person', duration: '30 min' },
      { id: 'abra-private', name: 'VIP Private Abra Charter', price: 350, unit: 'vehicle', duration: '30 min' }
    ]
  },
  {
    id: 'dubai-city',
    name: 'Dubai City Sightseeing Tour',
    type: 'Guided City Tour',
    category: 'other',
    badge: 'TOP RATED',
    duration: 'Half / Full Day',
    bestFor: 'Burj Al Arab, Marina & Souks',
    description: 'Comprehensive tour covering Modern Dubai and Old Heritage districts with hotel pickup.',
    active: true,
    meetingPoint: false,
    image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1200',
    source: 'Phoenix Tours',
    packages: [
      { id: 'city-half-sharing', name: 'Half-Day Dubai City Tour (Sharing)', price: 150, unit: 'person', duration: '4–5 hours' },
      { id: 'city-half-private', name: 'Private Half-Day Dubai Tour (Up to 6)', price: 600, unit: 'vehicle', duration: '4–5 hours' },
      { id: 'city-full-private', name: 'Full-Day Modern Dubai Tour (Private)', price: 850, unit: 'vehicle', duration: '8 hours' }
    ]
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi City Tour from Dubai',
    type: 'Full Day Day-Trip',
    category: 'other',
    badge: 'CAPITAL TOUR',
    duration: 'Full Day (8-9 hrs)',
    bestFor: 'Sheikh Zayed Grand Mosque & Corniche',
    description: 'Full-day guided excursion to the capital of the UAE with Sheikh Zayed Grand Mosque visit.',
    active: true,
    meetingPoint: false,
    image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200',
    source: 'Phoenix Tours',
    packages: [
      { id: 'ad-sharing', name: 'Abu Dhabi Day Tour (Sharing)', price: 220, unit: 'person', duration: '8–9 hours' },
      { id: 'ad-private', name: 'Abu Dhabi Private SUV Tour (Up to 6)', price: 950, unit: 'vehicle', duration: '8–9 hours' }
    ]
  }
];

window.PHOENIX_DEFAULT_CMS = {
  hero: {
    image: 'https://images.pexels.com/photos/28730135/pexels-photo-28730135.jpeg?auto=compress&cs=tinysrgb&w=1600',
    eyebrow: 'DUBAI · UAE · DESERT EXPERIENCES',
    sideText: 'DUBAI DESERT SAFARI',
    title: 'Dubai desert safari, quad bike & buggy adventures',
    subtitle: 'Explore Dubai desert safaris with high red dune bashing, sunset views, camel rides, quad bikes & BBQ dinners. Clear AED rates with pay on arrival.',
    btnPrimaryText: 'Book an experience',
    btnSecondaryText: 'Explore tours',
    btnSecondaryLink: '#tours',
    trustItems: [
      '✓ Pay on arrival',
      '✓ WhatsApp confirmation',
      '✓ Private & sharing options'
    ]
  },
  categories: {
    eyebrow: 'EXPERIENCES & DESTINATIONS',
    title: 'Popular Dubai Tour Categories',
    allLinkText: 'All tours →',
    allLinkUrl: '#tours',
    cards: [
      { id: 'safari', title: 'Desert Safari Dubai', link: 'desert-safari-dubai.html', image: 'https://images.pexels.com/photos/28730135/pexels-photo-28730135.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: 'quad', title: 'Quad Bike Dubai', link: 'quad-bike-dubai.html', image: 'https://images.pexels.com/photos/36713570/pexels-photo-36713570.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: 'buggy', title: 'Dune Buggy Dubai', link: 'dune-buggy-dubai.html', image: 'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id: 'premium', title: 'Dubai City Tours', link: 'dubai-city-tour.html', image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ]
  },
  tourSection: {
    eyebrow: 'HANDPICKED EXPERIENCES',
    title: 'Our Most Popular Dubai Tours & Adventures',
    noteText: 'Explore detailed guides and rates for our',
    guides: [
      { text: 'Desert Safari Dubai', url: 'desert-safari-dubai.html' },
      { text: 'Quad Bike Dubai', url: 'quad-bike-dubai.html' },
      { text: 'Dune Buggy Dubai', url: 'dune-buggy-dubai.html' }
    ]
  },
  whyUs: {
    eyebrow: 'WHY CHOOSE PHOENIX TOURS',
    title: 'The Trusted Dubai Desert & Tour Specialists',
    items: [
      { num: '01', title: 'Pay on Arrival', desc: 'No advance credit card payment needed. Pay in cash or card when you arrive.' },
      { num: '02', title: 'Direct WhatsApp Support', desc: 'Fast, responsive confirmation and real-time coordination for hotel pickups.' },
      { num: '03', title: 'Premium Fleet & Camp', desc: 'Modern 4x4 Land Cruisers, high-spec Can-Am buggies, ATVs and 5-star desert camps.' },
      { num: '04', title: 'Best Rate Guarantee', desc: 'Clear, transparent AED pricing with no hidden charges or booking markups.' }
    ]
  },
  banner: {
    image: 'https://images.pexels.com/photos/33669944/pexels-photo-33669944.jpeg?auto=compress&cs=tinysrgb&w=1200',
    eyebrow: 'NEED HELP CHOOSING?',
    title: 'Speak directly with our Dubai travel experts',
    desc: 'Get immediate recommendations for couples, families or corporate groups. We match you with the perfect timing, vehicle and itinerary.',
    ctaWhatsappText: 'Chat on WhatsApp',
    ctaWhatsappNumber: '+971 56 150 5270',
    ctaCallText: 'Call Us Now',
    ctaCallNumber: '+971 56 150 5270'
  },
  latest: {
    eyebrow: 'FEATURED STORIES & ITINERARIES',
    title: 'Latest Dubai Desert & City Adventures',
    cards: [
      {
        id: 'exp-1',
        tag: 'RED DUNES',
        title: 'Evening Safari on Lahbab High Dunes',
        desc: 'Sunset photography, adrenaline dune bashing, sandboarding and live BBQ show in Dubai desert.',
        link: 'desert-safari-dubai.html',
        btnText: 'View desert safari →',
        image: 'https://images.pexels.com/photos/28730135/pexels-photo-28730135.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'exp-2',
        tag: 'SELF-DRIVE',
        title: 'High-Power Can-Am Dune Buggy',
        desc: 'Take control of an automatic turbocharged Can-Am Maverick across open desert dunes with a lead guide.',
        link: 'dune-buggy-dubai.html',
        btnText: 'Explore buggy tours →',
        image: 'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'exp-3',
        tag: 'CITY ICON',
        title: 'Burj Khalifa Lake Ride & Dubai Fountain',
        desc: 'Traditional wooden Abra cruise on the Burj Lake with front-row view of the world-famous dancing fountains.',
        link: 'burj-khalifa-lake-ride.html',
        btnText: 'Discover lake ride →',
        image: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  contact: {
    eyebrow: 'READY FOR AN UNFORGETTABLE DUBAI ADVENTURE?',
    title: 'Book your tour with pay on arrival convenience',
    subtitle: 'Reserve your date in seconds. No prepayment required — confirm your booking on WhatsApp instantly.',
    btnText: 'Reserve Your Tour Now',
    phoneDisplay: '+971 56 150 5270',
    phoneTel: '+971561505270'
  },
  footer: {
    brandName: 'PHOENIX TOURS',
    brandTagline: 'DUBAI & UAE ADVENTURES',
    location: 'Dubai, United Arab Emirates',
    copyrightName: 'Phoenix Tours & Adventures. All rights reserved.',
    phoneDisplay: '+971 56 150 5270',
    phoneUrl: 'https://wa.me/971561505270',
    links: [
      { title: 'Home', url: '/' },
      { title: 'Desert Safari Dubai', url: 'desert-safari-dubai.html' },
      { title: 'Quad Bike Dubai', url: 'quad-bike-dubai.html' },
      { title: 'Dune Buggy Dubai', url: 'dune-buggy-dubai.html' },
      { title: 'Burj Lake Ride', url: 'burj-khalifa-lake-ride.html' },
      { title: 'Dubai City Tours', url: 'dubai-city-tour.html' },
      { title: 'Abu Dhabi Tour', url: 'abu-dhabi-city-tour.html' },
      { title: 'Book Now', url: '/book' },
      { title: 'Admin CMS', url: '/admin' }
    ]
  }
};

window.PHOENIX_DEFAULT_LANDING_PAGES = {
  'safari': {
    hero: {
      eyebrow: 'DUBAI DESERT EXPERIENCES · BEST DEALS',
      title: 'Dubai Desert Safari Tours',
      subtitle: "Embark on Dubai's premier desert adventure with high red dune bashing in 4x4 Land Cruisers, sunset photography, camel riding, live cultural shows & 5-star BBQ dinner. Transparent AED prices & pay on arrival.",
      image: 'https://images.pexels.com/photos/28730135/pexels-photo-28730135.jpeg?auto=compress&cs=tinysrgb&w=1600',
      trust: ['✓ Pay on Arrival', '✓ 4x4 Hotel Pickup', '✓ Lahbab Red Dunes', '✓ 5-Star Camp & Buffet']
    },
    narrative: {
      eyebrow: 'AUTHENTIC DUBAI ADVENTURE',
      title: 'Experience the Magic of Lahbab Red Dunes',
      lead: "Discover the thrill of dune bashing in a licensed 4x4 Land Cruiser followed by an evening in an authentic Arabian desert fortress camp.",
      body: "From thrilling sandboarding slopes to peaceful sunset camel treks, our Dubai desert safari provides an unforgettable blend of Arabian hospitality and high-octane desert adventure."
    },
    packages: [
      {
        name: 'Standard Evening Safari (Sharing)',
        badge: 'BEST VALUE',
        price: 120,
        unit: 'person',
        desc: 'Complete evening safari with 4x4 sharing transfer, dune bashing, camel ride, BBQ buffet & live shows.',
        inclusions: ['4x4 Land Cruiser sharing pickup', '30-45 mins red dune bashing', 'Sandboarding on high dunes', 'Sunset photo stop', 'Short camel ride', 'Henna tattoo', 'Unlimited water & soft drinks', 'BBQ dinner buffet (Veg & Non-Veg)', 'Tanoura & Belly Dance live shows'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Standard Evening Safari (Sharing) at AED 120 per person.'
      },
      {
        name: 'VIP Desert Safari (Sharing)',
        badge: 'VIP COMFORT',
        price: 220,
        unit: 'person',
        desc: 'Upgraded evening safari with reserved VIP table seating and waiter service at the camp.',
        inclusions: ['All standard safari inclusions', 'Reserved VIP table seating', 'Table service for BBQ buffet & drinks', 'Priority buffet line', 'Fresh fruit platter'],
        waMsg: 'Hi Phoenix Tours, I would like to book the VIP Desert Safari at AED 220 per person.'
      },
      {
        name: 'Private 4x4 Desert Safari',
        badge: 'EXCLUSIVE JEEP',
        price: 650,
        unit: 'vehicle',
        desc: 'Private Land Cruiser exclusively for your group of up to 6 guests with personalized hotel pickup timing.',
        inclusions: ['Exclusive private 4x4 Land Cruiser (up to 6 guests)', 'Flexible door-to-door hotel pickup', 'Private dune bashing session', 'All camp entertainment & BBQ dinner', 'Dedicated private driver'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Private 4x4 Desert Safari at AED 650 per vehicle.'
      }
    ],
    highlights: [
      'Thrilling 4x4 Red Dune Bashing across Lahbab Desert',
      'Sandboarding and scenic sunset desert photography',
      'Short camel rides and traditional Arabian coffee (Gahwa)',
      'Live Fire Show, Tanoura Dance, and Belly Dance performances',
      'Lavish BBQ dinner buffet with vegetarian and Jain options'
    ],
    faqs: [
      { q: 'What is included in the evening desert safari?', a: 'Hotel pickup and drop-off in a 4x4 Land Cruiser, 30-45 minutes of dune bashing on red dunes, sandboarding, camel ride, sunset photo stop, henna painting, unlimited refreshments, 5-star BBQ dinner buffet, and live stage shows.' },
      { q: 'Is advance payment required?', a: 'No advance payment or credit card is required. You can book on WhatsApp and pay on arrival in cash or card.' },
      { q: 'Is the safari suitable for children and seniors?', a: 'Yes! For seniors, pregnant women, or families with infants, our drivers provide a gentle desert drive or direct transfer to the camp without harsh dune bashing.' }
    ]
  },
  'quad': {
    hero: {
      eyebrow: 'SELF-DRIVE ATV DESERT THRILLS',
      title: 'Dubai Quad Bike Desert Safari',
      subtitle: "Conquer the Lahbab red dunes on high-power 350cc to 400cc automatic Yamaha and Polaris quad bikes. Full safety briefing, helmets, goggles and desert guides included.",
      image: 'https://images.pexels.com/photos/36713570/pexels-photo-36713570.jpeg?auto=compress&cs=tinysrgb&w=1600',
      trust: ['✓ Automatic Gearbox', '✓ Guide Convoy', '✓ Helmets & Goggles', '✓ Open Red Dunes']
    },
    narrative: {
      eyebrow: 'OPEN DESERT ACTION',
      title: 'Ride High Red Dunes on Automatic ATVs',
      lead: "Experience pure adrenaline across open Dubai desert terrain on powerful four-wheelers.",
      body: "Our quad bike safaris cater to beginners and seasoned riders alike, with full protective gear, riding lessons and lead convoy guides ensuring absolute safety."
    },
    packages: [
      {
        name: 'Quad Bike · 30 Minutes',
        badge: 'POPULAR',
        price: 150,
        unit: 'bike',
        desc: '30-minute self-drive quad bike session on open red desert dunes.',
        inclusions: ['350cc/400cc automatic quad bike', 'Helmet & protective goggles', 'Safety briefing by certified guide', 'Complimentary bottled water'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Quad Bike 30 Mins at AED 150.'
      },
      {
        name: 'Quad Bike · 60 Minutes',
        badge: 'MAX ADVENTURE',
        price: 250,
        unit: 'bike',
        desc: 'Full 1-hour open desert quad bike experience across deep desert crests.',
        inclusions: ['350cc/400cc automatic quad bike for 60 mins', 'Helmet & protective goggles', 'Guide support & mechanical backup', 'Photos & video stop', 'Complimentary refreshments'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Quad Bike 60 Mins at AED 250.'
      }
    ],
    highlights: [
      'Top-brand automatic 350cc / 400cc quad bikes',
      'No driving license required for designated desert tracks',
      'Expert desert guides leading the convoy',
      'Protective helmets, goggles, and safety gear provided',
      'Combine with evening safari and BBQ dinner options'
    ],
    faqs: [
      { q: 'Do I need a driver license to ride a quad bike?', a: 'No driver license is required. Full safety instructions and an orientation drive are provided before you start.' },
      { q: 'What is the minimum age to ride alone?', a: 'Riders must be at least 15-16 years old to drive independently. Younger kids can ride as passengers with an adult.' }
    ]
  },
  'buggy': {
    hero: {
      eyebrow: 'TURBOCHARGED CAN-AM MAVERICK',
      title: 'Dune Buggy Dubai Tours',
      subtitle: "Pilot high-performance 2-seater and 4-seater Can-Am Maverick X3 buggies over towering red dunes with racing harnesses, roll cages and expert convoy guides.",
      image: 'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=1600',
      trust: ['✓ 2-Seater & 4-Seater', '✓ Turbo Power', '✓ Full Roll Cage', '✓ Pay on Arrival']
    },
    narrative: {
      eyebrow: 'THE ULTIMATE OFF-ROAD MACHINE',
      title: 'Can-Am Maverick Desert Buggy Drive',
      lead: "Experience race-grade desert dynamics across Dubai's most challenging dunes.",
      body: "Engineered with long-travel suspension, 4-wheel drive, and massive horsepower, our Can-Am buggies tackle the highest sand dunes effortlessly."
    },
    packages: [
      {
        name: 'Can-Am Buggy 2-Seater · 30 Minutes',
        badge: 'TURBO SPEED',
        price: 1000,
        unit: 'buggy',
        desc: '30-minute high-octane drive in a 2-seater Can-Am Maverick X3.',
        inclusions: ['Can-Am Maverick X3 (2 seats)', 'Racing harnesses & roll cage', 'Helmets and goggles', 'Lead guide convoy'],
        waMsg: 'Hi Phoenix Tours, I want to book the Can-Am Buggy 2-Seater (30 mins) at AED 1,000.'
      },
      {
        name: 'Can-Am Buggy 2-Seater · 60 Minutes',
        badge: 'BEST SELLER',
        price: 1800,
        unit: 'buggy',
        desc: '60 minutes deep dune expedition in a 2-seater Can-Am Maverick X3.',
        inclusions: ['Can-Am Maverick X3 (2 seats) for 1 hour', 'Professional instructor guide', 'Helmets, goggles, gloves', 'Refreshments & photo stops'],
        waMsg: 'Hi Phoenix Tours, I want to book the Can-Am Buggy 2-Seater (60 mins) at AED 1,800.'
      },
      {
        name: 'Can-Am Buggy 4-Seater · 30 Minutes',
        badge: 'FAMILY FAVORITE',
        price: 1500,
        unit: 'buggy',
        desc: '30 minutes for groups and families of up to 4 riders.',
        inclusions: ['Can-Am Maverick Max 4-Seater', '4-point harnesses for all 4 passengers', 'Protective gear', 'Expert lead convoy'],
        waMsg: 'Hi Phoenix Tours, I want to book the Can-Am Buggy 4-Seater (30 mins) at AED 1,500.'
      },
      {
        name: 'Can-Am Buggy 4-Seater · 60 Minutes',
        badge: 'FULL POWER',
        price: 2800,
        unit: 'buggy',
        desc: '60 minutes deep red dunes tour for up to 4 guests.',
        inclusions: ['Can-Am Maverick Max 4-Seater for 1 full hour', 'Safety gear for 4 riders', 'Extended desert trails & high dunes', 'Soft drinks & chilled water'],
        waMsg: 'Hi Phoenix Tours, I want to book the Can-Am Buggy 4-Seater (60 mins) at AED 2,800.'
      }
    ],
    highlights: [
      'High-performance turbocharged Can-Am Maverick X3 models',
      '2-seater couples buggies and 4-seater family buggies available',
      'Advanced safety features: full tubular steel roll cages & 4-point harnesses',
      'Guided convoy through the famous Lahbab big red dunes',
      'Pay on arrival with cash or card'
    ],
    faqs: [
      { q: 'Is previous buggy driving experience needed?', a: 'No. Can-Am buggies feature automatic transmissions, power steering, and simple controls. Our guides conduct a thorough briefing.' },
      { q: 'Can my kids ride along in the buggy?', a: 'Yes! Kids can safely ride as passengers in our 4-seater Can-Am buggies fitted with safety harnesses and helmets.' }
    ]
  },
  'lake-ride': {
    hero: {
      eyebrow: 'BURJ KHALIFA & DUBAI FOUNTAIN',
      title: 'Burj Khalifa Lake Ride & Fountain Abra',
      subtitle: "Glide along the Burj Lake in a traditional wooden Abra with the world's most spectacular front-row views of the Dubai Fountain show and Burj Khalifa.",
      image: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=1600',
      trust: ['✓ Front Row Fountain View', '✓ Traditional Wooden Abra', '✓ 30-Acre Burj Lake', '✓ Downtown Dubai']
    },
    narrative: {
      eyebrow: 'DOWNTOWN SIGHTSEEING',
      title: 'Waterfront Cruise on the 30-Acre Burj Lake',
      lead: "Experience Dubai's iconic skyline from the calm waters of the Burj Lake.",
      body: "Watch the water choreography, lights, and music of the Dubai Fountain from just meters away, while taking in panoramic views of the soaring Burj Khalifa and Souk Al Bahar."
    },
    packages: [
      {
        name: 'Fountain Show Abra (Sharing)',
        badge: 'POPULAR',
        price: 85,
        unit: 'person',
        desc: '30-minute traditional abra ride timed during the dancing fountain show.',
        inclusions: ['Abra boat cruise on Burj Lake', 'Front-row view of Dubai Fountain show', 'Photo opportunities under Burj Khalifa'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Fountain Show Abra at AED 85 per person.'
      },
      {
        name: 'Traditional Abra Ride (Sharing)',
        badge: 'DAYTIME RELAX',
        price: 120,
        unit: 'person',
        desc: 'Relaxed daytime cruise on Burj Lake with views of Downtown landmarks.',
        inclusions: ['30-minute lake cruise', 'Audio commentary of Downtown landmarks', 'Life jacket & safety briefing'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Traditional Abra Ride at AED 120 per person.'
      },
      {
        name: 'VIP Private Abra Charter',
        badge: 'EXCLUSIVE',
        price: 350,
        unit: 'vehicle',
        desc: 'Private abra exclusively for your party of up to 6 guests.',
        inclusions: ['Private traditional abra boat for up to 6 guests', 'Front row fountain show view', 'Customized cruising pace'],
        waMsg: 'Hi Phoenix Tours, I would like to book the VIP Private Abra Charter at AED 350.'
      }
    ],
    highlights: [
      'Front-row viewing of the world-famous Dubai Fountain water show',
      'Spectacular angles for photographing Burj Khalifa and Souk Al Bahar',
      'Historic Emirati wooden Abra design with modern safety standards',
      'Convenient departure directly outside Dubai Mall & Waterfront Promenade'
    ],
    faqs: [
      { q: 'Where is the boarding point?', a: 'Boarding takes place at the Dubai Fountain Lake Ride ticket counter on the Dubai Mall Waterfront Promenade.' },
      { q: 'How long is the ride?', a: 'Each cruise lasts approximately 30 minutes, perfectly timed to experience the fountain performance.' }
    ]
  },
  'dubai-city': {
    hero: {
      eyebrow: 'OLD & MODERN DUBAI SIGHTSEEING',
      title: 'Dubai City Sightseeing Tours',
      subtitle: "Discover the best of Dubai with professional licensed guides and air-conditioned vehicles. Visit Burj Al Arab, Palm Jumeirah, Dubai Frame, Gold Souk & Creek Abra.",
      image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1600',
      trust: ['✓ Hotel Pickup & Drop', '✓ Expert Tour Guide', '✓ Old & Modern Highlights', '✓ Private Vehicle Options']
    },
    narrative: {
      eyebrow: 'EXPLORE THE EMIRATE',
      title: 'From Historic Creek to Architectural Icons',
      lead: "Uncover Dubai's transformation from a humble pearl diving village into a futuristic global metropolis.",
      body: "Our guided city tours take you through historic heritage quarters, bustling spice and gold souks, and iconic contemporary wonders including Atlantis The Palm, Dubai Marina, and Burj Al Arab."
    },
    packages: [
      {
        name: 'Half-Day Dubai City Tour (Sharing)',
        badge: 'BEST VALUE',
        price: 150,
        unit: 'person',
        desc: '4-5 hour group tour covering key landmarks with hotel pickup and drop-off.',
        inclusions: ['Air-conditioned bus/van transfer', 'Professional English-speaking guide', 'Dubai Creek Abra water taxi ride', 'Gold & Spice Souk visit', 'Burj Al Arab photo stop', 'Jumeirah Beach photo stop'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Half-Day Dubai City Tour (Sharing) at AED 150 per person.'
      },
      {
        name: 'Private Half-Day Dubai Tour (Up to 6)',
        badge: 'POPULAR PRIVATE',
        price: 600,
        unit: 'vehicle',
        desc: 'Dedicated private vehicle and driver for up to 6 guests with customizable itinerary.',
        inclusions: ['Private luxury SUV/van for up to 6 guests', 'Door-to-door hotel pickup and drop-off', 'Customizable stop duration', 'Abra crossing and souk walking tour'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Private Half-Day Dubai Tour at AED 600.'
      },
      {
        name: 'Full-Day Modern Dubai Tour (Private)',
        badge: 'COMPREHENSIVE',
        price: 850,
        unit: 'vehicle',
        desc: '8-hour comprehensive private tour covering Old Dubai, Modern Dubai, Palm Jumeirah and Dubai Marina.',
        inclusions: ['Private vehicle with chauffeur for 8 full hours', 'Old Dubai heritage, Al Fahidi, Souks & Creek', 'Palm Jumeirah & The Pointe', 'Dubai Marina & Bluewaters Ain Dubai', 'Dubai Frame & Downtown photo stops'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Full-Day Modern Dubai Tour at AED 850.'
      }
    ],
    highlights: [
      'Comprehensive coverage of Old Heritage and Modern Landmark districts',
      'Traditional wooden Abra crossing across historical Dubai Creek',
      'Bustling Deira Gold Souk and aromatic Spice Souk exploration',
      'Iconic photo stops: Burj Al Arab, Atlantis Palm, Dubai Frame, Museum of the Future',
      'Door-to-door hotel pickup anywhere in Dubai'
    ],
    faqs: [
      { q: 'Is hotel pickup included in the city tour?', a: 'Yes, all our city tours include hotel or residence pickup and drop-off within Dubai.' },
      { q: 'Can we customize the stops on a private city tour?', a: 'Absolutely! With our private tour options, your driver and guide can adjust the stops and timing according to your preferences.' }
    ]
  },
  'abu-dhabi': {
    hero: {
      eyebrow: 'DAY TRIP TO UAE CAPITAL',
      title: 'Abu Dhabi City Tour from Dubai',
      subtitle: "Explore the majestic Sheikh Zayed Grand Mosque, Emirates Palace, Louvre Abu Dhabi photo stop, Heritage Village and Abu Dhabi Corniche with pickup from Dubai.",
      image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1600',
      trust: ['✓ Sheikh Zayed Grand Mosque', '✓ Dubai Hotel Pickup', '✓ Licensed Tour Guide', '✓ Full Day Day-Trip']
    },
    narrative: {
      eyebrow: 'CAPITAL DISCOVERY',
      title: 'Journey to the Architectural Wonder of Abu Dhabi',
      lead: "Travel in comfort from Dubai to the UAE capital for a full day of cultural discovery.",
      body: "Marvel at the pure white marble domes of the Sheikh Zayed Grand Mosque, admire the luxurious Emirates Palace, and cruise along the pristine Abu Dhabi Corniche."
    },
    packages: [
      {
        name: 'Abu Dhabi Day Tour (Sharing)',
        badge: 'BEST VALUE',
        price: 220,
        unit: 'person',
        desc: 'Full-day sharing bus excursion to Abu Dhabi with licensed guide and hotel pickup from Dubai.',
        inclusions: ['Dubai hotel pickup & return transfer', 'Guided visit inside Sheikh Zayed Grand Mosque', 'Emirates Palace & Presidential Palace photo stop', 'Heritage Village visit', 'Abu Dhabi Corniche scenic drive', 'Dates Market stop'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Abu Dhabi Day Tour (Sharing) at AED 220 per person.'
      },
      {
        name: 'Abu Dhabi Private SUV Tour (Up to 6)',
        badge: 'EXCLUSIVE PRIVATE',
        price: 950,
        unit: 'vehicle',
        desc: 'Private luxury SUV exclusively for your group of up to 6 guests with flexible itinerary and timing.',
        inclusions: ['Private luxury SUV (up to 6 guests)', 'Flexible departure time from your Dubai hotel', 'Dedicated driver-guide', 'Grand Mosque entry assistance', 'Custom stops: Louvre photo stop, Ferrari World photo stop'],
        waMsg: 'Hi Phoenix Tours, I would like to book the Abu Dhabi Private SUV Tour at AED 950.'
      }
    ],
    highlights: [
      'Comprehensive guided tour of the iconic Sheikh Zayed Grand Mosque',
      'Scenic drive along the picturesque Abu Dhabi Corniche',
      'Photo opportunities outside Emirates Palace and Qasr Al Watan',
      'Stops at Heritage Village, Dates Market, and Yas Island',
      'Comfortable round-trip transportation from Dubai'
    ],
    faqs: [
      { q: 'What is the dress code for the Sheikh Zayed Grand Mosque?', a: 'Conservative dress is required. Women must cover their heads with a scarf, wear long sleeves, and ankle-length pants or dresses. Men must wear long trousers and shirts with sleeves.' },
      { q: 'How long does the tour take?', a: 'The tour takes approximately 8 to 9 hours, including round-trip travel time between Dubai and Abu Dhabi.' }
    ]
  }
};
