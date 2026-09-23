import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Main Website CSS
const styleCss = `:root {
  --navy: #063c49;
  --navy-dark: #032128;
  --aqua: #0d9488;
  --cyan: #22d3ee;
  --gold: #f59e0b;
  --bg: #f8fafc;
  --card-bg: #ffffff;
  --text: #0f172a;
  --muted: #475569;
  --line: #e2e8f0;
  --shadow: 0 10px 30px -5px rgba(6, 60, 73, 0.08);
  --font-main: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  font-family: var(--font-main);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

.site-header {
  background: #052f39;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 5%;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.brand {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.brand-logo {
  height: 52px;
  width: auto;
  object-fit: contain;
}

.site-header nav {
  display: flex;
  gap: 18px;
  align-items: center;
}
.site-header nav a {
  color: #e2e8f0;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  transition: color 0.2s ease;
}
.site-header nav a:hover {
  color: #22d3ee;
}
.site-header nav a.nav-dashboard {
  background: rgba(34, 211, 238, 0.15);
  color: #22d3ee;
  border: 1px solid rgba(34, 211, 238, 0.4);
  padding: 6px 14px;
  border-radius: 8px;
  font-weight: 800;
}
.site-header nav a.nav-dashboard:hover {
  background: rgba(34, 211, 238, 0.3);
}

.header-phone {
  background: rgba(13, 148, 136, 0.2);
  color: #22d3ee;
  border: 1px solid rgba(34, 211, 238, 0.3);
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 13px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.header-phone:hover {
  background: rgba(13, 148, 136, 0.4);
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.hero {
  position: relative;
  min-height: 75vh;
  display: flex;
  align-items: center;
  padding: 80px 5%;
  background: linear-gradient(135deg, #052f39 0%, #063c49 60%, #0d9488 100%);
  color: #fff;
  overflow: hidden;
}
.hero-content { position: relative; z-index: 2; max-width: 750px; }
.eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 12px;
}
.eyebrow.dark { color: var(--aqua); }
h1, .hero h1 {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 900;
  line-height: 1.15;
  margin: 0 0 20px;
  letter-spacing: -0.5px;
}
.hero p { font-size: 18px; color: #cce4e2; margin-bottom: 30px; max-width: 650px; }

.section { padding: 70px 5%; max-width: 1300px; margin: 0 auto; }
.section-title { margin-bottom: 40px; text-align: center; }
.section-title h2 { font-size: 32px; color: var(--navy); font-weight: 900; margin: 0 0 10px; }
.section-title p { color: var(--muted); font-size: 16px; margin: 0; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
}
.btn:hover { transform: translateY(-2px); }
.btn-gold { background: var(--gold); color: #000; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4); }
.btn-primary { background: var(--navy); color: #fff; }
.btn-whatsapp { background: #25d366; color: #fff; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4); }

.tour-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}
.ride-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
}
.ride-card-media { position: relative; height: 220px; }
.ride-card-media img { width: 100%; height: 100%; object-fit: cover; }
.badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--navy);
  color: #fff;
  font-weight: 900;
  font-size: 10px;
  padding: 6px 12px;
  border-radius: 50px;
  letter-spacing: 1px;
}
.duration {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  color: #fff;
  font-weight: 800;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 6px;
}
.ride-card-body { padding: 24px; display: flex; flex-direction: column; flex: 1; }
.ride-card-body h3 { font-size: 20px; font-weight: 800; color: var(--navy); margin: 0 0 10px; }
.ride-card-body p { color: var(--muted); font-size: 14px; margin: 0 0 20px; flex: 1; }
.price-row { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
.price-tag { font-size: 22px; font-weight: 900; color: var(--aqua); }

.faq-section {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 32px;
  margin: 40px 0;
}
.faq-section h3 { font-size: 22px; color: var(--navy); margin-top: 0; }
.faq-item { margin-bottom: 20px; border-bottom: 1px solid var(--line); padding-bottom: 16px; }
.faq-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.faq-question { font-size: 16px; font-weight: 800; color: var(--navy); margin: 0 0 8px; }
.faq-answer { font-size: 14px; color: var(--muted); margin: 0; }

.geo-entity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin: 32px 0;
  padding: 24px;
  background: #f0f7f6;
  border: 1px solid #d0e4e1;
  border-radius: 18px;
}
.geo-entity-card {
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--line);
  box-shadow: 0 4px 12px rgba(6, 60, 73, 0.04);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.geo-entity-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--aqua);
}
.geo-entity-val {
  font-size: 14px;
  font-weight: 700;
  color: var(--navy);
  line-height: 1.4;
}

.site-footer {
  background: #052932;
  color: #a8c0c7;
  padding: 60px 5% 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.footer-logo { height: 50px; width: auto; object-fit: contain; }
.footer-bottom { text-align: center; padding-top: 30px; font-size: 13px; color: #6d8890; }

@media (max-width: 900px) {
  .site-header nav { display: none; }
  .menu-btn { display: grid; place-items: center; margin-left: auto; }
  .hero { padding: 60px 5%; text-align: center; }
  .hero p { margin-left: auto; margin-right: auto; }
}
`;
fs.writeFileSync(path.join(distDir, 'style.css'), styleCss);

// 2. Admin Dashboard CSS
const adminCss = `:root {
  --navy: #063c49;
  --navy-dark: #032128;
  --aqua: #0d9488;
  --cyan: #22d3ee;
  --gold: #f59e0b;
  --bg: #f1f5f9;
  --panel: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
  --line: #cbd5e1;
  --danger: #ef4444;
  --success: #10b981;
  --shadow: 0 4px 18px rgba(6, 60, 73, 0.06);
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* APP WRAPPER */
#appWrapper {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* SIDEBAR */
.sidebar {
  width: 270px;
  background: #052932;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.3s ease;
  z-index: 100;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.admin-brand-logo { height: 42px; width: auto; object-fit: contain; }

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-group-title {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.2px;
  color: #64748b;
  text-transform: uppercase;
  margin: 16px 12px 6px;
}

.sidebar-nav button {
  background: none;
  border: none;
  color: #94a3b8;
  padding: 11px 16px;
  border-radius: 10px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  font-size: 13.5px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  transition: all 0.2s ease;
}

.sidebar-nav button:hover, .sidebar-nav button.active {
  background: rgba(13, 148, 136, 0.25);
  color: #22d3ee;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* MAIN CONTENT */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-y: auto;
}

.top-bar {
  background: #ffffff;
  border-bottom: 1px solid var(--line);
  padding: 14px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 90;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mobile-nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 22px;
  color: var(--navy);
  cursor: pointer;
}

.view-container {
  padding: 28px 32px;
  flex: 1;
}

.view { display: none; }
.view.active { display: block; }

/* UI COMPONENTS */
.panel {
  background: #ffffff;
  padding: 24px 28px;
  border-radius: 16px;
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  margin-bottom: 24px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.stat-card {
  background: #ffffff;
  padding: 22px;
  border-radius: 14px;
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-label { font-size: 11px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; }
.stat-val { font-size: 26px; font-weight: 900; color: var(--navy); }
.stat-sub { font-size: 12px; font-weight: 700; color: var(--aqua); }

/* TABLES */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13.5px;
}

th {
  background: #f8fafc;
  padding: 14px 16px;
  font-weight: 800;
  color: var(--navy);
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}

td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
  color: var(--text);
  vertical-align: middle;
}

tr:hover { background: #f8fafc; }

/* BADGES & BUTTONS */
.badge-status {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.badge-confirmed, .badge-published, .badge-good, .badge-converted { background: #d1fae5; color: #047857; }
.badge-pending, .badge-new, .badge-needs-improvement { background: #fef3c7; color: #b45309; }
.badge-cancelled, .badge-critical, .badge-draft { background: #fee2e2; color: #b91c1c; }

.btn-admin {
  padding: 9px 16px;
  border-radius: 8px;
  font-weight: 800;
  font-size: 13px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s;
}
.btn-admin:hover { opacity: 0.9; }
.btn-navy { background: var(--navy); color: #fff; }
.btn-aqua { background: var(--aqua); color: #fff; }
.btn-gold { background: var(--gold); color: #000; }
.btn-outline { background: none; border: 1px solid var(--line); color: var(--text); }
.btn-danger { background: var(--danger); color: #fff; }

/* MODALS & OVERLAYS */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: none;
  place-items: center;
  padding: 20px;
}

.modal-overlay.active { display: grid; }

.modal-card {
  background: #ffffff;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  border-radius: 18px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: 18px 24px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

/* FORMS */
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-weight: 800; font-size: 12.5px; margin-bottom: 6px; color: var(--navy); }
.form-control {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-family: inherit;
  font-size: 13.5px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

/* TOAST NOTIFICATIONS */
#toastContainer {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  background: #052932;
  color: #fff;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  border-left: 4px solid var(--cyan);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* MOBILE RESPONSIVE */
@media (max-width: 900px) {
  #appWrapper { flex-direction: column; }
  .sidebar { width: 100%; }
  .sidebar-nav { flex-direction: row; overflow-x: auto; padding-bottom: 10px; }
  .sidebar-nav button { white-space: nowrap; flex-shrink: 0; width: auto; }
  .mobile-nav-toggle { display: block; }
  .view-container { padding: 16px; }
  .top-bar { padding: 12px 16px; }
}
`;
fs.writeFileSync(path.join(distDir, 'admin.css'), adminCss);

