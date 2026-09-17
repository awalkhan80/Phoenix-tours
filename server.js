import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  sendBookingEmail,
  sendTestEmail,
  getEmailLogs,
  getEmailConfigStatus
} from './email-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');

app.use(express.json());

// In-memory / server booking store
const serverBookings = [];

// Specific ride page aliases matching sandsxtremeadventures reference routes
app.get('/rides/quad-bike', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'quad-bike-dubai.html'));
});

app.get(['/rides/buggy', '/rides/dune-buggy'], (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'dune-buggy-dubai.html'));
});

app.get('/burj-khalifa-lake-ride', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'burj-khalifa-lake-ride.html'));
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

// API endpoint for booking submissions with automatic email dispatch
app.post('/api/book', async (req, res) => {
  try {
    const {
      rideId,
      rideName,
      tourId,
      tour,
      package: pkgName,
      unit,
      date,
      slotId,
      time,
      duration,
      rate,
      packagePrice,
      name,
      email,
      phone,
      riders,
      quantity,
      pickup,
      notes,
      total,
      collectionAmount,
      source
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
      date: date || '',
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

    serverBookings.unshift(newBooking);

    // Asynchronously dispatch lightweight email notification to user
    let emailResult = { success: false, reason: 'No email provided' };
    if (newBooking.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newBooking.email)) {
      try {
        emailResult = await sendBookingEmail(newBooking);
      } catch (mailErr) {
        console.warn('Non-blocking email send warning:', mailErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      confirmationCode,
      booking: newBooking,
      emailSent: emailResult.success || false,
      emailRecipient: newBooking.email || null,
      emailSimulated: emailResult.simulated || false
    });
  } catch (err) {
    console.error('Booking submission error:', err);
    return res.status(500).json({ error: 'Failed to process reservation.' });
  }
});

// API endpoint to send/resend a booking summary email manually
app.post('/api/send-email', async (req, res) => {
  try {
    const { booking, email } = req.body || {};
    if (!booking) {
      return res.status(400).json({ error: 'Booking payload is required.' });
    }
    const targetBooking = { ...booking };
    if (email) targetBooking.email = email.trim();

    if (!targetBooking.email) {
      return res.status(400).json({ error: 'Target email address is required.' });
    }

    const result = await sendBookingEmail(targetBooking);
    return res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to dispatch email.' });
  }
});

// API endpoint to test email configuration
app.post('/api/test-email', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: 'Target test email is required.' });
    }
    const result = await sendTestEmail(email.trim());
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to send test email.' });
  }
});

// API endpoint to retrieve email notification status and logs
app.get('/api/email-status', (req, res) => {
  res.json(getEmailConfigStatus());
});

// API endpoint to retrieve recent bookings for admin sync
app.get('/api/bookings', (req, res) => {
  res.json({ bookings: serverBookings });
});

// Also serve static assets for sub-paths (e.g. /rides/style.css, /rides/tour-data.js)
app.use('/rides', express.static(DIST_DIR));

// Serve static assets with extension resolution (e.g. /admin -> admin.html)
app.use(express.static(DIST_DIR, {
  extensions: ['html', 'htm']
}));

// Route fallback for /admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'admin.html'));
});

// Do not return HTML for missing static assets (prevent Unexpected token '<' errors)
app.use((req, res, next) => {
  if (/\.(js|css|jpg|jpeg|png|gif|svg|webp|ico|json|map|woff|woff2|ttf|eot)$/i.test(req.path)) {
    return res.status(404).type('text/plain').send('Asset not found');
  }
  next();
});

// Fallback to index.html for client-side navigation
app.use((req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Phoenix Tours server running at http://0.0.0.0:${PORT}`);
});

