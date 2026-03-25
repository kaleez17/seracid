const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Lead = require('../models/Lead');

// ─── VALIDATION
const validate = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message too short')
];

// ─── MAILER
const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
});

// ─── POST /api/contact
router.post('/', validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, budget, service, message } = req.body;

  try {
    // 1. Save to MongoDB
    const lead = await Lead.create({
      name, email,
      phone:   phone   || '',
      budget:  budget  || 'Not specified',
      service: service || 'General Inquiry',
      message,
      ip: req.ip
    });

    // 2. Send notification email
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"SERACID Lead System" <${process.env.MAIL_USER}>`,
      to:   process.env.MAIL_TO,
      subject: `🚀 New Lead: ${name} — ${service || 'General Inquiry'}`,
      html: `
        <div style="font-family:monospace;background:#080808;color:#fff;padding:2rem;border-left:3px solid #E63946">
          <h2 style="color:#E63946;letter-spacing:0.1em">NEW LEAD // SERACID</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:1rem">
            <tr><td style="color:#00D1FF;padding:6px 0;width:120px">NAME</td><td style="color:#fff">${name}</td></tr>
            <tr><td style="color:#00D1FF;padding:6px 0">EMAIL</td><td><a href="mailto:${email}" style="color:#fff">${email}</a></td></tr>
            <tr><td style="color:#00D1FF;padding:6px 0">PHONE</td><td style="color:#fff">${phone || '—'}</td></tr>
            <tr><td style="color:#00D1FF;padding:6px 0">BUDGET</td><td style="color:#fff">${budget || '—'}</td></tr>
            <tr><td style="color:#00D1FF;padding:6px 0">SERVICE</td><td style="color:#fff">${service || '—'}</td></tr>
            <tr><td style="color:#00D1FF;padding:6px 0;vertical-align:top">MESSAGE</td><td style="color:#fff">${message}</td></tr>
          </table>
          <p style="color:#666;margin-top:1rem;font-size:12px">Lead ID: ${lead._id} · ${new Date().toISOString()}</p>
          <a href="https://wa.me/916379953691?text=Hi%20${encodeURIComponent(name)},%20thanks%20for%20reaching%20out%20to%20SERACID!"
             style="display:inline-block;margin-top:1rem;background:#25D366;color:#fff;padding:8px 20px;text-decoration:none">
            Reply on WhatsApp
          </a>
        </div>
      `
    });

    // 3. Send confirmation to lead
    await transporter.sendMail({
      from: `"SERACID Solutions" <${process.env.MAIL_USER}>`,
      to:   email,
      subject: `We got your message, ${name.split(' ')[0]}! 🚀`,
      html: `
        <div style="font-family:monospace;background:#080808;color:#fff;padding:2rem;border-left:3px solid #00D1FF">
          <h2 style="color:#00D1FF">SERACID // CONFIRMED</h2>
          <p style="color:#aaa;margin-top:1rem">Hey ${name.split(' ')[0]},</p>
          <p style="color:#aaa;margin-top:0.5rem">Your project brief landed. Shanmuga will reach out within 2 hours.</p>
          <p style="color:#E63946;margin-top:1rem;font-size:0.85rem">— KuttyStack / SERACID Team</p>
          <p style="color:#444;margin-top:2rem;font-size:11px">Software Engineering Research Agency for Complex Integrated Development</p>
        </div>
      `
    });

    res.status(201).json({ success: true, message: 'Lead captured. We\'ll be in touch!', id: lead._id });

  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Failed to process lead. Please try WhatsApp.' });
  }
});

// ─── GET /api/contact (admin - get all leads)
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(50);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
