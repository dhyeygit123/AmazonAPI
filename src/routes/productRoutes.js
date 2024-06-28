const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');

router.get('/:asin', authenticateToken, productController.getProduct);
router.post('/compare', authenticateToken, productController.compareProducts);

module.exports = router;