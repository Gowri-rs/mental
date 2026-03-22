const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer');

// ==============================
// 📝 REGISTER VOLUNTEER
// ==============================
router.post('/add', async (req, res) => {
  try {
    const { name, supportArea, language, availability, experience } = req.body;

    if (!name || !supportArea || !language || !availability || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const volunteer = await Volunteer.create({
      name,
      supportArea,
      language,
      availability,
      experience,
      status: 'pending', // admin approval needed
    });

    res.status(201).json({ message: "Volunteer registered successfully", volunteer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Volunteer registration failed" });
  }
});

// ==============================
// 🔍 GET APPROVED VOLUNTEERS
// ==============================
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ status: "approved" });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching volunteers" });
  }
});

// ==============================
// ✅ APPROVE VOLUNTEER (ADMIN)
// ==============================
router.put('/approve/:id', async (req, res) => {
  try {
    await Volunteer.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ message: "Volunteer approved" });
  } catch (err) {
    res.status(500).json({ message: "Error approving volunteer" });
  }
});

// ==============================
// ❌ REJECT VOLUNTEER (ADMIN)
// ==============================
router.put('/reject/:id', async (req, res) => {
  try {
    await Volunteer.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ message: "Volunteer rejected" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting volunteer" });
  }
});

module.exports = router;