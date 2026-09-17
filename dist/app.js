const DEFAULT_TOURS=(window.PHOENIX_DEFAULT_TOURS||[
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
            return {...t,name:def.name,packages:def.packages,badge:def.badge,duration:def.duration,meetingPoint:true,image:t.image||def.image};
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

function renderTourCards(){
  const grid=$('#tourGrid');
  if(!grid)return;
  grid.innerHTML=activeTours().map(t=>`
    <article class="tour-card" data-category="${esc(t.category||t.type||'other').toLowerCase()}" data-search="${esc(`${t.name} ${t.type||''} ${t.description||''}`.toLowerCase())}">
      <div class="tour-media">
        <img src="${esc(t.image||'hero.jpg')}" alt="${esc(t.name)}" loading="lazy">
        <span class="badge${String(t.badge||'').toLowerCase().includes('premium')||String(t.badge||'').toLowerCase().includes('can-am')?' gold-badge':''}">${esc(t.badge||t.type||'TOUR')}</span>
        <span class="duration">${esc(t.duration||'Dubai')}</span>
      </div>
      <div class="tour-body">
        <div class="tour-rating">★★★★★ <span>${esc(t.type||'Phoenix Tours')}</span></div>
        <h3>${esc(t.name)}</h3>
        <p>${esc(t.description||'Book this Dubai experience with Phoenix Tours.')}</p>
        ${(t.packages||[]).map(p=>`
          <div class="feature-line${(t.packages||[]).length===1?' single':''}" style="cursor:pointer" data-book-tour="${esc(t.id)}" data-book-package="${esc(p.id)}" title="Click to book ${esc(p.name)}">
            <span>${esc(p.name)}</span>
            <strong>AED ${Number(p.price||0).toLocaleString()}</strong>
            <small>${unitText(p.unit)}</small>
          </div>
        `).join('')}
        <button class="book-card" data-book-tour="${esc(t.id)}">Book this experience <span>→</span></button>
      </div>
    </article>
  `).join('')||'<p>No tours are currently available.</p>';
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
        const imgUrl=legacyImages[c.id]||c.image||'hero.jpg';
        return `<a class="category-card" href="${esc(c.link)}"><img src="${esc(imgUrl)}" alt="${esc(c.title)}" loading="lazy"><span>${esc(c.title)}</span></a>`;
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
          <a href="${esc(c.link)}"><img src="${esc(c.image||'hero.jpg')}" alt="${esc(c.title)}" loading="lazy"></a>
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

const menuBtn=$('#menuBtn'),nav=$('#mainNav');
menuBtn?.addEventListener('click',()=>{
  nav?.classList.toggle('open');
  menuBtn?.setAttribute('aria-expanded',String(nav?.classList.contains('open')));
});
$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
const yearEl=$('#year');
if(yearEl) yearEl.textContent=new Date().getFullYear();

function filterCards(type='all',query=''){
  const cards=$$('.tour-card');
  cards.forEach(card=>{
    const cat=card.dataset.category||'',search=(card.dataset.search||'').toLowerCase();
    card.hidden=!((type==='all'||cat.includes(type))&&(!query||search.includes(query)));
  });
}
$$('[data-card-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  $$('[data-card-filter]').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  const searchInput=$('#tourSearch');
  filterCards(btn.dataset.cardFilter,searchInput?searchInput.value.trim().toLowerCase():'');
}));
$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  const type=btn.dataset.filter;
  const match=$(`[data-card-filter="${type}"]`);
  if(match)match.click();
  $('#tours')?.scrollIntoView({behavior:'smooth'});
}));
$('#tourSearch')?.addEventListener('input',e=>filterCards($('[data-card-filter].active')?.dataset.cardFilter||'all',e.target.value.trim().toLowerCase()));

const modal=$('#bookingModal'),form=$('#bookingForm'),tourSelect=$('#bookingTour'),packageSelect=$('#bookingPackage'),qty=$('#bookingQty'),qtyLabel=$('#qtyLabel'),price=$('#bookingPrice'),pricingNote=$('#pricingNote'),pickupField=$('#pickupField'),pickup=$('#bookingPickup'),meetingPointNote=$('#meetingPointNote');
let step=1;

