const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

/* AUTH routes */
const authRoutes = require("./auth");
router.use("/auth", authRoutes);

/* LISTINGS routes */
const listingsRoutes = require("./listings");
router.use("/listings", listingsRoutes);

module.exports = router;
