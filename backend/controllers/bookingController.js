const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

// @desc   Create a booking
// @route  POST /api/v1/bookings
const createBooking = async (req, res) => {
  const { vehicleId, pickupDate, returnDate } = req.body;

  if (!vehicleId || !pickupDate || !returnDate) {
    return res.status(400).json({ message: 'vehicleId, pickupDate, and returnDate are required' });
  }

  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ message: 'Invalid vehicle ID format' });
  }

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (!vehicle.available) {
      return res.status(400).json({ message: 'Vehicle is not available' });
    }

    const booking = await Booking.create({
      customerId: req.user.id,
      vehicleId,
      pickupDate,
      returnDate,
      status: 'reserved',
    });

    // Mark vehicle as unavailable once booked
    vehicle.available = false;
    await vehicle.save();

    res.status(201).json(booking);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Get bookings for the authenticated customer
// @route  GET /api/v1/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.id }).populate(
      'vehicleId',
      'model type pricePerDay available'
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Get all bookings  (admin / fleetManager)
// @route  GET /api/v1/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customerId', 'name email role')
      .populate('vehicleId', 'model type pricePerDay');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Update booking status
// @route  PATCH /api/v1/bookings/:id/status
const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid booking ID format' });
  }

  const allowed = ['reserved', 'ongoing', 'completed', 'cancelled'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: `status must be one of: ${allowed.join(', ')}` });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus };
