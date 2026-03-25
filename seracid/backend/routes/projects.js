const express = require('express');
const router  = express.Router();
const Project = require('../models/Project');

// ─── GET all active projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST seed projects (run once to populate DB)
router.post('/seed', async (req, res) => {
  try {
    await Project.deleteMany({});
    const seed = [
      {
        title: 'Buddy Sticker Shop',
        tag: 'E-Commerce · MERN',
        description: 'Full e-commerce platform with custom branding, cart, checkout, and order management.',
        longDesc: 'Proves complex UI, payment processing, and product showcase capability at production level.',
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&auto=format&fit=crop',
        liveUrl: '#', githubUrl: 'https://github.com/kaleez17',
        techs: ['React','Node.js','MongoDB','Express','Stripe'],
        featured: true, order: 1
      },
      {
        title: 'Immersive 3D Gallery',
        tag: '3D Experience · Three.js',
        description: 'Interactive 3D product gallery built with Three.js and React Three Fiber.',
        longDesc: 'Rotate, zoom and explore products in real-time WebGL space. 40% engagement boost proven.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop',
        liveUrl: '#', githubUrl: 'https://github.com/kaleez17',
        techs: ['Three.js','React Three Fiber','Framer Motion','WebGL'],
        featured: true, order: 2
      },
      {
        title: 'Business Dashboard',
        tag: 'Analytics · React',
        description: 'Real-time analytics dashboard with data visualisation and role-based auth.',
        longDesc: 'API integrations for a growing SMB client. Recharts, JWT auth, MongoDB aggregation pipelines.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop',
        liveUrl: 'https://github.com/kaleez17', githubUrl: 'https://github.com/kaleez17',
        techs: ['React','Node.js','MongoDB','JWT','Recharts'],
        featured: false, order: 3
      },
      {
        title: 'Appointment Booking',
        tag: 'SaaS · Node.js',
        description: 'Full-stack booking platform with automated WhatsApp notifications.',
        longDesc: 'Calendar sync, UPI payment integration, and real-time slot management.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&auto=format&fit=crop',
        liveUrl: '#', githubUrl: 'https://github.com/kaleez17',
        techs: ['Node.js','Express','MongoDB','WhatsApp API','Razorpay'],
        featured: false, order: 4
      },
      {
        title: 'Memory Keeper',
        tag: 'React · MongoDB',
        description: 'Personal memory and journal application with rich media uploads and tagging.',
        longDesc: 'Timeline view, tag-based filtering, and clean performant React UI with cloud storage.',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700&auto=format&fit=crop',
        liveUrl: '#', githubUrl: 'https://github.com/kaleez17',
        techs: ['React','MongoDB','Express','Cloudinary','Tailwind'],
        featured: false, order: 5
      },
      {
        title: 'SMB Digital Launch',
        tag: 'SMB · SEO · Hosting',
        description: 'Took a local business from zero online presence to live and Google-indexed in 5 days.',
        longDesc: 'Google My Business integration, on-page SEO, mobile-first responsive design, and analytics setup.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop',
        liveUrl: '#', githubUrl: 'https://github.com/kaleez17',
        techs: ['Next.js','SEO','Google My Business','Vercel','Analytics'],
        featured: false, order: 6
      }
    ];
    await Project.insertMany(seed);
    res.json({ message: `Seeded ${seed.length} projects` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
