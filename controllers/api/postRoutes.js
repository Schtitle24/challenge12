const express = require('express');
const router = express.Router();
const postController = require('../postController');

// Define routes for the post controller
router.get('/posts/:id', postController.renderPost);

module.exports = router;