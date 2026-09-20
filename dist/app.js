const DEFAULT_TOURS=(window.PHOENIX_DEFAULT_TOURS||[
  {
    id:'evening',name:'Evening Desert Safari',type:'Safari',category:'safari',badge:'BEST SELLER',duration:'Evening (6 hrs)',bestFor:'Sunset, BBQ & Live Shows',description:'Classic Dubai desert evening with sharing and private booking options.',active:true,meetingPoint:false,
    image:'https://images.pexels.com/photos/28730135/pexels-photo-28730135.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/dubai-desert-safari-adventure-at-sunset-28730135/',
    packages:[{id:'sharing',name:'Sharing',price:120,unit:'person'},{id:'private',name:'Private',price:650,unit:'vehicle'}]
  },
  {
    id:'morning',name:'Morning Desert Safari',type:'Safari',category:'safari',badge:'PRIVATE',duration:'Morning (4 hrs)',bestFor:'Sunrise & Morning Desert',description:'A relaxed private morning desert experience for families and small groups.',active:true,meetingPoint:false,
    image:'https://images.pexels.com/photos/33669944/pexels-photo-33669944.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/breathtaking-dubai-desert-sunset-with-sand-dunes-33669944/',
    packages:[{id:'private',name:'Private',price:550,unit:'vehicle'}]
  },
  {
    id:'premium',name:'Premium Desert Safari',type:'Premium',category:'safari',badge:'PREMIUM',duration:'Evening (6 hrs)',bestFor:'VIP Comfort & Red Dunes',description:'Upgrade your desert evening with premium service and extra comfort.',active:true,meetingPoint:false,
    image:'https://images.pexels.com/photos/35039929/pexels-photo-35039929.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/desert-safari-adventure-in-dubai-s-sunset-35039929/',
    packages:[{id:'sharing',name:'Sharing',price:220,unit:'person'},{id:'private',name:'Private',price:850,unit:'vehicle'}]
  },
  {
    id:'quad',name:'Premium Quad Bike Dubai',type:'Adventure',category:'quad',badge:'RIDE UPGRADE',duration:'30 min / 1 hour',bestFor:'Thrill Seekers & Self-Drive',description:'Premium self-drive desert quad bike ride with automatic transmission, helmet, goggles & guide. Direct meeting point.',active:true,meetingPoint:true,
    image:'https://images.pexels.com/photos/36713570/pexels-photo-36713570.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/atv-adventure-across-the-dubai-desert-dunes-36713570/',
    packages:[
      {id:'quad30',name:'Quad Bike · 30 min',price:150,unit:'bike',duration:'30 min'},
      {id:'quad60',name:'Quad Bike · 1 hour',price:250,unit:'bike',duration:'1 hour'}
    ]
  },
  {
    id:'canam2',name:'Premium Can-Am Buggy Dubai · 2 Seater',type:'Buggy',category:'buggy',badge:'CAN-AM 2-SEATER',duration:'30 min / 1 hour',bestFor:'High-Power Off-Road Speed',description:'High-powered turbocharged Can-Am Maverick 2-seater desert buggy with roll-cage and racing harnesses.',active:true,meetingPoint:true,
    image:'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/couple-riding-quad-on-desert-20734798/',
    packages:[
      {id:'buggy2-30',name:'Can-Am Buggy 2 Seater · 30 min',price:1000,unit:'buggy',duration:'30 min'},
      {id:'buggy2-60',name:'Can-Am Buggy 2 Seater · 1 hour',price:1800,unit:'buggy',duration:'1 hour'}
    ]
  },
  {
    id:'canam4',name:'Premium Can-Am Buggy Dubai · 4 Seater',type:'Buggy',category:'buggy',badge:'CAN-AM 4-SEATER',duration:'30 min / 1 hour',bestFor:'Families & Group Adventure',description:'Premium 4-seater Can-Am Maverick desert buggy adventure for groups and families across open dunes.',active:true,meetingPoint:true,
    image:'https://images.pexels.com/photos/20734778/pexels-photo-20734778.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/couple-riding-quad-on-desert-20734798/',
    packages:[
      {id:'buggy4-30',name:'Can-Am Buggy 4 Seater · 30 min',price:1500,unit:'buggy',duration:'30 min'},
      {id:'buggy4-60',name:'Can-Am Buggy 4 Seater · 1 hour',price:2800,unit:'buggy',duration:'1 hour'}
    ]
  },
  {
    id:'burj-lake',name:'Burj Khalifa Lake Ride & Fountain Abra',type:'Sightseeing',category:'city',badge:'TOP ATTRACTION',duration:'30 min',bestFor:'Fountain Show & Water Views',description:'Sail along the Burj Lake in a traditional Abra with front-row views of the world famous Dubai Fountain show.',active:true,meetingPoint:true,
    image:'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=1200',source:'https://www.pexels.com/photo/dubai-tower-arab-khalifa-162031/',
    packages:[
      {id:'abra-sharing',name:'Traditional Abra Ride · Sharing',price:120,unit:'person',duration:'30 min'},
      {id:'abra-fountain',name:'Dubai Fountain Water Experience',price:85,unit:'person',duration:'30 min'},
      {id:'abra-private',name:'VIP Private Abra Charter',price:350,unit:'vehicle',duration:'30 min'}
    ]
  },
  {
    id:'dubai-city',name:'Dubai City Sightseeing Tour',type:'City Tour',category:'city',badge:'POPULAR',duration:'4–5 hours',bestFor:'Landmarks & City Culture',description:'Discover historic Old Dubai, Dubai Creek Abra, Dubai Frame, Burj Al Arab photo stop & modern skyline.',active:true,meetingPoint:false,
    image:'dubai.jpg',source:'Phoenix Tours',
    packages:[
      {id:'city-half-sharing',name:'Half-Day Dubai City Tour (Sharing)',price:150,unit:'person',duration:'4–5 hours'},
      {id:'city-half-private',name:'Private Half-Day Dubai Tour (Up to 6)',price:600,unit:'vehicle',duration:'4–5 hours'},
      {id:'city-full-private',name:'Full-Day Modern Dubai Tour (Private)',price:850,unit:'vehicle',duration:'8 hours'}
    ]
  },
  {
    id:'abu-dhabi',name:'Abu Dhabi City Tour from Dubai',type:'City Tour',category:'city',badge:'FULL DAY',duration:'8–9 hours',bestFor:'Grand Mosque & Day Trip',description:'Explore the UAE capital with Sheikh Zayed Grand Mosque, Emirates Palace photo stop, Heritage Village & Corniche.',active:true,meetingPoint:false,
    image:'abudhabi.jpg',source:'Phoenix Tours',
    packages:[
      {id:'ad-sharing',name:'Abu Dhabi Day Tour (Sharing)',price:220,unit:'person',duration:'8–9 hours'},
      {id:'ad-private',name:'Abu Dhabi Private SUV Tour (Up to 6)',price:950,unit:'vehicle',duration:'8–9 hours'}
    ]
  }
]);

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

