const express = require('express');
const router  = express.Router();
const ProjectLog = require('../models/ProjectLog');

// ─── GET latest logs
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const logs = await ProjectLog.find().sort({ createdAt: -1 }).limit(limit);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST seed logs
router.post('/seed', async (req, res) => {
  try {
    await ProjectLog.deleteMany({});
    const seed = [
      { type:'deploy',    project:'seracid-web',        message:'v2.0.0 deployed to production',          branch:'main',    author:'kaleez17' },
      { type:'commit',    project:'buddy-sticker-shop',  message:'feat: add UPI checkout integration',      branch:'main',    author:'kaleez17' },
      { type:'launch',    project:'appointment-booking', message:'client site went live — smb-ramnad.com',  branch:'release', author:'kaleez17' },
      { type:'commit',    project:'memory-keeper',       message:'fix: image upload timeout on mobile',     branch:'fix/img', author:'kaleez17' },
      { type:'milestone', project:'3d-gallery',          message:'40% engagement boost confirmed by client',branch:'main',    author:'shanmuga' },
      { type:'commit',    project:'dashboard',           message:'feat: add recharts revenue widget',       branch:'dev',     author:'kaleez17' },
      { type:'deploy',    project:'flames-predictor',    message:'deployed v1.2 — added score history',     branch:'main',    author:'kaleez17' },
      { type:'commit',    project:'vigil-os',            message:'init: project scaffold for client site',  branch:'main',    author:'kaleez17' },
      { type:'update',    project:'seracid-web',         message:'chore: update team section with new bios',branch:'main',    author:'shanmuga' },
      { type:'commit',    project:'reverse-marketplace', message:'feat: add seller dashboard with analytics',branch:'dev',    author:'kaleez17' },
      { type:'launch',    project:'mood-companion',      message:'v1.0 shipped — emotion tracking live',    branch:'main',    author:'kaleez17' },
      { type:'commit',    project:'seracid-api',         message:'feat: lead capture system with nodemailer',branch:'backend',author:'kaleez17' },
    ];
    await ProjectLog.insertMany(seed);
    res.json({ message: `Seeded ${seed.length} logs` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
