const mongoose = require('mongoose');

const carOwnerSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true
  },
  nationalID: {
    type: Number,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true});

const CarOwner = mongoose.model('CarOwner', carOwnerSchema);

module.exports = CarOwner;