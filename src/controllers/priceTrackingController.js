const PriceTrack = require('../models/PriceTrack');
const logger = require('../config/logger');

exports.getPriceHistory = async (req, res) => {
  const { asin } = req.params;
  try {
    const priceTrack = await PriceTrack.findOne({ userId: req.user.id, asin });
    if (!priceTrack) {
      return res.status(404).json({ error: 'No price history found for this product' });
    }
    res.json(priceTrack.prices);
  } catch (error) {
    logger.error(`Error fetching price history for ${asin}:`, error);
    res.status(500).json({ error: 'Failed to fetch price history' });
  }
};