const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Conversation = require("../models/Conversation.model");

router.get("/", isLoggedIn, (req, res) => {
  Conversation.find({ $or: [{ user1: req.user._id }, { user2: req.user._id }] })
    .then((foundConversations) => {
      res.json({ conversations: foundConversations });
    })
    .catch((err) => res.status(500).json({ errorMessage: err.message }));
});

router.get("/new", isLoggedIn, (req, res) => {
  console.log("Running");
});

router.post("new", isLoggedIn, (req, res) => {
  console.log("Running Running");
});

module.exports = router;
