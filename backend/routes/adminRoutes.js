const express = require("express");
const router = express.Router();
const User = require("../models/user");

// 🔍 Get pending users
router.get("/pending-users", async (req, res) => {
  const users = await User.find({ status: "pending" });
  res.json(users);
});

// ✅ Approve
router.put("/approve/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    status: "approved"
  });
  res.json({ message: "Approved" });
});

// ❌ Reject
router.put("/reject/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    status: "rejected"
  });
  res.json({ message: "Rejected" });
});

module.exports = router;