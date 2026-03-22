const express = require('express');
const router = express.Router();

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// 🔐 AUTH MIDDLEWARE
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'No token' });
  }

  try {
    const verifyToken = jwt.verify(token, 'secret');
    req.user = verifyToken;
    next();
  } catch {
    res.status(400).json({ message: 'Invalid token' });
  }
};


// 👨‍💼 ADMIN CHECK
const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};


// 📝 REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      // 🔐 prevent admin creation
      role: role === "admin" ? "user" : role,

      // ✅ NEW FIELD
      status: "pending"
    });

    res.status(200).json({
      message: 'Register successful. Waiting for admin approval',
      user
    });

  } catch (error) {
    res.status(500).json({ message: 'Register failed' });
  }
});


// 🔐 LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    // 🔴 ADMIN APPROVAL CHECK
    if (user.status !== "approved") {
      return res.status(403).json({
        message: "Your account is waiting for admin approval"
      });
    }

    const payload = {
      id: user._id,
      role: user.role
    };

    const token = jwt.sign(payload, 'secret', { expiresIn: "1d" });

    res.status(200).json({
      message: 'Login successful',
      usertoken: token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// 👤 GET CURRENT USER
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: 'Error fetching user' });
  }
});


// 👨‍💼 ADMIN ROUTES

// 🔍 Pending users
router.get('/pending-users', auth, adminAuth, async (req, res) => {
  const users = await User.find({ status: "pending" });
  res.json(users);
});

// ✅ Approve
router.put('/approve/:id', auth, adminAuth, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    status: "approved"
  });
  res.json({ message: "User approved" });
});

// ❌ Reject
router.put('/reject/:id', auth, adminAuth, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    status: "rejected"
  });
  res.json({ message: "User rejected" });
});

module.exports = router;