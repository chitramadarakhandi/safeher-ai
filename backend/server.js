const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const aiRoutes = require('./routes/ai.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ai', aiRoutes);

const path = require('path');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'SafeHer backend is running' });
});

// Serve frontend in production structure
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all to serve index.html for React Router / SPA navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
