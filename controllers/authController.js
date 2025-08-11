const User = require('../models/User');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
  }
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    res.status(200).json({ message: 'Login exitoso', user });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno al iniciar sesión' });
  }
};

module.exports = { loginUser };
