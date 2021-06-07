const router = require("express").Router();

// Require the Listing model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/:username", isLoggedIn, (req, res) => {
  console.log("We are here:", req.params.username);
  User.findOne({
    username: req.params.username,
  })
    .then((foundUser) => {
      console.log(foundUser);
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

module.exports = router;
