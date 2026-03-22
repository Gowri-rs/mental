const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
  name: { type: String, required: true },
  supportArea: { type: String, required: true },
  language: { type: String, required: true },
  availability: { type: String, required: true },
  experience: { type: String, required: true },
  status: { type: String, default: 'pending' }, // pending, approved, rejected
});

module.exports = mongoose.model('Volunteers', volunteerSchema);