function refreshToursFromStorage(){
  TOUR_LIST=loadTours();
  TOURS=toursById();
  renderTourCards();
  if(tourSelect) populateTours();
}
window.addEventListener('storage',e=>{if(e.key==='phoenixAdminTours')refreshToursFromStorage()});

function populateTours(){
  if(!tourSelect) return;
  const entries=Object.entries(TOURS);
  tourSelect.innerHTML=entries.map(([id,t])=>`<option value="${esc(id)}">${esc(t.name)}</option>`).join('');
  if(entries.length)populatePackages();
}

function currentPackage(){
  if(!tourSelect) return null;
  const t=TOURS[tourSelect.value];
  if(!t)return null;
  return (t.packages||[]).find(p=>p.id===packageSelect?.value)||(t.packages||[])[0];
}

function populatePackages(){
  if(!tourSelect||!packageSelect) return;
  const t=TOURS[tourSelect.value];
  if(!t)return;
  packageSelect.innerHTML=(t.packages||[]).map(p=>`<option value="${esc(p.id)}">${esc(p.name)} · AED ${Number(p.price||0).toLocaleString()}</option>`).join('');
  updateBookingUI();
}

function updateBookingUI(){
  if(!tourSelect||!qtyLabel||!price||!pricingNote) return;
  const t=TOURS[tourSelect.value],p=currentPackage();
  if(!t||!p)return;
  const unit=p.unit;
  if(qtyLabel.firstChild) {
    qtyLabel.firstChild.textContent=unit==='person'?'Guests':unit==='bike'?'Number of bikes':unit==='buggy'?'Number of buggies':'Vehicles';
  }
  if(unit==='vehicle'&&qty) qty.value=1;
  const total=Number(p.price||0)*Math.max(1,Number(qty?.value)||1);
  price.textContent=`AED ${total.toLocaleString()}`;
  pricingNote.textContent=`${p.name} · ${unitText(p.unit)}`;
  if(pickupField) pickupField.style.display=t.meetingPoint?'none':'';
  if(meetingPointNote) meetingPointNote.textContent=t.meetingPoint?'This experience is direct to the meeting point. Phoenix Tours will confirm the exact GPS pin and arrival instructions on WhatsApp.':'Pickup details will be confirmed according to your selected package.';
}

function setStep(n){
  step=Math.max(1,Math.min(4,n));
  $$('.form-step').forEach(x=>x.classList.toggle('active',Number(x.dataset.step)===step));
  $$('.progress span').forEach((x,i)=>x.classList.toggle('active',i<step));
  const prev=$('#prevStep'),next=$('#nextStep'),submit=$('#submitBooking');
  if(prev) prev.style.visibility=step===1?'hidden':'visible';
  if(next) next.classList.toggle('hidden',step===4);
  if(submit) submit.classList.toggle('hidden',step!==4);
  if(step===4)renderReview();
}

function openBooking(tourId, packageId){
  if(!modal) return;
  refreshToursFromStorage();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  if(tourId&&TOURS[tourId]&&tourSelect){
    tourSelect.value=tourId;
  }
  populatePackages();
  if(packageId&&packageSelect){
    const exists=[...packageSelect.options].some(o=>o.value===packageId);
    if(exists){
      packageSelect.value=packageId;
      updateBookingUI();
    }
  }
  setStep(1);
  setTimeout(()=>tourSelect?.focus(),80);
}
window.openBooking=openBooking;