function loadTours(){
  try{
    const saved=JSON.parse(localStorage.getItem('phoenixAdminTours')||'null');
    if(Array.isArray(saved)&&saved.length){
      let upgraded=false;
      const patched=saved.map(t=>{
        const def=DEFAULT_TOURS.find(d=>d.id===t.id);
        if(def&&['quad','canam2','canam4'].includes(t.id)){
          if(!t.packages||t.packages.length<2||t.packages[0].name.includes('1 Bike')||t.packages[0].name.includes('2 Seater · 30 Minutes')||t.packages[0].name.includes('4 Seater · 30 Minutes')){
            upgraded=true;
            return {...t,name:def.name,packages:def.packages,badge:def.badge,duration:def.duration,bestFor:def.bestFor||t.bestFor,meetingPoint:true,image:t.image||def.image};
          }
        }
        return t;
      });
      if(upgraded){
        localStorage.setItem('phoenixAdminTours',JSON.stringify(patched));
      }
      return patched;
    }
    return DEFAULT_TOURS;
  }catch{
    return DEFAULT_TOURS;
  }
}

let TOUR_LIST=loadTours();
function activeTours(){return TOUR_LIST.filter(t=>t.active!==false)}
function toursById(){return Object.fromEntries(activeTours().map(t=>[t.id,t]))}
let TOURS=toursById();

function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function unitText(unit){return unit==='person'?'per person':unit==='vehicle'?'per vehicle':unit==='bike'?'per bike':unit==='buggy'?'per buggy':`per ${unit||'booking'}`}

function getTourLandingUrl(t){
  const id=String(t.id||'').toLowerCase();
  if(id.includes('sky')) return '/sky-dive-dubai.html';
  if(id.includes('quad')) return '/rides/quad-bike';
  if(id.includes('canam')||id.includes('buggy')) return '/rides/buggy';
  if(id.includes('burj')) return '/burj-khalifa-lake-ride.html';
  if(id.includes('abudhabi')||id.includes('abu-dhabi')) return '/abu-dhabi-city-tour.html';
  if(id.includes('city')) return '/dubai-city-tour.html';
  return '/desert-safari-dubai.html';
}

function getBestFor(t){
  if(t.bestFor) return t.bestFor;
  const map = {
    'evening': 'Sunset, BBQ & Live Shows',
    'morning': 'Sunrise & Morning Desert',
    'premium': 'VIP Comfort & Red Dunes',
    'quad': 'Thrill Seekers & Self-Drive',
    'canam2': 'High-Power Off-Road Speed',
    'canam4': 'Families & Group Adventure',
    'burj-lake': 'Fountain Show & Water Views',
    'dubai-city': 'Landmarks & City Culture',
    'abu-dhabi': 'Grand Mosque & Day Trip'
  };
  return map[t.id] || 'Couples & Families';
}

function renderTourCards(){
  const grid=$('#tourGrid');
  if(!grid)return;
  grid.innerHTML=activeTours().map(t=>{
    const bestFor = getBestFor(t);
    const duration = t.duration || 'Flexible';
    return `
    <article class="tour-card" data-category="${esc(t.category||t.type||'other').toLowerCase()}" data-search="${esc(`${t.name} ${t.type||''} ${t.description||''} ${duration} ${bestFor}`.toLowerCase())}">
      <div class="tour-media">
        <img src="${esc(t.image||'hero.jpg')}" alt="${esc(t.name)}" loading="lazy" decoding="async" width="600" height="400">
        <span class="badge${String(t.badge||'').toLowerCase().includes('premium')||String(t.badge||'').toLowerCase().includes('can-am')?' gold-badge':''}">${esc(t.badge||t.type||'TOUR')}</span>
        <span class="duration">⏱️ ${esc(duration)}</span>
      </div>
      <div class="tour-body">
        <div class="tour-rating">★★★★★ <span>${esc(t.type||'Phoenix Tours')}</span></div>
        <h3>${esc(t.name)}</h3>
        <p>${esc(t.description||'Book this Dubai experience with Phoenix Tours.')}</p>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
          <span style="font-size:9px;font-weight:800;background:#eef6f5;color:#0c6769;padding:5px 10px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">⏱️ <strong>Duration:</strong> ${esc(duration)}</span>
          <span style="font-size:9px;font-weight:800;background:#fdf6ec;color:#9c5b10;padding:5px 10px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">⭐ <strong>Best for:</strong> ${esc(bestFor)}</span>
        </div>
        ${(t.packages||[]).map(p=>`
          <div class="feature-line${(t.packages||[]).length===1?' single':''}" style="cursor:pointer" data-book-tour="${esc(t.id)}" data-book-package="${esc(p.id)}" title="Click to book ${esc(p.name)}">
            <span>${esc(p.name)}</span>
            <strong>AED ${Number(p.price||0).toLocaleString()}</strong>
            <small>${unitText(p.unit)}</small>
          </div>
        `).join('')}
        <button class="book-card" data-book-tour="${esc(t.id)}">Book this experience <span>→</span></button>
        <div style="margin-top:8px;text-align:center;">
          <a href="${getTourLandingUrl(t)}" style="font-size:12px;font-weight:700;color:var(--aqua);text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
            <span>Explore full guide, itinerary & FAQs</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </article>
  `}).join('')||'<p>No tours are currently available.</p>';
}
renderTourCards();

