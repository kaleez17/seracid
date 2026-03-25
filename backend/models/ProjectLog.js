const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  type:    { type: String, enum: ['deploy','commit','launch','update','milestone'], default: 'commit' },
  project: { type: String, required: true },
  message: { type: String, required: true },
  hash:    { type: String, default: () => Math.random().toString(36).slice(2,9) },
  branch:  { type: String, default: 'main' },
  author:  { type: String, default: 'kaleez17' }
}, { timestamps: true });

module.exports = mongoose.model('ProjectLog', logSchema);
