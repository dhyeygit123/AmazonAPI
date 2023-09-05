Amazon Scraper API
The Amazon Scraper API is a Node.js web service built with Express that empowers users to retrieve Amazon product data and reviews by performing web scraping. This API provides a simple and efficient way to access information from Amazon's website, allowing developers to integrate Amazon product data into their applications.

Endpoints

Fetch Product Information
Endpoint: /products/:productId
HTTP Method: GET
Description: Retrieve detailed information about a specific Amazon product by providing its unique product ID.


Fetch Product Reviews
Endpoint: /products/:productId/reviews
HTTP Method: GET
Description: Retrieve customer reviews for a specific Amazon product using its product ID.

Fetch Product Offers
Endpoint: /products/:productId/offers
HTTP Method: GET
Description: Retrieve offers and pricing information for a specific Amazon product using its product ID.

Search for Products
Endpoint: /search/:searchQuery
HTTP Method: GET
Description: Search for Amazon products using a search query.
