window.PHOENIX_DEFAULT_TOURS=[
  {
    id:'evening',name:'Evening Desert Safari',type:'Safari',category:'safari',badge:'BEST SELLER',duration:'Evening',description:'Classic Dubai desert evening with sharing and private booking options.',active:true,meetingPoint:false,
    image:'https://images.pexels.com/photos/28730135/pexels-photo-28730135.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/dubai-desert-safari-adventure-at-sunset-28730135/',
    packages:[{id:'sharing',name:'Sharing',price:120,unit:'person'},{id:'private',name:'Private',price:650,unit:'vehicle'}]
  },
  {
    id:'morning',name:'Morning Desert Safari',type:'Safari',category:'safari',badge:'PRIVATE',duration:'Morning',description:'A relaxed private morning desert experience for families and small groups.',active:true,meetingPoint:false,
    image:'https://images.pexels.com/photos/33669944/pexels-photo-33669944.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/breathtaking-dubai-desert-sunset-with-sand-dunes-33669944/',
    packages:[{id:'private',name:'Private',price:550,unit:'vehicle'}]
  },
  {
    id:'premium',name:'Premium Desert Safari',type:'Premium',category:'safari',badge:'PREMIUM',duration:'Evening',description:'Upgrade your desert evening with premium service and extra comfort.',active:true,meetingPoint:false,
    image:'https://images.pexels.com/photos/35039929/pexels-photo-35039929.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/desert-safari-adventure-in-dubai-s-sunset-35039929/',
    packages:[{id:'sharing',name:'Sharing',price:220,unit:'person'},{id:'private',name:'Private',price:850,unit:'vehicle'}]
  },
  {
    id:'quad',name:'Premium Quad Bike Dubai',type:'Adventure',category:'quad',badge:'RIDE UPGRADE',duration:'30 min / 1 hour',description:'Premium self-drive desert quad bike ride with automatic transmission, helmet, goggles & guide. Direct meeting point.',active:true,meetingPoint:true,
    image:'https://images.pexels.com/photos/36713570/pexels-photo-36713570.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/atv-adventure-across-the-dubai-desert-dunes-36713570/',
    packages:[
      {id:'quad30',name:'Quad Bike · 30 min',price:150,unit:'bike',duration:'30 min'},
      {id:'quad60',name:'Quad Bike · 1 hour',price:250,unit:'bike',duration:'1 hour'}
    ]
  },
  {
    id:'canam2',name:'Premium Can-Am Buggy Dubai · 2 Seater',type:'Buggy',category:'buggy',badge:'CAN-AM 2-SEATER',duration:'30 min / 1 hour',description:'High-powered turbocharged Can-Am Maverick 2-seater desert buggy with roll-cage and racing harnesses.',active:true,meetingPoint:true,
    image:'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/couple-riding-quad-on-desert-20734798/',
    packages:[
      {id:'buggy2-30',name:'Can-Am Buggy 2 Seater · 30 min',price:1000,unit:'buggy',duration:'30 min'},
      {id:'buggy2-60',name:'Can-Am Buggy 2 Seater · 1 hour',price:1800,unit:'buggy',duration:'1 hour'}
    ]
  },
  {
    id:'canam4',name:'Premium Can-Am Buggy Dubai · 4 Seater',type:'Buggy',category:'buggy',badge:'CAN-AM 4-SEATER',duration:'30 min / 1 hour',description:'Premium 4-seater Can-Am Maverick desert buggy adventure for groups and families across open dunes.',active:true,meetingPoint:true,
    image:'https://images.pexels.com/photos/20734778/pexels-photo-20734778.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/couple-riding-quad-on-desert-20734798/',
    packages:[
      {id:'buggy4-30',name:'Can-Am Buggy 4 Seater · 30 min',price:1500,unit:'buggy',duration:'30 min'},
      {id:'buggy4-60',name:'Can-Am Buggy 4 Seater · 1 hour',price:2800,unit:'buggy',duration:'1 hour'}
    ]
  }
];

