// vbox-backend/routes/admin.js
const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  listAllTrackings,
  updateStatus,
  uploadPhoto,
  updateTracking,
  deleteTracking,
  getStats,
} = require('../controllers/adminController');

router.get('/trackings', adminAuth, listAllTrackings);
router.get('/stats', adminAuth, getStats);
router.put('/trackings/:id/status', adminAuth, updateStatus);
router.put('/trackings/:id/photo', adminAuth, uploadPhoto);
router.put('/trackings/:id', adminAuth, updateTracking);
router.delete('/trackings/:id', adminAuth, deleteTracking);

module.exports = router;
