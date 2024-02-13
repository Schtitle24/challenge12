
// controllers/index.js
const router = require('express').Router();

// Import route files
const homeRoutes = require('./api/homeRoutes');
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');

// Use route files
router.use('/home', homeRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);

module.exports = router;