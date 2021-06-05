const { Schema, model } = require("mongoose");

const LENGTH_OF_STAY_ENUM = require("../utils/consts");
const LISTING_TYPE_ENUM = require("../utils/consts");

const listingSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    lengthOfStay: {
      type: String,
      required: true,
      enum: LENGTH_OF_STAY_ENUM,
    },
    type: {
      type: String,
      required: true,
      enum: LISTING_TYPE_ENUM,
    },
    numberOfSleepingSpots: {
      type: String,
      required: true,
    },
    generalDescription: {
      type: String,
      required: true,
    },
    kitchenEquipment: {
      type: [String],
      required: true,
    },
    bathroomEquipment: {
      type: [String],
      required: true,
    },
    workSetup: {
      type: [String],
      required: true,
    },
    accessability: {
      type: [String],
      required: true,
    },
    smokersWelcome: {
      type: Boolean,
      required: true,
    },
    kidsWelcome: {
      type: Boolean,
      required: true,
    },
    petsWelcome: {
      type: Boolean,
      required: true,
    },
    spaceOutside: {
      type: Boolean,
      required: true,
    },
    extraRemarks: {
      type: String,
    },
    ambienceDescription: {
      type: String,
      required: true,
    },
    imagesGallery: {
      type: [String],
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = model("Listing", listingSchema);

module.exports = Listing;
