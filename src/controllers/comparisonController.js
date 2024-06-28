const amazonScraper = require('../services/amazonScraper');
const { analyzeSentiment } = require('../services/sentimentAnalyzer');
const logger = require('../config/logger');

exports.compareProducts = async (req, res) => {
  const { asins } = req.body;

  if (!Array.isArray(asins) || asins.length < 2) {
    return res.status(400).json({ error: 'Please provide at least two ASINs to compare' });
  }

  try {
    const products = await amazonScraper.getProductsWithReviews(asins);

    const comparisonResult = products.map(product => {
      const reviewSentiments = product.reviews.map(review => analyzeSentiment(review.body));
      const averageSentiment = reviewSentiments.reduce((a, b) => a + b, 0) / reviewSentiments.length;

      return {
        asin: product.asin,
        title: product.title,
        price: product.price,
        rating: product.rating,
        reviewCount: product.reviewCount,
        averageSentiment: averageSentiment,
        sentimentCategory: categorizeSentiment(averageSentiment)
      };
    });

    res.json(comparisonResult);
  } catch (error) {
    logger.error(`Error comparing products:`, error);
    res.status(500).json({ error: 'Failed to compare products' });
  }
};

function categorizeSentiment(sentiment) {
  if (sentiment > 0.3) return 'Very Positive';
  if (sentiment > 0) return 'Positive';
  if (sentiment === 0) return 'Neutral';
  if (sentiment > -0.3) return 'Negative';
  return 'Very Negative';
}