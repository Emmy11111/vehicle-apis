const express = require('express');
const router = express.Router();
const carOwnerController = require('../controllers/carOwners.controller');
const { verifyJwt } = require('../util/jwt');

// Route to register a new car owner
router.post('/',verifyJwt, carOwnerController.registerCarOwner);

// Route to update car owner information
router.put('/edit/:id',verifyJwt, carOwnerController.updateCarOwner);

// Route to delete a car owner
router.delete('/:id',verifyJwt, carOwnerController.deleteCarOwner);

// Route to get all car owners
router.get('/:limit/:page', verifyJwt, carOwnerController.getAllCarOwners);
router.get('/',verifyJwt, carOwnerController.getAllCarOwners);

// Route to search car owners by ownerName
router.post('/search',verifyJwt, carOwnerController.searchCarOwners);

module.exports = router;