const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const jwt = require('jsonwebtoken');

// ==============================
// 🔐 AUTH MIDDLEWARE
// ==============================
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// ==============================
// 📝 CREATE BOOKING
// ==============================
// ✅ FIX #9: Auth required + userId saved from token
router.post('/', auth, async (req, res) => {
  try {
    const { personId, personType, name, date, time } = req.body;

    const booking = await Booking.create({
      userId: req.user.id, // ✅ FIX #5: userId from auth token, not from body
      personId,
      personType,
      name,
      date,
      time,
      status: 'pending',
    });

    res.status(200).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  }
});

// ==============================
// 🔍 GET MY BOOKINGS
// ==============================
// ✅ FIX #9: Auth required + only return current user's bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.status(200).json(bookings);
  } catch {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router;