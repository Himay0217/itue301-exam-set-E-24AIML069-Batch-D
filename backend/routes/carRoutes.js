const express = require('express');
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', protect, createCar);
router.put('/:id', protect, updateCar);
router.delete('/:id', protect, deleteCar);

module.exports = router;
