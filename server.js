const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname, { extensions: ['html'] }));

// Mock health endpoint for local verification only. No external services.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'fashion-studio-prototype', mock: true });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Fashion Studio prototype running at http://localhost:${PORT}`);
});
