const router = require("express").Router();

const Listing = require("../models/Listing.model");
const User = require("../models/User.model");

router.get("/search", (req, res) => {
  Listing.find({})
    .populate("owner")
    .then((foundListings) => {
      console.log("we are here");
      res.json({ foundListings: foundListings });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.messaage });
    });
});

module.exports = router;
