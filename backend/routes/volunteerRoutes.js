const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer');
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
// 📝 REGISTER VOLUNTEER
// ==============================
router.post('/add', async (req, res) => {
  try {
    const { name, supportArea, language, availability, experience } = req.body;

    if (!name || !supportArea || !language || !availability || !experience) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const volunteer = await Volunteer.create({
      name, supportArea, language, availability, experience,
      status: 'pending',
    });

    res.status(201).json({ message: 'Volunteer registered successfully', volunteer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Volunteer registration failed' });
  }
});

// ==============================
// 🔍 GET APPROVED VOLUNTEERS
// ==============================
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ status: 'approved' });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching volunteers' });
  }
});

// ==============================
// ✅ APPROVE VOLUNTEER (ADMIN ONLY)
// ==============================
// ✅ FIX #12: Added auth + adminAuth middleware
router.put('/approve/:id', auth, adminAuth, async (req, res) => {
  try {
    await Volunteer.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.json({ message: 'Volunteer approved' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving volunteer' });
  }
});

// ==============================
// ❌ REJECT VOLUNTEER (ADMIN ONLY)
// ==============================
router.put('/reject/:id', auth, adminAuth, async (req, res) => {
  try {
    await Volunteer.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.json({ message: 'Volunteer rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting volunteer' });
  }
});

module.exports = router;