const Vehicle = require('../models/Vehicles');
const Owner = require('../models/CarOwners');

// Register a new vehicle
exports.registerVehicle = async (req, res) => {
    try {
      const { ownerId, ...vehicleData } = req.body;
  
      // Check if the ownerId exists in the Owners collection
      const ownerExists = await Owner.exists({ _id: ownerId });
      if (!ownerExists) {
        return res.status(404).json({ error: 'Owner not found' });
      }
  
      const vehicle = new Vehicle({ ownerId, ...vehicleData });
      const savedVehicle = await vehicle.save();
      res.json(savedVehicle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
  
// Update a vehicle by its ID
exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a vehicle by its ID
exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await Vehicle.findByIdAndRemove(id);
    if (!deletedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all vehicles with their owners' information
exports.getAllVehiclesWithOwners = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate('ownerId', 'ownerName nationalID') // Populates the ownerId with owner's name and nationalID fields from the Owner model
      .sort({ createdAt: 'asc' }); // Sorts vehicles by their creation timestamp in ascending order
    res.json(vehicles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};