function getHomepageCMS(){
  try{
    const raw=localStorage.getItem('phoenixHomepageCMS');
    if(raw){
      const parsed=JSON.parse(raw);
      return {...(window.PHOENIX_DEFAULT_CMS||{}),...parsed};
    }
  }catch{}
  return window.PHOENIX_DEFAULT_CMS||{};
}

function applyHomepageCMS(){
  const cms=getHomepageCMS();
  if(!cms||!cms.hero) return;

  // 1. Hero
  const heroSection=$('#home');
  if(heroSection){
    const heroImg=heroSection.querySelector('.hero-image');
    if(heroImg&&cms.hero.image) heroImg.src=cms.hero.image;
    const heroEyebrow=heroSection.querySelector('.hero-content .eyebrow');
    if(heroEyebrow&&cms.hero.eyebrow) heroEyebrow.textContent=cms.hero.eyebrow;
    const heroH1=heroSection.querySelector('.hero-content h1');
    if(heroH1&&cms.hero.title) heroH1.textContent=cms.hero.title;
    const heroP=heroSection.querySelector('.hero-content p');
    if(heroP&&cms.hero.subtitle) heroP.textContent=cms.hero.subtitle;
    const heroSide=heroSection.querySelector('.hero-side');
    if(heroSide&&cms.hero.sideText) heroSide.textContent=cms.hero.sideText;
    const heroActions=heroSection.querySelector('.hero-actions');
    if(heroActions){
      const btn1=heroActions.querySelector('button');
      if(btn1&&cms.hero.btnPrimaryText) btn1.textContent=cms.hero.btnPrimaryText;
      const btn2=heroActions.querySelector('a');
      if(btn2){
        if(cms.hero.btnSecondaryText) btn2.textContent=cms.hero.btnSecondaryText;
        if(cms.hero.btnSecondaryLink) btn2.setAttribute('href',cms.hero.btnSecondaryLink);
      }
    }
    const trustRow=heroSection.querySelector('.trust-row');
    if(trustRow&&Array.isArray(cms.hero.trustItems)&&cms.hero.trustItems.length){
      trustRow.innerHTML=cms.hero.trustItems.map(item=>`<span>${esc(item)}</span>`).join('');
    }
  }

  // 2. Categories
  const lifeSec=$('.lifestyle');
  if(lifeSec&&cms.categories){
    const eye=lifeSec.querySelector('.section-heading .eyebrow');
    if(eye&&cms.categories.eyebrow) eye.textContent=cms.categories.eyebrow;
    const h2=lifeSec.querySelector('.section-heading h2');
    if(h2&&cms.categories.title) h2.textContent=cms.categories.title;
    const link=lifeSec.querySelector('.section-heading a');
    if(link){
      if(cms.categories.allLinkText) link.textContent=cms.categories.allLinkText;
      if(cms.categories.allLinkUrl) link.setAttribute('href',cms.categories.allLinkUrl);
    }
    const catGrid=lifeSec.querySelector('.category-grid');
    if(catGrid&&Array.isArray(cms.categories.cards)&&cms.categories.cards.length){
      let legacyImages={};
      try{legacyImages=JSON.parse(localStorage.getItem('phoenixCategoryImages')||'{}')}catch{}
      catGrid.innerHTML=cms.categories.cards.map(c=>{
        const imgUrl=c.image||legacyImages[c.id]||'hero.jpg';
        return `<a class="category-card" href="${esc(c.link)}"><img src="${esc(imgUrl)}" alt="${esc(c.title)}" loading="lazy" decoding="async" width="600" height="400"><span>${esc(c.title)}</span></a>`;
      }).join('');
    }
  }

  // 3. Tour Section
  const toursSec=$('.tours-section');
  if(toursSec&&cms.tourSection){
    const eye=toursSec.querySelector('.section-heading .eyebrow');
    if(eye&&cms.tourSection.eyebrow) eye.textContent=cms.tourSection.eyebrow;
    const h2=toursSec.querySelector('.section-heading h2');
    if(h2&&cms.tourSection.title) h2.textContent=cms.tourSection.title;
    const note=toursSec.querySelector('.form-note');
    if(note&&cms.tourSection.guides){
      const guideLinks=cms.tourSection.guides.map(g=>`<a href="${esc(g.url)}">${esc(g.text)}</a>`).join(', ');
      note.innerHTML=`${esc(cms.tourSection.noteText||'Explore detailed guides and rates for our')} ${guideLinks}.`;
    }
  }

  // 4. Assistance Banner
  const assistSec=$('.assistance');
  if(assistSec&&cms.banner){
    const assistImg=assistSec.querySelector('img');
    if(assistImg&&cms.banner.image) assistImg.src=cms.banner.image;
    const eye=assistSec.querySelector('.assistance-copy .eyebrow');
    if(eye&&cms.banner.eyebrow) eye.textContent=cms.banner.eyebrow;
    const h2=assistSec.querySelector('.assistance-copy h2');
    if(h2&&cms.banner.title) h2.textContent=cms.banner.title;
    const p=assistSec.querySelector('.assistance-copy p');
    if(p&&cms.banner.desc) p.textContent=cms.banner.desc;
    const actions=assistSec.querySelector('.hero-actions');
    if(actions){
      const bGold=actions.querySelector('.btn-gold');
      if(bGold){
        if(cms.banner.ctaWhatsappText) bGold.textContent=cms.banner.ctaWhatsappText;
        if(cms.banner.ctaWhatsappNumber){
          const num=cms.banner.ctaWhatsappNumber.replace(/[^0-9]/g,'');
          bGold.setAttribute('href',`https://wa.me/${num}`);
        }
      }
      const bGhost=actions.querySelector('.btn-ghost');
      if(bGhost){
        if(cms.banner.ctaCallText) bGhost.textContent=cms.banner.ctaCallText;
        if(cms.banner.ctaCallNumber){
          bGhost.setAttribute('href',`tel:${cms.banner.ctaCallNumber.replace(/\s+/g,'')}`);
        }
      }
    }
  }

  // 5. Why Choose Us
  const whySec=$('#why-us');
  if(whySec&&cms.whyUs){
    const eye=whySec.querySelector('.section-heading .eyebrow');
    if(eye&&cms.whyUs.eyebrow) eye.textContent=cms.whyUs.eyebrow;
    const h2=whySec.querySelector('.section-heading h2');
    if(h2&&cms.whyUs.title) h2.textContent=cms.whyUs.title;
    const whyGrid=whySec.querySelector('.why-grid');
    if(whyGrid&&Array.isArray(cms.whyUs.items)&&cms.whyUs.items.length){
      whyGrid.innerHTML=cms.whyUs.items.map(item=>`
        <article>
          <span>${esc(item.num)}</span>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.desc)}</p>
        </article>
      `).join('');
    }
  }

  // 6. Latest Experiences
  const latestSec=$('.latest');
  if(latestSec&&cms.latest){
    const eye=latestSec.querySelector('.section-heading .eyebrow');
    if(eye&&cms.latest.eyebrow) eye.textContent=cms.latest.eyebrow;
    const h2=latestSec.querySelector('.section-heading h2');
    if(h2&&cms.latest.title) h2.textContent=cms.latest.title;
    const latestGrid=latestSec.querySelector('.latest-grid');
    if(latestGrid&&Array.isArray(cms.latest.cards)&&cms.latest.cards.length){
      latestGrid.innerHTML=cms.latest.cards.map(c=>`
        <article>
          <a href="${esc(c.link)}"><img src="${esc(c.image||'hero.jpg')}" alt="${esc(c.title)}" loading="lazy" decoding="async" width="600" height="400"></a>
          <div>
            <span>${esc(c.tag||'EXPERIENCE')}</span>
            <h3><a href="${esc(c.link)}">${esc(c.title)}</a></h3>
            <p>${esc(c.desc)}</p>
            <a href="${esc(c.link)}" class="text-btn">${esc(c.btnText||'Explore tour →')}</a>
          </div>
        </article>
      `).join('');
    }
  }

  // 7. Contact CTA
  const contactSec=$('#contact');
  if(contactSec&&cms.contact){
    const eye=contactSec.querySelector('.eyebrow');
    if(eye&&cms.contact.eyebrow) eye.textContent=cms.contact.eyebrow;
    const h2=contactSec.querySelector('h2');
    if(h2&&cms.contact.title) h2.textContent=cms.contact.title;
    const p=contactSec.querySelector('p');
    if(p&&cms.contact.subtitle) p.textContent=cms.contact.subtitle;
    const btn=contactSec.querySelector('button');
    if(btn&&cms.contact.btnText) btn.textContent=cms.contact.btnText;
    const phone=contactSec.querySelector('a[href^="tel:"]');
    if(phone){
      if(cms.contact.phoneDisplay) phone.textContent=cms.contact.phoneDisplay;
      if(cms.contact.phoneTel) phone.setAttribute('href',`tel:${cms.contact.phoneTel.replace(/\s+/g,'')}`);
    }
  }

  // 8. Footer
  const footerEl=$('footer');
  if(footerEl&&cms.footer){
    const brandCopy=footerEl.querySelector('.brand-copy');
    if(brandCopy){
      const strong=brandCopy.querySelector('strong');
      if(strong&&cms.footer.brandName) strong.textContent=cms.footer.brandName;
      const small=brandCopy.querySelector('small');
      if(small&&cms.footer.brandTagline) small.textContent=cms.footer.brandTagline;
    }
    const paras=footerEl.querySelectorAll('p');
    if(paras.length>=1&&cms.footer.location) paras[0].textContent=cms.footer.location;
    const nav=footerEl.querySelector('nav');
    if(nav&&Array.isArray(cms.footer.links)&&cms.footer.links.length){
      nav.innerHTML=cms.footer.links.map(l=>`<a href="${esc(l.url)}">${esc(l.title)}</a>`).join(' · ');
    }
    if(paras.length>=2&&cms.footer.phoneDisplay){
      paras[1].innerHTML=`WhatsApp: <a href="${esc(cms.footer.phoneUrl||'https://wa.me/971561505270')}">${esc(cms.footer.phoneDisplay)}</a>`;
    }
    if(paras.length>=3&&cms.footer.copyrightName){
      paras[2].innerHTML=`© <span id="year">${new Date().getFullYear()}</span> ${esc(cms.footer.copyrightName)}`;
    }
  }
}

