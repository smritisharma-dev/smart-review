const express = require("express"); // ✅ REQUIRED
const router = express.Router();    // ✅ NOW express exists

const { fetchPlaceId, fetchReview } = require("../service/googlePlaceApi");
const googleReviewRating = require("../model/googleReviewRating"); // ✅ REQUIRED
require("dotenv").config();
/*
  GET /google-place?query=Starbucks Mumbai
*/
router.get("/google-place", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required"
      });
    }

    const places = await fetchPlaceId(query);

    if (!places || places.length === 0) {
      return res.status(404).json({
        success: false,
        message: "placeId not found try again"
      });
    }

    const placeId = places[0].id;

    // Google API
    const review = await fetchReview(placeId);

    // DB snapshot (optional)
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
console.log("Saving snapshot for:", placeId);
      await googleReviewRating.create({
        placeId,
        snapshotDate: today,
        businessName: review.displayName?.text || "Unknown",
        rating: review.rating,
        totalRatings: review.userRatingCount || 0
      });

    } catch (error) {
      console.log("Snapshot error code:", error.code);
  console.log("Snapshot error message:", error.message);s
      if (error.code !== 11000) {
        console.log("error is in database:", error.message);
      }
    }

    // Response to frontend
    return res.status(200).json({
      success: true,
      data: {
        BusinessName: review.displayName?.text,
        Rating: review.rating,
        totalRating: review.userRatingCount,
        totalReviews: review.reviews?.length || 0,
        totalReview: review.reviews || []
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Google Places API failed",
      error: error.response?.data || error.message
    });
  }
});

module.exports = router; 
