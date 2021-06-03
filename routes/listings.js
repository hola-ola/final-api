const router = require("express").Router();

// Require the Listing model in order to interact with the database
const Listing = require("../models/Listing.model");

// Require necessary (isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/create", (req, res) => {
  console.log("Are we here?");
  Listing.findOne({
    title: req.body.title,
  })
    .then((foundListing) => {
      if (foundListing) {
        return res.status(400).json({
          errorMessage: "A listing with that title already exists",
          key: "title",
        });
      }

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
        ambienceDescription,
        imagesGallery,
        availability,
      } = req.body;

      Listing.create({
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
        ambienceDescription,
        imagesGallery,
        availability,
      })
        .then((createdListing) => {
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
