// vbox-backend/models/Tracking.js
const mongoose = require('mongoose');

const TrackingSchema = new mongoose.Schema(
  {
    trackingNumber: { type: String, required: true, unique: true, trim: true },
    carrier: { type: String, default: '' },
    description: { type: String, default: '' },
    status: { type: String, default: 'Pendiente' },
    photoUrl: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tracking', TrackingSchema);
