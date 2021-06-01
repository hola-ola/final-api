const router = require("express").Router();

// Require the Listing model in order to interact with the database
const Listing = require("../models/Listing.model");

// Require necessary (isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

module.exports = router;
