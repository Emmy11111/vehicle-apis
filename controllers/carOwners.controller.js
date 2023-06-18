const CarOwner = require('../models/CarOwners');

// Controller function to register a new car owner
const registerCarOwner = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ownerName, nationalID, phoneNumber, address } = req.body;

    // Check if national ID already exists
    const existingCarOwner = await CarOwner.findOne({ nationalID });
    if (existingCarOwner) {
      return res.status(400).json({ error: 'Car Owner with that National ID already exists' });
    }

    const carOwner = new CarOwner({ ownerName, nationalID, phoneNumber, address, userId });
    const savedCarOwner = await carOwner.save();
    res.status(201).json(savedCarOwner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to register car owner' });
  }
};

// Controller function to update car owner information
const updateCarOwner = async (req, res) => {
  try {
    const { ownerName, nationalID, phoneNumber, address } = req.body;
    const carOwnerId = req.params.id;
    const updatedCarOwner = await CarOwner.findByIdAndUpdate(carOwnerId, {
      ownerName,
      nationalID,
      phoneNumber,
      address
    }, { new: true });
    if (!updatedCarOwner) {
      return res.status(404).json({ error: 'Car owner not found' });
    }
    res.json(updatedCarOwner);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update car owner' });
  }
};

// Controller function to delete a car owner
const deleteCarOwner = async (req, res) => {
  try {
    const carOwnerId = req.params.id;
    const deletedCarOwner = await CarOwner.findByIdAndDelete(carOwnerId);
    if (!deletedCarOwner) {
      return res.status(404).json({ error: 'Car owner not found' });
    }
    res.json({ message: 'Car owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car owner' });
  }
};

// Controller function to get all car owners
const getAllCarOwners = async (req, res) => {
    try {
      const { limit, page } = req.params;
      const skip = (Number(page) - 1) * limit;

      //get all users with out pagination if no limit and no skip
      if (limit == 0 && skip <= 0) {
        const carOwners = await CarOwner.find();
      return res.json(carOwners);
      }

      const carOwners = await CarOwner.find()
        .limit(Number(limit))
        .skip(Number(skip));
      res.json(carOwners);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve car owners' });
    }
};
  
// Controller function to search car owners by ownerName
const searchCarOwners = async (req, res) => {
  try {
    const { ownerName } = req.body;
    const carOwners = await CarOwner.find({ ownerName: { $regex: ownerName, $options: 'i' } });
    res.json(carOwners);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search car owners' });
  }
};

module.exports = {
  registerCarOwner,
  updateCarOwner,
  deleteCarOwner,
  getAllCarOwners,
  searchCarOwners
};