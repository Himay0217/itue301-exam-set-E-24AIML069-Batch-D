const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer is required'],
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle is required'],
    },
    pickupDate: {
      type: Date,
      required: [true, 'Pickup date is required'],
    },
    returnDate: {
      type: Date,
      required: [true, 'Return date is required'],
      // Custom validator: returnDate must be strictly after pickupDate
      validate: {
        validator: function (value) {
          // 'this' refers to the document being validated
          return value > this.pickupDate;
        },
        message: 'Return date must be after pickup date',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['reserved', 'ongoing', 'completed', 'cancelled'],
        message: 'Status must be reserved, ongoing, completed, or cancelled',
      },
      default: 'reserved',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
