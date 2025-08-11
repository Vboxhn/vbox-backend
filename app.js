const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error en MongoDB', err));

// Rutas
app.use('/api/users', require('./routes/users'));
// Aquí puedes agregar otras rutas si las necesitas
app.get('/', (req, res) => {
  res.send('Servidor backend de VBOX funcionando 🚀');
});

// Servidor (usar puerto dinámico de Render o 5000 en local)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`));
