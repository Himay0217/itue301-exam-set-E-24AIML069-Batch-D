const express = require('express');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} = require('../controllers/bookingController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// All booking routes require authentication
router.use(protect);

router.post('/', createBooking);
router.get('/my', getMyBookings);
router.get('/', getAllBookings);           // admin / fleetManager
router.patch('/:id/status', updateBookingStatus);

module.exports = router;
