const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: [true, 'License number is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,   // never returned in queries unless explicitly selected
    },
    role: {
      type: String,
      enum: {
        values: ['customer', 'fleetManager', 'admin'],
        message: 'Role must be customer, fleetManager, or admin',
      },
      default: 'customer',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
