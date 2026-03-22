const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['user', 'volunteer', 'therapist', 'admin'],
    default: 'user',
  },
  // Extra profile fields for volunteers/therapists
  phone: { type: String, trim: true },
  supportArea: { type: String, trim: true },
  language: { type: String, default: 'English' },
  experience: { type: String, trim: true },
  qualification: { type: String, trim: true },
  license: { type: String, trim: true },
  specialization: { type: String, trim: true },
  consultationFee: { type: String, trim: true },

  // ✅ FIX #6: Default 'approved' so regular users can login immediately.
  // authRoutes.js sets this to 'pending' for volunteer/therapist roles.
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;