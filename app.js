// vbox-backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- CORS (permite al frontend hablar con el backend)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: false,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS']
}));

app.use(express.json({ limit: '15mb' })); // para fotos base64

// --- Rutas
const userRoutes  = require('./routes/users');   // ya las tenías
const authRoutes  = require('./routes/auth');    // si las usas
const adminRoutes = require('./routes/admin');   // NUEVO

app.use('/api/users', userRoutes);
app.use('/api/auth',  authRoutes);
app.use('/api/admin', adminRoutes);              // <- monta rutas admin

// Ruta simple para probar que el backend está vivo
app.get('/', (_req, res) => res.json({ ok: true, api: 'vbox-backend' }));

// --- MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado a MongoDB');
}).catch(err => {
  console.error('❌ Error en conexión MongoDB:', err);
});

// --- Arrancar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});
