const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dmvukjvqe/image/upload/v1623512202/hop-flat-swap/original_ff3tk3.jpg",
    },
    userBio: String,
    userListing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
    userReviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
