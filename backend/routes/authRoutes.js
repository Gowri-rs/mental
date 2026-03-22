const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ==============================
// 🔐 AUTH MIDDLEWARE
// ==============================
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ==============================
// 📝 REGISTER
// ==============================
router.post('/register', async (req, res) => {
  const {
    name, email, password, role,
    // ✅ FIX #15: Accept and save extra fields from frontend
    phone, supportArea, experience, language,
    qualification, license, specialization, consultationFee,
  } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const needsApproval = ['volunteer', 'therapist'].includes(role);
    const initialStatus = needsApproval ? 'pending' : 'approved';

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === 'admin' ? 'user' : (role || 'user'),
      status: initialStatus,
      // Extra profile fields
      phone,
      supportArea,
      experience,
      language,
      qualification,
      license,
      specialization,
      consultationFee,
    });

    res.status(201).json({
      success: true,
      message: needsApproval
        ? 'Registration successful. Waiting for admin approval.'
        : 'Registration successful. You can login now.',
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        status: user.status,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// ==============================
// 🔐 LOGIN
// ==============================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.status !== 'approved') {
      return res.status(403).json({
        message: `Your ${user.role} account is currently ${user.status}. Please contact an admin.`,
      });
    }

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE || '1d',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      usertoken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==============================
// 👤 GET CURRENT USER
// ==============================
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// ==============================
// 👥 GET APPROVED VOLUNTEERS (for users to browse)
// ==============================
router.get('/volunteers', auth, async (req, res) => {
  try {
    const volunteers = await User.find({ role: 'volunteer', status: 'approved' }).select('-password');
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching volunteers' });
  }
});

// ==============================
// 👥 GET APPROVED THERAPISTS (for users to browse)
// ==============================
router.get('/therapists', auth, async (req, res) => {
  try {
    const therapists = await User.find({ role: 'therapist', status: 'approved' }).select('-password');
    res.json(therapists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching therapists' });
  }
});

// ✅ FIX #7: Removed duplicate /pending-users, /approve/:id, /reject/:id
// Those now live exclusively in adminRoutes.js under /admin/*

module.exports = router;