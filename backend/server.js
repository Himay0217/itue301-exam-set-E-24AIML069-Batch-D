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

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Start server after DB connects
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
