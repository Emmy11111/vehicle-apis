const express = require('express');
const {registerUser,Login,getLoggedInUser } = require('../controllers/users.controller');
const { verifyJwt } = require('../util/jwt');
const router = express.Router();

router.post("/", registerUser);
router.post("/login", Login);
router.get("/loggedInUserInfo",verifyJwt,getLoggedInUser);

module.exports = router;