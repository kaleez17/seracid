const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ─── SECURITY
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '10kb' }));

// ─── RATE LIMITING
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50, message: 'Too many requests' });
const contactLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, message: 'Too many contact requests' });
app.use('/api/', limiter);
app.use('/api/contact', contactLimiter);

// ─── MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ─── ROUTES
app.use('/api/contact',  require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/logs',     require('./routes/logs'));

// ─── HEALTH CHECK
app.get('/api/health', (req, res) => res.json({ status: 'SERACID API online', timestamp: new Date() }));

// ─── 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ─── ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 SERACID API running on port ${PORT}`));
