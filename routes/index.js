const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

/* AUTH routes */
const authRoutes = require("./auth");
router.use("/auth", authRoutes);

/* LISTING routes */
const listingRoutes = require("./listing");
router.use("/listing", listingRoutes);

module.exports = router;
