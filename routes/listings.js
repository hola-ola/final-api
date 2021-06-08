const router = require("express").Router();

// Require the Listing model in order to interact with the database
const Listing = require("../models/Listing.model");

// Require necessary (isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/create", isLoggedIn, (req, res) => {
  const {
    title,
    country,
    city,
    lengthOfStay,
    type,
    numberOfSleepingSpots,
    generalDescription,
    kitchenEquipment,
    bathroomEquipment,
    accessability,
    smokersWelcome,
    kidsWelcome,
    petsWelcome,
    spaceOutside,
    extraRemarks,
    ambienceLabels,
    imagesGallery,
    availability,
  } = req.body.formValues;

  Listing.findOne({
    title: req.body.formValues.title,
  })
    .then((foundListing) => {
      if (foundListing) {
        return res.status(400).json({
          errorMessage: "A listing with that title already exists",
          key: "title",
        });
      }

      Listing.create({
        ...req.body.formValues,
        owner: req.user._id,
      })
        .then((createdListing) => {
          console.log("Hello there! We are here!");
          res.json({ listing: createdListing });
        })
        .catch((err) => {
          console.log(err);
          res.json(500).json({ errorMessage: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
