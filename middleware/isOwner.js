const Listing = require("../models/Listing.model");

module.exports = (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization === "null") {
    return res.status(403).json({ errorMessage: "You are not logged in" });
  }
  Listing.findById(req.params.listingId)
    .populate("owner")
    .then((foundListing) => {
      if (foundListing._id.toString() !== req.user.userListing[0].toString()) {
        return res
          .status(403)
          .json({ errorMessage: "You're not the owner of this listing" });
      }
      next();
    })
    .catch((err) => {
      return res.status(500).json({ errorMessage: err.message });
    });
};
