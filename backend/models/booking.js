const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: String,
  volunteerId: String,
  date: String,
  status: String
});

module.exports = mongoose.model('Booking', bookingSchema);