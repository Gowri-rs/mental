const express = require('express');
const router = express.Router();
const User = require('../models/user');
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

// ==============================
// 👨‍💼 ADMIN CHECK MIDDLEWARE
// ==============================
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

// ==============================
// 🔍 GET PENDING USERS
// ==============================
// ✅ FIX #7: Removed duplicate — admin user routes now only live here (not in authRoutes)
router.get('/pending-users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find({ status: 'pending' }).select('-password');
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// ==============================
// ✅ APPROVE USER
// ==============================
router.put('/approve/:id', auth, adminAuth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.json({ message: 'User approved' });
  } catch {
    res.status(500).json({ message: 'Error approving user' });
  }
});

// ==============================
// ❌ REJECT USER
// ==============================
router.put('/reject/:id', auth, adminAuth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.json({ message: 'User rejected' });
  } catch {
    res.status(500).json({ message: 'Error rejecting user' });
  }
});

// ==============================
// 🔍 GET PENDING VOLUNTEERS
// ==============================
router.get('/pending-volunteers', auth, adminAuth, async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ status: 'pending' });
    res.json(volunteers);
  } catch {
    res.status(500).json({ message: 'Error fetching volunteers' });
  }
});

// ==============================
// ✅ APPROVE VOLUNTEER
// ==============================
router.put('/approve-volunteer/:id', auth, adminAuth, async (req, res) => {
  try {
    await Volunteer.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.json({ message: 'Volunteer approved' });
  } catch {
    res.status(500).json({ message: 'Error approving volunteer' });
  }
});

// ==============================
// ❌ REJECT VOLUNTEER
// ==============================
router.put('/reject-volunteer/:id', auth, adminAuth, async (req, res) => {
  try {
    await Volunteer.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.json({ message: 'Volunteer rejected' });
  } catch {
    res.status(500).json({ message: 'Error rejecting volunteer' });
  }
});

module.exports = router;