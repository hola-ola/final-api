const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  listing: { type: Schema.Types.ObjectId, ref: "Listing" },
  title: { type: String, required: true },
  body: { type: String, required: true },
  score: { type: Number, min: 1, max: 5 },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
