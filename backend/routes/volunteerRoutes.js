const express = require('express');
const router = express.Router();

const Volunteer = require('../models/Volunteer');

router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch {
    res.status(500).json({ message: 'Error fetching volunteers' });
  }
});

module.exports = router;