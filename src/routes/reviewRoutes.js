const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authenticateToken = require('../middleware/auth');

router.get('/:asin', authenticateToken, reviewController.getReviews);

module.exports = router;