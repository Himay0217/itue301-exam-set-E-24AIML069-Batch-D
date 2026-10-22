const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, 'Make is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    pricePerDay: {
      type: Number,
      required: [true, 'Price per day is required'],
    },
    available: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
