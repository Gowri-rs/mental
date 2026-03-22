const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  // ✅ FIX #10 & #16: Link assessment to a user so each user only sees their own
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  totalScore: Number,
  maxScore: Number,
  recommendation: String,
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);