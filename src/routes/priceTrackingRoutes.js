const express = require('express');
const router = express.Router();
const priceTrackingController = require('../controllers/priceTrackingController');
const authenticateToken = require('../middleware/auth');

router.get('/history/:asin', authenticateToken, priceTrackingController.getPriceHistory);

module.exports = router;