// 3. Admin Dashboard Client Script
const adminJs = `// Phoenix Travel & Tours Admin Dashboard Application Script
document.addEventListener('DOMContentLoaded', () => {
  let authToken = localStorage.getItem('px_admin_token') || '';
  let currentUser = null;

  const views = ['overview', 'cms', 'tours', 'bookings', 'media', 'seo', 'aeo', 'geo', 'schema', 'menus', 'faqs', 'testimonials', 'leads', 'settings', 'users', 'activity'];

  // API Client
  async function apiFetch(url, method = 'GET', body = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (authToken) headers['Authorization'] = \`Bearer \${authToken}\`;
    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);
    try {
      const res = await fetch(url, opts);
      if (res.status === 401) {
        showLoginScreen();
        throw new Error('Unauthorized session.');
      }
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  }

  // Toast notification
  window.showToast = (msg, type = 'info') => {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  };

  // Login Modal Handler
  function showLoginScreen() {
    document.getElementById('loginOverlay')?.classList.add('active');
  }

  function hideLoginScreen() {
    document.getElementById('loginOverlay')?.classList.remove('active');
  }

  // Login Form Submission
  const loginForm = document.getElementById('adminLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userVal = document.getElementById('loginUsername')?.value;
      const pwdVal = document.getElementById('loginPassword')?.value;
      const statusDiv = document.getElementById('loginStatus');
      statusDiv.textContent = 'Authenticating...';
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: userVal, password: pwdVal })
        });
        const data = await res.json();
        if (data.success && data.token) {
          authToken = data.token;
          localStorage.setItem('px_admin_token', authToken);
          currentUser = data.user;
          hideLoginScreen();
          showToast('Welcome back, ' + currentUser.name, 'success');
          loadDashboardData();
        } else {
          statusDiv.textContent = data.error || 'Invalid credentials.';
        }
      } catch (err) {
        statusDiv.textContent = 'Network or server error.';
      }
    });
  }

  // Logout Handler
  document.getElementById('btnLogout')?.addEventListener('click', () => {
    localStorage.removeItem('px_admin_token');
    authToken = '';
    showLoginScreen();
  });

  // View Navigation
  const navBtns = document.querySelectorAll('.sidebar-nav button');
  const viewElems = document.querySelectorAll('.view');
  const viewTitleElem = document.getElementById('viewTitle');

  function switchView(target) {
    navBtns.forEach(b => b.classList.toggle('active', b.dataset.view === target));
    viewElems.forEach(v => v.classList.toggle('active', v.id === target));
    if (viewTitleElem) {
      const activeBtn = Array.from(navBtns).find(b => b.dataset.view === target);
      if (activeBtn) viewTitleElem.textContent = activeBtn.textContent.trim();
    }
    loadViewData(target);
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view);
    });
  });

  // Data Loading Dispatcher
  async function loadViewData(view) {
    if (!authToken) return;
    try {
      if (view === 'overview') loadOverview();
      else if (view === 'cms') loadCMS();
      else if (view === 'tours') loadTours();
      else if (view === 'bookings') loadBookings();
      else if (view === 'media') loadMedia();
      else if (view === 'seo') loadSEO();
      else if (view === 'aeo') loadAEO();
      else if (view === 'geo') loadGEO();
      else if (view === 'schema') loadSchema();
      else if (view === 'faqs') loadFAQs();
      else if (view === 'testimonials') loadTestimonials();
      else if (view === 'leads') loadLeads();
      else if (view === 'settings') loadSettings();
      else if (view === 'activity') loadActivity();
    } catch (err) {
      console.warn('View load warning:', err);
    }
  }

  async function loadDashboardData() {
    switchView('overview');
  }

  // View 1: Overview
  async function loadOverview() {
    const data = await apiFetch('/api/admin/stats');
    if (!data) return;
    document.getElementById('statTotalTours').textContent = data.tours.total;
    document.getElementById('statTotalBookings').textContent = data.bookings.total;
    document.getElementById('statRevenue').textContent = 'AED ' + data.bookings.revenue.toLocaleString();
    document.getElementById('statSeoScore').textContent = data.seoHealth.score + '%';

    // Render Recent Bookings Table
    const tbody = document.getElementById('recentBookingsTbody');
    if (tbody) {
      tbody.innerHTML = (data.recentBookings || []).map(b => \`
        <tr>
          <td><strong>\${b.confirmationCode || b.id}</strong></td>
          <td>\${b.name}</td>
          <td>\${b.tour}</td>
          <td>AED \${b.total}</td>
          <td><span class="badge-status badge-\${(b.status || 'new').toLowerCase()}">\${b.status}</span></td>
        </tr>
      \`).join('');
    }
  }

  // View 2: CMS
  async function loadCMS() {
    const cms = await apiFetch('/api/admin/cms/homepage');
    if (!cms) return;
    if (document.getElementById('cmsHeroHeading')) {
      document.getElementById('cmsHeroHeading').value = cms.hero?.heading || '';
      document.getElementById('cmsHeroSubheading').value = cms.hero?.subheading || '';
      document.getElementById('cmsHeroBgImage').value = cms.hero?.bgImage || '';
    }
  }

  document.getElementById('btnSaveCms')?.addEventListener('click', async () => {
    const body = {
      hero: {
        heading: document.getElementById('cmsHeroHeading').value,
        subheading: document.getElementById('cmsHeroSubheading').value,
        bgImage: document.getElementById('cmsHeroBgImage').value
      }
    };
    await apiFetch('/api/admin/cms/homepage', 'POST', body);
    showToast('Homepage CMS updated successfully!', 'success');
  });

  // View 3: Tours
  async function loadTours() {
    const data = await apiFetch('/api/admin/tours');
    const tbody = document.getElementById('toursTbody');
    if (tbody && data.tours) {
      tbody.innerHTML = data.tours.map(t => \`
        <tr>
          <td><img src="\${t.media?.featuredImage || '/Logo.svg'}" style="width:50px;height:35px;object-fit:cover;border-radius:6px;"></td>
          <td><strong>\${t.name}</strong></td>
          <td>\${t.category}</td>
          <td>AED \${t.pricing?.salePrice || t.pricing?.regularPrice || 0}</td>
          <td><span class="badge-status badge-\${t.status.toLowerCase()}">\${t.status}</span></td>
          <td>
            <button class="btn-admin btn-outline btn-sm" onclick="editTour('\${t.id}')">Edit</button>
            <button class="btn-admin btn-outline btn-sm" onclick="duplicateTour('\${t.id}')">Duplicate</button>
          </td>
        </tr>
      \`).join('');
    }
  }

  window.editTour = async (id) => {
    const res = await apiFetch('/api/admin/tours/' + id);
    if (res.tour) {
      document.getElementById('tourFormId').value = res.tour.id;
      document.getElementById('tourFormName').value = res.tour.name;
      document.getElementById('tourFormCategory').value = res.tour.category;
      document.getElementById('tourFormPrice').value = res.tour.pricing?.salePrice || 120;
      document.getElementById('tourModalOverlay').classList.add('active');
    }
  };

  window.duplicateTour = async (id) => {
    await apiFetch(\`/api/admin/tours/\${id}/duplicate\`, 'POST');
    showToast('Tour duplicated cleanly as draft.', 'success');
    loadTours();
  };

  document.getElementById('btnSaveTour')?.addEventListener('click', async () => {
    const id = document.getElementById('tourFormId').value;
    const name = document.getElementById('tourFormName').value;
    const category = document.getElementById('tourFormCategory').value;
    const price = Number(document.getElementById('tourFormPrice').value);

    const payload = {
      name,
      category,
      pricing: { salePrice: price, regularPrice: price * 1.2 }
    };

    if (id) {
      await apiFetch('/api/admin/tours/' + id, 'PUT', payload);
    } else {
      await apiFetch('/api/admin/tours', 'POST', payload);
    }
    document.getElementById('tourModalOverlay').classList.remove('active');
    showToast('Tour saved successfully!', 'success');
    loadTours();
  });

  // View 4: Bookings
  async function loadBookings() {
    const data = await apiFetch('/api/admin/bookings');
    const tbody = document.getElementById('bookingsTbody');
    if (tbody && data.bookings) {
      tbody.innerHTML = data.bookings.map(b => \`
        <tr>
          <td><strong>\${b.confirmationCode || b.id}</strong></td>
          <td>\${b.name}<br><small style="color:var(--muted)">\${b.phone}</small></td>
          <td>\${b.tour}</td>
          <td>\${b.date} \${b.time}</td>
          <td>\${b.riders}</td>
          <td><strong>AED \${b.total}</strong></td>
          <td>
            <select onchange="updateBookingStatus('\${b.id}', this.value)" style="padding:4px 8px;border-radius:6px;border:1px solid var(--line);">
              <option value="New" \${b.status==='New'?'selected':''}>New</option>
              <option value="Confirmed" \${b.status==='Confirmed'?'selected':''}>Confirmed</option>
              <option value="Completed" \${b.status==='Completed'?'selected':''}>Completed</option>
              <option value="Cancelled" \${b.status==='Cancelled'?'selected':''}>Cancelled</option>
            </select>
          </td>
        </tr>
      \`).join('');
    }
  }

  window.updateBookingStatus = async (id, status) => {
    await apiFetch('/api/admin/bookings/' + id, 'PUT', { status });
    showToast('Booking status updated to ' + status, 'success');
  };

  // View 5: Media
  async function loadMedia() {
    const data = await apiFetch('/api/admin/media');
    const grid = document.getElementById('mediaGrid');
    if (grid && data.media) {
      grid.innerHTML = data.media.map(m => \`
        <div style="background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;padding:10px;">
          <img src="\${m.url}" style="width:100%;height:140px;object-fit:cover;border-radius:8px;">
          <div style="margin-top:8px;font-size:12px;font-weight:700;">\${m.name}</div>
          <div style="font-size:11px;color:var(--muted)">\${m.folder} • \${m.size}</div>
        </div>
      \`).join('');
    }
  }

  // View 6: SEO
  async function loadSEO() {
    const data = await apiFetch('/api/admin/seo');
    const tbody = document.getElementById('seoAuditTbody');
    if (tbody && data.audit) {
      tbody.innerHTML = data.audit.map(item => \`
        <tr>
          <td><strong>\${item.name}</strong></td>
          <td>\${item.pageUrl}</td>
          <td>\${item.titleLength} chars</td>
          <td>\${item.descriptionLength} chars</td>
          <td><span class="badge-status badge-\${item.status.toLowerCase().replace(/ /g,'-')}">\${item.status} (\${item.score}%)</span></td>
        </tr>
      \`).join('');
    }
  }

  // View 7: AEO
  async function loadAEO() {
    const data = await apiFetch('/api/admin/faqs');
    const div = document.getElementById('aeoContent');
    if (div && data.faqs) {
      div.innerHTML = data.faqs.map(f => \`
        <div style="background:#fff;border:1px solid var(--line);padding:16px;border-radius:12px;margin-bottom:12px;">
          <h4 style="margin:0 0 6px;color:var(--navy);">Q: \${f.question}</h4>
          <p style="margin:0;font-size:13.5px;color:var(--muted)">A: \${f.answer}</p>
        </div>
      \`).join('');
    }
  }

  // View 8: GEO
  async function loadGEO() {
    const data = await apiFetch('/api/admin/seo');
    const div = document.getElementById('geoContent');
    if (div && data.geoChecklist) {
      div.innerHTML = data.geoChecklist.map(c => \`
        <div style="background:#fff;border:1px solid var(--line);padding:16px;border-radius:12px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong>\${c.item}</strong>
            <div style="font-size:12px;color:var(--muted)">\${c.details}</div>
          </div>
          <span class="badge-status badge-good">\${c.status}</span>
        </div>
      \`).join('');
    }
  }

  // View 9: Schema
  async function loadSchema() {
    const data = await apiFetch('/api/admin/schema');
    const elem = document.getElementById('schemaPreviewJson');
    if (elem && data.schemas) {
      elem.textContent = JSON.stringify(data.schemas, null, 2);
    }
  }

  // View 10: FAQs
  async function loadFAQs() {
    const data = await apiFetch('/api/admin/faqs');
    const tbody = document.getElementById('faqsTbody');
    if (tbody && data.faqs) {
      tbody.innerHTML = data.faqs.map(f => \`
        <tr>
          <td><strong>\${f.question}</strong></td>
          <td>\${f.category || 'General'}</td>
          <td><span class="badge-status badge-published">\${f.active?'Active':'Inactive'}</span></td>
        </tr>
      \`).join('');
    }
  }

  // View 11: Testimonials
  async function loadTestimonials() {
    const data = await apiFetch('/api/admin/testimonials');
    const tbody = document.getElementById('testimonialsTbody');
    if (tbody && data.testimonials) {
      tbody.innerHTML = data.testimonials.map(t => \`
        <tr>
          <td><strong>\${t.customerName}</strong> (\${t.country})</td>
          <td>\${'★'.repeat(t.rating)}</td>
          <td>\${t.review}</td>
        </tr>
      \`).join('');
    }
  }

  // View 12: Leads
  async function loadLeads() {
    const data = await apiFetch('/api/admin/leads');
    const tbody = document.getElementById('leadsTbody');
    if (tbody && data.leads) {
      tbody.innerHTML = data.leads.map(l => \`
        <tr>
          <td><strong>\${l.name}</strong></td>
          <td>\${l.phone || l.email}</td>
          <td>\${l.message}</td>
          <td><span class="badge-status badge-new">\${l.status}</span></td>
        </tr>
      \`).join('');
    }
  }

  // View 13: Settings
  async function loadSettings() {
    const s = await apiFetch('/api/admin/settings');
    if (s && document.getElementById('settingSiteName')) {
      document.getElementById('settingSiteName').value = s.siteName || '';
      document.getElementById('settingPhone').value = s.phone || '';
      document.getElementById('settingEmail').value = s.email || '';
      document.getElementById('settingAddress').value = s.address || '';
    }
  }

  document.getElementById('btnSaveSettings')?.addEventListener('click', async () => {
    const body = {
      siteName: document.getElementById('settingSiteName').value,
      phone: document.getElementById('settingPhone').value,
      email: document.getElementById('settingEmail').value,
      address: document.getElementById('settingAddress').value
    };
    await apiFetch('/api/admin/settings', 'POST', body);
    showToast('Global settings updated successfully!', 'success');
  });

  // View 14: Activity
  async function loadActivity() {
    const data = await apiFetch('/api/admin/activity');
    const tbody = document.getElementById('activityTbody');
    if (tbody && data.logs) {
      tbody.innerHTML = data.logs.map(l => \`
        <tr>
          <td>\${new Date(l.timestamp).toLocaleString()}</td>
          <td><strong>\${l.user}</strong></td>
          <td>\${l.action}</td>
          <td>\${l.details}</td>
        </tr>
      \`).join('');
    }
  }

  // Check auth on load
  if (authToken) {
    apiFetch('/api/admin/me').then(res => {
      if (res.user) {
        currentUser = res.user;
        loadDashboardData();
      } else {
        showLoginScreen();
      }
    }).catch(() => showLoginScreen());
  } else {
    showLoginScreen();
  }
});
`;
fs.writeFileSync(path.join(distDir, 'admin.js'), adminJs);

