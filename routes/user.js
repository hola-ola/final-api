const router = require("express").Router();

// Require the models in order to interact with the database
const User = require("../models/User.model");
const Session = require("../models/Session.model");

// Require necessary (isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

// GET User profile page
router.get("/:username", isLoggedIn, (req, res) => {
  User.findOne({
    username: req.params.username,
  })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(400).json({
          errorMessage: "There's no user with this username!",
          key: "username",
        });
      }
      res.json({ user: foundUser });
    })
    .catch((err) => {
      console.log(err);
      res.json(500).json({ errorMessage: err.message });
    });
});

// DELETE User profile
router.get("/:username/delete", isLoggedIn, (req, res) => {
  User.findById(req.user._id)
    .then((foundUser) => {
      // Check if user exists
      if (!foundUser) {
        return res.status(404).json({ errorMessage: "User not found!" });
      }
      // Check is user is the owner of the account
      if (foundUser.username !== req.params.username) {
        return res.status(404).json({
          errorMessage: "You're not the owner of this account!",
        });
      }
      // We know that user exists and is the owner of the account
      return User.findByIdAndDelete(foundUser._id)
        .then((deletedUser) => {
          return Session.findOneAndDelete({
            user: deletedUser._id,
          });
        })
        .catch((err) => {
          console.log(err);
          res.json(500).json({ errorMessage: err.message });
        });
    })
    .then(() => {
      console.log("We removed the session and the user!");
      res.json(true);
    })
    .catch((err) => {
      console.log(err);
      res.json(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
