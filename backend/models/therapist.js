const mongoose = require('mongoose');

const therapistSchema = mongoose.Schema({
  name: String,
  specialization: String,
  language: String,
  availability: String,
  fees: Number, // make sure this exists
  status: { type: String, default: 'pending' } // for approval logic
});

module.exports = mongoose.model('Therapist', therapistSchema);