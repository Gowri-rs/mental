const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
  name: String,
  supportArea: String,
  language: String,
  availability: String,
  experience: String
});

module.exports = mongoose.model('Volunteer', volunteerSchema);