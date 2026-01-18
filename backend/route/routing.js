const express = require("express");
const mongoose = require("mongoose");
const ReviewMdl = require("../model/ReviewSchema.js");

const route = express.Router();

/* =========================
   POST — save review
========================= */
route.post("/preview", async (req, res) => {
  try {
    const { rating, heading, emailid, message, name } = req.body;

    if (!rating || !heading?.trim() || !message?.trim() || !emailid?.trim() || !name?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const reviewData = await ReviewMdl.create({
      rating,
      heading,
      message,
      emailid,
      name
    });

    return res.status(201).json({
      message: "Review saved successfully",
      data: reviewData
    });
  } catch (error) {
    return res.status(500).json({ message: "Review not posted", error: error.message });
  }
});


/* =========================
   GET — fetch dashboard data
========================= */
route.get("/fetchReview", async (req, res) => {
  try {
    const [
      showReview,
      latestReview,
      rejectedReview,
      totalReview,
      pendingReview,
      averageRating
    ] = await Promise.all([
      ReviewMdl.find(),
      ReviewMdl.find().sort({ submittedAt: -1 }).limit(5),
      ReviewMdl.find({ status: "rejected" }),
      ReviewMdl.countDocuments(),
      ReviewMdl.countDocuments({ status: "pending" }),
      ReviewMdl.aggregate([
        { $group: { _id: null, avg: { $avg: "$rating" } } }
      ])
    ]);

    return res.status(200).json({
      message: "Reviews fetched successfully",
      showReview,
      latestReview,
      rejectedReview,
      totalReview,
      pendingReview,
      averageRating: averageRating[0]?.avg || 0
    });
  } catch (error) {
    return res.status(500).json({ message: "Data not found", error: error.message });
  }
});

/* =========================
   ADMIN LOGIN
========================= */
const email = "admin@test.com";
const pass = "admin@123&78";

route.post("/admin", (req, res) => {
  const { emailid, password } = req.body;
  if (emailid === email && password === pass) {
    return res.status(201).json({ message: "Admin login successful" });
  }
  return res.status(400).json({ message: "Login credentials not matched" });
});

/* =========================
   REJECTED REVIEWS
========================= */
route.get("/review/rejected", async (req, res) => {
  try {
    const reviews = await ReviewMdl.find({ status: "rejected" })
      .select("-__v")
      .sort({ submittedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Rejected reviews fetched",
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

/* =========================
   CHART DATA
========================= */
route.get("/drawChart", async (req, res) => {
  try {
    const trend = await ReviewMdl.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$submittedAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({ message: "Chart data ready", data: trend });
  } catch (error) {
    res.status(500).json({ message: "Chart error", error: error.message });
  }
});

/* =========================
   PENDING REVIEWS
========================= */
route.get("/review/pending", async (req, res) => {
  try {
    const pendingReviews = await ReviewMdl.find({ status: "pending" })
      .select("-__v")
      .sort({ submittedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Pending reviews fetched",
      data: pendingReviews
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Pending endpoint error",
      error: error.message
    });
  }
});

/* =========================
   APPROVED REVIEWS
========================= */
route.get("/review/approved", async (req, res) => {
  try {
    const approvedReviews = await ReviewMdl.find({ status: "approved" })
      .select("-__v")
      .sort({ approvedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Approved reviews fetched",
      data: approvedReviews
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Approved endpoint error",
      error: error.message
    });
  }
});

/* =========================
   EDIT REVIEW
========================= */
route.patch("/review/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating, message, heading } = req.body;

    if (!name || !heading || !message || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Invalid update data" });
    }

    const editReview = await ReviewMdl.findByIdAndUpdate(
      id,
      { name, rating, message, heading, status: "pending", modifiedAt: new Date() },
      { new: true }
    ).select("-__v");

    if (!editReview) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    return res.status(200).json({ success: true, message: "Review updated", data: editReview });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Edit error", error: error.message });
  }
});

/* =========================
   APPROVE REVIEW
========================= */
route.patch("/review/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const review = await ReviewMdl.findById(id);
    if (!review) return res.status(404).json({ success: false, message: "Not found" });
    if (review.status !== "pending")
      return res.status(409).json({ success: false, message: "Cannot approve" });

    review.status = "approved";
    review.approvedAt = new Date();
    review.modifiedAt = new Date();
    await review.save();

    return res.status(200).json({ success: true, message: "Approved", data: review });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Approve error", error: error.message });
  }
});

/* =========================
   REJECT REVIEW
========================= */
route.patch("/review/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const review = await ReviewMdl.findById(id);
    if (!review) return res.status(404).json({ success: false, message: "Not found" });
    if (review.status !== "pending")
      return res.status(409).json({ success: false, message: "Cannot reject" });

    review.status = "rejected";
    review.modifiedAt = new Date();
    await review.save();

    return res.status(200).json({ success: true, message: "Rejected", data: review });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Reject error", error: error.message });
  }
});

/* =========================
   FETCH SINGLE REVIEW
========================= */
route.get("/review/:id/fetch", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const review = await ReviewMdl.findById(id).select("-__v");
    if (!review) return res.status(404).json({ success: false, message: "Not found" });

    return res.status(200).json({ success: true, message: "Fetched", data: review });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Fetch error", error: error.message });
  }
});

module.exports = route;
