const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles.controller');
const { verifyJwt } = require('../util/jwt');

// Route to register a new vehicle
router.post('/', verifyJwt, vehicleController.registerVehicle);

// Route to update a vehicle by its ID
router.put('/:id', verifyJwt, vehicleController.updateVehicle);

// Route to delete a vehicle by its ID
router.delete('/delete/:id', verifyJwt, vehicleController.deleteVehicle);

// Route to get all vehicles with their owners' info
router.get('/', verifyJwt, vehicleController.getAllVehiclesWithOwners);

module.exports = router;