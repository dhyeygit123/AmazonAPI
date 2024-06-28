const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../config/logger');

class AmazonScraper {
  constructor() {
    this.baseUrl = 'https://www.amazon.com';
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
  }

  async getProduct(asin) {
    try {
      const url = `${this.baseUrl}/dp/${asin}`;
      const response = await this.makeRequest(url);
      const $ = cheerio.load(response.data);

      return {
        asin,
        title: $('#productTitle').text().trim(),
        price: $('#priceblock_ourprice').text().trim() || $('.a-price-whole').first().text().trim(),
        rating: $('.a-icon-star-small .a-icon-alt').first().text().trim(),
        reviewCount: $('#acrCustomerReviewText').first().text().trim(),
        description: $('#productDescription p').text().trim(),
        features: $('#feature-bullets ul li').map((i, el) => $(el).text().trim()).get(),
        images: $('#altImages ul li').map((i, el) => $(el).find('img').attr('src')).get(),
        availability: $('#availability').text().trim()
      };
    } catch (error) {
      logger.error(`Error scraping product ${asin}:`, error);
      throw error;
    }
  }

  async compareProducts(asins) {
    try {
      return await Promise.all(asins.map(asin => this.getProduct(asin)));
    } catch (error) {
      logger.error(`Error comparing products:`, error);
      throw error;
    }
  }

  async searchProducts(query) {
    try {
      const url = `${this.baseUrl}/s?k=${encodeURIComponent(query)}`;
      const response = await this.makeRequest(url);
      const $ = cheerio.load(response.data);

      return $('.s-result-item[data-asin]').map((i, el) => {
        const $el = $(el);
        return {
          asin: $el.attr('data-asin'),
          title: $el.find('h2').text().trim(),
          price: $el.find('.a-price-whole').first().text().trim(),
          rating: $el.find('.a-icon-star-small .a-icon-alt').first().text().trim(),
          image: $el.find('img.s-image').attr('src')
        };
      }).get();
    } catch (error) {
      logger.error(`Error searching for ${query}:`, error);
      throw error;
    }
  }

  async getReviews(asin) {
    try {
      const url = `${this.baseUrl}/product-reviews/${asin}`;
      const response = await this.makeRequest(url);
      const $ = cheerio.load(response.data);

      return $('.review').map((i, el) => {
        const $el = $(el);
        return {
          title: $el.find('.review-title').text().trim(),
          rating: $el.find('.review-rating').text().trim(),
          body: $el.find('.review-text').text().trim(),
          date: $el.find('.review-date').text().trim(),
        };
      }).get();
    } catch (error) {
      logger.error(`Error fetching reviews for ${asin}:`, error);
      throw error;
    }
  }

async getProductsWithReviews(asins) {
  try {
    const products = await Promise.all(asins.map(async (asin) => {
      const product = await this.getProduct(asin);
      const reviews = await this.getReviews(asin);
      return { ...product, reviews };
    }));
    return products;
  } catch (error) {
    logger.error(`Error fetching products with reviews:`, error);
    throw error;
  }
}

  async makeRequest(url) {
    return axios.get(url, {
      headers: {
        'User-Agent': this.userAgent
      }
    });
  }
}

module.exports = new AmazonScraper();