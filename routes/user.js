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

// NEW EDIT User profile
router.put("/update", isLoggedIn, (req, res) => {
  User.find({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  }).then((foundUser) => {
    console.log(foundUser);
    const allNotMe = foundUser.filter(
      (e) => e._id.toString() !== req.user._id.toString()
    );
    if (allNotMe.length) {
      return res.status(400).json({
        errorMessage: "This username or email are already in use",
      });
    }
    User.findByIdAndUpdate(req.user._id, req.body, { new: true }).then(
      (updatedUser) => {
        res.json({ user: updatedUser });
      }
    ).catch(err => res.status(500).json({errorMessage: "And I know whyy. He he he. Because i got high. Because i got high, because i got hiiiiigh"}));
  }).catch(err => res.status(500).json({errorMessage: "And I know whyy. He he he. Because i got high. Because i got high, because i got hiiiiigh"}));
});

// EDIT User profile
router.post("/:username/update", isLoggedIn, (req, res) => {
  console.log("This is user id: ", req.user._id);
  console.log("These are the params: ", req.params);
  console.log(req.body);

  User.findById(req.user._id).then((foundUser) => {
    if (!foundUser) {
      return res.status(404).json({ errorMessage: "User not found!" });
      console.log("SOS Update: no user");
    }
    if (foundUser.username !== req.params.username) {
      return res
        .status(404)
        .json({ errorMessage: "You're not the owner of this account!" });
    }
    console.log("INFO Update: we have the user");

    User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    }).then((existingUser) => {
      console.log(existingUser);
      if (existingUser) {
        console.log("Hello", existingUser);
        return res.status(400).json({
          errorMessage: "This username or email are already in use",
        });
      }
    });

    console.log("INFO Update: the data is available");
    User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, username, email, userBio, profilePic },
      { new: true }
    ).then((updatedUser) => {
      res.json({ user: updatedUser });
    });
  });
});

module.exports = router;