const tourDataJs = `window.PHOENIX_TOURS = [
  { id: 'desert-safari', name: 'Evening Desert Safari', price: 120 },
  { id: 'quad-bike', name: 'Quad Bike ATV Rental', price: 150 },
  { id: 'buggy', name: 'Can-Am Dune Buggy', price: 1000 },
  { id: 'dubai-city', name: 'Dubai City Tour', price: 450 },
  { id: 'abu-dhabi-city', name: 'Abu Dhabi City Tour', price: 650 },
  { id: 'skydive', name: 'Tandem Sky Dive', price: 2700 }
];
`;
fs.writeFileSync(path.join(distDir, 'tour-data.js'), tourDataJs);

const landingCmsJs = `(() => { console.log('Landing CMS active'); })();`;
fs.writeFileSync(path.join(distDir, 'landing-cms.js'), landingCmsJs);

const backupJs = `(() => { console.log('Backup system active'); })();`;
fs.writeFileSync(path.join(distDir, 'backup.js'), backupJs);

// Helper for Header/Footer
const getHeaderHtml = (activePage = '') => `
<header class="site-header" itemscope itemtype="https://schema.org/TravelAgency">
  <meta itemprop="name" content="Phoenix Travel & Tours">
  <a class="brand" href="/" aria-label="Phoenix Travel & Tours home" itemprop="url">
    <img class="brand-logo" src="/Logo.svg" alt="Phoenix Travel & Tours" width="220" height="70" itemprop="logo">
  </a>
  <nav id="mainNav" aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/desert-safari-dubai.html">Desert Safari</a>
    <a href="/rides/quad-bike">Quad Bike</a>
    <a href="/rides/buggy">Dune Buggy</a>
    <a href="/dubai-city-tour.html">Dubai City Tour</a>
    <a href="/abu-dhabi-city-tour.html">Abu Dhabi Tour</a>
    <a href="/book">Reserve a Slot</a>
    <a href="/admin.html" class="nav-dashboard">Dashboard</a>
  </nav>
  <div class="header-contact-info" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    <span itemprop="streetAddress" style="display:none;">Office 701, XL Tower, Business Bay</span>
    <span itemprop="addressLocality" style="display:none;">Dubai</span>
    <span itemprop="addressCountry" style="display:none;">UAE</span>
    <a class="header-phone" href="https://wa.me/971561505270" itemprop="telephone" aria-label="WhatsApp Contact">+971 56 150 5270</a>
  </div>
  <button class="menu-btn" aria-label="Toggle Navigation">☰</button>
</header>
`;

