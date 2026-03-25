const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  tag:         { type: String, required: true },        // e.g. "E-Commerce · MERN"
  description: { type: String, required: true },
  longDesc:    { type: String, default: '' },
  image:       { type: String, default: '' },           // URL
  liveUrl:     { type: String, default: '' },
  githubUrl:   { type: String, default: '' },
  techs:       [{ type: String }],
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
  active:      { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
