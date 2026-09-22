const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://desertsafaridxbpro.com';
const BUSINESS_NAME = 'Phoenix Travel & Tours';
const OFFICE_ADDRESS = 'Office 701, XL Tower, Business Bay, Dubai, UAE';
const PHONE = '+971561505270';
const WHATSAPP = '+971561505270';

const pagesConfig = {
  'desert-safari-dubai.html': {
    title: 'Dubai Desert Safari Tours | Evening, Morning & Private 4x4 | Phoenix Travel & Tours',
    desc: 'Book top-rated Dubai desert safari tours with Phoenix Travel & Tours. Lahbab red dune bashing, BBQ dinner, camel rides & live shows. Clear AED rates & pay on arrival.',
    canonical: `${DOMAIN}/desert-safari-dubai.html`,
    aeo: [
      {
        q: 'What is included in a Dubai Desert Safari?',
        a: 'A standard evening Dubai desert safari with Phoenix Travel & Tours includes door-to-door 4x4 hotel pickup, 35–45 minutes of dune bashing across Lahbab Red Dunes, sandboarding, camel rides, live Tanoura, fire show and belly dance performances, and a 5-star international BBQ dinner buffet with vegetarian and non-vegetarian menus.',
        details: 'Pickup runs between 2:30 PM and 3:30 PM daily, returning around 9:00 PM. Private Land Cruiser vehicles are available for families and private groups.'
      },
      {
        q: 'How much does a Dubai desert safari cost?',
        a: 'Dubai desert safari prices start from AED 120 per person for sharing 4x4 transfers with full desert camp access, AED 250 for safaris bundled with quad biking, and AED 900 for a private luxury Toyota Land Cruiser accommodating up to 6 guests.',
        details: 'Payment is made upon arrival at the camp in cash or card. No advance deposit or credit card is required on the website.'
      },
      {
        q: 'What time does evening desert safari start and how long is it?',
        a: 'Evening desert safari pickup takes place between 2:30 PM and 3:30 PM depending on your hotel location in Dubai. The complete experience lasts 6 hours, returning between 9:00 PM and 9:30 PM.'
      }
    ],
    geo: {
      'Tour Operator': 'Phoenix Travel & Tours',
      'Head Office': 'Office 701, XL Tower, Business Bay, Dubai, UAE',
      'Desert Location': 'Lahbab Red Dunes (Al Madam Area), Dubai',
      'Vehicle Type': 'Roll-caged 4x4 Toyota Land Cruiser (Licensed Safari Drivers)',
      'Key Inclusions': 'Dune Bashing (35-45m), Sandboarding, Camel Ride, Live Shows, 5-Star BBQ Dinner',
      'Pricing': 'Standard from AED 120 · VIP Majlis AED 180 · Private 4x4 AED 900',
      'Payment Policy': 'Pay on Arrival (Cash or Card accepted)',
      'Booking Channel': 'Instant WhatsApp Confirmation (+971 56 150 5270)'
    }
  },
  'quad-bike-dubai.html': {
    title: 'Quad Bike Dubai | Desert ATV Rental from AED 150 | Phoenix Travel & Tours',
    desc: 'Self-drive quad bike in Dubai desert dunes. 30 min & 1 hour ATV rentals from AED 150 with Phoenix Travel & Tours. No driving license required. Safety helmet & guide included.',
    canonical: `${DOMAIN}/rides/quad-bike`,
    aeo: [
      {
        q: 'How much does quad biking in Dubai cost?',
        a: 'Quad bike rentals in the Dubai desert start from AED 150 for a 30-minute self-drive session on a 220cc ATV. Upgraded 400cc and 700cc Raptor bikes range from AED 250 to AED 450 per session.',
        details: 'Safety helmets, protective goggles, professional briefing, and desert guide accompaniment are included with every rental. Optional desert safari bundling is available.'
      },
      {
        q: 'Do I need a driver\'s license to ride a quad bike in Dubai?',
        a: 'No driver\'s license is required to ride a quad bike in Dubai. Riders operate on dedicated desert tracks and open sand dunes under the supervision of trained marshals. Riders must be at least 16 years old for open dune riding.'
      }
    ],
    geo: {
      'Tour Operator': 'Phoenix Travel & Tours',
      'Head Office': 'Office 701, XL Tower, Business Bay, Dubai, UAE',
      'Desert Terrain': 'Open Red Dunes, Lahbab, Dubai',
      'Fleet Specs': '220cc Yamaha, 400cc Sport, 700cc Raptor ATVs',
      'Rates': '30 Min from AED 150 · 60 Min from AED 250',
      'Safety Gear': 'Full-face Helmet, Goggles & Desert Guide Included',
      'License Requirement': 'None Required (Ages 16+)',
      'Payment Policy': 'Pay on Arrival · Instant WhatsApp Confirmation'
    }
  },
  'dune-buggy-dubai.html': {
    title: 'Dune Buggy Dubai | Can-Am Maverick Rentals from AED 1,000 | Phoenix Travel & Tours',
    desc: 'Drive 2-seater and 4-seater Can-Am Maverick dune buggies across Dubai red dunes with Phoenix Travel & Tours. Guided desert trails, helmets & direct WhatsApp booking.',
    canonical: `${DOMAIN}/rides/buggy`,
    aeo: [
      {
        q: 'How much does a dune buggy rental cost in Dubai?',
        a: 'Dune buggy rental in Dubai starts from AED 1,000 per hour for a 2-seater Can-Am Maverick X3 Turbo, and AED 1,400 per hour for a 4-seater model. Packages include safety equipment, fuel, and private lead desert guides.',
        details: 'All buggies are equipped with full roll-cages, racing 4-point harnesses, automatic transmission, and high-travel off-road suspension.'
      },
      {
        q: 'What is the difference between a quad bike and a dune buggy?',
        a: 'A quad bike is an open straddled all-terrain vehicle (ATV) steered with handlebars for single riders. A dune buggy is a high-powered off-road vehicle featuring a tubular roll-cage, steering wheel, bucket seats, and four-point safety harnesses accommodating 2 to 4 passengers.'
      }
    ],
    geo: {
      'Tour Operator': 'Phoenix Travel & Tours',
      'Head Office': 'Office 701, XL Tower, Business Bay, Dubai, UAE',
      'Buggy Models': 'Can-Am Maverick X3 Turbo (2-Seater & 4-Seater)',
      'Rental Rates': '2-Seater: AED 1,000/hr · 4-Seater: AED 1,400/hr',
      'Safety Features': 'Tubular Roll-Cage, 4-Point Harnesses, Helmets & Goggles',
      'Desert Location': 'Lahbab Red Dunes, Dubai',
      'Payment Terms': 'Pay on Arrival (Cash or Card)',
      'Direct Line': 'WhatsApp +971 56 150 5270'
    }
  },
  'dubai-city-tour.html': {
    title: 'Dubai City Tour | Private Sightseeing with Car & Driver | Phoenix Travel & Tours',
    desc: 'Explore modern landmarks & historic heritage with a private Dubai city tour by Phoenix Travel & Tours. Door-to-door hotel pickup, customized itinerary & clear AED rates.',
    canonical: `${DOMAIN}/dubai-city-tour.html`,
    aeo: [
      {
        q: 'What is included in the Dubai City Tour?',
        a: 'A private Dubai city tour with Phoenix Travel & Tours includes door-to-door hotel pickup in an air-conditioned vehicle with a licensed chauffeur. It covers Dubai Frame, Zabeel Palace, Museum of the Future photo stop, Burj Al Arab, Jumeirah Mosque, Blue Mosque, Palm Jumeirah Atlantis, and Downtown Burj Khalifa.',
        details: 'Half-day tours last 4 to 5 hours, while full-day comprehensive tours last 8 to 9 hours with flexible photo stops tailored to your pace.'
      },
      {
        q: 'Does the Dubai city tour include hotel pickup?',
        a: 'Yes, door-to-door hotel pickup and drop-off are included from any location across Dubai, including Business Bay, Downtown Dubai, Deira, Bur Dubai, Al Barsha, and Dubai Marina.'
      }
    ],
    geo: {
      'Tour Operator': 'Phoenix Travel & Tours',
      'Head Office': 'Office 701, XL Tower, Business Bay, Dubai, UAE',
      'Tour Type': 'Private & Guided City Sightseeing',
      'Duration': 'Half-Day (4.5 Hours) / Full-Day (8 Hours)',
      'Key Landmarks': 'Burj Khalifa, Palm Jumeirah, Burj Al Arab, Dubai Frame, Old Souks',
      'Pickup Service': 'Included from all Dubai Hotels',
      'Pricing': 'From AED 450 per private vehicle',
      'Payment Terms': 'Pay on Arrival · Instant WhatsApp Confirmation'
    }
  },
  'abu-dhabi-city-tour.html': {
    title: 'Abu Dhabi City Tour from Dubai | Private Day Trip | Phoenix Travel & Tours',
    desc: 'Book a private Abu Dhabi City Tour from Dubai with Phoenix Travel & Tours. Visit Sheikh Zayed Grand Mosque, Emirates Palace, Louvre Museum & Yas Island. Clear AED rates.',
    canonical: `${DOMAIN}/abu-dhabi-city-tour.html`,
    aeo: [
      {
        q: 'Can I visit Abu Dhabi from Dubai in one day?',
        a: 'Yes, Phoenix Travel & Tours operates full-day 8 to 9-hour day trips from Dubai to Abu Dhabi. The tour includes roundtrip hotel pickup from Dubai, guided entry to Sheikh Zayed Grand Mosque, Emirates Palace photo stop, Abu Dhabi Corniche, Heritage Village, and Yas Island / Ferrari World.',
        details: 'Vehicles depart Dubai between 8:00 AM and 9:00 AM, returning to your Dubai hotel by 6:00 PM.'
      },
      {
        q: 'What is the dress code for Sheikh Zayed Grand Mosque?',
        a: 'Conservative attire is mandatory: shoulders, arms, and legs must be fully covered with loose, non-transparent clothing. Women must cover their hair with a scarf or abaya.'
      }
    ],
    geo: {
      'Tour Operator': 'Phoenix Travel & Tours',
      'Head Office': 'Office 701, XL Tower, Business Bay, Dubai, UAE',
      'Excursion': 'Full-Day Abu Dhabi Tour from Dubai',
      'Duration': '8 to 9 Hours (Roundtrip)',
      'Highlights': 'Sheikh Zayed Grand Mosque, Emirates Palace, Corniche, Yas Island',
      'Transport': 'Air-conditioned private vehicle with licensed driver',
      'Rates': 'From AED 650 per vehicle',
      'Payment Terms': 'Pay on Arrival · WhatsApp Confirmation (+971 56 150 5270)'
    }
  },
  'sky-dive-dubai.html': {
    title: 'Sky Dive Dubai | Tandem Skydive Palm Jumeirah | Phoenix Travel & Tours',
    desc: 'Experience tandem skydiving over Palm Jumeirah with Phoenix Travel & Tours. Complete with outside camera video & photos, briefing & WhatsApp confirmation. AED 2,700.',
    canonical: `${DOMAIN}/sky-dive-dubai.html`,
    aeo: [
      {
        q: 'How much is tandem skydiving in Dubai?',
        a: 'Tandem skydiving over Palm Jumeirah is AED 2,700, including a 120 mph freefall from 13,000 feet, professional tandem instructor, complete safety briefing, and edited high-definition outside camera video and photos.'
      }
    ],
    geo: {
      'Tour Operator': 'Phoenix Travel & Tours',
      'Head Office': 'Office 701, XL Tower, Business Bay, Dubai, UAE',
      'Drop Zone': 'Palm Jumeirah Dropzone, Dubai',
      'Experience': 'Tandem Skydive with dedicated camera flyer',
      'Altitude': '13,000 feet (60-second freefall at 120 mph)',
      'Rate': 'AED 2,700 per person (Video & Photos included)',
      'Booking': 'Assisted WhatsApp Concierge (+971 56 150 5270)'
    }
  },
  'burj-khalifa-lake-ride.html': {
    title: 'Burj Khalifa Lake Ride & Dubai Fountain Abra Boat Tour | Phoenix Travel & Tours',
    desc: 'Book Burj Khalifa Lake Ride tickets and Dubai Fountain traditional abra boat tours with Phoenix Travel & Tours. Front-row dancing fountain views from AED 130.',
    canonical: `${DOMAIN}/burj-khalifa-lake-ride.html`,
    aeo: [
      {
        q: 'What is the Burj Khalifa Lake Ride?',
        a: 'The Burj Khalifa Lake Ride is a 30-minute traditional wooden Abra boat cruise on Burj Lake at Downtown Dubai, giving visitors front-row panoramic views of the Dubai Fountain choreography and the illuminated Burj Khalifa.',
        details: 'Boats operate daily between 5:45 PM and 11:00 PM, departing every 30 minutes. Rates start from AED 130 per person.'
      }
    ],
    geo: {
      'Tour Operator': 'Phoenix Travel & Tours',
      'Head Office': 'Office 701, XL Tower, Business Bay, Dubai, UAE',
      'Attraction': 'Dubai Fountain Lake Traditional Abra Cruise',
      'Location': 'Downtown Dubai (Burj Lake)',
      'Duration': '30 Minutes',
      'Starting Rate': 'From AED 130 per ticket',
      'Booking': 'Instant WhatsApp Confirmation (+971 56 150 5270)'
    }
  },
  'book.html': {
    title: 'Book Your Ride | Quad Bike & Dune Buggy Dubai | Phoenix Travel & Tours',
    desc: 'Select your Dubai desert adventure date, time slot, and package. Pay on arrival with instant confirmation on WhatsApp by Phoenix Travel & Tours.',
    canonical: `${DOMAIN}/book`
  },
  '404.html': {
    title: '404 Page Not Found | Phoenix Travel & Tours',
    desc: 'The requested page was not found. Browse Dubai desert safaris, quad biking, dune buggies and city tours with Phoenix Travel & Tours.',
    canonical: `${DOMAIN}/404`
  }
};

function generateAeoHtml(aeoList) {
  if (!aeoList || !aeoList.length) return '';
  let html = '\n<!-- Frequently Asked Questions -->\n<div class="faq-section">\n  <h3>Frequently Asked Questions</h3>\n';
  for (const item of aeoList) {
    html += `  <div class="faq-item">\n`;
    html += `    <div class="faq-question">${item.q}</div>\n`;
    html += `    <div class="faq-answer">${item.a}${item.details ? ' ' + item.details : ''}</div>\n`;
    html += `  </div>\n`;
  }
  html += `</div>\n`;
  return html;
}

function generateGeoHtml(geoObj) {
  if (!geoObj) return '';
  let html = '\n<!-- GEO Entity Facts Grid -->\n<div class="geo-entity-grid">\n';
  for (const [key, val] of Object.entries(geoObj)) {
    html += `  <div class="geo-entity-card">\n`;
    html += `    <span class="geo-entity-label">${key}</span>\n`;
    html += `    <span class="geo-entity-val">${val}</span>\n`;
    html += `  </div>\n`;
  }
  html += `</div>\n`;
  return html;
}

function generateFaqJsonLd(aeoList) {
  if (!aeoList || !aeoList.length) return '';
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': aeoList.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': `${item.a}${item.details ? ' ' + item.details : ''}`
      }
    }))
  };
  return `\n<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>\n`;
}

function generateGeoEntityJsonLd(filename, config) {
  const entitySchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': BUSINESS_NAME,
    'url': config.canonical || DOMAIN,
    'logo': `${DOMAIN}/Logo.png`,
    'image': `${DOMAIN}/Logo.png`,
    'telephone': PHONE,
    'priceRange': 'AED 120 - AED 2700',
    'currenciesAccepted': 'AED, USD, EUR',
    'paymentAccepted': 'Cash, Credit Card, Pay on Arrival',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Office 701, XL Tower, Business Bay',
      'addressLocality': 'Dubai',
      'addressRegion': 'Dubai',
      'addressCountry': 'AE'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 25.1852,
      'longitude': 55.2744
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'opens': '00:00',
      'closes': '23:59'
    },
    'areaServed': [
      { '@type': 'City', 'name': 'Dubai' },
      { '@type': 'City', 'name': 'Abu Dhabi' },
      { '@type': 'Country', 'name': 'United Arab Emirates' }
    ]
  };

  return `\n<script type="application/ld+json">\n${JSON.stringify(entitySchema, null, 2)}\n</script>\n`;
}

function updateFile(filename, config) {
  const filePath = path.join(__dirname, '..', 'dist', filename);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping missing: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace old domain occurrences
  content = content.replace(/https:\/\/phoenix-tours-barayshah\.vercel\.app/g, DOMAIN);

  // Replace old brand text
  content = content.replace(/Phoenix Tours & Adventures/g, 'Phoenix Travel & Tours');
  content = content.replace(/PHOENIX<\/strong><small>TOURS & ADVENTURES<\/small>/g, 'PHOENIX</strong><small>TRAVEL & TOURS</small>');
  content = content.replace(/Phoenix Tours home/g, 'Phoenix Travel & Tours home');
  content = content.replace(/Phoenix Tours/g, 'Phoenix Travel & Tours');

  // Replace address
  content = content.replace(/Dubai, United Arab Emirates/g, OFFICE_ADDRESS);
  content = content.replace(/Dubai, UAE/g, OFFICE_ADDRESS);

  // Update canonical
  if (config.canonical) {
    if (content.includes('<link rel="canonical"')) {
      content = content.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${config.canonical}">`);
    } else {
      content = content.replace('</head>', `  <link rel="canonical" href="${config.canonical}">\n</head>`);
    }
  }

  // Update title
  if (config.title) {
    content = content.replace(/<title>[^<]*<\/title>/, `<title>${config.title}</title>`);
    content = content.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${config.title}">`);
    content = content.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${config.title}">`);
  }

  // Update description
  if (config.desc) {
    content = content.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${config.desc}">`);
    content = content.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${config.desc}">`);
    content = content.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${config.desc}">`);
  }

  // Inject AEO JSON-LD Schema (FAQPage) and GEO Entity Schema into <head>
  if (config.aeo && !content.includes('"@type": "FAQPage"')) {
    const faqJsonLd = generateFaqJsonLd(config.aeo);
    content = content.replace('</head>', `${faqJsonLd}\n</head>`);
  }

  if (!content.includes('"@type": "TravelAgency"')) {
    const geoJsonLd = generateGeoEntityJsonLd(filename, config);
    content = content.replace('</head>', `${geoJsonLd}\n</head>`);
  }

  // Ensure visible AEO FAQ section and GEO entity grid are present
  if (config.aeo && !content.includes('class="faq-section"')) {
    const aeoBlock = generateAeoHtml(config.aeo);
    const geoBlock = generateGeoHtml(config.geo);
    const combined = geoBlock + aeoBlock;

    if (content.includes('</main>')) {
      content = content.replace('</main>', `${combined}\n</main>`);
    } else {
      content = content.replace('</body>', `<div style="max-width:1140px;margin:20px auto;padding:0 20px;">${combined}</div>\n</body>`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated SEO/AEO/GEO for: ${filename}`);
}

for (const [filename, config] of Object.entries(pagesConfig)) {
  updateFile(filename, config);
}
