// vbox-backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error MongoDB:', err));

// Rutas API (todas bajo /api)
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Salud
app.get('/', (req, res) => res.send('VBOX backend OK'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
