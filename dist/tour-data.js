const DEFAULT_TOURS = [
  {
    id: 'desert-safari',
    name: 'Evening Desert Safari Dubai',
    type: 'Desert Safari',
    duration: '6 Hours',
    badge: 'BESTSELLER',
    image: 'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Experience Lahbab Red Dunes 4x4 dune bashing, camel riding, sandboarding, live entertainment & BBQ dinner.',
    packages: [
      { name: 'Standard Sharing 4x4', price: 120 },
      { name: 'VIP Majlis Service', price: 180 },
      { name: 'Private 4x4 Land Cruiser', price: 900 }
    ],
    active: true,
    source: 'https://desertsafaridxbpro.com/desert-safari-dubai.html'
  },
  {
    id: 'quad-bike',
    name: 'Quad Bike ATV Rental Dubai',
    type: 'Quad Biking',
    duration: '30m - 1 Hour',
    badge: 'HIGH ADRENALINE',
    image: 'https://images.pexels.com/photos/33041/quad-bike-atv-all-terrain-vehicle-quad.jpg?auto=compress&cs=tinysrgb&w=800',
    description: 'Self-drive powerful quad bikes across open desert sand dunes with guide supervision and safety gear included.',
    packages: [
      { name: '30 Min Single ATV (220cc)', price: 150 },
      { name: '60 Min Single ATV (220cc)', price: 250 },
      { name: '60 Min Raptor ATV (700cc)', price: 450 }
    ],
    active: true,
    source: 'https://desertsafaridxbpro.com/rides/quad-bike'
  },
  {
    id: 'buggy',
    name: 'Can-Am Dune Buggy Rental',
    type: 'Dune Buggy',
    duration: '1 Hour',
    badge: 'POPULAR',
    image: 'https://images.pexels.com/photos/12318029/pexels-photo-12318029.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Drive high-powered 2-seater and 4-seater Can-Am Maverick X3 Turbo dune buggies across deep red dunes.',
    packages: [
      { name: '60 Min 2-Seater Can-Am Maverick', price: 1000 },
      { name: '60 Min 4-Seater Can-Am Maverick', price: 1400 }
    ],
    active: true,
    source: 'https://desertsafaridxbpro.com/rides/buggy'
  },
  {
    id: 'dubai-city-tour',
    name: 'Private Dubai City Tour',
    type: 'City Tour',
    duration: '4.5 - 8 Hours',
    badge: 'GUIDED',
    image: 'https://images.pexels.com/photos/3767673/pexels-photo-3767673.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Explore iconic modern architecture and heritage sites including Dubai Frame, Museum of the Future & Palm Jumeirah.',
    packages: [
      { name: 'Half Day City Tour (Up to 6 guests)', price: 450 },
      { name: 'Full Day City Tour (Up to 6 guests)', price: 800 }
    ],
    active: true,
    source: 'https://desertsafaridxbpro.com/dubai-city-tour.html'
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi City Tour from Dubai',
    type: 'City Tour',
    duration: '8 Hours',
    badge: 'FULL DAY',
    image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Day trip to Abu Dhabi including guided visit to Sheikh Zayed Grand Mosque, Emirates Palace & Yas Island.',
    packages: [
      { name: 'Private Vehicle Abu Dhabi Tour', price: 650 }
    ],
    active: true,
    source: 'https://desertsafaridxbpro.com/abu-dhabi-city-tour.html'
  },
  {
    id: 'sky-dive',
    name: 'Tandem Sky Dive Palm Jumeirah',
    type: 'Extreme Adventure',
    duration: '3 Hours',
    badge: 'ULTIMATE',
    image: 'https://images.pexels.com/photos/2873671/pexels-photo-2873671.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Freefall at 120 mph from 13,000 feet over Palm Jumeirah with video and photo media package included.',
    packages: [
      { name: 'Palm Dropzone Tandem Skydive', price: 2700 }
    ],
    active: true,
    source: 'https://desertsafaridxbpro.com/sky-dive-dubai.html'
  }
];

if (typeof window !== 'undefined') {
  window.DEFAULT_TOURS = DEFAULT_TOURS;
}
