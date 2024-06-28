const amazonScraper = require('../services/amazonScraper');
const logger = require('../config/logger');

exports.getReviews = async (req, res) => {
  const { asin } = req.params;
  
  try {
    const reviews = await amazonScraper.getReviews(asin);
    res.json(reviews);
  } catch (error) {
    logger.error(`Error fetching reviews for ${asin}:`, error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};