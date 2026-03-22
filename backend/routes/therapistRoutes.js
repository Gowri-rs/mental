const express = require('express');
const router = express.Router();
const Therapist = require('../models/therapist');
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

const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

// ==============================
// 🔍 GET APPROVED THERAPISTS ONLY
// ==============================
// ✅ FIX #8: Filter by status: 'approved' so pending/rejected are hidden
router.get('/', async (req, res) => {
  try {
    const therapists = await Therapist.find({ status: 'approved' });
    res.status(200).json(therapists);
  } catch {
    res.status(500).json({ message: 'Error fetching therapists' });
  }
});

// ==============================
// ➕ ADD THERAPIST (ADMIN ONLY)
// ==============================
// ✅ FIX #13: Protect with auth + adminAuth
router.post('/add', auth, adminAuth, async (req, res) => {
  try {
    const { name, specialization, language, availability, fees } = req.body;

    const therapist = await Therapist.create({
      name, specialization, language, availability, fees,
      status: 'approved',
    });

    res.status(201).json({ message: 'Therapist added', therapist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding therapist' });
  }
});

module.exports = router;