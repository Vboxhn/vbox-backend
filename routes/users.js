// routes/users.js
const router = require('express').Router();
const User = require('../models/User');

// Registrar usuario (casillero)
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, password } = req.body;

    if (!nombre || !apellido || !telefono || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son obligatorios' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email ya registrado' });

    const user = new User({ nombre, apellido, telefono, email, password });
    await user.save();

    return res.json({ message: 'Registrado', userId: user._id });
  } catch (err) {
    console.error('Error en /api/register:', err);
    return res.status(500).json({ message: 'Error interno' });
  }
});

// Listar usuarios (opcional)
router.get('/users', async (_req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = router;
