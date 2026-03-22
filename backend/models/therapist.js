const mongoose = require('mongoose');

const therapistSchema = mongoose.Schema({
  name: String,
  specialization: String,
  language: String,
  availability: String
});

module.exports = mongoose.model('Therapist', therapistSchema);