applyHomepageCMS();
window.addEventListener('phoenix:cms-updated',applyHomepageCMS);
window.addEventListener('storage',e=>{
  if(e.key==='phoenixHomepageCMS'||e.key==='phoenixCategoryImages') applyHomepageCMS();
});

// Mobile Navigation Toggle
(() => {
  function setupNav() {
    const menuBtn = document.getElementById('menuBtn') || document.querySelector('.menu-btn');
    const nav = document.getElementById('mainNav') || document.querySelector('.site-header nav');
    if (!menuBtn || !nav) return;

    if (!menuBtn.dataset.bound) {
      menuBtn.dataset.bound = 'true';
      menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = nav.classList.toggle('open');
        document.body.classList.toggle('menu-open', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
      });

      // Close mobile menu when clicking anywhere outside
      document.addEventListener('click', (e) => {
        if (nav.classList.contains('open') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
          nav.classList.remove('open');
          document.body.classList.remove('menu-open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.innerHTML = '&#9776;';
        }
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
          nav.classList.remove('open');
          document.body.classList.remove('menu-open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.innerHTML = '&#9776;';
        }
      });
    }

    nav.querySelectorAll('a').forEach(a => {
      if (!a.dataset.bound) {
        a.dataset.bound = 'true';
        a.addEventListener('click', () => {
          nav.classList.remove('open');
          document.body.classList.remove('menu-open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.innerHTML = '&#9776;';
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNav);
  } else {
    setupNav();
  }
})();

const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

function filterCards(type = 'all', query = '') {
  const cards = $$('.tour-card');
  cards.forEach(card => {
    const cat = card.dataset.category || '', search = (card.dataset.search || '').toLowerCase();
    card.hidden = !((type === 'all' || cat.includes(type)) && (!query || search.includes(query)));
  });
}
$$('[data-card-filter]').forEach(btn => btn.addEventListener('click', () => {
  $$('[data-card-filter]').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  const searchInput = $('#tourSearch');
  filterCards(btn.dataset.cardFilter, searchInput ? searchInput.value.trim().toLowerCase() : '');
}));
$$('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
  const type = btn.dataset.filter;
  const match = $(`[data-card-filter="${type}"]`);
  if (match) match.click();
  $('#tours')?.scrollIntoView({ behavior: 'smooth' });
}));
$('#tourSearch')?.addEventListener('input', e => filterCards($('[data-card-filter].active')?.dataset.cardFilter || 'all', e.target.value.trim().toLowerCase()));

let step = 1;

function getModalEls() {
  return {
    modal: document.getElementById('bookingModal') || $('#bookingModal'),
    form: document.getElementById('bookingForm') || $('#bookingForm'),
    tourSelect: document.getElementById('bookingTour') || $('#bookingTour'),
    packageSelect: document.getElementById('bookingPackage') || $('#bookingPackage'),
    qty: document.getElementById('bookingQty') || $('#bookingQty'),
    qtyLabel: document.getElementById('qtyLabel') || $('#qtyLabel'),
    price: document.getElementById('bookingPrice') || $('#bookingPrice'),
    pricingNote: document.getElementById('pricingNote') || $('#pricingNote'),
    pickupField: document.getElementById('pickupField') || $('#pickupField'),
    pickup: document.getElementById('bookingPickup') || $('#bookingPickup'),
    meetingPointNote: document.getElementById('meetingPointNote') || $('#meetingPointNote')
  };
}

function refreshToursFromStorage() {
  TOUR_LIST = loadTours();
  TOURS = toursById();
  renderTourCards();
  populateTours();
}
window.addEventListener('storage', e => { if (e.key === 'phoenixAdminTours') refreshToursFromStorage(); });

function populateTours() {
  const { tourSelect } = getModalEls();
  if (!tourSelect) return;
  const entries = Object.entries(TOURS);
  if (!entries.length) return;
  const currentVal = tourSelect.value;
  tourSelect.innerHTML = entries.map(([id, t]) => `<option value="${esc(id)}">${esc(t.name)}</option>`).join('');
  if (currentVal && TOURS[currentVal]) {
    tourSelect.value = currentVal;
  }
  populatePackages();
}

function currentPackage() {
  const { tourSelect, packageSelect } = getModalEls();
  if (!tourSelect) return null;
  const t = TOURS[tourSelect.value];
  if (!t) return null;
  return (t.packages || []).find(p => p.id === packageSelect?.value) || (t.packages || [])[0];
}

function populatePackages() {
  const { tourSelect, packageSelect } = getModalEls();
  if (!tourSelect || !packageSelect) return;
  const t = TOURS[tourSelect.value];
  if (!t) return;
  const currentPkgVal = packageSelect.value;
  packageSelect.innerHTML = (t.packages || []).map(p => `<option value="${esc(p.id)}">${esc(p.name)} · AED ${Number(p.price || 0).toLocaleString()}</option>`).join('');
  if (currentPkgVal && (t.packages || []).some(p => p.id === currentPkgVal)) {
    packageSelect.value = currentPkgVal;
  }
  updateBookingUI();
}

function isRideExperience(tourId) {
  const t = TOURS[tourId];
  if (!t) return false;
  const cat = (t.category || '').toLowerCase();
  const id = (t.id || '').toLowerCase();
  const name = (t.name || '').toLowerCase();
  return cat === 'quad' || cat === 'buggy' || id.includes('quad') || id.includes('buggy') || id.includes('canam') || name.includes('quad') || name.includes('buggy');
}

function updateBookingUI() {
  const { tourSelect, qtyLabel, price, pricingNote, pickupField, meetingPointNote, qty } = getModalEls();
  if (!tourSelect || !price) return;
  const t = TOURS[tourSelect.value], p = currentPackage();
  if (!t || !p) return;
  const unit = p.unit;
  if (qtyLabel && qtyLabel.firstChild) {
    qtyLabel.firstChild.textContent = unit === 'person' ? 'Guests' : unit === 'bike' ? 'Number of bikes' : unit === 'buggy' ? 'Number of buggies' : 'Vehicles';
  }
  if (unit === 'vehicle' && qty) qty.value = 1;
  const total = Number(p.price || 0) * Math.max(1, Number(qty?.value) || 1);
  price.textContent = `AED ${total.toLocaleString()}`;
  if (pricingNote) {
    pricingNote.innerHTML = `${esc(p.name)} · AED ${Number(p.price || 0).toLocaleString()} ${unitText(p.unit)}<br><span style="color:#0f766e;font-weight:700;">Collection Amount from Guest: AED ${total.toLocaleString()} (Pay on arrival)</span>`;
  }
  if (pickupField) pickupField.style.display = t.meetingPoint ? 'none' : '';
  if (meetingPointNote) meetingPointNote.textContent = t.meetingPoint ? 'This experience is direct to the meeting point. Phoenix Tours will confirm the exact GPS pin and arrival instructions on WhatsApp.' : 'Pickup details will be confirmed according to your selected package.';

  // Show 6:00 AM to 17:00 time buttons for quad bike and buggy booking only
  const isRide = isRideExperience(tourSelect.value);
  const rideWrap = $('#rideTimeWrapper') || document.getElementById('rideTimeWrapper');
  const genWrap = $('#generalTimeWrapper') || document.getElementById('generalTimeWrapper');
  if (rideWrap && genWrap) {
    rideWrap.classList.toggle('hidden', !isRide);
    genWrap.classList.toggle('hidden', isRide);
  }
}

function setStep(n) {
  step = Math.max(1, Math.min(4, n));
  $$('.form-step').forEach(x => x.classList.toggle('active', Number(x.dataset.step) === step));
  $$('.progress span').forEach((x, i) => x.classList.toggle('active', i < step));
  const prev = $('#prevStep') || document.getElementById('prevStep');
  const next = $('#nextStep') || document.getElementById('nextStep');
  const submit = $('#submitBooking') || document.getElementById('submitBooking');
  if (prev) prev.style.visibility = step === 1 ? 'hidden' : 'visible';
  if (next) next.classList.toggle('hidden', step === 4);
  if (submit) submit.classList.toggle('hidden', step !== 4);
  if (step === 4) renderReview();
}

function resolveTourAndPackage(tourId, packageId) {
  if (!tourId) return { tourId: Object.keys(TOURS)[0], packageId: packageId || null };
  const raw = String(tourId).toLowerCase().trim();
  if (TOURS[raw]) return { tourId: raw, packageId: packageId || null };

  let resolvedTour = null;
  let resolvedPkg = packageId || null;

  if (raw.includes('sharing') && (raw.includes('safari') || raw.includes('evening'))) {
    resolvedTour = 'evening'; resolvedPkg = 'sharing';
  } else if (raw.includes('private') && raw.includes('morning')) {
    resolvedTour = 'morning'; resolvedPkg = 'private';
  } else if (raw.includes('private') && (raw.includes('safari') || raw.includes('evening'))) {
    resolvedTour = 'evening'; resolvedPkg = 'private';
  } else if (raw.includes('premium') || raw.includes('vip')) {
    resolvedTour = 'premium';
  } else if (raw.includes('morning')) {
    resolvedTour = 'morning';
  } else if (raw.includes('safari') || raw.includes('desert') || raw === 'evening') {
    resolvedTour = 'evening';
  } else if (raw.includes('canam4') || raw.includes('buggy4') || raw.includes('4-seater')) {
    resolvedTour = 'canam4';
    if (raw.includes('60')) resolvedPkg = 'buggy4-60';
    else if (raw.includes('30')) resolvedPkg = 'buggy4-30';
  } else if (raw.includes('canam') || raw.includes('buggy') || raw.includes('2-seater')) {
    resolvedTour = 'canam2';
    if (raw.includes('60')) resolvedPkg = 'buggy2-60';
    else if (raw.includes('30')) resolvedPkg = 'buggy2-30';
  } else if (raw.includes('quad') || raw.includes('bike')) {
    resolvedTour = 'quad';
    if (raw.includes('60')) resolvedPkg = 'quad60';
    else if (raw.includes('30')) resolvedPkg = 'quad30';
  } else if (raw.includes('lake') || raw.includes('burj') || raw.includes('abra')) {
    resolvedTour = 'burj-lake';
    if (raw.includes('fountain')) resolvedPkg = 'abra-fountain';
    else if (raw.includes('private')) resolvedPkg = 'abra-private';
    else if (!resolvedPkg) resolvedPkg = 'abra-sharing';
  } else if (raw.includes('abudhabi') || raw.includes('abu-dhabi')) {
    resolvedTour = 'abu-dhabi';
    if (raw.includes('private')) resolvedPkg = 'ad-private';
    else if (!resolvedPkg) resolvedPkg = 'ad-sharing';
  } else if (raw.includes('city') || raw.includes('dubai')) {
    resolvedTour = 'dubai-city';
    if (raw.includes('private')) resolvedPkg = 'city-half-private';
    else if (raw.includes('full')) resolvedPkg = 'city-full-private';
    else if (!resolvedPkg) resolvedPkg = 'city-half-sharing';
  }

  return { tourId: resolvedTour || Object.keys(TOURS)[0], packageId: resolvedPkg };
}

function openBooking(tourId, packageId) {
  const { modal, tourSelect, packageSelect } = getModalEls();
  if (!modal) {
    console.warn('Booking modal element not found in DOM.');
    return;
  }
  refreshToursFromStorage();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (tourSelect && (!tourSelect.options || tourSelect.options.length === 0)) {
    populateTours();
  }

  const resolved = resolveTourAndPackage(tourId, packageId);
  if (resolved.tourId && TOURS[resolved.tourId] && tourSelect) {
    tourSelect.value = resolved.tourId;
  }
  populatePackages();
  if (resolved.packageId && packageSelect) {
    const exists = [...packageSelect.options].some(o => o.value === resolved.packageId);
    if (exists) {
      packageSelect.value = resolved.packageId;
      updateBookingUI();
    }
  }
  setStep(1);
  setTimeout(() => tourSelect?.focus(), 80);
}
window.openBooking = openBooking;

// Automatically open booking modal if query parameter ?openBooking=true or ?tour=... is present
try {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('openBooking') === 'true' || urlParams.get('tour') || urlParams.get('ride')) {
    const tParam = urlParams.get('tour') || urlParams.get('ride');
    const pParam = urlParams.get('package');
    setTimeout(() => openBooking(tParam, pParam), 150);
  }
} catch (e) {}

function closeBooking() {
  const { modal } = getModalEls();
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
window.closeBooking = closeBooking;

function initModalEvents() {
  const { modal, form, tourSelect, packageSelect, qty } = getModalEls();
  if (tourSelect && !tourSelect.dataset.bound) {
    tourSelect.dataset.bound = 'true';
    populateTours();
    tourSelect.addEventListener('change', populatePackages);
    packageSelect?.addEventListener('change', updateBookingUI);
    qty?.addEventListener('input', updateBookingUI);
  }

  if (form && !form.dataset.bound) {
    form.dataset.bound = 'true';
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        // Validate required fields across all steps before final dispatch
        if (!validCurrentStep()) {
          console.warn('[Phoenix Booking Form] Validation failed on current step:', step);
          return;
        }

        // Global check on critical contact & reservation info
        const contactCheck = validateAllBookingFields();
        if (!contactCheck.valid) {
          console.warn('[Phoenix Booking Form] Required reservation details missing:', contactCheck.field);
          if (contactCheck.targetStep) {
            setStep(contactCheck.targetStep);
          }
          if (contactCheck.element) {
            contactCheck.element.focus();
            if (typeof contactCheck.element.reportValidity === 'function') {
              contactCheck.element.reportValidity();
            }
          }
          return;
        }

        const b = getBooking();
        console.info('[Phoenix Booking Form] Processing booking submission:', {
          id: b.id,
          tour: b.tour,
          package: b.package,
          quantity: b.quantity,
          total: b.total,
          customer: b.name,
          phone: b.phone
        });

        // 1. Local persistence backup
        try {
          const saved = JSON.parse(localStorage.getItem('phoenixBookings') || '[]');
          saved.unshift(b);
          localStorage.setItem('phoenixBookings', JSON.stringify(saved.slice(0, 200)));
          console.info('[Phoenix Booking Storage] Booking successfully saved to local client cache.');
        } catch (storageErr) {
          console.warn('[Phoenix Booking Storage] Could not persist to localStorage:', storageErr.message || storageErr);
        }

        // 2. Server backend API sync with error logging
        try {
          console.info('[Phoenix Booking API] Dispatching booking payload to /api/book endpoint...');
          const apiResponse = await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(b)
          });

          if (!apiResponse.ok) {
            console.warn(`[Phoenix Booking API] Server responded with HTTP status ${apiResponse.status} (${apiResponse.statusText})`);
          } else {
            const resData = await apiResponse.json().catch(() => null);
            console.info('[Phoenix Booking API] Server confirmation received:', resData);
            if (resData && resData.emailSent) {
              console.info('[Phoenix Booking Email] Booking notification email sent to:', resData.emailRecipient);
            }
          }
        } catch (apiErr) {
          console.warn('[Phoenix Booking API] Background server sync warning (proceeding with WhatsApp booking):', apiErr.message || apiErr);
        }

        // 3. WhatsApp dispatch message construction
        const msg = `Hello Phoenix Tours! I would like to request a booking.%0A%0A` +
          `Booking ID: ${encodeURIComponent(b.id)}%0A` +
          `Experience: ${encodeURIComponent(b.tour)}%0A` +
          `Package: ${encodeURIComponent(b.package)}%0A` +
          `${encodeURIComponent(b.unit === 'person' ? 'Guests' : b.unit === 'bike' ? 'Bikes' : b.unit === 'buggy' ? 'Buggies' : 'Vehicles')}: ${b.quantity}%0A` +
          `Date: ${encodeURIComponent(b.date)}%0A` +
          `Time: ${encodeURIComponent(b.time)}%0A` +
          `Location: ${encodeURIComponent(b.pickup)}%0A` +
          `Total Pricing: AED ${b.total.toLocaleString()}%0A` +
          `💰 Collection Amount from Guest: AED ${b.total.toLocaleString()} (Pay on arrival)%0A%0A` +
          `Customer: ${encodeURIComponent(b.name)}%0A` +
          `Phone: ${encodeURIComponent(b.phone)}%0A` +
          `Email: ${encodeURIComponent(b.email || 'Not provided')}%0A` +
          `Notes: ${encodeURIComponent(b.notes || 'None')}%0A%0A` +
          `Please confirm availability, inclusions and direct coordinates.`;

        const waUrl = `https://wa.me/971561505270?text=${msg}`;
        console.info('[Phoenix Booking Dispatch] Opening WhatsApp booking channel:', waUrl);

        const waWin = window.open(waUrl, '_blank', 'noopener');
        if (!waWin || waWin.closed || typeof waWin.closed === 'undefined') {
          console.info('[Phoenix Booking Dispatch] Popup window prevented or blocked; redirecting location directly.');
          window.location.href = waUrl;
        }

        closeBooking();
        form.reset();
        const currentQty = document.getElementById('bookingQty') || $('#bookingQty');
        if (currentQty) currentQty.value = 1;
        setStep(1);
        populatePackages();
      } catch (submitErr) {
        console.error('[Phoenix Booking Form Error] Unexpected exception during booking submission:', submitErr);
        alert('We received your booking request! If WhatsApp does not open automatically, please contact us at +971 56 150 5270.');
      }
    });
  }
}

