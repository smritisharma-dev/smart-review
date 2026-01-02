const mongoose = require("mongoose");

const googleRatingSchema = new mongoose.Schema({
  placeId: {
    type: String,
    required: true,
    trim: true
  },

  businessName: {
    type: String,
    required: true,
    trim: true
  },

  rating: {
    type: Number,
    required: true
  },

  totalRatings: {
    type: Number,
    required: true
  },

  snapshotDate: {
    type: Date,
    required: true
  }
});

// prevent duplicate snapshot per day
googleRatingSchema.index(
  { placeId: 1, snapshotDate: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "GoogleReviewRating",
  googleRatingSchema
);
