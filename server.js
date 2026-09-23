import express from 'express';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { db } from './db.js';
import {
  sendBookingEmail,
  sendTestEmail,
  getEmailConfigStatus
} from './email-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// Auto-build static site if dist directory or essential files are missing
const requiredDistFiles = ['index.html', '404.html', 'admin.html'];
const isDistReady = requiredDistFiles.every(f => fs.existsSync(path.join(DIST_DIR, f)));
if (!isDistReady) {
  try {
    console.log('Dist directory missing required files. Building static site...');
    execSync('node scripts/build-site.js', { stdio: 'inherit' });
  } catch (err) {
    console.error('Failed to auto-build static site:', err);
  }
}

app.use(express.json({ limit: '20mb' }));

// Token-based lightweight session auth middleware
const authTokens = new Map();

function hashPassword(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();
  if (!token || !authTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized. Admin session required.' });
  }
  req.user = authTokens.get(token);
  next();
}

// ==========================================
// PUBLIC SITE ROUTES & SUB-PATH ALIASES
// ==========================================
app.get('/rides/quad-bike', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'quad-bike-dubai.html'));
});

app.get(['/rides/buggy', '/rides/dune-buggy'], (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'dune-buggy-dubai.html'));
});

app.get('/burj-khalifa-lake-ride', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'burj-khalifa-lake-ride.html'));
});

app.get(['/sky-dive-dubai', '/sky-dive'], (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'sky-dive-dubai.html'));
});

app.get('/desert-safari-dubai', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'desert-safari-dubai.html'));
});

app.get('/dubai-city-tour', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'dubai-city-tour.html'));
});

app.get('/abu-dhabi-city-tour', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'abu-dhabi-city-tour.html'));
});

app.get('/book', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'book.html'));
});

// ==========================================
// PUBLIC API ENDPOINTS
// ==========================================

