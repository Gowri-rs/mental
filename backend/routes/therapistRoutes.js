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

router.post('/add', async (req, res) => {
  try {
    const { name, specialization, language, availability, fees } = req.body;

    const therapist = await Therapist.create({
      name,
      specialization,
      language,
      availability,
      fees,
      status: "approved"
    });

    res.status(201).json({ message: "Therapist added", therapist });
  } catch (err) {
    res.status(500).json({ message: "Error adding therapist" });
  }
});

module.exports = router;