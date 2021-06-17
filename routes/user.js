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
    .populate("userListing")
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

// EDIT User profile
router.put("/update", isLoggedIn, (req, res) => {
  User.find({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
    .then((foundUser) => {
      console.log(foundUser);
      const allNotMe = foundUser.filter(
        (e) => e._id.toString() !== req.user._id.toString()
      );
      if (allNotMe.length) {
        return res.status(400).json({
          errorMessage: "This username or email are already in use",
        });
      }
      User.findByIdAndUpdate(req.user._id, req.body, { new: true })
        .then((updatedUser) => {
          res.json({ user: updatedUser });
        })
        .catch((err) =>
          res.status(500).json({
            errorMessage:
              "And I know whyy. He he he. Because i got high. Because i got high, because i got hiiiiigh",
          })
        );
    })
    .catch((err) =>
      res.status(500).json({
        errorMessage:
          "And I know whyy. He he he. Because i got high. Because i got high, because i got hiiiiigh",
      })
    );
});

router.put("/update-img", isLoggedIn, (req, res) => {
  console.log(req.body, req.headers);
  User.findByIdAndUpdate(
    req.user._id,
    { profilePic: req.body.singleImage },
    { new: true }
  ).then((newAndImprovedUser) => {
    res.json({ user: newAndImprovedUser });
  });
});

module.exports = router;
