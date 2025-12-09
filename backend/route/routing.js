const express = require('express')
const mongoose = require('mongoose')
const ReviewMdl = require('../model/ReviewSchema.js')

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



// =========================
// GET — fetch reviews
// =========================
route.get('/fetchReview', async (req, res) => {
  try {
    const showReview = await ReviewMdl.find()
    return res.status(200).json({
      message: "Reviews fetched successfully",
      data: showReview
    })
  } 
  catch (error) {
    return res.status(500).json({ message: "data not found", error })
  }
})

module.exports = route