function closeBooking(){
  if(!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
window.closeBooking=closeBooking;

if(tourSelect){
  populateTours();
  tourSelect.addEventListener('change',populatePackages);
  packageSelect?.addEventListener('change',updateBookingUI);
  qty?.addEventListener('input',updateBookingUI);
}

document.addEventListener('click',e=>{
  const open=e.target.closest('[data-open-booking]');
  if(open) openBooking(open.dataset.bookTour, open.dataset.bookPackage);
  const card=e.target.closest('[data-book-tour]');
  if(card) openBooking(card.dataset.bookTour, card.dataset.bookPackage);
  const close=e.target.closest('[data-close-booking]');
  if(close) closeBooking();
});

const date=$('#bookingDate');
if(date){
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dubai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  date.min=['year','month','day'].map(k=>parts.find(p=>p.type===k).value).join('-');
}

function validCurrentStep(){
  const active=$(`.form-step[data-step="${step}"]`);
  if(!active) return true;
  const fields=[...active.querySelectorAll('input[required],select[required]')];
  for(const f of fields){if(!f.reportValidity())return false}
  return true;
}
$('#nextStep')?.addEventListener('click',()=>{if(validCurrentStep())setStep(step+1)});
$('#prevStep')?.addEventListener('click',()=>setStep(step-1));

function getBooking(){
  const t=TOURS[tourSelect.value],p=currentPackage(),q=Math.max(1,Number(qty.value)||1);
  return{
    id:`PX-${Date.now().toString().slice(-8)}`,
    createdAt:new Date().toISOString(),
    tourId:tourSelect.value,
    tour:t.name,
    package:p.name,
    unit:p.unit,
    quantity:q,
    total:Number(p.price||0)*q,
    date:date?.value||'',
    time:$('#bookingTime')?.value||'Flexible',
    pickup:t.meetingPoint?'Direct meeting point':pickup?.value.trim()||'To be confirmed',
    name:$('#bookingName')?.value.trim()||'',
    phone:$('#bookingPhone')?.value.trim()||'',
    email:$('#bookingEmail')?.value.trim()||'',
    notes:$('#bookingNotes')?.value.trim()||'',
    status:'New'
  };
}

function renderReview(){
  const b=getBooking();
  const rev=$('#bookingReview');
  if(!rev) return;
  rev.innerHTML=`<dl>
    <div><dt>Experience</dt><dd>${esc(b.tour)}</dd></div>
    <div><dt>Package</dt><dd>${esc(b.package)}</dd></div>
    <div><dt>Date</dt><dd>${esc(b.date||'—')} · ${esc(b.time)}</dd></div>
    <div><dt>${b.unit==='person'?'Guests':b.unit==='bike'?'Bikes':b.unit==='buggy'?'Buggies':'Vehicles'}</dt><dd>${b.quantity}</dd></div>
    <div><dt>Meeting / Pickup</dt><dd>${esc(b.pickup)}</dd></div>
    <div><dt>Estimated total</dt><dd>AED ${b.total.toLocaleString()}</dd></div>
    <div><dt>Customer</dt><dd>${esc(b.name||'—')}</dd></div>
    <div><dt>Phone / WhatsApp</dt><dd>${esc(b.phone||'—')}</dd></div>
  </dl>`;
}

form?.addEventListener('submit',e=>{
  e.preventDefault();
  if(!validCurrentStep())return;
  const b=getBooking(),saved=JSON.parse(localStorage.getItem('phoenixBookings')||'[]');
  saved.unshift(b);
  localStorage.setItem('phoenixBookings',JSON.stringify(saved.slice(0,200)));
  const msg=`Hello Phoenix Tours! I would like to request a booking.%0A%0ABooking ID: ${encodeURIComponent(b.id)}%0AExperience: ${encodeURIComponent(b.tour)}%0APackage: ${encodeURIComponent(b.package)}%0A${encodeURIComponent(b.unit==='person'?'Guests':b.unit==='bike'?'Bikes':b.unit==='buggy'?'Buggies':'Vehicles')}: ${b.quantity}%0ADate: ${encodeURIComponent(b.date)}%0ATime: ${encodeURIComponent(b.time)}%0ALocation: ${encodeURIComponent(b.pickup)}%0AEstimated Total: AED ${b.total}%0A%0AName: ${encodeURIComponent(b.name)}%0APhone: ${encodeURIComponent(b.phone)}%0AEmail: ${encodeURIComponent(b.email||'Not provided')}%0ANotes: ${encodeURIComponent(b.notes||'None')}%0A%0APlease confirm availability, final price, inclusions and direct meeting point details.`;
  window.open(`https://wa.me/971561505270?text=${msg}`,'_blank','noopener');
  closeBooking();
  form.reset();
  if(qty) qty.value=1;
  populatePackages();
});

window.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&modal?.classList.contains('open')) closeBooking();
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
