// vbox-backend/controllers/authController.js
const User = require('../models/User');

/**
 * POST /api/register
 * POST /api/auth/register
 */
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, password } = req.body;

    if (!nombre || !apellido || !telefono || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'El correo ya está registrado' });

    const user = await User.create({ nombre, apellido, telefono, email, password });
    return res.status(201).json({
      message: 'Usuario creado',
      user: { id: user._id, nombre: user.nombre, apellido: user.apellido, email: user.email },
    });
  } catch (err) {
    console.error('Error registerUser:', err);
    return res.status(500).json({ message: 'Error interno en el registro' });
  }
};

/**
 * POST /api/auth/login
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });

    const user = await User.findOne({ email, password }); // simple para salir del paso
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    return res.json({
      message: 'Login exitoso',
      user: { id: user._id, nombre: user.nombre, apellido: user.apellido, email: user.email },
    });
  } catch (err) {
    console.error('Error loginUser:', err);
    return res.status(500).json({ message: 'Error interno al iniciar sesión' });
  }
};

module.exports = { registerUser, loginUser };
