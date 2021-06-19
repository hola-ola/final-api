const router = require("express").Router();

const Listing = require("../models/Listing.model");
const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isOwner = require("../middleware/isOwner");

router.post("/create", isLoggedIn, (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((foundUser) => {
      if (foundUser.userListing.length > 0) {
        return res
          .status(400)
          .json({ errorMessage: "The user already created a listing" });
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
        ambienceLabels,
        imagesGallery,
        availability,
      } = req.body.formValues;

      if (!title || !country || !city) {
        return res
          .status(400)
          .json({ errorMessage: "Please fill in all required fields" });
      }

      Listing.create({
        ...req.body.formValues,
        owner: foundUser,
      })
        .then((createdListing) => {
          // res.json({ listing: createdListing });
          // console.log(createdListing);
          User.findOneAndUpdate(
            { _id: createdListing.owner._id },
            { $push: { userListing: createdListing._id } },
            { new: true }
          )
            .then((user) => {
              console.log("User had been updated");
              res.json({ listing: createdListing, user });
            })
            .catch((err) => {
              res.status(400).json({ errorMessage: err.message });
            });
        })
        .catch((err) => {
          res.status(500).json({ errorMessage: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get("/:listingId", isLoggedIn, (req, res) => {
  Listing.findOne({ _id: req.params.listingId })
    .populate("owner")
    .then((foundListing) => {
      res.json({ listing: foundListing });
    })
    .catch((err) => {
      console.log(err);
      res.json(500).json({ errorMessage: err.message });
    });
});

router.get("/:listingId/edit", isLoggedIn, isOwner, (req, res) => {
  Listing.findOne({ _id: req.params.listingId })
    .then((foundListing) => {
      res.json({ listing: foundListing });
    })
    .catch((err) => {
      res.json(500).json({ errorMessage: err.message });
    });
});

router.put("/:listingId/edit", isLoggedIn, (req, res) => {
  // console.log(req.body);
  Listing.findOneAndUpdate({ _id: req.params.listingId }, req.body, {
    new: true,
  })
    .then((updatedListing) => {
      res.json({ listing: updatedListing });
    })
    .catch((err) => {
      console.err(err.response);
    });
});

router.get("/:listingId/delete", isLoggedIn, isOwner, (req, res) => {
  Listing.findOne({ _id: req.params.listingId })
    .then((foundListing) => {
      res.json({ listing: foundListing });
    })
    .catch((err) => {
      res.json(500).json({ errorMessage: err.message });
    });
});

router.get("/:listingId/removed", isLoggedIn, (req, res) => {
  Listing.findByIdAndDelete(req.params.listingId)
    .then((foundListing) => {
      User.findByIdAndUpdate(req.user._id, {
        $pull: { userListing: foundListing._id },
      }).then(() => {
        console.log("The user has been updated in the database");
      });
    })
    .then((res) =>
      console.log("The listing has been removed from the database")
    )
    .catch((err) => {
      res.json(500).json({ errorMessage: err.message });
    });
});

router.get("/:username/listing", isLoggedIn, (req, res) => {
  User.findOne({ username: req.params.username })

    .then((foundUser) => {
      Listing.findById(foundUser.userListing).then((foundListing) => {
        res.json({ listing: foundListing });
      });
    })
    .catch((err) => {
      console.log(err);
      res.json(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
