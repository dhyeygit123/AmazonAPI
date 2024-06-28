// apiDocs.js

const apiDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "Amazon Scraper API",
    version: "1.0.0",
    description: "API for scraping product information from Amazon"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server"
    }
  ],
  paths: {
    "/auth/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  password: { type: "string" },
                  email: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          "201": { description: "User registered successfully" },
          "500": { description: "Error registering user" }
        }
      }
    },
    "/auth/login": {
      post: {
        summary: "Login a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  password: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Login successful" },
          "400": { description: "User not found" },
          "401": { description: "Invalid credentials" }
        }
      }
    },
    "/products/{asin}": {
      get: {
        summary: "Get product details",
        parameters: [
          {
            in: "path",
            name: "asin",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Successful response" },
          "404": { description: "Product not found" },
          "500": { description: "Server error" }
        }
      }
    },
    "/search/{query}": {
      get: {
        summary: "Search for products",
        parameters: [
          {
            in: "path",
            name: "query",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Successful response" },
          "500": { description: "Server error" }
        }
      }
    },
    "/price-tracking/history/{asin}": {
      get: {
        summary: "Get price history for a product",
        parameters: [
          {
            in: "path",
            name: "asin",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Successful response" },
          "404": { description: "No price history found" },
          "500": { description: "Server error" }
        }
      }
    },
    "/reviews/{asin}": {
      get: {
        summary: "Get reviews for a product",
        parameters: [
          {
            in: "path",
            name: "asin",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Successful response" },
          "500": { description: "Server error" }
        }
      }
    },
    "/compare-products": {
      post: {
        summary: "Compare products with sentiment analysis",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  asins: {
                    type: "array",
                    items: { type: "string" },
                    description: "Array of ASINs to compare"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Successful comparison" },
          "400": { description: "Invalid request" },
          "500": { description: "Server error" }
        }
      }
    }
  }
}
module.exports = apiDocumentation;