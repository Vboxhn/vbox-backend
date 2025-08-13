// routes/auth.js
const router = require('express').Router();
const User = require('../models/User');

// Login simple (sin hash para terminar rápido; luego podemos meter bcrypt)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ message: 'Credenciales obligatorias' });

    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    return res.json({ message: 'Login exitoso', userId: user._id });
  } catch (err) {
    console.error('Error en /api/auth/login:', err);
    return res.status(500).json({ message: 'Error interno' });
  }
});

module.exports = router;
