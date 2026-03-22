const express = require('express');
const router = express.Router();

const Therapist = require('../models/therapist');

router.get('/', async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.status(200).json(therapists);
  } catch {
    res.status(500).json({ message: 'Error fetching therapists' });
  }
});

module.exports = router;