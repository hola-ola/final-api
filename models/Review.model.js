const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  reviewedUser: { type: Schema.Types.ObjectId, ref: "User" },
  reviewingUser: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  body: { type: String, required: true },
  score: { type: Number, min: 1, max: 5, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
