// routes/auth.js
const router = require('express').Router();
const { register } = require('../controllers/authController');

// Ruta “oficial”
router.post('/register', register);

// Aliases para que NUNCA vuelva a salir 404
router.post('/users/register', register);
router.post('/users', register);
router.post('/auth/register', register);

module.exports = router;
