const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const required = (obj, fields) => fields.every(f => obj?.[f] && String(obj[f]).trim().length);

const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, password } = req.body;

    if (!required(req.body, ['nombre','apellido','telefono','email','password'])) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const exist = await User.findOne({ email: email.toLowerCase() });
    if (exist) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ nombre, apellido, telefono, email: email.toLowerCase(), password: hashed });

    return res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (e) {
    console.error('❌ Error en registro:', e);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!required(req.body, ['email','password'])) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Contraseña incorrecta' });

    if (!process.env.JWT_SECRET) {
      console.error('Falta JWT_SECRET en .env');
      return res.status(500).json({ message: 'Configuración del servidor incompleta' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  } catch (e) {
    console.error('❌ Error en login:', e);
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = { registerUser, loginUser };
