const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  totalScore: Number,
  maxScore: Number,
  recommendation: String,
});

module.exports = mongoose.model("Assessment", assessmentSchema);