const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

// @desc   Get all vehicles
// @route  GET /api/v1/vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Get single vehicle by ID
// @route  GET /api/v1/vehicles/:id
const getVehicleById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid vehicle ID format' });
  }

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Create a new vehicle  (fleetManager / admin only)
// @route  POST /api/v1/vehicles
const createVehicle = async (req, res) => {
  const { model, type, pricePerDay, available } = req.body;

  if (!model || !type || pricePerDay === undefined) {
    return res.status(400).json({ message: 'model, type, and pricePerDay are required' });
  }

  try {
    const vehicle = await Vehicle.create({ model, type, pricePerDay, available });
    res.status(201).json(vehicle);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Update a vehicle  (fleetManager / admin only)
// @route  PUT /api/v1/vehicles/:id
const updateVehicle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid vehicle ID format' });
  }

  try {
    const vehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Delete a vehicle  (admin only)
// @route  DELETE /api/v1/vehicles/:id
const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid vehicle ID format' });
  }

  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: `Vehicle ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle };
