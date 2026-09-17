import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

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

app.get('/book', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'book.html'));
});

// API endpoint for booking submissions
app.post('/api/book', (req, res) => {
  try {
    const { rideId, date, slotId, duration, name, email, phone, riders, notes } = req.body || {};
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }
    const confirmationCode = `PX-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const newBooking = {
      id: confirmationCode,
      confirmationCode,
      createdAt: new Date().toISOString(),
      rideId: rideId || 'quad-bike',
      date: date || '',
      slotId: slotId || '',
      duration: duration || '30 min',
      name,
      email: email || '',
      phone,
      riders: Number(riders) || 1,
      notes: notes || '',
      status: 'Confirmed'
    };
    serverBookings.unshift(newBooking);
    return res.status(200).json({
      success: true,
      confirmationCode,
      booking: newBooking
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process reservation.' });
  }
});

// API endpoint to retrieve recent bookings for admin sync
app.get('/api/bookings', (req, res) => {
  res.json({ bookings: serverBookings });
});

// Serve static assets with extension resolution (e.g. /admin -> admin.html)
app.use(express.static(DIST_DIR, {
  extensions: ['html', 'htm']
}));

// Route fallback for /admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'admin.html'));
});

// Fallback to index.html for client-side navigation
app.use((req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Phoenix Tours server running at http://0.0.0.0:${PORT}`);
});
