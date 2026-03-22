const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // ✅ FIX #18: Use ObjectId refs instead of plain strings
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  personType: {
    type: String,
    enum: ['volunteer', 'therapist'],
    required: true,
  },
  name: String,
  date: String,
  time: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);