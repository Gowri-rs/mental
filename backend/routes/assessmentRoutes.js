const express = require("express");
const router = express.Router();
const Assessment = require("../models/assessment");

router.get("/", async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newAssessment = new Assessment(req.body);
    await newAssessment.save();

    res.json({ message: "Assessment saved" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;