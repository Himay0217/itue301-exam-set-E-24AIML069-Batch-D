require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Guard: JWT_SECRET must be set before starting
if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET environment variable is not defined. Server will not start.');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API v1 routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/v1/bookings', require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
