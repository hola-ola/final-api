const router = require("express").Router();

// Require the models in order to interact with the database
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Listing = require("../models/Listing.model");

// Require necessary (isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

// GET User profile page
router.get("/:username", isLoggedIn, (req, res) => {
  User.findOne({
    username: req.params.username,
  })
    .populate("userListing")
    .populate("wishlist")
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
  Listing.findOneAndDelete({ owner: req.user._id })
    .populate("owner")
    .then((deletedListing) => {
      console.log("Listing is deleted!");
      User.findByIdAndDelete(req.user._id)
        .then((deletedUser) => {
          console.log("User is deleted!");
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
      console.log("Listing, user and session all deleted!");
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

// UPDATE user image
router.put("/update-img", isLoggedIn, (req, res) => {
  // console.log(req.body, req.headers);
  User.findByIdAndUpdate(
    req.user._id,
    { profilePic: req.body.singleImage },
    { new: true }
  ).then((newAndImprovedUser) => {
    res.json({ user: newAndImprovedUser });
  });
});

// GET user wishlist
router.get("/:username/wishlist", isLoggedIn, (req, res) => {
  // console.log("Is this username?", req.params.username);
  User.findOne({ username: req.params.username })
    .populate("wishlist")
    .then((foundUser) => {
      res.json({ user: foundUser });
    })
    .catch((err) => console.error(err.response));
});

// DELETE from user wishlist
router.put("/:username/wishlist-delete", isLoggedIn, (req, res) => {
  // console.log("Listing ID?", req.body.listingId);
  // console.log("Req.user", req.user.username);
  User.findOne({ username: req.user.username })
    .populate("wishlist")
    .then((foundUser) => {
      User.findByIdAndUpdate(
        foundUser._id,
        { $pull: { wishlist: req.body.listingId } },
        { new: true }
      ).then((updatedUser) => {
        // console.log("updatedUser: ", updatedUser);
        res.json({ updatedWishlist: updatedUser.wishlist });
      });
    })
    .catch((err) => console.error(err.response));
});

module.exports = router;
