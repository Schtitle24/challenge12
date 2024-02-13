const express = require('express');
const router = express.Router();
const homeController = require('../homeController');

// Define routes for the home controller
router.get('/', homeController.renderHomepage);

module.exports = router;