const express = require('express');
const router = express.Router();

// Import individual route files
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