const getFooterHtml = () => `
<footer class="site-footer" itemscope itemtype="https://schema.org/LocalBusiness">
  <meta itemprop="name" content="Phoenix Travel & Tours">
  <meta itemprop="image" content="https://desertsafaridxbpro.com/Logo.svg">
  <meta itemprop="priceRange" content="AED 120 - 2700">
  <div class="footer-container">
    <div>
      <a class="brand footer-brand" href="/" itemprop="url">
        <img class="brand-logo footer-logo" src="/Logo.svg" alt="Phoenix Travel & Tours" width="220" height="70" itemprop="logo">
      </a>
      <p style="margin-top:16px;" itemprop="description">Licensed Dubai Tour Operator delivering top-rated desert safaris, quad biking, and private sightseeing tours across the UAE.</p>
    </div>
    <div>
      <h4 style="color:#fff;margin-top:0;">Quick Links</h4>
      <p><a href="/desert-safari-dubai.html">Desert Safari Dubai</a></p>
      <p><a href="/rides/quad-bike">Quad Bike Dubai</a></p>
      <p><a href="/rides/buggy">Dune Buggy Dubai</a></p>
      <p><a href="/dubai-city-tour.html">Dubai City Tour</a></p>
      <p><a href="/admin.html">Admin Dashboard</a></p>
    </div>
    <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
      <h4 style="color:#fff;margin-top:0;">Head Office & Contact</h4>
      <p style="margin-bottom:8px;">
        📍 <strong style="color:#fff;">Physical Address:</strong><br>
        <span itemprop="streetAddress">Office 701, XL Tower, Business Bay</span>,<br>
        <span itemprop="addressLocality">Dubai</span>, <span itemprop="addressCountry">UAE</span>
      </p>
      <p style="margin-bottom:8px;">
        📱 <strong style="color:#fff;">WhatsApp / Phone:</strong><br>
        <a href="https://wa.me/971561505270" itemprop="telephone" style="color:#22d3ee;text-decoration:none;font-weight:700;">+971 56 150 5270</a>
      </p>
      <p style="margin-bottom:0;">
        💬 <strong style="color:#fff;">Direct Concierge:</strong><br>
        <a href="https://wa.me/971561505270" itemprop="sameAs" style="color:#22d3ee;text-decoration:none;font-weight:700;">Chat on WhatsApp</a>
      </p>
    </div>
  </div>
  <div class="footer-bottom">
    © 2026 <span itemprop="name">Phoenix Travel & Tours</span>. Office 701, XL Tower, Business Bay, Dubai, UAE. All Rights Reserved.
  </div>
</footer>
`;

