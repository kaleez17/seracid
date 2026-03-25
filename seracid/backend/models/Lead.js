const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 100 },
  email:   { type: String, required: true, trim: true, lowercase: true },
  phone:   { type: String, trim: true, default: '' },
  budget:  { type: String, default: 'Not specified' },
  service: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true, maxlength: 2000 },
  status:  { type: String, enum: ['new','contacted','converted','closed'], default: 'new' },
  source:  { type: String, default: 'website' },
  ip:      { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
