const router = require("express").Router();

// Require the models in order to interact with the database
const Review = require("../models/Review.model");
const User = require("../models/User.model");

// Require necessary (isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

// ADD User review
router.post("/:username/add", isLoggedIn, (req, res) => {
  console.log("Review: ", req.body.form);
  console.log("Logged user: ", req.user.username);
  console.log("Reviewed user: ", req.params.username);
  User.findOne({ username: req.params.username })
    .then((foundUser) => {
      console.log("We found reviewed user");

      const { title, body, score, startDate, endDate } = req.body.form;

      if (!title || !body || !score) {
        return res
          .status(400)
          .json({ errorMessage: "Please fill in all required fields" });
      }

      Review.create({
        ...req.body.form,
        reviewedUser: foundUser._id,
        reviewingUser: req.user._id,
      }).then((createdReview) => {
        console.log("We created a review");
        res.json({ review: createdReview });
      });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
