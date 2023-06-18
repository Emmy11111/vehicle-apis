const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  modelName: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarOwner',
    required: true,
  },
  chassisNumber: {
    type: String,
    required: true,
  },
  plateNumber: {
    type: String,
    unique: true,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  manufactureYear: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle