const Booking = require('../models/Booking');
const Car = require('../models/Car');

// @desc   Create a booking
// @route  POST /api/bookings
const createBooking = async (req, res) => {
  const { car, startDate, endDate, totalPrice } = req.body;

  if (!car || !startDate || !endDate || !totalPrice) {
    return res.status(400).json({ message: 'car, startDate, endDate, and totalPrice are required' });
  }

  try {
    const carDoc = await Car.findById(car);
    if (!carDoc) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (!carDoc.available) {
      return res.status(400).json({ message: 'Car is not available' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      car,
      startDate,
      endDate,
      totalPrice,
    });

    // Mark car as unavailable
    carDoc.available = false;
    await carDoc.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Get bookings for current user
// @route  GET /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      'car',
      'make model year pricePerDay'
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createBooking, getMyBookings };
