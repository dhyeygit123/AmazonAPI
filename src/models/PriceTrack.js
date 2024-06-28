const mongoose = require('mongoose');

const priceTrackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  asin: {
    type: String,
    required: true
  },
  productTitle: {
    type: String,
    required: true
  },
  prices: [{
    price: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastChecked: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient querying
priceTrackSchema.index({ userId: 1, asin: 1 }, { unique: true });

module.exports = mongoose.model('PriceTrack', priceTrackSchema);