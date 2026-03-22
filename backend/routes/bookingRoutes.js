const express = require('express');
const router = express.Router();

const Booking = require('../models/booking');

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(200).json({
      message: 'Booking successful',
      booking
    });

  } catch {
    res.status(500).json({ message: 'Booking failed' });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json(bookings);

  } catch {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router;