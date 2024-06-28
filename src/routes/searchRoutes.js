const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authenticateToken = require('../middleware/auth');

router.get('/:query', authenticateToken, searchController.searchProducts);

module.exports = router;