const express = require("express");

const{fetchPlaceId,fetchReview} =require('../service/googlePlaceApi.js')


const router = express.Router();

/**
 * GET /google-place?query=Starbucks Mumbai
 */
router.get("/google-place", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Query parameter is required"
      });
    }

    // Call service (ONLY ONCE)
    const places = await fetchPlaceId(query);

    if(!places || places.length===0)
{

  return res.status(404).json({
success: false,
message:"placeId not found try again"

  })



}

    const placeId = places[0].id
    console.log("PLACES:", places);
console.log("PLACE ID:", places[0].id);
const review = await fetchReview(placeId)

console.log("REVIEW DATA:", review);
    res.status(200).json({


      success: true,
      data:{
"BusinessName":review.displayName?.text,
"Rating":review.rating,
"totalRating": review.userRatingCount,
"totalReviews": review.reviews?.length || 0,
"totalReview":review.reviews || [],



      }

    });




  } catch (error) {
    console.error("Google Places Route Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Google Places API failed",
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;
