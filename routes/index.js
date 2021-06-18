const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hop-flat-swap",
  },
});

const upload = multer({ storage });

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

/* SEARCH routes */
const searchRoutes = require("./results");
router.use("/results", searchRoutes);

/* REVIEWS routes */
const reviewsRoutes = require("./reviews");
router.use("/reviews", reviewsRoutes);

/* CONVERSATIONS routes */
router.use("/conversations", require("./conversations"));

module.exports = router;
