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

/* USER routes */
const userRoutes = require("./user");
router.use("/user", userRoutes);

/* IMAGE routes */
const imageRoutes = require("./image");
router.use("/image", imageRoutes);

module.exports = router;
