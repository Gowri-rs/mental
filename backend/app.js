const express = require('express');
const cors = require('cors');

require('dotenv').config();
const connectDB = require('./db');

const authRoutes = require('./routes/authRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const therapistRoutes = require('./routes/therapistRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const chatbotRoutes = require("./routes/chatbotRoutes");
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/volunteers', volunteerRoutes);
app.use('/therapists', therapistRoutes);
app.use('/assessments', assessmentRoutes);
app.use('/bookings', bookingRoutes);
app.use("/chatbot", chatbotRoutes);
app.use("/admin",adminRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});