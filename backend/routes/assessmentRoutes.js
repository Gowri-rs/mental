const express = require('express');
const router = express.Router();
const Assessment = require('../models/assessment');
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
// 🔍 GET ASSESSMENTS FOR CURRENT USER ONLY
// ==============================
// ✅ FIX #10: Auth required + filter by userId so users only see their own
router.get('/', auth, async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ==============================
// 📝 SAVE ASSESSMENT
// ==============================
// ✅ FIX #3 (backend part): Auth required, userId saved automatically
router.post('/', auth, async (req, res) => {
  try {
    const newAssessment = new Assessment({
      ...req.body,
      userId: req.user.id, // attach logged-in user
    });
    await newAssessment.save();
    res.json({ message: 'Assessment saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;