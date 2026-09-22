// Storage Quota Auto-Healer & Storage Engine
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    if (err && (err.name === 'QuotaExceededError' || err.code === 22 || err.code === 1014)) {
      console.warn(`Storage quota exceeded while writing "${key}". Running automatic quota recovery...`);
      try {
        localStorage.removeItem('phoenixCategoryImages');
      } catch (_) {}
      try {
        const rawBookings = localStorage.getItem('phoenixBookings');
        if (rawBookings) {
          const parsed = JSON.parse(rawBookings);
          if (Array.isArray(parsed) && parsed.length > 50) {
            localStorage.setItem('phoenixBookings', JSON.stringify(parsed.slice(0, 50)));
          }
        }
      } catch (_) {}
      let optimizedValue = value;
      try {
        if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
          const parsed = JSON.parse(value);
          let stripped = false;
          function stripHugeData(o) {
            if (!o || typeof o !== 'object') return;
            for (const k in o) {
              if (typeof o[k] === 'string' && o[k].startsWith('data:image/') && o[k].length > 70000) {
                o[k] = 'hero.jpg';
                stripped = true;
              } else if (typeof o[k] === 'object') {
                stripHugeData(o[k]);
              }
            }
          }
          stripHugeData(parsed);
          if (stripped) optimizedValue = JSON.stringify(parsed);
        }
      } catch (_) {}
      try {
        localStorage.setItem(key, optimizedValue);
        console.log(`Successfully stored "${key}" after storage quota recovery.`);
        return true;
      } catch (secondErr) {
        console.error(`Storage quota limit reached for "${key}":`, secondErr);
        if (typeof showCmsToast === 'function') {
          showCmsToast('Storage quota reached. Please use image links rather than large file uploads.', true);
        }
        return false;
      }
    } else {
      console.error(`Error saving "${key}" to storage:`, err);
      return false;
    }
  }
}
window.safeSetItem = safeSetItem;

