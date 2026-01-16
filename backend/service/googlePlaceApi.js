const axios = require("axios");


require("dotenv").config();

/*
 1️⃣ Fetch Place ID using search text
 */
const fetchPlaceId = async (query) => {
  try {
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      { textQuery: query },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask": "places.id,places.displayName",
        },
      }
    );

    return response.data.places;
  } catch (error) {
    console.error(
      "Google Places search error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/*
  2️⃣ Fetch Rating & Reviews using Place ID
 */
const fetchReview = async (placeId) => {
  try {
    const response = await axios.get(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask":
            "id,displayName,rating,userRatingCount,reviews",
        },
      }
    );
console.log("GOOGLE PLACE DETAILS RAW:", response.data)
    return response.data;
  } catch (error) {
    console.error(
      "Google Places review error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = {
  fetchPlaceId,
  fetchReview,
};
