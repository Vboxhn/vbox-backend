// vbox-backend/routes/trackings.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createTracking, listMyTrackings } = require('../controllers/trackingController');

router.post('/', auth, createTracking);  // Crear tracking (requiere token)
router.get('/', auth, listMyTrackings);  // Listar mis trackings (requiere token)

module.exports = router;
