const router = require("express").Router();

// Require the Listing model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

// GET User profile page
router.get("/:username", isLoggedIn, (req, res) => {
  console.log("We are here:", req.params.username);
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
  console.log("Deleting the user – message from the server");
  if (req.match.params.username === req.params.user.username) {
    User.findByIdAndDelete({
      username: req.match.params.username,
    })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(400).json({
            errorMessage: "User not found!",
            key: "user-delete",
          });
        }
        res.json(true);
      })
      .catch((err) => {
        console.log(err);
        res.json(500).json({ errorMessage: err.message });
      });
  }
});

module.exports = router;
