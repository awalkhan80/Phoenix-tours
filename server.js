import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');

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
