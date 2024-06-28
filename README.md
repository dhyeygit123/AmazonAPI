# Amazon Scraper API

## Description

The Amazon Scraper API is a Node.js application that provides a RESTful API for scraping product information from Amazon. It offers features such as product details retrieval, price tracking, product comparison, and sentiment analysis of reviews.

## Features

- User Authentication: Secure signup and login functionality.
- Product Information: Retrieve detailed information about products using their ASIN.
- Price Tracking: Track price changes for products over time.
- Search Functionality: Search for products on Amazon.
- Review Retrieval: Fetch user reviews for specific products.
- Product Comparison: Compare multiple products including sentiment analysis of their reviews.
- Rate Limiting: Protect the API from abuse with built-in rate limiting.
- Caching: Improve performance with a caching layer.
- Error Handling: Comprehensive error handling and logging.

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JWT for authentication
- Cheerio for web scraping
- Natural.js for sentiment analysis
- Winston for logging
- Express-rate-limit for rate limiting
- Node-cache for caching

## Installation

1. Clone the repository:
   git clone https://github.com/yourusername/amazon-scraper-api.git
  
2. Install dependencies:
   cd amazon-scraper-api
   npm install
   
3. Set up environment variables:
Create a `.env` file in the root directory and add the following:

PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

5. Start the server:

## API Endpoints

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login a user
- `GET /products/:asin`: Get product details
- `GET /search/:query`: Search for products
- `GET /price-tracking/history/:asin`: Get price history for a product
- `GET /reviews/:asin`: Get reviews for a product
- `POST /compare-products`: Compare multiple products with sentiment analysis

For detailed API documentation, visit the root endpoint (`/`) after starting the server.