function validateAllBookingFields() {
  const form = document.getElementById('bookingForm') || $('#bookingForm');
  if (!form) return { valid: true };

  const nameInput = document.getElementById('bookingName') || form.querySelector('[name="name"], #bookingName');
  const phoneInput = document.getElementById('bookingPhone') || form.querySelector('[name="phone"], #bookingPhone');
  const dateInput = document.getElementById('bookingDate') || form.querySelector('[name="date"], #bookingDate');

  if (dateInput && !dateInput.value) {
    return { valid: false, field: 'date', targetStep: 1, element: dateInput };
  }
  if (nameInput && !nameInput.value.trim()) {
    return { valid: false, field: 'name', targetStep: 3, element: nameInput };
  }
  if (phoneInput && !phoneInput.value.trim()) {
    return { valid: false, field: 'phone', targetStep: 3, element: phoneInput };
  }

  return { valid: true };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModalEvents);
} else {
  initModalEvents();
}

document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-open-booking], [data-book-tour], .btn-package-book, [data-open-modal], .desktop-book');
  if (trigger) {
    e.preventDefault();
    const tourId = trigger.dataset.bookTour || trigger.getAttribute('data-book-tour') || trigger.dataset.tour || '';
    const packageId = trigger.dataset.bookPackage || trigger.getAttribute('data-book-package') || trigger.dataset.package || '';
    openBooking(tourId, packageId);
    return;
  }

  const close = e.target.closest('[data-close-booking]');
  if (close) {
    e.preventDefault();
    closeBooking();
    return;
  }

  // Ride time slot selection (6:00 AM to 17:00)
  const slotBtn = e.target.closest('.ride-time-btn[data-modal-slot]');
  if (slotBtn) {
    $$('.ride-time-btn[data-modal-slot]').forEach(b => b.classList.remove('active'));
    slotBtn.classList.add('active');
    const slotInput = $('#modalSelectedRideSlot') || document.getElementById('modalSelectedRideSlot');
    if (slotInput) slotInput.value = slotBtn.dataset.modalSlot;
  }
});