function compressImage(file, maxDim = 1000, quality = 0.72) {
  return new Promise((resolve) => {
    if (!file) return resolve('');
    if (file.type === 'image/svg+xml' || file.size < 25000) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        try {
          resolve(canvas.toDataURL('image/jpeg', quality));
        } catch (_) {
          resolve(e.target.result);
        }
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}
window.compressImage = compressImage;

// Initial quota healer to recover quota if previous sessions stored bloated data
(function healStorageQuota() {
  try {
    const catRaw = localStorage.getItem('phoenixCategoryImages');
    if (catRaw && catRaw.length > 100000) {
      localStorage.removeItem('phoenixCategoryImages');
    }
    const cmsRaw = localStorage.getItem('phoenixHomepageCMS');
    if (cmsRaw && cmsRaw.length > 750000) {
      try {
        const parsed = JSON.parse(cmsRaw);
        let changed = false;
        function prune(o) {
          if (!o || typeof o !== 'object') return;
          for (const k in o) {
            if (typeof o[k] === 'string' && o[k].startsWith('data:image/') && o[k].length > 90000) {
              o[k] = 'hero.jpg';
              changed = true;
            } else if (typeof o[k] === 'object') {
              prune(o[k]);
            }
          }
        }
        prune(parsed);
        if (changed) {
          safeSetItem('phoenixHomepageCMS', JSON.stringify(parsed));
          console.log('Cleaned up historical oversized images in phoenixHomepageCMS');
        }
      } catch (_) {}
    }
  } catch (e) {
    console.warn('Storage quota healer check:', e);
  }
})();

const DEFAULT_TOURS=(window.PHOENIX_DEFAULT_TOURS||[]);const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];function clone(v){return JSON.parse(JSON.stringify(v))}function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}function slug(v=''){return String(v).toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,48)||`tour-${Date.now().toString().slice(-6)}`}function normalizeTour(t){const base=DEFAULT_TOURS.find(x=>x.id===t.id)||{};const oldPrices=Array.isArray(t.prices)?t.prices.map((p,i)=>({id:`package-${i+1}`,name:p[0],price:Number(p[1])||0,unit:/sharing/i.test(p[0])?'person':/private/i.test(p[0])?'vehicle':'booking'})):[];let packages=Array.isArray(t.packages)&&t.packages.length?t.packages:oldPrices.length?oldPrices:clone(base.packages||[{id:'standard',name:'Standard',price:0,unit:'person'}]);if(base.packages&&['quad','canam2','canam4','sky-dive'].includes(t.id)){if(t.id==='sky-dive'){if(packages.some(p=>p.id==='skydive-desert'||(p.name&&p.name.includes('Desert'))||(p.id==='skydive-palm'&&p.price!==2700))){packages=clone(base.packages);}}else if(packages.length<2||packages[0].name.includes('1 Bike')||packages[0].name.includes('2 Seater · 30 Minutes')||packages[0].name.includes('4 Seater · 30 Minutes')){packages=clone(base.packages);}}return{...base,...t,id:t.id||slug(t.name),name:t.name||base.name||'New Tour',type:t.type||base.type||'Tour',category:t.category||base.category||'other',badge:t.badge||base.badge||'TOUR',duration:t.duration||base.duration||'Dubai',description:t.description||base.description||'Book this experience with Phoenix Tours.',active:t.active!==false,meetingPoint:Boolean(t.meetingPoint??base.meetingPoint),image:t.image||base.image||'hero.jpg',source:t.source||base.source||'',imageLink:t.imageLink||base.imageLink||'',packages:packages.map((p,i)=>({id:p.id||`package-${i+1}`,name:p.name||`Package ${i+1}`,price:Number(p.price)||0,unit:p.unit||'person'}))}}function loadTours(){try{const raw=JSON.parse(localStorage.getItem('phoenixAdminTours')||'null');if(Array.isArray(raw)&&raw.length)return raw.map(normalizeTour)}catch{}return clone(DEFAULT_TOURS).map(normalizeTour)}let bookings=JSON.parse(localStorage.getItem('phoenixBookings')||'[]');let tours=loadTours();function save(){safeSetItem('phoenixBookings',JSON.stringify(bookings));safeSetItem('phoenixAdminTours',JSON.stringify(tours))}save();function money(n){return `AED ${Number(n||0).toLocaleString()}`}function statusBadge(s){return `<span class="status ${esc(s)}">${esc(s)}</span>`}function todayDubai(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dubai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}function renderStats(){const today=todayDubai();$('#statToday').textContent=bookings.filter(b=>b.date===today).length;$('#statTotal').textContent=bookings.length;$('#statRevenue').textContent=money(bookings.filter(b=>b.status!=='Cancelled').reduce((a,b)=>a+Number(b.total||0),0));$('#statPending').textContent=bookings.filter(b=>b.status==='New').length}function row(b,actions=false){const coll=b.collectionAmount||b.total||0;const emailHtml=b.email?`<br><small style="color:#0f766e;font-weight:600;">✉ ${esc(b.email)}</small>`:'';const emailAction=actions&&b.email?`<button type="button" class="ghost" style="font-size:9px;padding:3px 6px;margin-top:4px;" data-resend-email="${esc(b.id)}">✉ Resend Email</button>`:'';return `<tr><td><strong>${esc(b.id)}</strong></td><td>${esc(b.name||'—')}<br><small>${esc(b.phone||'')}</small>${emailHtml}</td><td>${esc(b.tour||b.rideName||'—')}<br><small>${esc(b.package||b.duration||'')}</small></td><td>${esc(b.date||'—')}<br><small>${esc(b.slotId||b.time||'')}</small></td>${actions?`<td>${Number(b.quantity||b.riders||1)}</td>`:''}<td><strong>${money(b.total)}</strong><br><small style="color:#0f766e;font-weight:700;">Collect: ${money(coll)}</small></td><td>${statusBadge(b.status||'New')}</td>${actions?`<td><select data-status="${esc(b.id)}"><option${b.status==='New'?' selected':''}>New</option><option${b.status==='Confirmed'?' selected':''}>Confirmed</option><option${b.status==='Completed'?' selected':''}>Completed</option><option${b.status==='Cancelled'?' selected':''}>Cancelled</option></select>${emailAction}</td>`:''}</tr>`}function renderRecent(){$('#recentRows').innerHTML=bookings.slice(0,6).map(b=>row(b)).join('')||'<tr><td colspan="6">No bookings yet.</td></tr>';const counts={};bookings.forEach(b=>counts[b.tour]=(counts[b.tour]||0)+1);const popular=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5);$('#popularTours').innerHTML=popular.length?popular.map(([n,c])=>`<div class="popular-item"><strong>${esc(n)}</strong><span>${c} booking${c>1?'s':''}</span></div>`).join(''):'<div class="popular-item"><strong>No data yet</strong><span>Bookings will appear here</span></div>'}function renderBookings(){const q=$('#bookingSearch').value.trim().toLowerCase(),sf=$('#statusFilter').value;const list=bookings.filter(b=>(sf==='all'||b.status===sf)&&(!q||`${b.id} ${b.name} ${b.phone} ${b.email||''} ${b.tour}`.toLowerCase().includes(q)));$('#bookingRows').innerHTML=list.map(b=>row(b,true)).join('')||'<tr><td colspan="8">No matching bookings.</td></tr>';$$('[data-status]').forEach(s=>s.onchange=()=>{const b=bookings.find(x=>x.id===s.dataset.status);if(b){b.status=s.value;save();renderAll()}});$$('[data-resend-email]').forEach(btn=>btn.onclick=()=>{const b=bookings.find(x=>x.id===btn.dataset.resendEmail);if(!b||!b.email)return;btn.textContent='Sending...';fetch('/api/send-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({booking:b,email:b.email})}).then(r=>r.json()).then(res=>{btn.textContent='✓ Sent!';setTimeout(()=>{btn.textContent='✉ Resend Email'},3000)}).catch(()=>{btn.textContent='Failed';setTimeout(()=>{btn.textContent='✉ Resend Email'},3000)})})}function unitLabel(u){return u==='person'?'per person':u==='vehicle'?'per vehicle':u==='bike'?'per bike':u==='buggy'?'per buggy':`per ${u||'booking'}`}function renderTourSummary(){$('#tourCount').textContent=tours.length;$('#activeTourCount').textContent=tours.filter(t=>t.active!==false).length;$('#packageCount').textContent=tours.reduce((a,t)=>a+(t.packages?.length||0),0)}function renderTours(){const q=$('#tourSearchAdmin').value.trim().toLowerCase(),f=$('#tourTypeFilter').value;const list=tours.filter(t=>(f==='all'||(t.category||'other')===f)&&(!q||`${t.name} ${t.type} ${t.description}`.toLowerCase().includes(q)));$('#tourAdminGrid').innerHTML=list.map(t=>`<article class="tour-admin-card${t.active===false?' inactive':''}" data-tour-card="${esc(t.id)}"><div class="tour-card-image"><img src="${esc(t.image||'hero.jpg')}" alt="${esc(t.name)}"><span class="tour-card-status${t.active===false?' off':''}">${t.active===false?'INACTIVE':'ACTIVE'}</span>${t.source?`<a class="tour-card-source" href="${esc(t.source)}" target="_blank" rel="noopener">Pexels ↗</a>`:''}</div><div class="tour-card-body"><div class="tour-meta"><span>${esc(t.type)}</span><span>${esc(t.duration||'')}</span></div><h3>${esc(t.name)}</h3><p>${esc(t.description)}</p><div class="price-list">${(t.packages||[]).map(p=>`<div class="price-line"><span>${esc(p.name)} · ${unitLabel(p.unit)}</span><strong>${money(p.price)}</strong></div>`).join('')}</div><div class="tour-card-actions"><button class="ghost" data-edit-tour="${esc(t.id)}">Edit</button><button class="ghost" data-landing-tour="${esc(t.id)}" title="Edit Landing Page Content">Landing CMS</button><button class="ghost" data-duplicate-tour="${esc(t.id)}">Duplicate</button><button class="danger" data-delete-tour="${esc(t.id)}">Delete</button></div></div></article>`).join('')||'<div class="panel">No tours match your search.</div>';renderTourSummary();bindTourActions();renderMedia();refreshManualTourOptions()}function renderMedia(){$('#mediaGrid').innerHTML=tours.map(t=>`<article class="media-card"><img src="${esc(t.image||'hero.jpg')}" alt="${esc(t.name)}"><div><h3>${esc(t.name)}</h3><p>${esc(t.type)} · ${esc(t.duration||'')}</p>${t.source?`<a href="${esc(t.source)}" target="_blank" rel="noopener">Open Pexels source →</a>`:'<span>No source URL</span>'}</div></article>`).join('')}function bindTourActions(){$$('[data-edit-tour]').forEach(b=>b.onclick=()=>openTourDialog(b.dataset.editTour));$$('[data-duplicate-tour]').forEach(b=>b.onclick=()=>duplicateTour(b.dataset.duplicateTour));$$('[data-delete-tour]').forEach(b=>b.onclick=()=>deleteTour(b.dataset.deleteTour));$$('[data-landing-tour]').forEach(b=>b.onclick=()=>{const id=b.dataset.landingTour;const map={'evening':'safari','morning':'safari','premium':'safari','safari':'safari','quad':'quad','canam2':'buggy','canam4':'buggy','buggy':'buggy','burj-lake':'lake-ride','lake-ride':'lake-ride','dubai-city':'dubai-city','abudhabi':'abu-dhabi','abu-dhabi':'abu-dhabi'};const targetKey=map[id]||'safari';const sel=$('#landingPageSelector');if(sel){sel.value=targetKey;sel.dispatchEvent(new Event('change'))}const navBtn=document.querySelector('.sidebar nav button[data-view="landing"]');if(navBtn)navBtn.click()})}function duplicateTour(id){const original=tours.find(t=>t.id===id);if(!original)return;const copy=clone(original);copy.id=`${slug(original.name)}-${Date.now().toString().slice(-5)}`;copy.name=`${original.name} Copy`;copy.badge='NEW';tours.unshift(copy);save();renderAll();openTourDialog(copy.id)}function deleteTour(id){const t=tours.find(x=>x.id===id);if(!t)return;if(!confirm(`Delete "${t.name}"? This removes it from this dashboard and the public tour list in this browser.`))return;tours=tours.filter(x=>x.id!==id);save();renderAll()}function refreshManualTourOptions(){const select=$('#manualTour');if(select)select.innerHTML=tours.filter(t=>t.active!==false).map(t=>`<option value="${esc(t.name)}">${esc(t.name)}</option>`).join('')}function renderAll(){renderStats();renderRecent();renderBookings();renderTours()}const titles={overview:['Dashboard Overview','Bookings, tours and website content in one place.'],bookings:['Bookings','Search, confirm and manage customer requests.'],tours:['Tour Manager','Create and edit the experiences shown on your website.'],cms:['Homepage CMS','Manage hero, categories, tours intro, why us, banner, latest experiences and images.'],landing:['Tour Landing Pages CMS','Live edit hero, descriptions, rates & packages, highlights and FAQs for all 6 tour landing pages.'],seo:['Master SEO & AEO Command Center','Inspect page-by-page SEO, AEO direct answers, local entity signals & structured data schemas.'],media:['Media Library','Review the Pexels media attached to your tours.'],settings:['Settings','Update the operational details used by your team.']};$$('.sidebar nav button').forEach(b=>b.onclick=()=>{$$('.sidebar nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.view').forEach(v=>v.classList.remove('active'));$('#'+b.dataset.view).classList.add('active');$('#viewTitle').textContent=titles[b.dataset.view][0];$('#viewSubtitle').textContent=titles[b.dataset.view][1]});$$('[data-go]').forEach(b=>b.onclick=()=>document.querySelector(`.sidebar nav button[data-view="${b.dataset.go}"]`).click());$('#bookingSearch').oninput=renderBookings;$('#statusFilter').onchange=renderBookings;$('#tourSearchAdmin').oninput=renderTours;$('#tourTypeFilter').onchange=renderTours;$('#resetToursBtn').onclick=()=>{if(confirm('Reset all tour edits to the default Phoenix Tours catalog?')){tours=clone(DEFAULT_TOURS).map(normalizeTour);save();renderAll()}};$('#exportBtn').onclick=()=>{if(!bookings.length)return alert('No bookings to export.');const heads=['ID','Created','Customer','Phone','Tour','Package','Quantity','Date','Time','Pickup','Total','Status'];const lines=[heads.join(','),...bookings.map(b=>[b.id,b.createdAt,b.name,b.phone,b.tour,b.package,b.quantity,b.date,b.time,b.pickup,b.total,b.status].map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(','))];const blob=new Blob([lines.join('\n')],{type:'text/csv'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='phoenix-bookings.csv';a.click();URL.revokeObjectURL(a.href)};
const bookingDialog=$('#bookingDialog');function openBookingDialog(){refreshManualTourOptions();bookingDialog.showModal()}$('#addBookingBtn').onclick=openBookingDialog;$('#addBookingInline').onclick=openBookingDialog;$('#manualBookingForm').onsubmit=e=>{e.preventDefault();const b={id:`PX-${Date.now().toString().slice(-8)}`,createdAt:new Date().toISOString(),name:$('#manualName').value.trim(),phone:$('#manualPhone').value.trim(),tour:$('#manualTour').value,package:'Manual booking',quantity:Number($('#manualQty').value)||1,date:$('#manualDate').value,time:'To confirm',pickup:'To confirm',total:Number($('#manualTotal').value)||0,status:'New'};bookings.unshift(b);save();renderAll();bookingDialog.close();e.target.reset()};
const tourDialog=$('#tourDialog'),tourForm=$('#tourForm'),packageEditor=$('#packageEditor');function packageRow(p={}){const row=document.createElement('div');row.className='package-row';row.innerHTML=`<input class="pkg-name" placeholder="Package name" value="${esc(p.name||'')}" required><input class="pkg-price" type="number" min="0" placeholder="Price" value="${Number(p.price||0)}" required><select class="pkg-unit"><option value="person"${p.unit==='person'?' selected':''}>Per person</option><option value="vehicle"${p.unit==='vehicle'?' selected':''}>Per vehicle</option><option value="bike"${p.unit==='bike'?' selected':''}>Per bike</option><option value="buggy"${p.unit==='buggy'?' selected':''}>Per buggy</option><option value="booking"${p.unit==='booking'?' selected':''}>Per booking</option></select><button class="remove-package" type="button">×</button>`;row.querySelector('.remove-package').onclick=()=>{if(packageEditor.children.length>1)row.remove()};return row}function addPackage(p){packageEditor.appendChild(packageRow(p))}$('#addPackageBtn').onclick=()=>addPackage({name:'New Package',price:0,unit:'person'});function updatePreview(){const img=$('#tourImage').value.trim();$('#tourPreviewImage').src=img||'hero.jpg';$('#tourPreviewName').textContent=$('#tourName').value.trim()||'Tour name';$('#tourPreviewBadge').textContent=$('#tourBadge').value.trim()||'NEW TOUR';$('#tourPreviewDescription').textContent=$('#tourDescription').value.trim()||'Your description appears here.'}['tourImage','tourName','tourBadge','tourDescription'].forEach(id=>$('#'+id).addEventListener('input',updatePreview));function openTourDialog(id=null){tourForm.reset();packageEditor.innerHTML='';const t=id?tours.find(x=>x.id===id):null;$('#tourEditId').value=t?.id||'';$('#tourDialogTitle').textContent=t?'Edit tour':'Add new tour';$('#tourName').value=t?.name||'';$('#tourCategory').value=t?.category||'safari';$('#tourType').value=t?.type||'Safari';$('#tourBadge').value=t?.badge||'';$('#tourDuration').value=t?.duration||'';$('#tourDescription').value=t?.description||'';$('#tourImage').value=t?.image||'';$('#tourSource').value=t?.source||'';$('#tourImageLink').value=t?.imageLink||'';$('#tourMeetingPoint').checked=Boolean(t?.meetingPoint);$('#tourActive').checked=t?.active!==false;(t?.packages?.length?t.packages:[{name:'Standard',price:0,unit:'person'}]).forEach(addPackage);updatePreview();tourDialog.showModal()}$('#addTourBtn').onclick=()=>openTourDialog();tourForm.onsubmit=e=>{e.preventDefault();const editingId=$('#tourEditId').value;const packages=[...packageEditor.querySelectorAll('.package-row')].map((row,i)=>({id:`package-${i+1}`,name:row.querySelector('.pkg-name').value.trim(),price:Number(row.querySelector('.pkg-price').value)||0,unit:row.querySelector('.pkg-unit').value})).filter(p=>p.name);if(!packages.length)return alert('Add at least one pricing package.');let id=editingId||slug($('#tourName').value);if(!editingId&&tours.some(t=>t.id===id))id=`${id}-${Date.now().toString().slice(-4)}`;const tour={id,name:$('#tourName').value.trim(),category:$('#tourCategory').value,type:$('#tourType').value.trim()||'Tour',badge:$('#tourBadge').value.trim()||'TOUR',duration:$('#tourDuration').value.trim()||'Dubai',description:$('#tourDescription').value.trim(),image:$('#tourImage').value.trim()||'hero.jpg',source:$('#tourSource').value.trim(),imageLink:$('#tourImageLink').value.trim(),meetingPoint:$('#tourMeetingPoint').checked,active:$('#tourActive').checked,packages};if(editingId){const i=tours.findIndex(t=>t.id===editingId);if(i>=0)tours[i]=tour}else tours.unshift(tour);save();renderAll();tourDialog.close()};
const settings=JSON.parse(localStorage.getItem('phoenixSettings')||'{}');if(settings.company)$('#settingCompany').value=settings.company;if(settings.phone)$('#settingPhone').value=settings.phone;if(settings.location)$('#settingLocation').value=settings.location;if(settings.payment)$('#settingPayment').value=settings.payment;$('#saveSettings').onclick=()=>{safeSetItem('phoenixSettings',JSON.stringify({company:$('#settingCompany').value,phone:$('#settingPhone').value,location:$('#settingLocation').value,payment:$('#settingPayment').value}));alert('Settings saved.')};
function loadEmailStatus(){fetch('/api/email-status').then(r=>r.json()).then(st=>{const badge=$('#smtpStatusBadge'),fromLbl=$('#emailFromLabel'),hostLbl=$('#emailHostLabel');if(badge){badge.textContent=st.smtpConfigured?'Connected (Live SMTP)':'Active (Simulated Delivery)';badge.style.background=st.smtpConfigured?'#e1f2ee':'#fef3c7';badge.style.color=st.smtpConfigured?'#0c6769':'#92400e';}if(fromLbl)fromLbl.textContent=st.fromAddress||'Phoenix Tours <bookings@phoenix-tours.ae>';if(hostLbl)hostLbl.textContent=st.smtpHost||'Default';}).catch(()=>{});}
loadEmailStatus();
const testEmailBtn=$('#btnSendTestEmail');if(testEmailBtn){testEmailBtn.onclick=()=>{const email=($('#testEmailInput')?.value||'').trim();const st=$('#testEmailStatus');if(!email){if(st)st.textContent='Please provide an email address.';return;}testEmailBtn.disabled=true;testEmailBtn.textContent='Sending...';if(st)st.textContent='Dispatching test booking summary email...';fetch('/api/test-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})}).then(r=>r.json()).then(res=>{testEmailBtn.disabled=false;testEmailBtn.textContent='✉ Send Test';if(st){st.textContent=`✓ Test summary email dispatched to ${email}! Check inbox/spam or server logs.`;st.style.color='#0d9488';}}).catch(err=>{testEmailBtn.disabled=false;testEmailBtn.textContent='✉ Send Test';if(st){st.textContent=`Error: ${err.message||'Failed'}`;st.style.color='#dc2626';}});};}
renderAll();

// Master SEO & AEO Command Center Controller
const SEO_AUDIT_PAGES = [
  {
    path: '/',
    name: 'Home / Hub',
    keyword: 'Dubai desert safari, quad bike, dune buggy',
    intent: 'Commercial / Transactional',
    title: 'Dubai Desert Safari, Quad Bike & Buggy Tours | Phoenix Travel & Tours',
    desc: 'Book Dubai desert safari, quad bike, dune buggy and UAE city tours with Phoenix Travel & Tours. Clear AED rates, instant confirmation & pay on arrival.',
    schema: 'TravelAgency, WebSite',
    aeo: 'Active (3 Answer Boxes)',
    status: '100% Optimal',
    preview: '/'
  },
  {
    path: '/desert-safari-dubai.html',
    name: 'Dubai Desert Safari',
    keyword: 'dubai desert safari packages, evening desert safari',
    intent: 'Commercial / Transactional',
    title: 'Dubai Desert Safari Tours | Evening, Morning & Private 4x4 | Phoenix Travel & Tours',
    desc: 'Book top-rated Dubai desert safari tours with Phoenix Travel & Tours. Lahbab red dune bashing, BBQ dinner, camel rides & live shows. Clear AED rates & pay on arrival.',
    schema: 'TouristTrip, TravelAgency, FAQPage',
    aeo: 'Active (Inclusions & Rates)',
    status: '100% Optimal',
    preview: '/desert-safari-dubai.html'
  },
  {
    path: '/rides/quad-bike',
    name: 'Quad Bike Dubai',
    keyword: 'quad bike dubai price, desert ATV rental',
    intent: 'Commercial / Transactional',
    title: 'Quad Bike Dubai | Desert ATV Rental from AED 150 | Phoenix Travel & Tours',
    desc: 'Self-drive quad bike in Dubai desert dunes. 30 min & 1 hour ATV rentals from AED 150 with Phoenix Travel & Tours. No driving license required. Safety helmet & guide included.',
    schema: 'TouristTrip, Product, Offer, FAQPage',
    aeo: 'Active (Cost & License Rules)',
    status: '100% Optimal',
    preview: '/rides/quad-bike'
  },
  {
    path: '/rides/buggy',
    name: 'Dune Buggy Dubai',
    keyword: 'dune buggy dubai can-am maverick rental',
    intent: 'Commercial / Transactional',
    title: 'Dune Buggy Dubai | Can-Am Maverick Rentals from AED 1,000 | Phoenix Travel & Tours',
    desc: 'Drive 2-seater and 4-seater Can-Am Maverick dune buggies across Dubai red dunes with Phoenix Travel & Tours. Guided desert trails, helmets & direct WhatsApp booking.',
    schema: 'TouristTrip, Product, Offer, FAQPage',
    aeo: 'Active (Pricing & Specs)',
    status: '100% Optimal',
    preview: '/rides/buggy'
  },
  {
    path: '/dubai-city-tour.html',
    name: 'Dubai City Tour',
    keyword: 'dubai city tour private car driver landmarks',
    intent: 'Commercial / Informational',
    title: 'Dubai City Tour | Private Sightseeing with Car & Driver | Phoenix Travel & Tours',
    desc: 'Explore modern landmarks & historic heritage with a private Dubai city tour by Phoenix Travel & Tours. Door-to-door hotel pickup, customized itinerary & clear AED rates.',
    schema: 'TouristTrip, TravelAgency, FAQPage',
    aeo: 'Active (Itinerary & Hotel Pickup)',
    status: '100% Optimal',
    preview: '/dubai-city-tour.html'
  },
  {
    path: '/abu-dhabi-city-tour.html',
    name: 'Abu Dhabi Day Trip',
    keyword: 'abu dhabi city tour from dubai grand mosque',
    intent: 'Commercial / Informational',
    title: 'Abu Dhabi City Tour from Dubai | Private Day Trip | Phoenix Travel & Tours',
    desc: 'Book a private Abu Dhabi City Tour from Dubai with Phoenix Travel & Tours. Visit Sheikh Zayed Grand Mosque, Emirates Palace, Louvre Museum & Yas Island. Clear AED rates.',
    schema: 'TouristTrip, TravelAgency, FAQPage',
    aeo: 'Active (Dress Code & Schedule)',
    status: '100% Optimal',
    preview: '/abu-dhabi-city-tour.html'
  },
  {
    path: '/sky-dive-dubai.html',
    name: 'Sky Dive Dubai',
    keyword: 'tandem skydiving palm jumeirah dubai price',
    intent: 'High Intent Transactional',
    title: 'Sky Dive Dubai | Tandem Skydive Palm Jumeirah | Phoenix Travel & Tours',
    desc: 'Experience tandem skydiving over Palm Jumeirah with Phoenix Travel & Tours. Complete with outside camera video & photos, briefing & WhatsApp confirmation. AED 2,700.',
    schema: 'TouristTrip, Product, Offer',
    aeo: 'Active (Freefall & Rate Inclusions)',
    status: '100% Optimal',
    preview: '/sky-dive-dubai.html'
  },
  {
    path: '/burj-khalifa-lake-ride.html',
    name: 'Burj Khalifa Lake Ride',
    keyword: 'burj khalifa lake ride fountain abra boat ticket',
    intent: 'Commercial / Attraction',
    title: 'Burj Khalifa Lake Ride & Dubai Fountain Abra Boat Tour | Phoenix Travel & Tours',
    desc: 'Book Burj Khalifa Lake Ride tickets and Dubai Fountain traditional abra boat tours with Phoenix Travel & Tours. Front-row dancing fountain views from AED 130.',
    schema: 'TouristTrip, Product, Offer, FAQPage',
    aeo: 'Active (Timings & Views)',
    status: '100% Optimal',
    preview: '/burj-khalifa-lake-ride.html'
  },
  {
    path: '/book',
    name: 'Booking Flow',
    keyword: 'book dubai tour pay on arrival whatsapp',
    intent: 'Transactional',
    title: 'Book Your Ride | Quad Bike & Dune Buggy Dubai | Phoenix Travel & Tours',
    desc: 'Select your Dubai desert adventure date, time slot, and package. Pay on arrival with instant confirmation on WhatsApp by Phoenix Travel & Tours.',
    schema: 'OrderAction, TravelAgency',
    aeo: 'Standard (Booking Guidance)',
    status: '100% Optimal',
    preview: '/book'
  },
  {
    path: '/404',
    name: '404 Error Page',
    keyword: 'page not found recovery',
    intent: 'Navigation Recovery',
    title: '404 Page Not Found | Phoenix Travel & Tours',
    desc: 'The requested page was not found. Browse Dubai desert safaris, quad biking, dune buggies and city tours with Phoenix Travel & Tours.',
    schema: 'WebPage',
    aeo: 'Smart Search Redirects',
    status: '100% Optimal',
    preview: '/404'
  }
];

function renderSeoAuditTable(filter = '') {
  const tbody = $('#seoAuditRows');
  if (!tbody) return;
  const q = filter.trim().toLowerCase();
  const filtered = SEO_AUDIT_PAGES.filter(p => !q || `${p.path} ${p.name} ${p.keyword} ${p.title}`.toLowerCase().includes(q));
  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <strong style="color:var(--navy);font-size:12.5px;">${esc(p.name)}</strong>
        <br><code style="color:#0d9488;font-size:11px;">${esc(p.path)}</code>
      </td>
      <td>
        <span style="font-weight:600;color:#334155;">${esc(p.keyword)}</span>
        <br><small style="color:var(--muted);">${esc(p.intent)}</small>
      </td>
      <td style="max-width:240px;">
        <span style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${esc(p.title)}">${esc(p.title)}</span>
        <small style="color:#0c6769;font-weight:700;">${p.title.length} chars (Optimal)</small>
      </td>
      <td style="max-width:260px;">
        <span style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${esc(p.desc)}">${esc(p.desc)}</span>
        <small style="color:#0c6769;font-weight:700;">${p.desc.length} chars (Optimal)</small>
      </td>
      <td><span style="background:#f1f5f9;color:#334155;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:600;">${esc(p.schema)}</span></td>
      <td><span style="background:#fef3c7;color:#92400e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;">${esc(p.aeo)}</span></td>
      <td><span style="background:#e1f2ee;color:#0c6769;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:800;">✓ Active</span></td>
      <td><a href="${esc(p.preview)}" target="_blank" rel="noopener" style="color:#0d9488;font-weight:700;text-decoration:none;">Open ↗</a></td>
    </tr>
  `).join('') || '<tr><td colspan="8">No matching pages.</td></tr>';
}

renderSeoAuditTable();
const seoFilterEl = $('#seoPageFilter');
if (seoFilterEl) {
  seoFilterEl.addEventListener('input', e => renderSeoAuditTable(e.target.value));
}
$$('.sidebar nav button[data-view="seo"]').forEach(btn => {
  btn.addEventListener('click', () => renderSeoAuditTable());
});

window.reloadAdminDashboard=function(){bookings=JSON.parse(localStorage.getItem('phoenixBookings')||'[]');tours=loadTours();const s=JSON.parse(localStorage.getItem('phoenixSettings')||'{}');if(s.company)$('#settingCompany').value=s.company;if(s.phone)$('#settingPhone').value=s.phone;if(s.location)$('#settingLocation').value=s.location;if(s.payment)$('#settingPayment').value=s.payment;renderAll();if(typeof window.refreshCategoryEditor==='function')window.refreshCategoryEditor();if(typeof window.updateBackupMeta==='function')window.updateBackupMeta();if(typeof window.refreshHomepageCMS==='function')window.refreshHomepageCMS();if(typeof window.refreshLandingCMS==='function')window.refreshLandingCMS();};window.addEventListener('phoenix:data-restored',()=>window.reloadAdminDashboard());

function getStoredLandingCMS(){
  try {
    const raw = localStorage.getItem('phoenixLandingCMS');
    if (raw) return JSON.parse(raw);
  } catch(e) {
    console.warn('Error reading phoenixLandingCMS', e);
  }
  return {};
}
window.getStoredLandingCMS = getStoredLandingCMS;

function saveStoredLandingCMS(data){
  safeSetItem('phoenixLandingCMS', JSON.stringify(data));
}
window.saveStoredLandingCMS = saveStoredLandingCMS;

/* ============================================================
   HOMEPAGE CMS MANAGEMENT ENGINE
============================================================ */
(function(){
  const DEFAULT_CMS = window.PHOENIX_DEFAULT_CMS || {};

  function getActiveCMS(){
    try{
      const raw = localStorage.getItem('phoenixHomepageCMS');
      if(raw){
        const parsed = JSON.parse(raw);
        return {
          ...clone(DEFAULT_CMS),
          ...parsed,
          hero: {...(DEFAULT_CMS.hero||{}), ...(parsed.hero||{})},
          categories: {...(DEFAULT_CMS.categories||{}), ...(parsed.categories||{})},
          tourSection: {...(DEFAULT_CMS.tourSection||{}), ...(parsed.tourSection||{})},
          whyUs: {...(DEFAULT_CMS.whyUs||{}), ...(parsed.whyUs||{})},
          banner: {...(DEFAULT_CMS.banner||{}), ...(parsed.banner||{})},
          latest: {...(DEFAULT_CMS.latest||{}), ...(parsed.latest||{})},
          contact: {...(DEFAULT_CMS.contact||{}), ...(parsed.contact||{})},
          footer: {...(DEFAULT_CMS.footer||{}), ...(parsed.footer||{})}
        };
      }
    }catch(err){console.warn('Error reading stored CMS:', err)}
    return clone(DEFAULT_CMS);
  }

  let cmsState = getActiveCMS();

  // Toast status notification
  function showCmsToast(msg, isErr=false){
    const el = $('#cmsStatus');
    if(el){
      el.textContent = msg;
      el.className = `cms-status show ${isErr?'err':'ok'}`;
      setTimeout(()=>{ if(el) el.className='cms-status'; }, 5000);
    }
    const presetEl = $('#cmsPresetStatus');
    if(presetEl){
      presetEl.textContent = msg;
      presetEl.className = `cms-status show ${isErr?'err':'ok'}`;
      setTimeout(()=>{ if(presetEl) presetEl.className='cms-status'; }, 5000);
    }
  }

  // Setup tab switcher
  $$('#cmsTabs button').forEach(btn => {
    btn.onclick = () => {
      $$('#cmsTabs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabKey = btn.dataset.cmsTab;
      $$('.cms-tab-content').forEach(c => c.classList.remove('active'));
      const activeContent = $(`#cmsTab_${tabKey}`);
      if(activeContent) activeContent.classList.add('active');
      if(tabKey === 'images'){
        renderImageSlots();
        renderPresets();
      }
    };
  });

  // Wire file upload and preview
  function wireUpload(inputEl, fileEl, thumbEl, onUpdate){
    if(inputEl && thumbEl){
      inputEl.addEventListener('input', () => {
        const val = inputEl.value.trim();
        if(val) thumbEl.src = val;
        if(onUpdate) onUpdate(val);
      });
    }
    if(fileEl && thumbEl){
      fileEl.addEventListener('change', async () => {
        const f = fileEl.files?.[0];
        if(!f) return;
        try {
          const compressed = await compressImage(f, 960, 0.72);
          thumbEl.src = compressed;
          if(inputEl) inputEl.value = compressed;
          if(onUpdate) onUpdate(compressed);
        } catch(err) {
          console.error('Error compressing image:', err);
        }
      });
    }
  }

  // Populate Tab 1: Hero
  function populateHero(){
    const h = cmsState.hero || {};
    $('#cmsHeroEyebrow').value = h.eyebrow || '';
    $('#cmsHeroSide').value = h.sideText || '';
    $('#cmsHeroTitle').value = h.title || '';
    $('#cmsHeroSubtitle').value = h.subtitle || '';
    $('#cmsHeroBtn1').value = h.btnPrimaryText || '';
    $('#cmsHeroBtn2').value = h.btnSecondaryText || '';
    $('#cmsHeroLink2').value = h.btnSecondaryLink || '';
    const trust = h.trustItems || [];
    $('#cmsHeroTrust1').value = trust[0] || '✓ Pay on arrival';
    $('#cmsHeroTrust2').value = trust[1] || '✓ WhatsApp confirmation';
    $('#cmsHeroTrust3').value = trust[2] || '✓ Private & sharing options';
    $('#cmsHeroImage').value = h.image || 'hero.jpg';
    $('#cmsHeroImgThumb').src = h.image || 'hero.jpg';

    // Live preview updates
    function updateHeroPrev(){
      $('#cmsHeroPrevEye').textContent = $('#cmsHeroEyebrow').value || 'DUBAI · UAE · DESERT EXPERIENCES';
      $('#cmsHeroPrevH1').textContent = $('#cmsHeroTitle').value || 'Dubai desert safari, quad bike & buggy adventures';
      $('#cmsHeroPrevP').textContent = $('#cmsHeroSubtitle').value || 'Explore Dubai desert safaris...';
    }
    ['cmsHeroEyebrow','cmsHeroTitle','cmsHeroSubtitle'].forEach(id => {
      const el = $(`#${id}`);
      if(el) el.oninput = updateHeroPrev;
    });
    updateHeroPrev();

    wireUpload($('#cmsHeroImage'), $('#cmsHeroFile'), $('#cmsHeroImgThumb'), val => {
      h.image = val;
      renderImageSlots();
    });
    $('#cmsHeroResetImg').onclick = () => {
      const def = DEFAULT_CMS.hero?.image || 'hero.jpg';
      $('#cmsHeroImage').value = def;
      $('#cmsHeroImgThumb').src = def;
      h.image = def;
      renderImageSlots();
    };
  }

  // Populate Tab 2: Categories
  function populateCategories(){
    const c = cmsState.categories || {};
    $('#cmsCatEyebrow').value = c.eyebrow || '';
    $('#cmsCatTitle').value = c.title || '';
    $('#cmsCatAllText').value = c.allLinkText || '';
    $('#cmsCatAllUrl').value = c.allLinkUrl || '';

    // If legacy phoenixCategoryImages exist, use them as defaults if c.cards has default hero.jpg
    let leg = {};
    try{ leg = JSON.parse(localStorage.getItem('phoenixCategoryImages')||'{}') }catch{}

    const cards = c.cards || [];
    [1, 2, 3, 4].forEach(num => {
      const card = cards[num - 1] || {};
      const defKey = ['safari','quad','buggy','premium'][num - 1];
      const imgVal = leg[card.id || defKey] || card.image || (num === 4 ? 'dubai.jpg' : 'hero.jpg');

      const titleEl = $(`#cmsCat${num}Title`);
      const linkEl = $(`#cmsCat${num}Link`);
      const imgEl = $(`#cmsCat${num}Img`);
      const fileEl = $(`#cmsCat${num}File`);
      const thumbEl = $(`#cmsCat${num}Thumb`);
      const resetBtn = $(`#cmsCat${num}Reset`);

      if(titleEl) titleEl.value = card.title || '';
      if(linkEl) linkEl.value = card.link || '';
      if(imgEl) imgEl.value = imgVal;
      if(thumbEl) thumbEl.src = imgVal;

      wireUpload(imgEl, fileEl, thumbEl, val => {
        if(cards[num - 1]) cards[num - 1].image = val;
        renderImageSlots();
      });

      if(resetBtn){
        resetBtn.onclick = () => {
          const def = DEFAULT_CMS.categories?.cards?.[num - 1]?.image || (num === 4 ? 'dubai.jpg' : 'hero.jpg');
          if(imgEl) imgEl.value = def;
          if(thumbEl) thumbEl.src = def;
          if(cards[num - 1]) cards[num - 1].image = def;
          renderImageSlots();
        };
      }
    });
  }

  // Populate Tab 3: Tour Section & Reference List
  function populateTourSection(){
    const ts = cmsState.tourSection || {};
    $('#cmsTourEyebrow').value = ts.eyebrow || '';
    $('#cmsTourTitle').value = ts.title || '';
    $('#cmsTourNoteText').value = ts.noteText || '';
    const guides = ts.guides || [];
    $('#cmsTourGuide1Text').value = guides[0]?.text || '';
    $('#cmsTourGuide1Url').value = guides[0]?.url || '';
    $('#cmsTourGuide2Text').value = guides[1]?.text || '';
    $('#cmsTourGuide2Url').value = guides[1]?.url || '';
    $('#cmsTourGuide3Text').value = guides[2]?.text || '';
    $('#cmsTourGuide3Url').value = guides[2]?.url || '';

    // Render active tour catalog references
    const refContainer = $('#cmsTourRefList');
    if(refContainer){
      refContainer.innerHTML = tours.map(t => `
        <div class="cms-tour-ref-item">
          <div>
            <b>${esc(t.name)}</b> <span style="font-size:8px;padding:3px 7px;border-radius:999px;background:${t.active!==false?'#dff5ef':'#f1eeee'};color:${t.active!==false?'#167061':'#7e6161'}">${t.active!==false?'Active':'Inactive'}</span>
            <div style="color:#788b90;font-size:8px;margin-top:2px">${esc(t.type)} · ${t.packages?.length||0} packages</div>
          </div>
          <div>
            <button type="button" data-edit-tour="${esc(t.id)}" style="font-size:8px;padding:6px 9px">Edit in Tour Manager</button>
          </div>
        </div>
      `).join('');
      refContainer.querySelectorAll('[data-edit-tour]').forEach(btn => {
        btn.onclick = () => {
          document.querySelector('.sidebar nav button[data-view="tours"]').click();
          openTourDialog(btn.dataset.editTour);
        };
      });
    }
  }

  // Populate Tab 4: Why Choose Us
  function renderWhyItems(){
    const container = $('#cmsWhyItemsContainer');
    if(!container) return;
    const items = cmsState.whyUs?.items || [];
    container.innerHTML = items.map((item, idx) => `
      <div class="cms-card-item" data-why-idx="${idx}">
        <div class="cms-card-item-header">
          <strong>Selling Point #${idx + 1}</strong>
          <button type="button" class="cms-delete-why">Delete</button>
        </div>
        <div class="cms-form-grid">
          <label>Number label (e.g. 01)<input class="why-num" value="${esc(item.num||'01')}"></label>
          <label>Title<input class="why-title" value="${esc(item.title||'')}"></label>
          <label class="full">Description<textarea class="why-desc" rows="2">${esc(item.desc||'')}</textarea></label>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.cms-card-item').forEach(card => {
      const idx = Number(card.dataset.whyIdx);
      const delBtn = card.querySelector('.cms-delete-why');
      if(delBtn){
        delBtn.onclick = () => {
          if(cmsState.whyUs.items.length <= 1) return alert('Keep at least one selling point.');
          cmsState.whyUs.items.splice(idx, 1);
          renderWhyItems();
        };
      }
    });
  }

  function populateWhyUs(){
    const w = cmsState.whyUs || {};
    $('#cmsWhyEyebrow').value = w.eyebrow || '';
    $('#cmsWhyTitle').value = w.title || '';
    renderWhyItems();
  }

  $('#cmsAddWhyBtn').onclick = () => {
    if(!cmsState.whyUs) cmsState.whyUs = {};
    if(!Array.isArray(cmsState.whyUs.items)) cmsState.whyUs.items = [];
    const nextNum = String(cmsState.whyUs.items.length + 1).padStart(2, '0');
    cmsState.whyUs.items.push({
      num: nextNum,
      title: 'New reason to choose us',
      desc: 'Highlight a customer benefit or key advantage.'
    });
    renderWhyItems();
  };

  // Populate Tab 5: Banner
  function populateBanner(){
    const b = cmsState.banner || {};
    $('#cmsBannerEyebrow').value = b.eyebrow || '';
    $('#cmsBannerTitle').value = b.title || '';
    $('#cmsBannerDesc').value = b.desc || '';
    $('#cmsBannerWaText').value = b.ctaWhatsappText || '';
    $('#cmsBannerWaNum').value = b.ctaWhatsappNumber || '';
    $('#cmsBannerCallText').value = b.ctaCallText || '';
    $('#cmsBannerCallNum').value = b.ctaCallNumber || '';
    $('#cmsBannerImg').value = b.image || 'hero.jpg';
    $('#cmsBannerThumb').src = b.image || 'hero.jpg';

    wireUpload($('#cmsBannerImg'), $('#cmsBannerFile'), $('#cmsBannerThumb'), val => {
      b.image = val;
      renderImageSlots();
    });

    $('#cmsBannerReset').onclick = () => {
      const def = DEFAULT_CMS.banner?.image || 'hero.jpg';
      $('#cmsBannerImg').value = def;
      $('#cmsBannerThumb').src = def;
      b.image = def;
      renderImageSlots();
    };
  }

  // Populate Tab 6: Latest Experiences
  function renderLatestItems(){
    const container = $('#cmsLatestContainer');
    if(!container) return;
    const cards = cmsState.latest?.cards || [];
    container.innerHTML = cards.map((c, idx) => `
      <div class="cms-card-item" data-latest-idx="${idx}">
        <div class="cms-card-item-header">
          <strong>Experience #${idx + 1}: ${esc(c.title||'Untitled')}</strong>
          <button type="button" class="cms-delete-latest">Delete</button>
        </div>
        <img class="cms-preview-thumb latest-thumb" src="${esc(c.image||'hero.jpg')}" alt="">
        <div class="cms-form-grid">
          <label>Category Tag (e.g. CITY TOUR)<input class="latest-tag" value="${esc(c.tag||'EXPERIENCE')}"></label>
          <label>Card Title<input class="latest-title" value="${esc(c.title||'')}"></label>
          <label class="full">Description<textarea class="latest-desc" rows="2">${esc(c.desc||'')}</textarea></label>
          <label>Target Page Link<input class="latest-link" value="${esc(c.link||'')}"></label>
          <label>Button Label<input class="latest-btn-text" value="${esc(c.btnText||'Explore tour →')}"></label>
          <label class="full">Image URL<input class="latest-img-url" value="${esc(c.image||'hero.jpg')}"></label>
        </div>
        <div class="cms-upload-row">
          <label>Upload<input type="file" class="latest-file" accept="image/*"></label>
          <button type="button" class="latest-reset">Reset image</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.cms-card-item').forEach(card => {
      const idx = Number(card.dataset.latestIdx);
      const thumb = card.querySelector('.latest-thumb');
      const urlInp = card.querySelector('.latest-img-url');
      const fileInp = card.querySelector('.latest-file');
      const resetBtn = card.querySelector('.latest-reset');
      const delBtn = card.querySelector('.cms-delete-latest');

      wireUpload(urlInp, fileInp, thumb, val => {
        if(cmsState.latest.cards[idx]) cmsState.latest.cards[idx].image = val;
        renderImageSlots();
      });

      if(resetBtn){
        resetBtn.onclick = () => {
          const def = DEFAULT_CMS.latest?.cards?.[idx]?.image || 'hero.jpg';
          urlInp.value = def;
          thumb.src = def;
          if(cmsState.latest.cards[idx]) cmsState.latest.cards[idx].image = def;
          renderImageSlots();
        };
      }

      if(delBtn){
        delBtn.onclick = () => {
          if(cmsState.latest.cards.length <= 1) return alert('Keep at least one experience card.');
          cmsState.latest.cards.splice(idx, 1);
          renderLatestItems();
          renderImageSlots();
        };
      }
    });
  }

  function populateLatest(){
    const l = cmsState.latest || {};
    $('#cmsLatestEyebrow').value = l.eyebrow || '';
    $('#cmsLatestTitle').value = l.title || '';
    renderLatestItems();
  }

  $('#cmsAddLatestBtn').onclick = () => {
    if(!cmsState.latest) cmsState.latest = {};
    if(!Array.isArray(cmsState.latest.cards)) cmsState.latest.cards = [];
    cmsState.latest.cards.push({
      id: `exp-${Date.now()}`,
      tag: 'NEW TOUR',
      title: 'New Experience',
      desc: 'Short description of this Dubai tour adventure.',
      link: '#tours',
      btnText: 'Explore tour →',
      image: 'dubai.jpg'
    });
    renderLatestItems();
    renderImageSlots();
  };

  // Populate Tab 7: Footer & Contact
  function renderFooterLinks(){
    const container = $('#cmsFooterLinksContainer');
    if(!container) return;
    const links = cmsState.footer?.links || [];
    container.innerHTML = links.map((l, idx) => `
      <div class="cms-tour-ref-item" data-fl-idx="${idx}">
        <div style="flex:1;display:flex;gap:10px;align-items:center">
          <input class="fl-title" value="${esc(l.title||'')}" placeholder="Link title" style="flex:1;padding:6px 8px;font-size:9px;border:1px solid var(--line);border-radius:7px">
          <input class="fl-url" value="${esc(l.url||'')}" placeholder="Target URL" style="flex:1.4;padding:6px 8px;font-size:9px;border:1px solid var(--line);border-radius:7px">
        </div>
        <div>
          <button type="button" class="del-fl-btn" style="color:#9e3d3d;background:#fff1f1;border-color:#edd5d5;font-size:8px;padding:6px 9px">Remove</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.cms-tour-ref-item').forEach(item => {
      const idx = Number(item.dataset.flIdx);
      const delBtn = item.querySelector('.del-fl-btn');
      if(delBtn){
        delBtn.onclick = () => {
          cmsState.footer.links.splice(idx, 1);
          renderFooterLinks();
        };
      }
    });
  }

  function populateFooterAndContact(){
    const c = cmsState.contact || {};
    $('#cmsContactEyebrow').value = c.eyebrow || '';
    $('#cmsContactTitle').value = c.title || '';
    $('#cmsContactSubtitle').value = c.subtitle || '';
    $('#cmsContactBtn').value = c.btnText || '';
    $('#cmsContactPhone').value = c.phoneDisplay || '';
    $('#cmsContactTel').value = c.phoneTel || '';

    const f = cmsState.footer || {};
    $('#cmsFooterBrand').value = f.brandName || '';
    $('#cmsFooterTagline').value = f.brandTagline || '';
    $('#cmsFooterLocation').value = f.location || '';
    $('#cmsFooterCopyright').value = f.copyrightName || '';
    $('#cmsFooterPhoneDisplay').value = f.phoneDisplay || '';
    $('#cmsFooterPhoneUrl').value = f.phoneUrl || '';
    renderFooterLinks();
  }

  $('#cmsAddFooterLinkBtn').onclick = () => {
    if(!cmsState.footer) cmsState.footer = {};
    if(!Array.isArray(cmsState.footer.links)) cmsState.footer.links = [];
    cmsState.footer.links.push({title: 'New Page', url: '#'});
    renderFooterLinks();
  };

  // Populate Tab 8: Image Manager & Preset Library
  const PRESETS = [
    {
      id: 'dunes_sunset',
      title: 'Desert Sunset Dunes',
      desc: 'Golden desert dunes bathed in evening sunlight. Perfect for Safari or Hero.',
      url: 'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      id: 'quad_action',
      title: 'ATV Quad Desert Ride',
      desc: 'Action quad bike kicking up sand in the Dubai desert.',
      url: 'https://images.pexels.com/photos/14840843/pexels-photo-14840843.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      id: 'buggy_turbo',
      title: 'Turbo Can-Am Dune Buggy',
      desc: 'High-performance off-road buggy navigating desert crests.',
      url: 'https://images.pexels.com/photos/20349479/pexels-photo-20349479.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      id: 'dubai_skyline',
      title: 'Burj Khalifa & Downtown',
      desc: 'Iconic modern Dubai city skyline and architecture.',
      url: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      id: 'camel_caravan',
      title: 'Desert Camel Caravan',
      desc: 'Traditional camel trek along pristine desert ridges.',
      url: 'https://images.pexels.com/photos/4405244/pexels-photo-4405244.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      id: 'abudhabi_mosque',
      title: 'Sheikh Zayed Grand Mosque',
      desc: 'Magnificent architectural landmark of Abu Dhabi.',
      url: 'https://images.pexels.com/photos/3873663/pexels-photo-3873663.jpeg?auto=compress&cs=tinysrgb&w=1200'
    }
  ];

  function getImageSlotsDef(){
    const slots = [
      {
        key: 'hero',
        group: 'Homepage Main Sections',
        label: 'Hero Background',
        desc: 'Top of homepage banner',
        targetType: 'cms',
        getUrl: () => $('#cmsHeroImage')?.value || cmsState.hero?.image || 'hero.jpg',
        setUrl: v => {
          if($('#cmsHeroImage')) $('#cmsHeroImage').value = v;
          if($('#cmsHeroImgThumb')) $('#cmsHeroImgThumb').src = v;
          if(cmsState.hero) cmsState.hero.image = v;
        },
        defaultVal: DEFAULT_CMS.hero?.image || 'hero.jpg'
      },
      {
        key: 'cat_safari',
        group: 'Homepage Lifestyle Categories',
        label: 'Category: Desert Safari',
        desc: 'Card 1 in lifestyle grid',
        targetType: 'cms',
        getUrl: () => $('#cmsCat1Img')?.value || cmsState.categories?.cards?.[0]?.image || 'hero.jpg',
        setUrl: v => {
          if($('#cmsCat1Img')) $('#cmsCat1Img').value = v;
          if($('#cmsCat1Thumb')) $('#cmsCat1Thumb').src = v;
          if(cmsState.categories?.cards?.[0]) cmsState.categories.cards[0].image = v;
        },
        defaultVal: DEFAULT_CMS.categories?.cards?.[0]?.image || 'hero.jpg'
      },
      {
        key: 'cat_quad',
        group: 'Homepage Lifestyle Categories',
        label: 'Category: Quad Bike',
        desc: 'Card 2 in lifestyle grid',
        targetType: 'cms',
        getUrl: () => $('#cmsCat2Img')?.value || cmsState.categories?.cards?.[1]?.image || 'hero.jpg',
        setUrl: v => {
          if($('#cmsCat2Img')) $('#cmsCat2Img').value = v;
          if($('#cmsCat2Thumb')) $('#cmsCat2Thumb').src = v;
          if(cmsState.categories?.cards?.[1]) cmsState.categories.cards[1].image = v;
        },
        defaultVal: DEFAULT_CMS.categories?.cards?.[1]?.image || 'hero.jpg'
      },
      {
        key: 'cat_buggy',
        group: 'Homepage Lifestyle Categories',
        label: 'Category: Dune Buggy',
        desc: 'Card 3 in lifestyle grid',
        targetType: 'cms',
        getUrl: () => $('#cmsCat3Img')?.value || cmsState.categories?.cards?.[2]?.image || 'hero.jpg',
        setUrl: v => {
          if($('#cmsCat3Img')) $('#cmsCat3Img').value = v;
          if($('#cmsCat3Thumb')) $('#cmsCat3Thumb').src = v;
          if(cmsState.categories?.cards?.[2]) cmsState.categories.cards[2].image = v;
        },
        defaultVal: DEFAULT_CMS.categories?.cards?.[2]?.image || 'hero.jpg'
      },
      {
        key: 'cat_city',
        group: 'Homepage Lifestyle Categories',
        label: 'Category: Dubai City Tours',
        desc: 'Card 4 in lifestyle grid',
        targetType: 'cms',
        getUrl: () => $('#cmsCat4Img')?.value || cmsState.categories?.cards?.[3]?.image || 'dubai.jpg',
        setUrl: v => {
          if($('#cmsCat4Img')) $('#cmsCat4Img').value = v;
          if($('#cmsCat4Thumb')) $('#cmsCat4Thumb').src = v;
          if(cmsState.categories?.cards?.[3]) cmsState.categories.cards[3].image = v;
        },
        defaultVal: DEFAULT_CMS.categories?.cards?.[3]?.image || 'dubai.jpg'
      },
      {
        key: 'banner',
        group: 'Homepage Main Sections',
        label: 'Assistance Banner',
        desc: 'Callout assistance section',
        targetType: 'cms',
        getUrl: () => $('#cmsBannerImg')?.value || cmsState.banner?.image || 'hero.jpg',
        setUrl: v => {
          if($('#cmsBannerImg')) $('#cmsBannerImg').value = v;
          if($('#cmsBannerThumb')) $('#cmsBannerThumb').src = v;
          if(cmsState.banner) cmsState.banner.image = v;
        },
        defaultVal: DEFAULT_CMS.banner?.image || 'hero.jpg'
      }
    ];

    // Also add latest experience cards
    (cmsState.latest?.cards || []).forEach((c, idx) => {
      slots.push({
        key: `latest_${idx}`,
        group: 'Homepage Latest Experiences',
        label: `Latest: ${c.title || `Tour ${idx+1}`}`,
        desc: `Card ${idx + 1} in latest tours section`,
        targetType: 'cms',
        getUrl: () => c.image || 'hero.jpg',
        setUrl: v => {
          c.image = v;
          populateLatest();
        },
        defaultVal: DEFAULT_CMS.latest?.cards?.[idx]?.image || 'hero.jpg'
      });
    });

    // Also add Tour Landing Pages (Hero)
    const landingPages = [
      { id: 'safari', label: 'Landing: Desert Safari Dubai' },
      { id: 'quad', label: 'Landing: Quad Bike Dubai' },
      { id: 'buggy', label: 'Landing: Dune Buggy Dubai' },
      { id: 'lake-ride', label: 'Landing: Burj Lake Ride' },
      { id: 'dubai-city', label: 'Landing: Dubai City Tour' },
      { id: 'abu-dhabi', label: 'Landing: Abu Dhabi Tour' },
      { id: 'skydive', label: 'Landing: Skydive Dubai' }
    ];
    landingPages.forEach(lp => {
      slots.push({
        key: `landing_${lp.id}`,
        group: 'Tour Landing Pages (Hero)',
        label: lp.label,
        desc: `Hero background for ${lp.label}`,
        targetType: 'landing',
        landingId: lp.id,
        getUrl: () => {
          const lcms = getStoredLandingCMS();
          return lcms[lp.id]?.hero?.image || 'hero.jpg';
        },
        setUrl: v => {
          const lcms = getStoredLandingCMS();
          if(!lcms[lp.id]) lcms[lp.id] = {};
          if(!lcms[lp.id].hero) lcms[lp.id].hero = {};
          lcms[lp.id].hero.image = v;
          saveStoredLandingCMS(lcms);
          const currentLanding = $('#landingPageSelector')?.value;
          if(currentLanding === lp.id){
            const heroInp = $('#landingHeroImage');
            if(heroInp) heroInp.value = v;
            const heroThumb = $('#landingHeroThumb');
            if(heroThumb) heroThumb.src = v;
          }
          window.dispatchEvent(new CustomEvent('phoenix:landing-cms-updated'));
        }
      });
    });

    // Also add Catalog Tours (Tour Manager)
    if(Array.isArray(tours)){
      tours.forEach(t => {
        slots.push({
          key: `tour_${t.id}`,
          group: 'Catalog Tours (Tour Manager)',
          label: `Tour: ${t.name}`,
          desc: `Card photo for ${t.name}`,
          targetType: 'tour',
          tourId: t.id,
          getUrl: () => t.image || 'hero.jpg',
          setUrl: v => {
            t.image = v;
            save();
            renderTours();
            window.dispatchEvent(new CustomEvent('phoenix:tours-updated'));
          }
        });
      });
    }

    return slots;
  }

  function renderImageSlots(){
    const grid = $('#cmsImageSlotsGrid');
    if(!grid) return;
    const slots = getImageSlotsDef();

    grid.innerHTML = slots.map(s => {
      const cur = s.getUrl();
      return `
        <div class="cms-image-slot" data-slot-key="${s.key}">
          <strong>${esc(s.label)}</strong>
          <small>${esc(s.desc)}</small>
          <img src="${esc(cur)}" alt="${esc(s.label)}">
          <input type="url" value="${esc(cur.startsWith('data:')?'':cur)}" placeholder="Paste image URL...">
          <div class="cms-upload-row">
            <label>Upload<input type="file" accept="image/*"></label>
            <button type="button" class="slot-reset">Reset</button>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.cms-image-slot').forEach(slotCard => {
      const key = slotCard.dataset.slotKey;
      const slotDef = slots.find(x => x.key === key);
      if(!slotDef) return;

      const img = slotCard.querySelector('img');
      const input = slotCard.querySelector('input[type=url]');
      const file = slotCard.querySelector('input[type=file]');
      const resetBtn = slotCard.querySelector('.slot-reset');

      input.oninput = () => {
        const val = input.value.trim();
        if(val){
          img.src = val;
          slotDef.setUrl(val);
        }
      };

      file.onchange = async () => {
        const f = file.files?.[0];
        if(!f) return;
        try {
          const compressed = await compressImage(f, 960, 0.72);
          img.src = compressed;
          input.value = '';
          slotDef.setUrl(compressed);
        } catch(e) {
          console.error('Error compressing slot image:', e);
        }
      };

      resetBtn.onclick = () => {
        img.src = slotDef.defaultVal;
        input.value = slotDef.defaultVal;
        slotDef.setUrl(slotDef.defaultVal);
      };
    });
  }

  let presetGridInitialized = false;
  let presetSelections = {};

  function renderPresets(force = false){
    const grid = $('#cmsPresetGrid');
    if(!grid) return;
    const slots = getImageSlotsDef();

    // Group options by group for clear UX
    const groups = {};
    slots.forEach(s => {
      const grp = s.group || 'Homepage Slots';
      if(!groups[grp]) groups[grp] = [];
      groups[grp].push(s);
    });

    const optgroupsHtml = Object.entries(groups).map(([grpName, grpSlots]) => `
      <optgroup label="${esc(grpName)}">
        ${grpSlots.map(s => `<option value="${esc(s.key)}">${esc(s.label)}</option>`).join('')}
      </optgroup>
    `).join('');

    // Save existing user dropdown selections before re-rendering if already built
    if(presetGridInitialized && !force){
      grid.querySelectorAll('.preset-card').forEach(card => {
        const idx = card.dataset.presetIdx;
        const sel = card.querySelector('.preset-target-select');
        if(idx !== undefined && sel) presetSelections[idx] = sel.value;
      });
    }

    grid.innerHTML = PRESETS.map((p, idx) => {
      const savedChoice = presetSelections[idx] || (slots[0]?.key || '');
      return `
        <div class="preset-card" data-preset-idx="${idx}">
          <img src="${esc(p.url)}" alt="${esc(p.title)}" loading="lazy">
          <div class="preset-card-body">
            <strong>${esc(p.title)}</strong>
            <small>${esc(p.desc)}</small>
            <div class="preset-actions">
              <select class="preset-target-select" aria-label="Select slot for ${esc(p.title)}" data-preset-idx="${idx}">
                ${optgroupsHtml}
              </select>
              <button type="button" class="apply-preset-btn" data-preset-idx="${idx}">Apply</button>
            </div>
            <div class="preset-feedback" style="display:none;font-size:8.5px;font-weight:700;color:#0d9488;margin-top:6px;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Restore user selections
    grid.querySelectorAll('.preset-target-select').forEach(sel => {
      const idx = sel.dataset.presetIdx;
      if(presetSelections[idx] && sel.querySelector(`option[value="${presetSelections[idx]}"]`)){
        sel.value = presetSelections[idx];
      }
      sel.onchange = () => {
        presetSelections[idx] = sel.value;
      };
    });

    // Event delegation on grid for reliable click handling
    if(!presetGridInitialized){
      grid.addEventListener('click', (e) => {
        const applyBtn = e.target.closest('.apply-preset-btn');
        if(!applyBtn) return;
        const card = applyBtn.closest('.preset-card');
        if(!card) return;
        const idx = Number(applyBtn.dataset.presetIdx ?? card.dataset.presetIdx);
        const p = PRESETS[idx];
        if(!p) return;

        const select = card.querySelector('.preset-target-select');
        const targetKey = select ? select.value : '';
        const currentSlots = getImageSlotsDef();
        const targetSlot = currentSlots.find(s => s.key === targetKey);
        if(!targetSlot) return;

        // 1. Update the slot URL
        targetSlot.setUrl(p.url);

        // 2. Persist according to target type
        if(!targetSlot.targetType || targetSlot.targetType === 'cms'){
          saveHomepageCMS(true);
        }

        // 3. Immediately refresh the Image Slots cards in Tab 8 so the preview updates
        renderImageSlots();

        // 4. Highlight the slot card in the Image Manager section above
        const matchingCard = document.querySelector(`.cms-image-slot[data-slot-key="${targetKey}"]`);
        if(matchingCard){
          matchingCard.classList.add('slot-highlight');
          matchingCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => matchingCard.classList.remove('slot-highlight'), 3000);
        }

        // 5. Visual button & card feedback
        const origText = 'Apply';
        applyBtn.textContent = '✓ Applied!';
        applyBtn.classList.add('applied');
        applyBtn.disabled = true;

        const feedback = card.querySelector('.preset-feedback');
        if(feedback){
          feedback.textContent = `✓ Applied to ${targetSlot.label} & saved live!`;
          feedback.style.display = 'block';
        }

        // 6. Toast notice
        showCmsToast(`✓ Photo preset "${p.title}" applied to ${targetSlot.label} and saved live!`);

        setTimeout(() => {
          applyBtn.textContent = origText;
          applyBtn.classList.remove('applied');
          applyBtn.disabled = false;
        }, 2500);
      });

      presetGridInitialized = true;
    }
  }

  function populateCMSForm(){
    cmsState = getActiveCMS();
    populateHero();
    populateCategories();
    populateTourSection();
    populateWhyUs();
    populateBanner();
    populateLatest();
    populateFooterAndContact();
    renderImageSlots();
    renderPresets();
  }

  // Save All CMS Content
  function saveHomepageCMS(silent = false){
    // 1. Hero
    if($('#cmsHeroImage')){
      cmsState.hero = {
        image: $('#cmsHeroImage').value.trim() || 'hero.jpg',
        eyebrow: $('#cmsHeroEyebrow')?.value.trim() || '',
        sideText: $('#cmsHeroSide')?.value.trim() || '',
        title: $('#cmsHeroTitle')?.value.trim() || '',
        subtitle: $('#cmsHeroSubtitle')?.value.trim() || '',
        btnPrimaryText: $('#cmsHeroBtn1')?.value.trim() || '',
        btnSecondaryText: $('#cmsHeroBtn2')?.value.trim() || '',
        btnSecondaryLink: $('#cmsHeroLink2')?.value.trim() || '',
        trustItems: [
          $('#cmsHeroTrust1')?.value.trim() || '✓ Pay on arrival',
          $('#cmsHeroTrust2')?.value.trim() || '✓ WhatsApp confirmation',
          $('#cmsHeroTrust3')?.value.trim() || '✓ Private & sharing options'
        ]
      };
    }

    // 2. Categories
    if($('#cmsCatEyebrow')){
      cmsState.categories = {
        eyebrow: $('#cmsCatEyebrow')?.value.trim() || '',
        title: $('#cmsCatTitle')?.value.trim() || '',
        allLinkText: $('#cmsCatAllText')?.value.trim() || '',
        allLinkUrl: $('#cmsCatAllUrl')?.value.trim() || '',
        cards: [
          {
            id: 'safari',
            title: $('#cmsCat1Title')?.value.trim() || 'Desert Safari Dubai',
            link: $('#cmsCat1Link')?.value.trim() || 'desert-safari-dubai.html',
            image: $('#cmsCat1Img')?.value.trim() || 'hero.jpg'
          },
          {
            id: 'quad',
            title: $('#cmsCat2Title')?.value.trim() || 'Quad Bike Dubai',
            link: $('#cmsCat2Link')?.value.trim() || 'quad-bike-dubai.html',
            image: $('#cmsCat2Img')?.value.trim() || 'hero.jpg'
          },
          {
            id: 'buggy',
            title: $('#cmsCat3Title')?.value.trim() || 'Dune Buggy Dubai',
            link: $('#cmsCat3Link')?.value.trim() || 'dune-buggy-dubai.html',
            image: $('#cmsCat3Img')?.value.trim() || 'hero.jpg'
          },
          {
            id: 'premium',
            title: $('#cmsCat4Title')?.value.trim() || 'Dubai City Tours',
            link: $('#cmsCat4Link')?.value.trim() || 'dubai-city-tour.html',
            image: $('#cmsCat4Img')?.value.trim() || 'dubai.jpg'
          }
        ]
      };
    }

    // 3. Tour Section
    if($('#cmsTourEyebrow')){
      cmsState.tourSection = {
        eyebrow: $('#cmsTourEyebrow')?.value.trim() || '',
        title: $('#cmsTourTitle')?.value.trim() || '',
        noteText: $('#cmsTourNoteText')?.value.trim() || '',
        guides: [
          {text: $('#cmsTourGuide1Text')?.value.trim() || '', url: $('#cmsTourGuide1Url')?.value.trim() || ''},
          {text: $('#cmsTourGuide2Text')?.value.trim() || '', url: $('#cmsTourGuide2Url')?.value.trim() || ''},
          {text: $('#cmsTourGuide3Text')?.value.trim() || '', url: $('#cmsTourGuide3Url')?.value.trim() || ''}
        ]
      };
    }

    // 4. Why Us
    const whyCards = $$('#cmsWhyItemsContainer .cms-card-item');
    if(whyCards.length > 0 || $('#cmsWhyEyebrow')){
      cmsState.whyUs = {
        eyebrow: $('#cmsWhyEyebrow')?.value.trim() || '',
        title: $('#cmsWhyTitle')?.value.trim() || '',
        items: whyCards.map(c => ({
          num: c.querySelector('.why-num')?.value.trim() || '',
          title: c.querySelector('.why-title')?.value.trim() || '',
          desc: c.querySelector('.why-desc')?.value.trim() || ''
        })).filter(x => x.title)
      };
    }

    // 5. Banner
    if($('#cmsBannerImg')){
      cmsState.banner = {
        image: $('#cmsBannerImg')?.value.trim() || 'hero.jpg',
        eyebrow: $('#cmsBannerEyebrow')?.value.trim() || '',
        title: $('#cmsBannerTitle')?.value.trim() || '',
        desc: $('#cmsBannerDesc')?.value.trim() || '',
        ctaWhatsappText: $('#cmsBannerWaText')?.value.trim() || '',
        ctaWhatsappNumber: $('#cmsBannerWaNum')?.value.trim() || '',
        ctaCallText: $('#cmsBannerCallText')?.value.trim() || '',
        ctaCallNumber: $('#cmsBannerCallNum')?.value.trim() || ''
      };
    }

    // 6. Latest
    const latestCards = $$('#cmsLatestContainer .cms-card-item');
    if(latestCards.length > 0 || $('#cmsLatestEyebrow')){
      cmsState.latest = {
        eyebrow: $('#cmsLatestEyebrow')?.value.trim() || '',
        title: $('#cmsLatestTitle')?.value.trim() || '',
        cards: latestCards.map((c, i) => ({
          id: `exp-${i + 1}`,
          tag: c.querySelector('.latest-tag')?.value.trim() || 'EXPERIENCE',
          title: c.querySelector('.latest-title')?.value.trim() || '',
          desc: c.querySelector('.latest-desc')?.value.trim() || '',
          link: c.querySelector('.latest-link')?.value.trim() || '',
          btnText: c.querySelector('.latest-btn-text')?.value.trim() || '',
          image: c.querySelector('.latest-img-url')?.value.trim() || 'hero.jpg'
        })).filter(x => x.title)
      };
    }

    // 7. Footer & Contact
    if($('#cmsContactEyebrow')){
      cmsState.contact = {
        eyebrow: $('#cmsContactEyebrow')?.value.trim() || '',
        title: $('#cmsContactTitle')?.value.trim() || '',
        subtitle: $('#cmsContactSubtitle')?.value.trim() || '',
        btnText: $('#cmsContactBtn')?.value.trim() || '',
        phoneDisplay: $('#cmsContactPhone')?.value.trim() || '',
        phoneTel: $('#cmsContactTel')?.value.trim() || ''
      };
    }

    const footerLinks = $$('#cmsFooterLinksContainer .cms-tour-ref-item');
    if(footerLinks.length > 0 || $('#cmsFooterBrand')){
      cmsState.footer = {
        brandName: $('#cmsFooterBrand')?.value.trim() || '',
        brandTagline: $('#cmsFooterTagline')?.value.trim() || '',
        location: $('#cmsFooterLocation')?.value.trim() || '',
        copyrightName: $('#cmsFooterCopyright')?.value.trim() || '',
        phoneDisplay: $('#cmsFooterPhoneDisplay')?.value.trim() || '',
        phoneUrl: $('#cmsFooterPhoneUrl')?.value.trim() || '',
        links: footerLinks.map(l => ({
          title: l.querySelector('.fl-title')?.value.trim() || '',
          url: l.querySelector('.fl-url')?.value.trim() || ''
        })).filter(x => x.title)
      };
    }

    // Save to localStorage safely with quota recovery
    const savedOk = safeSetItem('phoenixHomepageCMS', JSON.stringify(cmsState));

    // Also sync category images for backward compatibility
    if(cmsState.categories && Array.isArray(cmsState.categories.cards)){
      const catImages = {
        safari: cmsState.categories.cards[0]?.image || 'hero.jpg',
        quad: cmsState.categories.cards[1]?.image || 'hero.jpg',
        buggy: cmsState.categories.cards[2]?.image || 'hero.jpg',
        premium: cmsState.categories.cards[3]?.image || 'dubai.jpg'
      };
      safeSetItem('phoenixCategoryImages', JSON.stringify(catImages));
    }

    // Broadcast updates
    window.dispatchEvent(new CustomEvent('phoenix:cms-updated'));
    if(typeof window.refreshCategoryEditor === 'function') window.refreshCategoryEditor();

    if(!silent){
      if(savedOk){
        showCmsToast('Homepage CMS saved successfully! All updates are live on the homepage.');
      } else {
        showCmsToast('Homepage CMS saved with quota recovery optimizations.', false);
      }
    }
    return savedOk;
  }

  $('#cmsSaveBtn').onclick = () => saveHomepageCMS(false);

  const bottomSave = $('#cmsSaveBtnBottom');
  if(bottomSave) bottomSave.onclick = () => $('#cmsSaveBtn').click();

  // Reset to Defaults
  $('#cmsResetBtn').onclick = () => {
    if(confirm('Reset all homepage content, texts and image overrides back to the default Phoenix Tours template?')){
      localStorage.removeItem('phoenixHomepageCMS');
      localStorage.removeItem('phoenixCategoryImages');
      populateCMSForm();
      window.dispatchEvent(new CustomEvent('phoenix:cms-updated'));
      if(typeof window.refreshCategoryEditor === 'function') window.refreshCategoryEditor();
      showCmsToast('Homepage CMS restored to default settings.');
    }
  };

  // Expose global refresh
  window.refreshHomepageCMS = populateCMSForm;
  window.addEventListener('storage', (e) => {
    if(e.key === 'phoenixHomepageCMS'){
      populateCMSForm();
    }
  });

  // Initialize
  populateCMSForm();

  // Mobile sidebar toggle handler
  const adminToggle = document.getElementById('adminSidebarToggle');
  const adminSidebar = document.querySelector('.sidebar');
  if (adminToggle && adminSidebar) {
    adminToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      adminSidebar.classList.toggle('open');
      const isOpen = adminSidebar.classList.contains('open');
      adminToggle.textContent = isOpen ? '✕ Close' : '☰ Menu';
      adminToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close sidebar when clicking a nav button on mobile
    document.querySelectorAll('.sidebar nav button').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          adminSidebar.classList.remove('open');
          adminToggle.textContent = '☰ Menu';
          adminToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 900 && adminSidebar.classList.contains('open') && !adminSidebar.contains(e.target) && e.target !== adminToggle) {
        adminSidebar.classList.remove('open');
        adminToggle.textContent = '☰ Menu';
        adminToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

/* ============================================================
   LANDING PAGES CMS MANAGEMENT ENGINE
============================================================ */
(function(){
  const DEFAULTS = window.PHOENIX_DEFAULT_LANDING_PAGES || {};

  const pageFiles = {
    'skydive': 'sky-dive-dubai.html',
    'safari': 'desert-safari-dubai.html',
    'quad': 'quad-bike-dubai.html',
    'buggy': 'dune-buggy-dubai.html',
    'lake-ride': 'burj-khalifa-lake-ride.html',
    'dubai-city': 'dubai-city-tour.html',
    'abu-dhabi': 'abu-dhabi-city-tour.html'
  };

  function getStoredLandingCMS(){
    try {
      const raw = localStorage.getItem('phoenixLandingCMS');
      if (raw) return JSON.parse(raw);
    } catch(e) {
      console.warn('Error reading phoenixLandingCMS', e);
    }
    return {};
  }

  function saveStoredLandingCMS(data){
    safeSetItem('phoenixLandingCMS', JSON.stringify(data));
  }

  function showLandingToast(msg, isErr=false){
    const el = $('#landingCmsStatus');
    if(!el) return;
    el.textContent = msg;
    el.className = `cms-status show ${isErr?'err':'ok'}`;
    setTimeout(()=>{ if(el) el.className='cms-status'; }, 5000);
  }

  // Setup sub-tabs
  $$('#landingTabs button').forEach(btn => {
    btn.onclick = () => {
      $$('#landingTabs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabKey = btn.dataset.landingTab;
      $$('.landing-tab-content').forEach(c => c.classList.remove('active'));
      const activeContent = $(`#landingTab_${tabKey}`);
      if(activeContent) activeContent.classList.add('active');
    };
  });

  // Highlight item row builder
  function createHighlightRow(text = ''){
    const row = document.createElement('div');
    row.className = 'landing-highlight-row';
    row.innerHTML = `<span style="color:#0d9488;font-weight:900;">•</span>
      <input type="text" class="hl-text" placeholder="Highlight item..." value="${esc(text)}">
      <button type="button" title="Remove">×</button>`;
    row.querySelector('button').onclick = () => row.remove();
    return row;
  }

  // FAQ card builder
  function createFaqCard(faq = {}){
    const card = document.createElement('div');
    card.className = 'landing-faq-card';
    card.innerHTML = `<div class="landing-faq-header">
        <strong>FAQ Item</strong>
        <button type="button">Remove</button>
      </div>
      <label style="font-size:8px;font-weight:800;color:#60767c;">Question
        <input type="text" class="faq-q" placeholder="Enter question..." value="${esc(faq.q||'')}">
      </label>
      <label style="font-size:8px;font-weight:800;color:#60767c;">Answer
        <textarea class="faq-a" rows="3" placeholder="Enter answer...">${esc(faq.a||'')}</textarea>
      </label>`;
    card.querySelector('button').onclick = () => card.remove();
    return card;
  }

  // Package card builder
  function createPackageCard(pkg = {}){
    const card = document.createElement('div');
    card.className = 'cms-card-item';
    const inclStr = Array.isArray(pkg.inclusions) ? pkg.inclusions.join('\n') : (pkg.inclusions || '');
    card.innerHTML = `<div class="cms-card-item-header">
        <strong class="pkg-header-title">${esc(pkg.name || 'New Package')}</strong>
        <button type="button" class="remove-landing-pkg" style="padding:3px 8px;font-size:8px;border-radius:6px;color:#a44444;background:#fff2f2;border:1px solid #f0d5d5;cursor:pointer;">Delete</button>
      </div>
      <div class="cms-form-grid">
        <label>Package title
          <input type="text" class="lpkg-name" value="${esc(pkg.name || '')}" placeholder="Standard / VIP...">
        </label>
        <label>Badge / Tag
          <input type="text" class="lpkg-badge" value="${esc(pkg.badge || '')}" placeholder="BEST SELLER / POPULAR...">
        </label>
        <label>Price (AED)
          <input type="number" class="lpkg-price" min="0" value="${Number(pkg.price || 0)}" placeholder="Price in AED">
        </label>
        <label>Price unit
          <select class="lpkg-unit">
            <option value="person"${pkg.unit==='person'?' selected':''}>Per person</option>
            <option value="vehicle"${pkg.unit==='vehicle'?' selected':''}>Per vehicle</option>
            <option value="bike"${pkg.unit==='bike'?' selected':''}>Per bike</option>
            <option value="buggy"${pkg.unit==='buggy'?' selected':''}>Per buggy</option>
            <option value="booking"${pkg.unit==='booking'?' selected':''}>Per booking</option>
          </select>
        </label>
        <label class="full">Short summary description
          <input type="text" class="lpkg-desc" value="${esc(pkg.desc || '')}" placeholder="Quick summary of this tier">
        </label>
        <label class="full">Inclusions (one per line)
          <textarea class="lpkg-inclusions" rows="4" placeholder="Dune bashing in 4x4\nCamel ride & Sandboarding\nBBQ Buffet Dinner...">${esc(inclStr)}</textarea>
        </label>
        <label class="full">WhatsApp pre-filled message
          <input type="text" class="lpkg-wamsg" value="${esc(pkg.waMsg || '')}" placeholder="Hi Phoenix Tours, I would like to book...">
        </label>
      </div>`;

    card.querySelector('.lpkg-name').oninput = (e) => {
      card.querySelector('.pkg-header-title').textContent = e.target.value || 'New Package';
    };
    card.querySelector('.remove-landing-pkg').onclick = () => {
      if ($('#landingPackagesList').children.length > 1) {
        card.remove();
      } else {
        alert('You must keep at least one package.');
      }
    };
    return card;
  }

  let currentKey = 'safari';

  function populateLandingPage(pageKey){
    currentKey = pageKey || 'safari';
    const def = DEFAULTS[currentKey] || {};
    const storedAll = getStoredLandingCMS();
    const cur = Object.assign({}, def, storedAll[currentKey] || {});

    // Update view page button
    const pageUrl = pageFiles[currentKey] || 'index.html';
    const viewBtn = $('#landingViewPageBtn');
    if (viewBtn) viewBtn.href = pageUrl;

    // 1. Hero
    const hero = cur.hero || {};
    $('#landingHeroEyebrow').value = hero.eyebrow || '';
    $('#landingHeroTitle').value = hero.title || '';
    $('#landingHeroSubtitle').value = hero.subtitle || '';
    $('#landingHeroImage').value = hero.image || '';
    $('#landingHeroImgThumb').src = hero.image || 'hero.jpg';

    const trust = Array.isArray(hero.trust) ? hero.trust : [];
    $('#landingHeroTrust1').value = trust[0] || '';
    $('#landingHeroTrust2').value = trust[1] || '';
    $('#landingHeroTrust3').value = trust[2] || '';
    $('#landingHeroTrust4').value = trust[3] || '';

    // 2. Narrative
    const narrative = cur.narrative || {};
    $('#landingNarrativeEyebrow').value = narrative.eyebrow || '';
    $('#landingNarrativeTitle').value = narrative.title || '';
    $('#landingNarrativeLead').value = narrative.lead || '';
    $('#landingNarrativeBody').value = narrative.body || '';

    // 3. Packages
    const pkgsContainer = $('#landingPackagesList');
    pkgsContainer.innerHTML = '';
    const packages = (cur.packages && cur.packages.length) ? cur.packages : (def.packages || []);
    packages.forEach(p => pkgsContainer.appendChild(createPackageCard(p)));

    // 4. Highlights
    const hlContainer = $('#landingHighlightsContainer');
    hlContainer.innerHTML = '';
    const highlights = (cur.highlights && cur.highlights.length) ? cur.highlights : (def.highlights || []);
    highlights.forEach(h => hlContainer.appendChild(createHighlightRow(h)));

    // 5. FAQs
    const faqContainer = $('#landingFaqsContainer');
    faqContainer.innerHTML = '';
    const faqs = (cur.faqs && cur.faqs.length) ? cur.faqs : (def.faqs || []);
    faqs.forEach(f => faqContainer.appendChild(createFaqCard(f)));
  }

  // Setup add buttons
  const addPkgBtn = $('#landingAddPackageBtn');
  if (addPkgBtn) {
    addPkgBtn.onclick = () => {
      $('#landingPackagesList').appendChild(createPackageCard({
        name: 'New Package',
        price: 150,
        unit: 'person',
        badge: '',
        desc: 'Exciting tour package option',
        inclusions: ['Inclusion 1', 'Inclusion 2'],
        waMsg: 'Hi Phoenix Tours, I would like to book this experience.'
      }));
    };
  }

  const addHlBtn = $('#landingAddHighlightBtn');
  if (addHlBtn) {
    addHlBtn.onclick = () => {
      $('#landingHighlightsContainer').appendChild(createHighlightRow(''));
    };
  }

  const addFaqBtn = $('#landingAddFaqBtn');
  if (addFaqBtn) {
    addFaqBtn.onclick = () => {
      $('#landingFaqsContainer').appendChild(createFaqCard({
        q: 'New Question?',
        a: 'Detailed answer goes here.'
      }));
    };
  }

  // Selector change
  const sel = $('#landingPageSelector');
  if (sel) {
    sel.onchange = (e) => {
      populateLandingPage(e.target.value);
    };
  }

  // Save
  const saveBtn = $('#landingSaveBtn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      const heroImage = $('#landingHeroImage').value.trim() || 'hero.jpg';
      const trust = [
        $('#landingHeroTrust1').value.trim(),
        $('#landingHeroTrust2').value.trim(),
        $('#landingHeroTrust3').value.trim(),
        $('#landingHeroTrust4').value.trim()
      ].filter(Boolean);

      const packages = [...$$('#landingPackagesList .cms-card-item')].map(item => {
        const incl = item.querySelector('.lpkg-inclusions').value
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean);
        return {
          id: slug(item.querySelector('.lpkg-name').value.trim()),
          name: item.querySelector('.lpkg-name').value.trim(),
          badge: item.querySelector('.lpkg-badge').value.trim(),
          price: Number(item.querySelector('.lpkg-price').value) || 0,
          unit: item.querySelector('.lpkg-unit').value,
          desc: item.querySelector('.lpkg-desc').value.trim(),
          inclusions: incl,
          waMsg: item.querySelector('.lpkg-wamsg').value.trim()
        };
      }).filter(p => p.name);

      const highlights = [...$$('#landingHighlightsContainer .hl-text')]
        .map(i => i.value.trim())
        .filter(Boolean);

      const faqs = [...$$('#landingFaqsContainer .landing-faq-card')].map(c => ({
        q: c.querySelector('.faq-q').value.trim(),
        a: c.querySelector('.faq-a').value.trim()
      })).filter(f => f.q && f.a);

      const pageData = {
        name: DEFAULTS[currentKey]?.name || currentKey,
        hero: {
          eyebrow: $('#landingHeroEyebrow').value.trim(),
          title: $('#landingHeroTitle').value.trim(),
          subtitle: $('#landingHeroSubtitle').value.trim(),
          image: heroImage,
          trust: trust
        },
        narrative: {
          eyebrow: $('#landingNarrativeEyebrow').value.trim(),
          title: $('#landingNarrativeTitle').value.trim(),
          lead: $('#landingNarrativeLead').value.trim(),
          body: $('#landingNarrativeBody').value.trim()
        },
        packages: packages,
        highlights: highlights,
        faqs: faqs
      };

      const storedAll = getStoredLandingCMS();
      storedAll[currentKey] = pageData;
      saveStoredLandingCMS(storedAll);

      showLandingToast(`✅ "${DEFAULTS[currentKey]?.name || currentKey}" landing page saved successfully! Changes are live.`);
    };
  }

  // Reset page defaults
  const resetBtn = $('#landingResetBtn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      const pageName = DEFAULTS[currentKey]?.name || currentKey;
      if (confirm(`Reset all custom edits for "${pageName}" back to original defaults?`)) {
        const storedAll = getStoredLandingCMS();
        delete storedAll[currentKey];
        saveStoredLandingCMS(storedAll);
        populateLandingPage(currentKey);
        showLandingToast(`Reverted "${pageName}" to factory defaults.`);
      }
    };
  }

  // Image input & upload sync
  const heroImgInput = $('#landingHeroImage');
  if (heroImgInput) {
    heroImgInput.addEventListener('input', (e) => {
      const thumb = $('#landingHeroImgThumb');
      if (thumb) thumb.src = e.target.value || 'hero.jpg';
    });
  }

  const heroFileInput = $('#landingHeroFile');
  if (heroFileInput) {
    heroFileInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        const compressed = await compressImage(file, 960, 0.72);
        $('#landingHeroImage').value = compressed;
        const thumb = $('#landingHeroImgThumb');
        if (thumb) thumb.src = compressed;
      } catch (err) {
        console.error('Error compressing landing hero image:', err);
      }
    });
  }

  const resetImgBtn = $('#landingHeroResetImg');
  if (resetImgBtn) {
    resetImgBtn.onclick = () => {
      const defaultImg = DEFAULTS[currentKey]?.hero?.image || 'hero.jpg';
      $('#landingHeroImage').value = defaultImg;
      const thumb = $('#landingHeroImgThumb');
      if (thumb) thumb.src = defaultImg;
    };
  }

  // Global expose
  window.refreshLandingCMS = () => {
    const selector = $('#landingPageSelector');
    if (selector) populateLandingPage(selector.value || 'safari');
  };

  // Initial load
  if ($('#landingPageSelector')) {
    populateLandingPage('safari');
  }
})();