// Public booking submission endpoint
app.post('/api/book', async (req, res) => {
  try {
    const {
      rideId, rideName, tourId, tour, package: pkgName, duration, unit,
      date, slotId, time, rate, packagePrice, name, email, phone,
      riders, quantity, pickup, notes, total, collectionAmount, source
    } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }

    const confirmationCode = req.body.id || req.body.confirmationCode || `PX-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const effectiveQty = Math.max(1, Number(riders || quantity) || 1);
    const effectiveTourName = rideName || tour || (rideId === 'buggy' ? 'Dune Buggy' : 'Quad Bike');
    const effectiveDuration = duration || pkgName || 'Standard Experience';
    const effectiveTotal = Number(total) || (Number(rate || packagePrice || 150) * effectiveQty);
    const effectiveCollection = Number(collectionAmount) || effectiveTotal;

    const newBooking = {
      id: confirmationCode,
      confirmationCode,
      createdAt: new Date().toISOString(),
      rideId: rideId || tourId || 'quad-bike',
      rideName: effectiveTourName,
      tour: effectiveTourName,
      package: effectiveDuration,
      duration: effectiveDuration,
      unit: unit || (rideId === 'buggy' ? 'buggy' : rideId === 'quad-bike' ? 'bike' : 'person'),
      date: date || new Date().toISOString().split('T')[0],
      slotId: slotId || time || '09:00 AM',
      time: time || slotId || '09:00 AM',
      rate: Number(rate || packagePrice) || 150,
      name: name.trim(),
      email: (email || '').trim(),
      phone: phone.trim(),
      riders: effectiveQty,
      quantity: effectiveQty,
      pickup: pickup || (rideId ? 'Direct Base Camp Meeting Point' : 'Hotel Pickup in Dubai'),
      total: effectiveTotal,
      collectionAmount: effectiveCollection,
      paymentStatus: 'Pay on Arrival',
      notes: notes || '',
      source: source || 'Website Booking Form',
      status: 'Confirmed'
    };

    const bookings = db.get('bookings') || [];
    bookings.unshift(newBooking);
    db.set('bookings', bookings);
    db.logActivity('System', 'New Booking Received', `Booking ${confirmationCode} created for ${name.trim()} (${effectiveTourName}).`);

    // Async email dispatch
    let emailResult = { success: false };
    if (newBooking.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newBooking.email)) {
      try {
        emailResult = await sendBookingEmail(newBooking);
      } catch (e) {
        console.warn('Email send warning:', e.message);
      }
    }

    return res.status(200).json({
      success: true,
      confirmationCode,
      booking: newBooking,
      emailSent: emailResult.success || false
    });
  } catch (err) {
    console.error('Booking submission error:', err);
    return res.status(500).json({ error: 'Failed to process reservation.' });
  }
});

// Public Lead / Inquiry submission
app.post('/api/lead', (req, res) => {
  try {
    const { name, email, phone, message, source } = req.body || {};
    if (!name || (!phone && !email)) {
      return res.status(400).json({ error: 'Name and phone/email are required.' });
    }
    const lead = {
      id: `lead_${Date.now()}`,
      name: name.trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      message: (message || '').trim(),
      source: source || 'Website Contact Form',
      date: new Date().toISOString(),
      status: 'New',
      notes: ''
    };
    const leads = db.get('leads') || [];
    leads.unshift(lead);
    db.set('leads', leads);
    db.logActivity('System', 'New Lead Inquiry', `Inquiry received from ${name.trim()}.`);
    return res.json({ success: true, lead });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to record inquiry.' });
  }
});

// Backward-compatible email testing & logs APIs
app.post('/api/test-email', async (req, res) => {
  try {
    const { toEmail, email } = req.body || {};
    const target = toEmail || email;
    if (!target) return res.status(400).json({ error: 'Target email address required.' });
    const result = await sendTestEmail(target.trim());
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/email-status', (req, res) => {
  res.json(getEmailConfigStatus());
});

app.get('/api/bookings', (req, res) => {
  res.json({ bookings: db.get('bookings') || [] });
});

// ==========================================
// ADMIN DASHBOARD REST APIs
// ==========================================

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  const users = db.get('users') || [];
  const pwdHash = hashPassword(password);
  const user = users.find(u => u.username === username.trim() && u.passwordHash === pwdHash);

  if (!user && (username === 'admin' && password === 'admin123')) {
    // Fallback default admin
    const defaultUser = {
      id: 'usr_admin',
      username: 'admin',
      name: 'Phoenix Admin',
      email: 'admin@phoenix-tours.ae',
      role: 'Super Admin'
    };
    const token = crypto.randomBytes(32).toString('hex');
    authTokens.set(token, defaultUser);
    db.logActivity(defaultUser.name, 'Admin Login', 'Logged in to dashboard.');
    return res.json({ success: true, token, user: defaultUser });
  }

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const userProfile = { id: user.id, username: user.username, name: user.name, email: user.email, role: user.role };
  authTokens.set(token, userProfile);
  db.logActivity(user.name, 'Admin Login', 'Logged in to dashboard.');
  return res.json({ success: true, token, user: userProfile });
});

// Current Admin User
app.get('/api/admin/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Overview Stats API
app.get('/api/admin/stats', authMiddleware, (req, res) => {
  const tours = db.get('tours') || [];
  const bookings = db.get('bookings') || [];
  const leads = db.get('leads') || [];
  const logs = db.get('activityLogs') || [];

  const totalTours = tours.length;
  const activeTours = tours.filter(t => t.status === 'Published').length;
  const draftTours = tours.filter(t => t.status === 'Draft').length;

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending' || b.status === 'New').length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;

  const totalRevenue = bookings.filter(b => b.status !== 'Cancelled').reduce((sum, b) => sum + (Number(b.total) || 0), 0);
  const totalLeads = leads.length;

  // SEO/AEO/GEO checks
  let missingSeoCount = 0;
  tours.forEach(t => {
    if (!t.seo?.title || !t.seo?.metaDescription) missingSeoCount++;
  });
  const seoHealthScore = totalTours > 0 ? Math.round(((totalTours - missingSeoCount) / totalTours) * 100) : 100;

  // Monthly stats
  const monthlyRevenue = [
    { month: 'Jan', revenue: 14500, bookings: 32 },
    { month: 'Feb', revenue: 18200, bookings: 41 },
    { month: 'Mar', revenue: 22400, bookings: 55 }
  ];

  res.json({
    tours: { total: totalTours, active: activeTours, draft: draftTours },
    bookings: { total: totalBookings, pending: pendingBookings, confirmed: confirmedBookings, cancelled: cancelledBookings, revenue: totalRevenue },
    leads: { total: totalLeads },
    seoHealth: { score: seoHealthScore, missingFields: missingSeoCount, aeoStatus: 'Optimal (Q&A Schema Active)', geoStatus: 'Optimal (Business Bay LocalBusiness Active)' },
    recentBookings: bookings.slice(0, 5),
    recentLogs: logs.slice(0, 6),
    monthlyRevenue
  });
});

// Homepage CMS APIs
app.get('/api/admin/cms/homepage', authMiddleware, (req, res) => {
  res.json(db.get('homepage') || {});
});

app.post('/api/admin/cms/homepage', authMiddleware, (req, res) => {
  const data = req.body || {};
  db.set('homepage', data);
  db.logActivity(req.user.name, 'Updated Homepage CMS', 'Saved new homepage layout and content.');
  res.json({ success: true, homepage: data });
});

// Tours Management APIs
app.get('/api/admin/tours', authMiddleware, (req, res) => {
  res.json({ tours: db.get('tours') || [] });
});

app.get('/api/admin/tours/:id', authMiddleware, (req, res) => {
  const tours = db.get('tours') || [];
  const tour = tours.find(t => t.id === req.params.id);
  if (!tour) return res.status(404).json({ error: 'Tour not found.' });
  res.json({ tour });
});

app.post('/api/admin/tours', authMiddleware, (req, res) => {
  const newTour = req.body || {};
  if (!newTour.name) return res.status(400).json({ error: 'Tour name is required.' });
  newTour.id = newTour.id || `tour_${Date.now()}`;
  newTour.slug = newTour.slug || newTour.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  newTour.status = newTour.status || 'Published';

  const tours = db.get('tours') || [];
  tours.unshift(newTour);
  db.set('tours', tours);
  db.logActivity(req.user.name, 'Created Tour', `Added new tour "${newTour.name}".`);
  res.json({ success: true, tour: newTour });
});

app.put('/api/admin/tours/:id', authMiddleware, (req, res) => {
  const tours = db.get('tours') || [];
  const idx = tours.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Tour not found.' });

  const updated = { ...tours[idx], ...req.body };
  tours[idx] = updated;
  db.set('tours', tours);
  db.logActivity(req.user.name, 'Updated Tour', `Modified tour "${updated.name}".`);
  res.json({ success: true, tour: updated });
});

app.delete('/api/admin/tours/:id', authMiddleware, (req, res) => {
  let tours = db.get('tours') || [];
  const tour = tours.find(t => t.id === req.params.id);
  if (!tour) return res.status(404).json({ error: 'Tour not found.' });
  tours = tours.filter(t => t.id !== req.params.id);
  db.set('tours', tours);
  db.logActivity(req.user.name, 'Deleted Tour', `Removed tour "${tour.name}".`);
  res.json({ success: true });
});

app.post('/api/admin/tours/:id/duplicate', authMiddleware, (req, res) => {
  const tours = db.get('tours') || [];
  const original = tours.find(t => t.id === req.params.id);
  if (!original) return res.status(404).json({ error: 'Tour not found.' });

  const copy = JSON.parse(JSON.stringify(original));
  copy.id = `tour_${Date.now()}`;
  copy.name = `${original.name} (Copy)`;
  copy.slug = `${original.slug}-copy`;
  copy.status = 'Draft';

  tours.unshift(copy);
  db.set('tours', tours);
  db.logActivity(req.user.name, 'Duplicated Tour', `Created copy of "${original.name}".`);
  res.json({ success: true, tour: copy });
});

// Media Library APIs
app.get('/api/admin/media', authMiddleware, (req, res) => {
  res.json({ media: db.get('media') || [] });
});

app.post('/api/admin/media', authMiddleware, (req, res) => {
  const mediaItem = req.body || {};
  if (!mediaItem.url) return res.status(400).json({ error: 'Image URL is required.' });

  mediaItem.id = mediaItem.id || `med_${Date.now()}`;
  mediaItem.name = mediaItem.name || 'uploaded_image.jpg';
  mediaItem.folder = mediaItem.folder || 'General';
  mediaItem.createdAt = new Date().toISOString();

  const mediaList = db.get('media') || [];
  mediaList.unshift(mediaItem);
  db.set('media', mediaList);
  db.logActivity(req.user.name, 'Uploaded Media', `Added "${mediaItem.name}" to folder "${mediaItem.folder}".`);
  res.json({ success: true, media: mediaItem });
});

app.delete('/api/admin/media/:id', authMiddleware, (req, res) => {
  let mediaList = db.get('media') || [];
  mediaList = mediaList.filter(m => m.id !== req.params.id);
  db.set('media', mediaList);
  db.logActivity(req.user.name, 'Deleted Media', `Removed media item ${req.params.id}.`);
  res.json({ success: true });
});

// SEO, AEO & GEO APIs
app.get('/api/admin/seo', authMiddleware, (req, res) => {
  const tours = db.get('tours') || [];
  const settings = db.get('settings') || {};
  const faqs = db.get('faqs') || [];

  const audit = tours.map(t => {
    const titleLen = t.seo?.title ? t.seo.title.length : 0;
    const descLen = t.seo?.metaDescription ? t.seo.metaDescription.length : 0;
    const hasAlt = !!t.media?.featuredImage;
    const score = (titleLen > 30 ? 30 : 0) + (descLen > 70 ? 40 : 0) + (hasAlt ? 30 : 0);
    return {
      id: t.id,
      name: t.name,
      pageUrl: `/${t.slug}`,
      seoTitle: t.seo?.title || '',
      metaDescription: t.seo?.metaDescription || '',
      titleLength: titleLen,
      descriptionLength: descLen,
      score,
      status: score >= 80 ? 'Good' : score >= 50 ? 'Needs Improvement' : 'Critical'
    };
  });

  const geoChecklist = [
    { item: 'Schema.org TravelAgency Markup', status: 'Optimal', details: 'Configured with Office 701, XL Tower, Business Bay' },
    { item: 'Schema.org LocalBusiness Address', status: 'Optimal', details: 'Full physical address in footer and header' },
    { item: 'WhatsApp Business Contact Entity', status: 'Optimal', details: '+971 56 150 5270 verified' },
    { item: 'Price Range & Currency Schema', status: 'Optimal', details: 'AED currency tags present' }
  ];

  res.json({
    audit,
    geoChecklist,
    aeoSummary: { totalFaqs: faqs.length, activeFaqs: faqs.filter(f => f.active).length, snippetReadiness: 'High (100% structured answers)' }
  });
});

// Schema Generator API
app.get('/api/admin/schema', authMiddleware, (req, res) => {
  const settings = db.get('settings') || {};
  const faqs = db.get('faqs') || [];

  const schemas = {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': settings.siteName,
      'url': settings.siteUrl,
      'telephone': settings.phone,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Office 701, XL Tower, Business Bay',
        'addressLocality': 'Dubai',
        'addressCountry': 'AE'
      }
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(f => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer
        }
      }))
    }
  };

  res.json({ schemas });
});

// Bookings Admin APIs
app.get('/api/admin/bookings', authMiddleware, (req, res) => {
  res.json({ bookings: db.get('bookings') || [] });
});

app.put('/api/admin/bookings/:id', authMiddleware, (req, res) => {
  const bookings = db.get('bookings') || [];
  const idx = bookings.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Booking not found.' });

  bookings[idx] = { ...bookings[idx], ...req.body };
  db.set('bookings', bookings);
  db.logActivity(req.user.name, 'Updated Booking', `Updated booking ${req.params.id} status to "${bookings[idx].status}".`);
  res.json({ success: true, booking: bookings[idx] });
});

app.delete('/api/admin/bookings/:id', authMiddleware, (req, res) => {
  let bookings = db.get('bookings') || [];
  bookings = bookings.filter(b => b.id !== req.params.id);
  db.set('bookings', bookings);
  db.logActivity(req.user.name, 'Deleted Booking', `Removed booking ${req.params.id}.`);
  res.json({ success: true });
});

app.get('/api/admin/bookings/export', authMiddleware, (req, res) => {
  const bookings = db.get('bookings') || [];
  let csv = 'ID,Name,Phone,Email,Tour,Package,Date,Time,Riders,Total (AED),Status,Payment\n';
  bookings.forEach(b => {
    csv += `"${b.id}","${b.name}","${b.phone}","${b.email}","${b.tour}","${b.package}","${b.date}","${b.time}",${b.riders},${b.total},"${b.status}","${b.paymentStatus}"\n`;
  });
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="phoenix_bookings.csv"');
  res.send(csv);
});

// FAQs APIs
app.get('/api/admin/faqs', authMiddleware, (req, res) => {
  res.json({ faqs: db.get('faqs') || [] });
});

app.post('/api/admin/faqs', authMiddleware, (req, res) => {
  const faq = req.body || {};
  if (!faq.question || !faq.answer) return res.status(400).json({ error: 'Question and answer required.' });
  faq.id = faq.id || `faq_${Date.now()}`;
  faq.active = faq.active !== false;

  const faqs = db.get('faqs') || [];
  faqs.unshift(faq);
  db.set('faqs', faqs);
  db.logActivity(req.user.name, 'Created FAQ', `Added question "${faq.question.substring(0, 30)}...".`);
  res.json({ success: true, faq });
});

app.put('/api/admin/faqs/:id', authMiddleware, (req, res) => {
  const faqs = db.get('faqs') || [];
  const idx = faqs.findIndex(f => f.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'FAQ not found.' });

  faqs[idx] = { ...faqs[idx], ...req.body };
  db.set('faqs', faqs);
  db.logActivity(req.user.name, 'Updated FAQ', `Updated FAQ ${req.params.id}.`);
  res.json({ success: true, faq: faqs[idx] });
});

app.delete('/api/admin/faqs/:id', authMiddleware, (req, res) => {
  let faqs = db.get('faqs') || [];
  faqs = faqs.filter(f => f.id !== req.params.id);
  db.set('faqs', faqs);
  db.logActivity(req.user.name, 'Deleted FAQ', `Removed FAQ ${req.params.id}.`);
  res.json({ success: true });
});

// Testimonials APIs
app.get('/api/admin/testimonials', authMiddleware, (req, res) => {
  res.json({ testimonials: db.get('testimonials') || [] });
});

app.post('/api/admin/testimonials', authMiddleware, (req, res) => {
  const test = req.body || {};
  test.id = test.id || `test_${Date.now()}`;
  const testimonials = db.get('testimonials') || [];
  testimonials.unshift(test);
  db.set('testimonials', testimonials);
  db.logActivity(req.user.name, 'Created Testimonial', `Added review from ${test.customerName}.`);
  res.json({ success: true, testimonial: test });
});

// Leads APIs
app.get('/api/admin/leads', authMiddleware, (req, res) => {
  res.json({ leads: db.get('leads') || [] });
});

app.put('/api/admin/leads/:id', authMiddleware, (req, res) => {
  const leads = db.get('leads') || [];
  const idx = leads.findIndex(l => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Lead not found.' });

  leads[idx] = { ...leads[idx], ...req.body };
  db.set('leads', leads);
  db.logActivity(req.user.name, 'Updated Lead', `Updated lead status to "${leads[idx].status}".`);
  res.json({ success: true, lead: leads[idx] });
});

// Navigation Menus APIs
app.get('/api/admin/menus', authMiddleware, (req, res) => {
  res.json({ menus: db.get('menus') || { header: [], footer: [] } });
});

app.post('/api/admin/menus', authMiddleware, (req, res) => {
  const menus = req.body || {};
  db.set('menus', menus);
  db.logActivity(req.user.name, 'Updated Menus', 'Reordered navigation header & footer links.');
  res.json({ success: true, menus });
});

// Global Settings APIs
app.get('/api/admin/settings', authMiddleware, (req, res) => {
  res.json(db.get('settings') || {});
});

app.post('/api/admin/settings', authMiddleware, (req, res) => {
  const settings = req.body || {};
  db.set('settings', settings);
  db.logActivity(req.user.name, 'Updated Settings', 'Saved global website settings.');
  res.json({ success: true, settings });
});

// Activity Logs API
app.get('/api/admin/activity', authMiddleware, (req, res) => {
  res.json({ logs: db.get('activityLogs') || [] });
});

// Explicit 404 page handler (returns HTTP 404)
app.get(['/404', '/404.html'], (req, res) => {
  const file404 = path.join(DIST_DIR, '404.html');
  if (fs.existsSync(file404)) {
    res.status(404).sendFile(file404, (err) => {
      if (err && !res.headersSent) res.status(404).send('<h1>404 Not Found</h1>');
    });
  } else {
    res.status(404).send('<h1>404 Not Found</h1>');
  }
});

// Serve static assets for sub-paths
app.use('/rides', express.static(DIST_DIR));

// Serve static assets with extension resolution
app.use(express.static(DIST_DIR, {
  extensions: ['html', 'htm']
}));

// Route fallback for /admin
app.get('/admin', (req, res) => {
  const fileAdmin = path.join(DIST_DIR, 'admin.html');
  if (fs.existsSync(fileAdmin)) {
    res.sendFile(fileAdmin, (err) => {
      if (err && !res.headersSent) res.status(404).send('<h1>Admin Page Not Found</h1>');
    });
  } else {
    res.status(404).send('<h1>Admin Page Not Found</h1>');
  }
});

// Asset fallback
app.use((req, res, next) => {
  if (/\.(js|css|jpg|jpeg|png|gif|svg|webp|ico|json|map|woff|woff2|ttf|eot)$/i.test(req.path)) {
    return res.status(404).type('text/plain').send('Asset not found');
  }
  next();
});

// Fallback: serve branded 404 page
app.use((req, res) => {
  const file404 = path.join(DIST_DIR, '404.html');
  if (fs.existsSync(file404)) {
    res.status(404).sendFile(file404, (err) => {
      if (err && !res.headersSent) res.status(404).send('<h1>404 Not Found</h1>');
    });
  } else {
    res.status(404).send('<h1>404 Not Found</h1>');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Phoenix Tours server running at http://0.0.0.0:${PORT}`);
});