const date = $('#bookingDate') || document.getElementById('bookingDate');
if (date) {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    date.min = ['year', 'month', 'day'].map(k => parts.find(p => p.type === k).value).join('-');
    if (!date.value) {
      date.value = date.min;
    }
  } catch (dErr) {
    console.warn('[Phoenix Date Setup] Error initializing minimum date:', dErr);
  }
}

function validCurrentStep() {
  const active = $(`.form-step[data-step="${step}"]`);
  if (!active) return true;
  const fields = [...active.querySelectorAll('input[required],select[required]')];
  for (const f of fields) {
    if (!f.reportValidity()) {
      console.warn('[Phoenix Validation] Field failed validation on step ' + step + ':', f.name || f.id);
      return false;
    }
  }
  return true;
}
$('#nextStep')?.addEventListener('click', () => { if (validCurrentStep()) setStep(step + 1); });
$('#prevStep')?.addEventListener('click', () => setStep(step - 1));

function getBooking() {
  const { tourSelect, packageSelect, qty, pickup } = getModalEls();
  const selectedTourKey = tourSelect?.value || Object.keys(TOURS)[0] || 'evening';
  const t = TOURS[selectedTourKey] || { name: 'Dubai Desert Tour & Safari', meetingPoint: false, packages: [] };
  
  // Safe package retrieval with multi-level fallback
  let p = currentPackage();
  if (!p) {
    const pkgId = packageSelect?.value;
    if (pkgId && t.packages) {
      p = t.packages.find(item => item.id === pkgId);
    }
  }
  if (!p && t.packages && t.packages.length > 0) {
    p = t.packages[0];
  }
  if (!p) {
    p = { name: 'Standard Experience', unit: 'person', price: 150 };
  }

  const rawQty = qty?.value || document.getElementById('bookingQty')?.value;
  const q = Math.max(1, parseInt(rawQty, 10) || 1);
  const isRide = isRideExperience(selectedTourKey);
  
  // Safe time resolution
  let timeVal = 'Flexible';
  if (isRide) {
    const activeSlotBtn = document.querySelector('.ride-time-btn.active[data-modal-slot]');
    const slotInput = document.getElementById('modalSelectedRideSlot') || $('#modalSelectedRideSlot');
    timeVal = activeSlotBtn?.dataset?.modalSlot || slotInput?.value || '09:00 AM';
  } else {
    const genTimeInput = document.getElementById('bookingTime') || $('#bookingTime');
    timeVal = genTimeInput?.value || 'Flexible';
  }

  const packagePrice = Number(p.price || 0);
  const totalVal = packagePrice * q;

  // Safe date resolution
  const dateEl = document.getElementById('bookingDate') || $('#bookingDate');
  let dateVal = dateEl?.value || '';
  if (!dateVal) {
    try {
      const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
      dateVal = ['year', 'month', 'day'].map(k => parts.find(item => item.type === k).value).join('-');
    } catch (_) {
      dateVal = new Date().toISOString().split('T')[0];
    }
  }

  // Safe customer contact input resolution
  const nameEl = document.getElementById('bookingName') || document.querySelector('[name="name"]');
  const phoneEl = document.getElementById('bookingPhone') || document.querySelector('[name="phone"]');
  const emailEl = document.getElementById('bookingEmail') || document.querySelector('[name="email"]');
  const notesEl = document.getElementById('bookingNotes') || document.querySelector('[name="notes"]');
  const pickupEl = pickup || document.getElementById('bookingPickup') || document.querySelector('[name="pickup"]');

  const customerName = nameEl?.value?.trim() || 'Guest';
  const customerPhone = phoneEl?.value?.trim() || '';
  const customerEmail = emailEl?.value?.trim() || '';
  const customerNotes = notesEl?.value?.trim() || '';
  const pickupLocation = t.meetingPoint ? 'Direct meeting point (GPS pin provided)' : (pickupEl?.value?.trim() || 'Hotel / Residence pickup');

  return {
    id: `PX-${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
    tourId: selectedTourKey,
    tour: t.name,
    package: p.name,
    unit: p.unit || 'person',
    quantity: q,
    packagePrice: packagePrice,
    total: totalVal,
    collectionAmount: totalVal,
    date: dateVal,
    time: timeVal,
    pickup: pickupLocation,
    name: customerName,
    phone: customerPhone,
    email: customerEmail,
    notes: customerNotes,
    status: 'New'
  };
}

function renderReview() {
  const b = getBooking();
  const rev = $('#bookingReview') || document.getElementById('bookingReview');
  if (!rev) return;
  rev.innerHTML = `
    <div class="sands-collection-card" style="margin-bottom:14px;">
      <span class="sands-collection-badge">PAY ON ARRIVAL</span>
      <div class="sands-collection-header" style="margin-top:6px;">
        <span style="font-size:14px;color:#063c49;">Collection Amount from Guest:</span>
        <strong style="font-size:22px;color:#0f766e;">AED ${b.total.toLocaleString()}</strong>
      </div>
      <p class="sands-collection-hint" style="margin-top:6px;">
        <strong>Pay on arrival:</strong> Collect this amount from the guest upon arrival at the base camp or pickup. Cash and card accepted.
      </p>
    </div>
    <dl>
      <div><dt>Experience</dt><dd>${esc(b.tour)}</dd></div>
      <div><dt>Package</dt><dd>${esc(b.package)}</dd></div>
      <div><dt>Date & Time Slot</dt><dd>${esc(b.date || '—')} · ${esc(b.time)}</dd></div>
      <div><dt>${b.unit === 'person' ? 'Guests' : b.unit === 'bike' ? 'Bikes' : b.unit === 'buggy' ? 'Buggies' : 'Vehicles'}</dt><dd>${b.quantity}</dd></div>
      <div><dt>Meeting / Pickup</dt><dd>${esc(b.pickup)}</dd></div>
      <div><dt>Total Pricing</dt><dd>AED ${b.total.toLocaleString()}</dd></div>
      <div style="font-weight:700;"><dt style="color:#0f766e;">Collection Amount from Guest</dt><dd style="color:#0f766e;font-weight:800;">AED ${b.total.toLocaleString()} (Pay on arrival)</dd></div>
      <div><dt>Customer</dt><dd>${esc(b.name || '—')}</dd></div>
      <div><dt>Phone / WhatsApp</dt><dd>${esc(b.phone || '—')}</dd></div>
    </dl>`;
}

window.addEventListener('keydown', e => {
  const { modal } = getModalEls();
  if (e.key === 'Escape' && modal?.classList.contains('open')) closeBooking();
});

// Auto-open booking modal if parameters passed in URL
try{
  const params=new URLSearchParams(window.location.search);
  const tParam=params.get('tour')||params.get('book');
  const pParam=params.get('pkg')||params.get('package');
  if(tParam&&modal){
    setTimeout(()=>openBooking(tParam,pParam),200);
  }
}catch{}
