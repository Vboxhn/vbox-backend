// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ---------- CORS ----------
const allowed = [
  'http://localhost:3000',
  'https://vbox-backend.onrender.com', // por si haces pruebas cruzadas
  'https://vboxhn.com',
  'https://www.vboxhn.com',
];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // Postman / curl
      if (allowed.some((o) => origin.startsWith(o))) return cb(null, true);
      return cb(null, true); // si quieres bloquear, cambia a cb(new Error('CORS'), false)
    },
    credentials: true,
  })
);

// ---------- Middlewares ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- DB ----------
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((e) => {
    console.error('❌ Error MongoDB:', e.message);
    process.exit(1);
  });

// ---------- Rutas ----------
app.use('/api', require('./routes/users'));     // /api/register, /api/users
app.use('/api/auth', require('./routes/auth')); // /api/auth/login

// Salud
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// ---------- Arranque ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`)
);
