const express = require('express');
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicleController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Public
router.get('/', getVehicles);
router.get('/:id', getVehicleById);

// Protected (fleetManager / admin)
router.post('/', protect, createVehicle);
router.put('/:id', protect, updateVehicle);
router.delete('/:id', protect, deleteVehicle);

module.exports = router;
