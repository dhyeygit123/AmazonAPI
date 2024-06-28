const express = require('express');
const router = express.Router();
const comparisonController = require('../controllers/comparisonController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, comparisonController.compareProducts);

module.exports = router;