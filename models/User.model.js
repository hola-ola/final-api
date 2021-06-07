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
        "https://lh3.googleusercontent.com/proxy/wOhrwL-Wn-17iz8v9fooF-BRWU-HlUJhWbrRN7Jj_EnUWX0apYdu5K8ighkCsCwHx7UmaQwQwA9ePojHd4ng6OGosX0A7fnMhGg2urvNyNB0xWv2cM61DQQbQNtDuiOBAIkhRQg-LpfGtT52yyDjOUaWUiE",
    },
    userBio: String,
    userReviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
