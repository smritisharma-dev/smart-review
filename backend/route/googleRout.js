const express = require("express");
const router = express.Router();

const { fetchPlaceId, fetchReview } = require("../service/googlePlaceApi");
require("dotenv").config();

/* -------------------- SEARCH BUSINESS LIST -------------------- */
router.get("/searchlist", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Please provide search text"
    });
  }

  try {
    const list = await fetchPlaceId(query);
    res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* -------------------- FIND BUSINESS DETAILS -------------------- */
router.get("/findbusiness", async (req, res) => {
  try {
    const { placeId } = req.query;

    if (!placeId) {
      return res.status(400).json({
        success: false,
        message: "placeId is required"
      });
    }

    const review = await fetchReview(placeId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "No data found for this placeId"
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        displayName: review.displayName?.text,
        rating: review.rating,
        totalRatings: review.userRatingCount,
        totalReviews: review.reviews?.length || 0,
        reviews: review.reviews || []
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
