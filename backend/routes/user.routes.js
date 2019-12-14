const validateEmail = require("../middleware/validateEmail");

const express = require('express');

const userController = require('../controllers/user.controllers.js');

const router = express.Router();

router.post("/signup", validateEmail, userController.createUser);

router.post("/login", userController.userLogin);

module.exports = router;