# SERACID Solutions — Full Stack Website

**Software Engineering Research Agency for Complex Integrated Development**

## Stack
- **Frontend:** React 18, Framer Motion, Three.js, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), Nodemailer
- **Deploy:** Frontend → Vercel | Backend → Railway / Render

---

## Project Structure
```
seracid/
├── backend/
│   ├── models/        Lead.js | Project.js | ProjectLog.js
│   ├── routes/        contact.js | projects.js | logs.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/       index.js
    │   ├── components/
    │   │   ├── Cursor.jsx
    │   │   ├── Nav.jsx
    │   │   ├── Hero.jsx       ← Three.js wireframe canvas
    │   │   ├── Ticker.jsx
    │   │   ├── Services.jsx
    │   │   ├── WhyUs.jsx
    │   │   ├── Team.jsx       ← 3 members: Kaleeswaran, Shanmuga, Rahul
    │   │   ├── Portfolio.jsx  ← Fetches from MongoDB API
    │   │   ├── ProjectLog.jsx ← CLI terminal feed from DB
    │   │   ├── Contact.jsx    ← Saves lead to DB + emails + WhatsApp fallback
    │   │   └── Footer.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── index.js
    ├── .env.example
    └── package.json
```

---

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Fill in MONGO_URI and MAIL_PASS
node server.js
```

### Seed Database (run once)
```bash
POST http://localhost:5000/api/projects/seed
POST http://localhost:5000/api/logs/seed
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Set REACT_APP_API_URL=http://localhost:5000/api
npm start
```

### Production Build
```bash
cd frontend && npm run build
# Deploy /build folder to Vercel
# Deploy backend to Railway/Render
```

---

## Contact
- **Phone/WhatsApp:** +91 63799 53691
- **Email:** Kaleessultan415@gmail.com
- **GitHub:** github.com/kaleez17
- **Portfolio:** kaleez-dev.netlify.app
- **Instagram:** instagram.com/kaleez