window.PHOENIX_DEFAULT_CMS = {
  hero: {
    eyebrow: "DUBAI · UAE · DESERT EXPERIENCES",
    title: "Dubai desert safari, quad bike & buggy adventures",
    subtitle: "Explore Dubai desert safaris, quad bike rides and premium Can-Am buggy experiences with clear rates and quick WhatsApp confirmation.",
    btnPrimaryText: "Book an experience",
    btnSecondaryText: "Explore tours",
    btnSecondaryLink: "#tours",
    sideText: "DUBAI DESERT · CITY · ADVENTURE",
    image: "hero.jpg",
    trustItems: [
      "✓ Pay on arrival",
      "✓ WhatsApp confirmation",
      "✓ Private & sharing options"
    ]
  },
  categories: {
    eyebrow: "CHOOSE YOUR STYLE",
    title: "What kind of Dubai experience are you looking for?",
    allLinkText: "See all experiences →",
    allLinkUrl: "#tours",
    cards: [
      { id: "safari", title: "Desert Safari Dubai", link: "desert-safari-dubai.html", image: "hero.jpg" },
      { id: "quad", title: "Quad Bike Dubai", link: "quad-bike-dubai.html", image: "https://images.pexels.com/photos/36713570/pexels-photo-36713570.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { id: "buggy", title: "Dune Buggy Dubai", link: "dune-buggy-dubai.html", image: "https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { id: "city", title: "Dubai City Tours", link: "dubai-city-tour.html", image: "dubai.jpg" }
    ]
  },
  tourSection: {
    eyebrow: "RECOMMENDED EXPERIENCES",
    title: "Popular Dubai tours and desert adventures",
    noteText: "Explore detailed guides and rates for our",
    guides: [
      { text: "Dubai desert safari tours", url: "desert-safari-dubai.html" },
      { text: "quad bike Dubai experiences", url: "quad-bike-dubai.html" },
      { text: "Dubai dune buggy rides", url: "dune-buggy-dubai.html" }
    ]
  },
  whyUs: {
    eyebrow: "WHY PHOENIX TOURS",
    title: "Simple booking. Clear rates. Memorable UAE experiences.",
    items: [
      { num: "01", title: "Clear pricing", desc: "Rates are shown before you request your booking, including sharing and private options." },
      { num: "02", title: "Fast confirmation", desc: "Your request is prepared and sent on WhatsApp for quick confirmation." },
      { num: "03", title: "Easy changes", desc: "Adjust the date, guest count or package with our team before confirmation." },
      { num: "04", title: "Pay on arrival", desc: "No online card payment is required on the website." }
    ]
  },
  banner: {
    eyebrow: "NEED HELP CHOOSING?",
    title: "Plan your Dubai tour with a local team.",
    desc: "Tell us your date, group size and the experience you want. We’ll help you choose the right package.",
    image: "hero.jpg",
    ctaWhatsappText: "Chat on WhatsApp",
    ctaWhatsappNumber: "+971561505270",
    ctaCallText: "Call us",
    ctaCallNumber: "+971561505270"
  },
  latest: {
    eyebrow: "MORE UAE EXPERIENCES",
    title: "Dubai and Abu Dhabi city tours",
    cards: [
      {
        tag: "CITY TOUR",
        title: "Dubai City Tour",
        desc: "Old Dubai, iconic landmarks and modern skyline highlights.",
        link: "dubai-city-tour.html",
        btnText: "Explore Dubai city tours →",
        image: "dubai.jpg"
      },
      {
        tag: "CITY TOUR",
        title: "Abu Dhabi City Tour",
        desc: "Discover the UAE capital, architecture and cultural highlights.",
        link: "abu-dhabi-city-tour.html",
        btnText: "Explore Abu Dhabi tours →",
        image: "abudhabi.jpg"
      },
      {
        tag: "PRIVATE TOUR",
        title: "Private Dubai Desert Tour",
        desc: "Choose a private desert experience around your group and schedule.",
        link: "desert-safari-dubai.html",
        btnText: "View private safari options →",
        image: "hero.jpg"
      }
    ]
  },
  contact: {
    eyebrow: "PHOENIX TOURS · DUBAI",
    title: "Your UAE adventure starts here.",
    subtitle: "Desert Safari · Quad Bike · Dune Buggy · Dubai City Tour · Abu Dhabi Tour",
    btnText: "Start booking",
    phoneDisplay: "+971 56 150 5270",
    phoneTel: "+971561505270"
  },
  footer: {
    brandName: "PHOENIX",
    brandTagline: "TOURS & ADVENTURES",
    location: "Dubai, United Arab Emirates",
    phoneDisplay: "+971 56 150 5270",
    phoneUrl: "https://wa.me/971561505270",
    copyrightName: "Phoenix Tours",
    links: [
      { title: "Desert Safari Dubai", url: "desert-safari-dubai.html" },
      { title: "Quad Bike Dubai", url: "quad-bike-dubai.html" },
      { title: "Dune Buggy Dubai", url: "dune-buggy-dubai.html" },
      { title: "Dubai City Tour", url: "dubai-city-tour.html" },
      { title: "Abu Dhabi City Tour", url: "abu-dhabi-city-tour.html" }
    ]
  }
};
