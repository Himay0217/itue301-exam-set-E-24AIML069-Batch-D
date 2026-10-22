const mongoose = require('mongoose');
const Car = require('../models/Car');

// @desc   Get all cars
// @route  GET /api/cars
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Get single car by ID
// @route  GET /api/cars/:id
const getCarById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid car ID format' });
  }

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Create a new car
// @route  POST /api/cars
const createCar = async (req, res) => {
  const { make, model, year, pricePerDay, available, imageUrl } = req.body;

  if (!make || !model || !year || !pricePerDay) {
    return res.status(400).json({ message: 'make, model, year, and pricePerDay are required' });
  }

  if (typeof make !== 'string' || make.trim() === '') {
    return res.status(400).json({ message: 'make must be a non-empty string' });
  }
  if (typeof model !== 'string' || model.trim() === '') {
    return res.status(400).json({ message: 'model must be a non-empty string' });
  }
  if (!Number.isInteger(year) || year <= 0) {
    return res.status(400).json({ message: 'year must be a positive integer' });
  }
  if (typeof pricePerDay !== 'number' || pricePerDay <= 0) {
    return res.status(400).json({ message: 'pricePerDay must be a positive number' });
  }

  try {
    const car = await Car.create({ make, model, year, pricePerDay, available, imageUrl });
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Update a car
// @route  PUT /api/cars/:id
const updateCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid car ID format' });
  }

  try {
    const car = await Car.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Delete a car
// @route  DELETE /api/cars/:id
const deleteCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid car ID format' });
  }

  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: `Car ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCars, getCarById, createCar, updateCar, deleteCar };
