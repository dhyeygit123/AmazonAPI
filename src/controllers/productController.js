const amazonScraper = require('../services/amazonScraper');
const logger = require('../config/logger');
const cacheService = require('../services/cacheService');
const PriceTrack = require('../models/PriceTrack');

exports.getProduct = async (req, res) => {
  const { asin } = req.params;
  
  try {
    // Check cache first
    const cachedProduct = cacheService.get(asin);
    if (cachedProduct) {
      return res.json(cachedProduct);
    }

    const product = await amazonScraper.getProduct(asin);

    // Save to cache
    cacheService.set(asin, product);

    // Track price
    await PriceTrack.findOneAndUpdate(
      { userId: req.user.id, asin },
      { $push: { prices: { price: parseFloat(product.price.replace('$', '')), date: new Date() } } },
      { upsert: true }
    );

    res.json(product);
  } catch (error) {
    logger.error(`Error fetching product ${asin}:`, error);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch product data' });
    }
  }
};

exports.compareProducts = async (req, res) => {
  const { asins } = req.body;
  if (!Array.isArray(asins) || asins.length < 2) {
    return res.status(400).json({ error: 'Please provide at least two ASINs to compare' });
  }

  try {
    const products = await amazonScraper.compareProducts(asins);
    res.json(products);
  } catch (error) {
    logger.error(`Error comparing products:`, error);
    res.status(500).json({ error: 'Failed to compare products' });
  }
};