const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Prevents duplicate accounts
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    
  },
  role: {
    type: String,
    enum: ['user', 'volunteer', 'therapist', "admin"], // Restricts roles to specific values
    default: 'user'
  },
  supportArea: {
    type: String,
    trim: true
  },
  language: {
    type: String,
    default: 'English'
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
module.exports = User;