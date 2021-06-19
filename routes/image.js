const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../middleware/cloudinary");

//add isOwner
router.post("/", isLoggedIn, upload.single("image"), (req, res) => {
  // console.log("GETTING REQ?");
  if (!req.file) {
    res.status(500).json("Something went wrong with the upload");
    return;
  }
  const picture = req.file.path;
  res.json({ picture: picture });
});

module.exports = router;
