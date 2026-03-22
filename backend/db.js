const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    // ✅ FIX #19: Use console.error and exit process on DB failure
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;