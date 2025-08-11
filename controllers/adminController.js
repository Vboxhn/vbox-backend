// vbox-backend/controllers/adminController.js
const Tracking = require('../models/Tracking');
const User = require('../models/User');

// Listar con filtros
const listAllTrackings = async (req, res) => {
  try {
    const { status, tracking } = req.query;
    const query = {};
    if (status && status !== 'Todos') query.status = status;
    if (tracking) query.trackingNumber = { $regex: tracking, $options: 'i' };

    const rows = await Tracking.find(query)
      .sort({ createdAt: -1 })
      .populate({ path: 'userId', select: 'nombre apellido telefono email' });

    res.json(rows);
  } catch (e) {
    console.error('❌ admin listAllTrackings:', e);
    res.status(500).json({ message: 'Error al listar trackings (admin)' });
  }
};

// Cambiar estado
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'status requerido' });

    const doc = await Tracking.findByIdAndUpdate(id, { status }, { new: true });
    if (!doc) return res.status(404).json({ message: 'Tracking no encontrado' });

    res.json(doc);
  } catch (e) {
    console.error('❌ admin updateStatus:', e);
    res.status(500).json({ message: 'Error al actualizar estado' });
  }
};

// Subir foto (base64 guardada en photoUrl)
const uploadPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { photoBase64 } = req.body;
    if (!photoBase64) return res.status(400).json({ message: 'photoBase64 requerido' });

    const doc = await Tracking.findByIdAndUpdate(id, { photoUrl: photoBase64 }, { new: true });
    if (!doc) return res.status(404).json({ message: 'Tracking no encontrado' });

    res.json(doc);
  } catch (e) {
    console.error('❌ admin uploadPhoto:', e);
    res.status(500).json({ message: 'Error al subir foto' });
  }
};

// Editar trackingNumber/carrier/description
const updateTracking = async (req, res) => {
  try {
    const { id } = req.params;
    const { trackingNumber, carrier, description } = req.body;

    const payload = {};
    if (trackingNumber !== undefined) payload.trackingNumber = trackingNumber;
    if (carrier !== undefined) payload.carrier = carrier;
    if (description !== undefined) payload.description = description;

    const doc = await Tracking.findByIdAndUpdate(id, payload, { new: true });
    if (!doc) return res.status(404).json({ message: 'Tracking no encontrado' });

    res.json(doc);
  } catch (e) {
    console.error('❌ admin updateTracking:', e);
    res.status(500).json({ message: 'Error al editar tracking' });
  }
};

// Borrar tracking
const deleteTracking = async (req, res) => {
  try {
    const { id } = req.params;
    const ok = await Tracking.findByIdAndDelete(id);
    if (!ok) return res.status(404).json({ message: 'Tracking no encontrado' });
    res.json({ ok: true });
  } catch (e) {
    console.error('❌ admin deleteTracking:', e);
    res.status(500).json({ message: 'Error al borrar tracking' });
  }
};

// Contadores (usuarios/trackings)
const getStats = async (_req, res) => {
  try {
    const userCount = await User.countDocuments();
    const trackingCount = await Tracking.countDocuments();
    res.json({ userCount, trackingCount });
  } catch (e) {
    console.error('❌ admin getStats:', e);
    res.status(500).json({ message: 'Error al obtener estadísticas' });
  }
};

module.exports = {
  listAllTrackings,
  updateStatus,
  uploadPhoto,
  updateTracking,
  deleteTracking,
  getStats,
};
