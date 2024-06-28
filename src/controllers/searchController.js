const amazonScraper = require('../services/amazonScraper');
const logger = require('../config/logger');

exports.searchProducts = async (req, res) => {
  const { query } = req.params;
  
  try {
    const products = await amazonScraper.searchProducts(query);
    res.json(products);
  } catch (error) {
    logger.error(`Error searching for ${query}:`, error);
    res.status(500).json({ error: 'Failed to search products' });
  }
};