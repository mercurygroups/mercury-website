const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json({ limit: '1mb' }));

// Serve static build assets and ensure CSS has correct MIME type
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders(res, filePath) {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';

// Simple rule-based fallback generator so the frontend has working AI-like responses
// even when the real GenAI SDK/key is not available. If you later add a server SDK
// or REST integration to Google GenAI, replace this handler with real calls.
app.post('/api/generate', async (req, res) => {
  const { prompt, history } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  // If a real GEMINI_API_KEY is present, we could integrate the official API here.
  if (!apiKey) {
    // Lightweight rule-based replies for common queries
    const p = prompt.toLowerCase();
    let reply = '';

    if (p.includes('flight')) {
      reply = 'We handle domestic and international flight processing. Please provide travel dates and destinations so we can check availability and rates.';
    } else if (p.includes('visa')) {
      reply = 'We offer visa assistance for tourist and business visas. Tell us the destination country and purpose, and we will guide you on requirements.';
    } else if (p.includes('car') || p.includes('rental')) {
      reply = 'Our premium fleet includes SUVs, sedans and supercars. Visit our Fleet page to choose a vehicle or use the contact form to request availability and pricing.';
    } else if (p.includes('insurance')) {
      reply = 'We provide travel insurance options. Let us know your trip duration and passenger count to get a quote.';
    } else if (p.includes('logistics') || p.includes('delivery')) {
      reply = 'We operate delivery services in Lagos, Abuja, and Port Harcourt. Provide pickup and drop-off locations and package size for an estimate.';
    } else {
      reply = 'Thanks for reaching out — please describe your request or use the contact form. For bookings, email mercurygroups247@gmail.com.';
    }

    return res.json({ text: reply });
  }

  // If a GEMINI_API_KEY is present but no SDK is installed, return an informative message.
  return res.status(501).json({ error: 'Server-side GenAI is not configured. Set up Google GenAI integration on the server.' });
});

// fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
