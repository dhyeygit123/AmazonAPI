const express = require('express');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const searchRoutes = require('./routes/searchRoutes');
const priceTrackingRoutes = require('./routes/priceTrackingRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes');
const errorHandler = require('./middleware/errorHandler');
const apiDocumentation = require('./apidoc.js')

const swaggerUi = require('swagger-ui-express')
const comparisonRoutes = require('./routes/comparisonRoutes.js')

const app = express();

// Middleware
app.use(express.json());

// Setup rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routes
app.use('/', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/search', searchRoutes);
app.use('/price-tracking', priceTrackingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/compare-products', comparisonRoutes);
// Error handling middleware
app.use(errorHandler);

module.exports = app;