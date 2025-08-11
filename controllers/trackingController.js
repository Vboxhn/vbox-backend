// vbox-backend/controllers/trackingController.js
const Tracking = require('../models/Tracking');

const createTracking = async (req, res) => {
  try {
    const { trackingNumber, carrier, description } = req.body;
    if (!trackingNumber) return res.status(400).json({ message: 'trackingNumber es requerido' });

    const exists = await Tracking.findOne({ trackingNumber });
    if (exists) return res.status(400).json({ message: 'Ese tracking ya existe' });

    const doc = await Tracking.create({
      trackingNumber,
      carrier: carrier || '',
      description: description || '',
      userId: req.userId,
    });

    res.status(201).json(doc);
  } catch (e) {
    console.error('❌ createTracking:', e.message);
    res.status(500).json({ message: 'Error al crear tracking' });
  }
};

const listMyTrackings = async (req, res) => {
  try {
    const rows = await Tracking.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) {
    console.error('❌ listMyTrackings:', e.message);
    res.status(500).json({ message: 'Error al listar trackings' });
  }
};

module.exports = { createTracking, listMyTrackings };
