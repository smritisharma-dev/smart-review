const express = require('express')
const mongoose = require('mongoose')
const ReviewMdl = require('../model/ReviewSchema.js')
const{fetchPlaceId,fetchReview} =require('../service/googlePlaceApi.js')



// =========================
// POST — save reviewnod
// =========================
console.log("Router file loaded!")

const route = express.Router()


route.post('/preview', async (req, res) => {
  console.log("🔥 POST /preview called with body:", req.body);
  try {
    const { rating, review } = req.body;

    if (!rating || !review) {
      return res.status(400).json({ message: "Rating and review is missing" });
    }

    const { heading, emailid, message } = review;

    if (!heading?.trim() || !message?.trim() || !emailid?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const reviewData = await ReviewMdl.create({
      rating,
      heading,
      message,
      emailid
    });

    return res.status(201).json({ 
      message: "Review saved successfully",
      data: reviewData
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Review not posted", error });
  }
});



// GET — fetch reviews
route.get('/fetchReview', async (req, res) => {
  try {
    const [
      showReview,
      latestReview,
      totalReview,
      pendingReview,
      averageRating
    ] = await Promise.all([
      ReviewMdl.find(),
      ReviewMdl.find().sort({ submittedAt: -1 }).limit(5),
      ReviewMdl.countDocuments(),
      ReviewMdl.countDocuments({ status: "pending" }),
      ReviewMdl.aggregate([
        {
          $group: {
            _id: null,
            avg: { $avg: "$rating" }
          }
        }
      ])
    ]);

    return res.status(200).json({
      message: "Reviews fetched successfully",
      showReview,
      latestReview,
      totalReview,
      pendingReview,
      averageRating: averageRating[0]?.avg || 0
    });

  } catch (error) {
    return res.status(500).json({
      message: "data not found",
      error: error.message
    });
  }
});

// admin login 
const email = "admin@test.com";
const pass = "admin@123&78";

route.post('/admin', (req, res) => {
  const { emailid, password } = req.body;

  if (emailid === email && password === pass) {
    return res.status(201).json({
      message: "Your login credential is correct, you are authorised to login as admin"
    });
  } else {
    return res.status(400).json({
      message: "Login credentials not matched"
    });
  }
});

// endpoint for creating graph data
route.get('/drawChart', async (req, res) => {
  try {
    const trend = await ReviewMdl.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",  
              date: "$submittedAt"
            }
          },
          count: { $sum: 1 }       
        }
      },
      {
        $sort: { _id: 1 }          
      }
    ]);

    res.status(200).json({
      message: "Chart data ready",
      data: trend
    });

  } catch (error) {
    res.status(500).json({
      message: "Data not received, check backend",
      error
    });
  }
});

module.exports = route;


