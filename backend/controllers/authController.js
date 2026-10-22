const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

// @desc   Register a new customer
// @route  POST /api/v1/auth/register
const register = async (req, res) => {
  const { name, email, phone, licenseNumber, password, role } = req.body;

  if (!name || !email || !licenseNumber || !password) {
    return res.status(400).json({
      message: 'name, email, licenseNumber, and password are required',
    });
  }

  try {
    const existing = await Customer.findOne({ $or: [{ email }, { licenseNumber }] });
    if (existing) {
      return res.status(400).json({
        message:
          existing.email === email.toLowerCase()
            ? 'A customer with this email already exists'
            : 'A customer with this license number already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = await Customer.create({
      name,
      email,
      phone,
      licenseNumber,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: customer._id, role: customer.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        role: customer.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Login customer
// @route  POST /api/v1/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Explicitly select password since the schema has select:false
    const customer = await Customer.findOne({ email }).select('+password');
    if (!customer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: customer._id, role: customer.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        role: customer.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login };