// 4. HTML Pages
const pages = {
  'index.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Phoenix Travel & Tours | Dubai Desert Safaris & Quad Biking</title>
  <meta name="description" content="Book top-rated Dubai desert safaris, quad bike ATV rentals, Can-Am dune buggies, and private city tours with Phoenix Travel & Tours. Pay on arrival & instant WhatsApp booking.">
  <link rel="canonical" href="https://desertsafaridxbpro.com/">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
${getHeaderHtml('home')}
<main>
  <section class="hero">
    <div class="hero-content">
      <span class="eyebrow">PREMIUM DUBAI ADVENTURES</span>
      <h1>Experience The Ultimate Dubai Desert & City Tours</h1>
      <p>Self-drive quad bikes, luxury Can-Am dune buggies, red dune desert safaris, and private city excursions. Pay on arrival with zero advance deposit required.</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        <a href="/book" class="btn btn-gold">Reserve Your Ride →</a>
        <a href="https://wa.me/971561505270?text=Hi%20Phoenix%20Travel%20%26%20Tours,%20I%20would%20like%20to%20inquire%20about%20a%20tour." class="btn btn-whatsapp" target="_blank" rel="noopener">WhatsApp Concierge</a>
      </div>
    </div>
  </section>

  <!-- Top Question-Answer Block for Answer Engine Optimization (AEO) -->
  <section class="section top-qa-block" style="background:#ffffff;border:1px solid var(--line);border-radius:20px;padding:36px 5%;margin-top:-24px;position:relative;z-index:10;box-shadow:var(--shadow);" itemscope itemtype="https://schema.org/FAQPage">
    <div style="max-width:960px;margin:0 auto;">
      <span class="eyebrow dark" style="letter-spacing:1.5px;font-weight:900;">DIRECT ANSWER ENGINE KNOWLEDGE</span>
      <h2 style="font-size:26px;color:var(--navy);margin-top:6px;margin-bottom:24px;font-weight:900;">Essential Tour Inclusions & Direct Pricing</h2>

      <article class="qa-item" style="margin-bottom:24px;border-bottom:1px solid var(--line);padding-bottom:18px;" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <h2 itemprop="name" style="font-size:19px;color:var(--navy);margin:0 0 8px;font-weight:800;line-height:1.35;">What is included in a Dubai Desert Safari and how much does it cost?</h2>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text" style="color:var(--text);font-size:15px;line-height:1.65;margin:0;">
            A standard Evening Desert Safari with Phoenix Travel & Tours costs <strong>AED 120 per person</strong>. Inclusions feature door-to-door 4x4 pickup in a Toyota Land Cruiser, 35–45 minutes of red dune bashing in Lahbab Desert, sandboarding, camel riding, live entertainment (Tanoura, Belly Dance & Fire Show), and a 5-star international BBQ dinner buffet with vegetarian & non-vegetarian options. Bookings require zero advance deposit; pay on arrival in cash or card.
          </p>
        </div>
      </article>

      <article class="qa-item" style="margin-bottom:24px;border-bottom:1px solid var(--line);padding-bottom:18px;" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <h2 itemprop="name" style="font-size:19px;color:var(--navy);margin:0 0 8px;font-weight:800;line-height:1.35;">How much do self-drive Quad Bike ATV and Can-Am Dune Buggy rentals cost?</h2>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text" style="color:var(--text);font-size:15px;line-height:1.65;margin:0;">
            Self-drive Quad Bike ATV rentals start from <strong>AED 150 for 30 minutes</strong> (220cc to 700cc Raptor ATVs). High-powered 2-seater Can-Am Maverick X3 Turbo dune buggies start from <strong>AED 1,000 per hour</strong>. All off-road rentals include full safety helmets, goggles, professional instructor briefings, and lead desert guides. No driver's license is required.
          </p>
        </div>
      </article>

      <article class="qa-item" style="margin-bottom:8px;" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <h2 itemprop="name" style="font-size:19px;color:var(--navy);margin:0 0 8px;font-weight:800;line-height:1.35;">Where is Phoenix Travel & Tours located and how do I book a tour?</h2>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text" style="color:var(--text);font-size:15px;line-height:1.65;margin:0;">
            Phoenix Travel & Tours is headquartered at <strong>Office 701, XL Tower, Business Bay, Dubai, UAE</strong>. Reservations can be placed directly without prepayment via WhatsApp at <strong>+971 56 150 5270</strong> or by completing our online booking form. Customers receive instant booking confirmation and pay on arrival.
          </p>
        </div>
      </article>
    </div>
  </section>

  <section class="section">
    <div class="section-title">
      <h2>Featured Dubai Experiences</h2>
      <p>Handcrafted desert adventures and private city sightseeing with guaranteed satisfaction.</p>
    </div>

    <div class="tour-grid">
      <article class="ride-card">
        <div class="ride-card-media">
          <img src="https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Evening Desert Safari Dubai">
          <span class="badge">BESTSELLER</span>
          <span class="duration">6 HOURS</span>
        </div>
        <div class="ride-card-body">
          <h3>Evening Desert Safari</h3>
          <p>4x4 Lahbab red dune bashing, camel riding, sandboarding, live Tanoura & belly dance, plus 5-star BBQ dinner buffet.</p>
          <div class="price-row">
            <span class="price-tag">AED 120 <small>/ person</small></span>
            <a href="/desert-safari-dubai.html" class="btn btn-primary">View Details</a>
          </div>
        </div>
      </article>

      <article class="ride-card">
        <div class="ride-card-media">
          <img src="https://images.pexels.com/photos/33041/quad-bike-atv-all-terrain-vehicle-quad.jpg?auto=compress&cs=tinysrgb&w=800" alt="Quad Bike ATV Rental Dubai">
          <span class="badge" style="background:var(--aqua);">HIGH ADRENALINE</span>
          <span class="duration">30m - 1 HOUR</span>
        </div>
        <div class="ride-card-body">
          <h3>Quad Bike ATV Rental</h3>
          <p>Conquer open desert dunes on high-performance 220cc to 700cc Raptor ATVs. No driving license required.</p>
          <div class="price-row">
            <span class="price-tag">AED 150 <small>/ session</small></span>
            <a href="/rides/quad-bike" class="btn btn-primary">View Details</a>
          </div>
        </div>
      </article>

      <article class="ride-card">
        <div class="ride-card-media">
          <img src="https://images.pexels.com/photos/12318029/pexels-photo-12318029.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Can-Am Dune Buggy Rental">
          <span class="badge">POPULAR</span>
          <span class="duration">1 HOUR</span>
        </div>
        <div class="ride-card-body">
          <h3>Can-Am Dune Buggy</h3>
          <p>Drive 2-seater or 4-seater Can-Am Maverick X3 Turbo buggies with roll cages, 4-point harnesses, and desert guides.</p>
          <div class="price-row">
            <span class="price-tag">AED 1,000 <small>/ buggy</small></span>
            <a href="/rides/buggy" class="btn btn-primary">View Details</a>
          </div>
        </div>
      </article>
    </div>
  </section>
</main>
${getFooterHtml()}
<script src="/app.js"></script>
</body>
</html>`,

  'desert-safari-dubai.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dubai Desert Safari Tours | Evening, Morning & Private 4x4 | Phoenix Travel & Tours</title>
  <meta name="description" content="Book top-rated Dubai desert safari tours with Phoenix Travel & Tours. Lahbab red dune bashing, BBQ dinner, camel rides & live shows. Clear AED rates & pay on arrival.">
  <link rel="canonical" href="https://desertsafaridxbpro.com/desert-safari-dubai.html">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
${getHeaderHtml('safari')}
<main class="section">
  <span class="eyebrow dark">DUBAI DESERT ADVENTURES</span>
  <h1>Dubai Desert Safari Tours</h1>
  <p style="font-size:18px;color:var(--muted);">Experience the magic of Lahbab Red Dunes with roll-caged Toyota Land Cruiser 4x4 dune bashing, camel riding, sandboarding, live Tanoura and fire shows, and a 5-star international BBQ dinner.</p>

  <div style="margin: 30px 0;">
    <img src="https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Dubai Red Dune Desert Safari" style="width:100%;max-height:450px;object-fit:cover;border-radius:20px;">
  </div>
</main>
${getFooterHtml()}
<script src="/app.js"></script>
</body>
</html>`,

  'quad-bike-dubai.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Quad Bike Dubai | Desert ATV Rental from AED 150 | Phoenix Travel & Tours</title>
  <meta name="description" content="Self-drive quad bike in Dubai desert dunes. 30 min & 1 hour ATV rentals from AED 150 with Phoenix Travel & Tours. No driving license required. Safety helmet & guide included.">
  <link rel="canonical" href="https://desertsafaridxbpro.com/rides/quad-bike">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
${getHeaderHtml('quad')}
<main class="section">
  <span class="eyebrow dark">DESERT ATV RENTALS</span>
  <h1>Quad Bike Dubai Rentals</h1>
  <p style="font-size:18px;color:var(--muted);">Ride powerful 220cc to 700cc Raptor quad bikes over Dubai's high red dunes. Full safety gear, instructor briefing, and desert guide supervision included.</p>

  <div style="margin: 30px 0;">
    <img src="https://images.pexels.com/photos/33041/quad-bike-atv-all-terrain-vehicle-quad.jpg?auto=compress&cs=tinysrgb&w=1200" alt="Quad Bike ATV Rental Dubai" style="width:100%;max-height:450px;object-fit:cover;border-radius:20px;">
  </div>
</main>
${getFooterHtml()}
<script src="/app.js"></script>
</body>
</html>`,

  'dune-buggy-dubai.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dune Buggy Dubai | Can-Am Maverick Rentals from AED 1,000 | Phoenix Travel & Tours</title>
  <meta name="description" content="Drive 2-seater and 4-seater Can-Am Maverick dune buggies across Dubai red dunes with Phoenix Travel & Tours. Guided desert trails, helmets & direct WhatsApp booking.">
  <link rel="canonical" href="https://desertsafaridxbpro.com/rides/buggy">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
${getHeaderHtml('buggy')}
<main class="section">
  <span class="eyebrow dark">HIGH-POWERED OFF-ROAD BUGGIES</span>
  <h1>Can-Am Dune Buggy Dubai</h1>
  <p style="font-size:18px;color:var(--muted);">Drive state-of-the-art Can-Am Maverick X3 Turbo buggies with tubular roll-cages, 4-point harnesses, automatic transmission, and private desert lead guides.</p>

  <div style="margin: 30px 0;">
    <img src="https://images.pexels.com/photos/12318029/pexels-photo-12318029.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Can-Am Dune Buggy Rental Dubai" style="width:100%;max-height:450px;object-fit:cover;border-radius:20px;">
  </div>
</main>
${getFooterHtml()}
<script src="/app.js"></script>
</body>
</html>`,

  'dubai-city-tour.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dubai City Tour | Private Sightseeing with Car & Driver | Phoenix Travel & Tours</title>
  <meta name="description" content="Explore modern landmarks & historic heritage with a private Dubai city tour by Phoenix Travel & Tours. Door-to-door hotel pickup, customized itinerary & clear AED rates.">
  <link rel="canonical" href="https://desertsafaridxbpro.com/dubai-city-tour.html">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
${getHeaderHtml('dubaicity')}
<main class="section">
  <span class="eyebrow dark">PRIVATE SIGHTSEEING TOURS</span>
  <h1>Private Dubai City Tour</h1>
  <p style="font-size:18px;color:var(--muted);">Discover Dubai Frame, Museum of the Future, Burj Al Arab, Palm Jumeirah, and Downtown Dubai with a private vehicle and licensed guide.</p>
</main>
${getFooterHtml()}
<script src="/app.js"></script>
</body>
</html>`,

  'abu-dhabi-city-tour.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Abu Dhabi City Tour from Dubai | Private Day Trip | Phoenix Travel & Tours</title>
  <meta name="description" content="Book a private Abu Dhabi City Tour from Dubai with Phoenix Travel & Tours. Visit Sheikh Zayed Grand Mosque, Emirates Palace, Louvre Museum & Yas Island. Clear AED rates.">
  <link rel="canonical" href="https://desertsafaridxbpro.com/abu-dhabi-city-tour.html">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
${getHeaderHtml('abudhabi')}
<main class="section">
  <span class="eyebrow dark">CAPITAL CITY EXCURSIONS</span>
  <h1>Abu Dhabi City Tour from Dubai</h1>
  <p style="font-size:18px;color:var(--muted);">Full-day private excursion to Abu Dhabi featuring guided entry to Sheikh Zayed Grand Mosque, Emirates Palace photo stop, Abu Dhabi Corniche, and Yas Island.</p>
</main>
${getFooterHtml()}
<script src="/app.js"></script>
</body>
</html>`,

  'sky-dive-dubai.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sky Dive Dubai | Tandem Skydive Palm Jumeirah | Phoenix Travel & Tours</title>
  <meta name="description" content="Experience tandem skydiving over Palm Jumeirah with Phoenix Travel & Tours. Complete with outside camera video & photos, briefing & WhatsApp confirmation. AED 2,700.">
  <link rel="canonical" href="https://desertsafaridxbpro.com/sky-dive-dubai.html">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
${getHeaderHtml('skydive')}
<main class="section">
  <span class="eyebrow dark">EXTREME ADVENTURE</span>
  <h1>Tandem Sky Dive Palm Jumeirah</h1>
  <p style="font-size:18px;color:var(--muted);">Freefall from 13,000 feet over the iconic Palm Jumeirah at 120 mph with a professional instructor and dedicated outside camera flyer.</p>
</main>
${getFooterHtml()}
<script src="/app.js"></script>
</body>
</html>`,

  'burj-khalifa-lake-ride.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Burj Khalifa Lake Ride & Dubai Fountain Abra Boat Tour | Phoenix Travel & Tours</title>
  <meta name="description" content="Book Burj Khalifa Lake Ride tickets and Dubai Fountain traditional abra boat tours with Phoenix Travel & Tours. Front-row dancing fountain views from AED 130.">
  <link rel="canonical" href="https://desertsafaridxbpro.com/burj-khalifa-lake-ride.html">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
${getHeaderHtml('burj')}
<main class="section">
  <span class="eyebrow dark">DOWNTOWN DUBAI ATTRACTIONS</span>
  <h1>Burj Khalifa Lake Ride & Fountain Abra</h1>
  <p style="font-size:18px;color:var(--muted);">Sail on Burj Lake in a traditional wooden Abra boat for front-row seats to the world-famous dancing Dubai Fountains and illuminated Burj Khalifa.</p>
</main>
${getFooterHtml()}
<script src="/app.js"></script>
</body>
</html>`,

  'book.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reserve Your Slot | Phoenix Travel & Tours</title>
  <meta name="description" content="Select your Dubai desert adventure date, time slot, and package. Pay on arrival with instant confirmation on WhatsApp by Phoenix Travel & Tours.">
  <link rel="canonical" href="https://desertsafaridxbpro.com/book">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
${getHeaderHtml('book')}
<main class="section" style="max-width:700px;">
  <span class="eyebrow dark">INSTANT RESERVATION</span>
  <h1>Reserve Your Dubai Experience</h1>
  <p style="color:var(--muted);margin-bottom:30px;">Pay on arrival with cash or card. No online deposit required.</p>

  <form id="bookingForm" style="background:#fff;border:1px solid var(--line);padding:30px;border-radius:20px;box-shadow:var(--shadow);display:grid;gap:18px;">
    <div>
      <label style="display:block;font-weight:800;font-size:13px;margin-bottom:6px;">Select Experience</label>
      <select id="tourSelect" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;">
        <option value="Evening Desert Safari">Evening Desert Safari (AED 120/person)</option>
        <option value="Quad Bike ATV Rental">Quad Bike ATV Rental (from AED 150)</option>
        <option value="Can-Am Dune Buggy">Can-Am Dune Buggy (from AED 1,000)</option>
        <option value="Dubai City Tour">Dubai City Tour (from AED 450)</option>
        <option value="Abu Dhabi City Tour">Abu Dhabi City Tour (AED 650)</option>
        <option value="Tandem Sky Dive">Tandem Sky Dive (AED 2,700)</option>
      </select>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div>
        <label style="display:block;font-weight:800;font-size:13px;margin-bottom:6px;">Preferred Date</label>
        <input type="date" id="bookDate" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;" required>
      </div>
      <div>
        <label style="display:block;font-weight:800;font-size:13px;margin-bottom:6px;">Time Slot</label>
        <select id="bookTime" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;">
          <option value="09:00 AM">09:00 AM Morning</option>
          <option value="02:30 PM">02:30 PM Afternoon / Evening Safari</option>
          <option value="05:00 PM">05:00 PM Sunset</option>
        </select>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div>
        <label style="display:block;font-weight:800;font-size:13px;margin-bottom:6px;">Full Name *</label>
        <input type="text" id="custName" placeholder="e.g. John Smith" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;" required>
      </div>
      <div>
        <label style="display:block;font-weight:800;font-size:13px;margin-bottom:6px;">Phone / WhatsApp *</label>
        <input type="tel" id="custPhone" placeholder="+971 50 000 0000" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;" required>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div>
        <label style="display:block;font-weight:800;font-size:13px;margin-bottom:6px;">Email Address</label>
        <input type="email" id="custEmail" placeholder="name@example.com" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;">
      </div>
      <div>
        <label style="display:block;font-weight:800;font-size:13px;margin-bottom:6px;">Guests / Riders</label>
        <input type="number" id="bookRiders" min="1" max="20" value="1" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;">
      </div>
    </div>

    <div>
      <label style="display:block;font-weight:800;font-size:13px;margin-bottom:6px;">Special Notes / Hotel Pickup Address</label>
      <textarea id="bookNotes" rows="3" placeholder="Hotel name, room number, or special requests..." style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;"></textarea>
    </div>

    <button type="submit" class="btn btn-primary" style="padding:16px;font-size:16px;margin-top:10px;">Confirm Booking (Pay on Arrival)</button>
    <div id="formStatus" style="font-size:14px;font-weight:700;text-align:center;"></div>
  </form>
</main>
${getFooterHtml()}
<script src="/app.js"></script>
</body>
</html>`,

  'admin.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin Dashboard | Phoenix Travel & Tours</title>
  <link rel="stylesheet" href="/admin.css">
  <script src="/tour-data.js"></script>
</head>
<body>

<!-- Login Overlay -->
<div id="loginOverlay" class="modal-overlay active">
  <div class="modal-card" style="max-width:420px;padding:30px;">
    <div style="text-align:center;margin-bottom:20px;">
      <img src="/Logo.svg" alt="Phoenix Travel & Tours" style="height:48px;margin-bottom:12px;">
      <h2 style="margin:0;color:var(--navy);font-size:22px;">Admin Control Center</h2>
      <p style="color:var(--muted);font-size:13px;margin-top:4px;">Sign in to manage your website & bookings</p>
    </div>
    <form id="adminLoginForm">
      <div class="form-group">
        <label>Username</label>
        <input type="text" id="loginUsername" class="form-control" value="admin" required>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" id="loginPassword" class="form-control" value="admin123" required>
      </div>
      <button type="submit" class="btn-admin btn-navy" style="width:100%;padding:12px;justify-content:center;margin-top:10px;font-size:15px;">Sign In →</button>
      <div id="loginStatus" style="margin-top:12px;font-size:13px;color:var(--danger);text-align:center;font-weight:700;"></div>
    </form>
  </div>
</div>

<!-- Main Dashboard App Layout -->
<div id="appWrapper">
  <aside class="sidebar">
    <div class="sidebar-header">
      <a class="admin-brand" href="/">
        <img class="admin-brand-logo" src="/Logo.svg" alt="Phoenix Travel & Tours">
      </a>
    </div>

    <div class="sidebar-nav">
      <div class="nav-group-title">Overview</div>
      <button class="active" data-view="overview">📊 Dashboard</button>

      <div class="nav-group-title">Management</div>
      <button data-view="cms">🏠 Website CMS</button>
      <button data-view="tours">🐪 Tours Catalog</button>
      <button data-view="bookings">📅 Bookings</button>
      <button data-view="media">📁 Media Library</button>

      <div class="nav-group-title">Optimization</div>
      <button data-view="seo">🎯 SEO Health</button>
      <button data-view="aeo">🤖 AEO Manager</button>
      <button data-view="geo">📍 GEO Local Entity</button>
      <button data-view="schema">Structured Schema</button>

      <div class="nav-group-title">Engagement</div>
      <button data-view="faqs">❓ FAQ Manager</button>
      <button data-view="testimonials">⭐ Testimonials</button>
      <button data-view="leads">📥 Leads & Inquiries</button>

      <div class="nav-group-title">System</div>
      <button data-view="settings">⚙️ Global Settings</button>
      <button data-view="activity">📜 Activity Logs</button>
    </div>

    <div class="sidebar-footer">
      <a href="/" class="btn-admin btn-outline" style="font-size:12px;color:#22d3ee;border-color:rgba(34,211,238,0.3);">← View Site</a>
      <button id="btnLogout" class="btn-admin btn-danger" style="padding:6px 12px;font-size:12px;">Logout</button>
    </div>
  </aside>

  <main class="admin-main">
    <header class="top-bar">
      <div class="top-bar-left">
        <h2 id="viewTitle" style="margin:0;font-size:20px;color:var(--navy);">Dashboard Overview</h2>
      </div>
      <div class="top-bar-right">
        <span class="badge-status badge-confirmed" style="font-size:12px;">● System Online</span>
      </div>
    </header>

    <div class="view-container">
      <!-- 1. Overview View -->
      <section id="overview" class="view active">
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Total Tours</span>
            <span class="stat-val" id="statTotalTours">6</span>
            <span class="stat-sub">Active Catalog Items</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total Bookings</span>
            <span class="stat-val" id="statTotalBookings">128</span>
            <span class="stat-sub">Reservations Processed</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total Revenue</span>
            <span class="stat-val" id="statRevenue">AED 55,100</span>
            <span class="stat-sub">Pay on Arrival</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">SEO / GEO Health</span>
            <span class="stat-val" id="statSeoScore">100%</span>
            <span class="stat-sub">Optimized Entity</span>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <h3 style="margin:0;color:var(--navy);">Recent Bookings</h3>
            <button class="btn-admin btn-navy" onclick="document.querySelector('[data-view=bookings]').click()">View All Bookings →</button>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Customer</th>
                  <th>Tour</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="recentBookingsTbody">
                <tr><td colspan="5" style="text-align:center;padding:20px;">Loading bookings...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 2. CMS View -->
      <section id="cms" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">Homepage Hero Content</h3>
          <div class="form-group">
            <label>Hero Heading</label>
            <input type="text" id="cmsHeroHeading" class="form-control">
          </div>
          <div class="form-group">
            <label>Hero Subheading</label>
            <textarea id="cmsHeroSubheading" class="form-control" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Background Image URL</label>
            <input type="text" id="cmsHeroBgImage" class="form-control">
          </div>
          <button id="btnSaveCms" class="btn-admin btn-navy">Save Homepage CMS</button>
        </div>
      </section>

      <!-- 3. Tours View -->
      <section id="tours" class="view">
        <div class="panel">
          <div class="panel-header">
            <h3 style="margin:0;color:var(--navy);">Tours Catalog</h3>
            <button class="btn-admin btn-navy" onclick="document.getElementById('tourModalOverlay').classList.add('active')">+ Add New Tour</button>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Tour Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="toursTbody">
                <tr><td colspan="6" style="text-align:center;padding:20px;">Loading tours...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 4. Bookings View -->
      <section id="bookings" class="view">
        <div class="panel">
          <div class="panel-header">
            <h3 style="margin:0;color:var(--navy);">All Reservations</h3>
            <a href="/api/admin/bookings/export" class="btn-admin btn-outline">📥 Export CSV</a>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Customer</th>
                  <th>Tour</th>
                  <th>Date / Time</th>
                  <th>Guests</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="bookingsTbody">
                <tr><td colspan="7" style="text-align:center;padding:20px;">Loading bookings...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 5. Media View -->
      <section id="media" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">Media Library</h3>
          <div id="mediaGrid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));gap:16px;">
            <div>Loading media...</div>
          </div>
        </div>
      </section>

      <!-- 6. SEO View -->
      <section id="seo" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">SEO Audit & Health Scores</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Page / Tour</th>
                  <th>URL</th>
                  <th>Title Length</th>
                  <th>Meta Desc Length</th>
                  <th>SEO Status</th>
                </tr>
              </thead>
              <tbody id="seoAuditTbody">
                <tr><td colspan="5">Loading SEO audit...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 7. AEO View -->
      <section id="aeo" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">Answer Engine Optimization (AEO)</h3>
          <div id="aeoContent">Loading AEO content...</div>
        </div>
      </section>

      <!-- 8. GEO View -->
      <section id="geo" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">Generative Engine Optimization (GEO) Local Entity</h3>
          <div id="geoContent">Loading GEO entity checks...</div>
        </div>
      </section>

      <!-- 9. Schema View -->
      <section id="schema" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">Structured Data (JSON-LD) Preview</h3>
          <pre id="schemaPreviewJson" style="background:#052932;color:#22d3ee;padding:16px;border-radius:10px;overflow-x:auto;font-size:13px;"></pre>
        </div>
      </section>

      <!-- 10. FAQs View -->
      <section id="faqs" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">FAQ Management</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="faqsTbody">
                <tr><td colspan="3">Loading FAQs...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 11. Testimonials View -->
      <section id="testimonials" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">Customer Testimonials</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Rating</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody id="testimonialsTbody">
                <tr><td colspan="3">Loading testimonials...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 12. Leads View -->
      <section id="leads" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">Leads & Inquiries</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="leadsTbody">
                <tr><td colspan="4">Loading leads...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 13. Settings View -->
      <section id="settings" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">Global Website Settings</h3>
          <div class="form-group">
            <label>Website Name</label>
            <input type="text" id="settingSiteName" class="form-control">
          </div>
          <div class="form-group">
            <label>Contact Phone / WhatsApp</label>
            <input type="text" id="settingPhone" class="form-control">
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="settingEmail" class="form-control">
          </div>
          <div class="form-group">
            <label>Physical Address</label>
            <input type="text" id="settingAddress" class="form-control">
          </div>
          <button id="btnSaveSettings" class="btn-admin btn-navy">Save Settings</button>
        </div>
      </section>

      <!-- 14. Activity Log View -->
      <section id="activity" class="view">
        <div class="panel">
          <h3 style="margin:0 0 16px;color:var(--navy);">Admin Activity Log</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody id="activityTbody">
                <tr><td colspan="4">Loading logs...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </main>
</div>

<!-- Add/Edit Tour Modal -->
<div id="tourModalOverlay" class="modal-overlay">
  <div class="modal-card">
    <div class="modal-header">
      <h3 style="margin:0;color:var(--navy);">Tour Editor</h3>
      <button class="btn-admin btn-outline" onclick="document.getElementById('tourModalOverlay').classList.remove('active')">✕</button>
    </div>
    <div class="modal-body">
      <input type="hidden" id="tourFormId">
      <div class="form-group">
        <label>Tour Name</label>
        <input type="text" id="tourFormName" class="form-control">
      </div>
      <div class="form-group">
        <label>Category</label>
        <select id="tourFormCategory" class="form-control">
          <option value="Desert Safari">Desert Safari</option>
          <option value="Quad Bikes">Quad Bikes</option>
          <option value="Buggy">Buggy</option>
          <option value="City Tours">City Tours</option>
          <option value="Extreme Sports">Extreme Sports</option>
        </select>
      </div>
      <div class="form-group">
        <label>Price (AED)</label>
        <input type="number" id="tourFormPrice" class="form-control">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-admin btn-outline" onclick="document.getElementById('tourModalOverlay').classList.remove('active')">Cancel</button>
      <button id="btnSaveTour" class="btn-admin btn-navy">Save Tour</button>
    </div>
  </div>
</div>

<script src="/admin.js"></script>
<script src="/backup.js"></script>
<script src="/landing-cms.js"></script>
</body>
</html>`,

  '404.html': `<!doctype html>
<html lang="en-AE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>404 Page Not Found | Phoenix Travel & Tours</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
<header class="site-header">
  <a class="brand" href="/" aria-label="Phoenix Travel & Tours home">
    <img class="brand-logo" src="/Logo.svg" alt="Phoenix Travel & Tours" width="220" height="70">
  </a>
  <nav id="mainNav">
    <a href="/">Home</a>
    <a href="/admin.html" class="nav-dashboard">Dashboard</a>
  </nav>
</header>
<main class="section" style="text-align:center;padding:100px 20px;">
  <span class="eyebrow dark">404 ERROR</span>
  <h1>Page Not Found</h1>
  <p style="color:var(--muted);max-width:500px;margin:20px auto 30px;">The requested page could not be located. Browse our top Dubai desert safaris and experiences below.</p>
  <a href="/" class="btn btn-primary">Return to Homepage →</a>
</main>
${getFooterHtml()}
</body>
</html>`
};

for (const [file, html] of Object.entries(pages)) {
  fs.writeFileSync(path.join(distDir, file), html);
}

// 5. Auxiliary Config & Vector Files
fs.writeFileSync(path.join(distDir, 'robots.txt'), `User-agent: *
Allow: /
Sitemap: https://desertsafaridxbpro.com/sitemap.xml
`);

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://desertsafaridxbpro.com/</loc></url>
  <url><loc>https://desertsafaridxbpro.com/desert-safari-dubai.html</loc></url>
  <url><loc>https://desertsafaridxbpro.com/rides/quad-bike</loc></url>
  <url><loc>https://desertsafaridxbpro.com/rides/buggy</loc></url>
  <url><loc>https://desertsafaridxbpro.com/dubai-city-tour.html</loc></url>
  <url><loc>https://desertsafaridxbpro.com/abu-dhabi-city-tour.html</loc></url>
  <url><loc>https://desertsafaridxbpro.com/sky-dive-dubai.html</loc></url>
  <url><loc>https://desertsafaridxbpro.com/burj-khalifa-lake-ride.html</loc></url>
  <url><loc>https://desertsafaridxbpro.com/book</loc></url>
  <url><loc>https://desertsafaridxbpro.com/admin.html</loc></url>
</urlset>
`);

fs.writeFileSync(path.join(distDir, '.htaccess'), `DirectoryIndex index.html
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
`);

fs.writeFileSync(path.join(distDir, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#063c49"/>
  <path d="M25 25 L75 25 A 25 25 0 0 1 75 75 L 25 75 Z" fill="none" stroke="#0d9488" stroke-width="12"/>
</svg>
`);

console.log('Site files built successfully.');
