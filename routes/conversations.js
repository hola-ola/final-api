const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Conversation = require("../models/Conversation.model");

router.get("/", isLoggedIn, (req, res) => {
  Conversation.find({
    $or: [{ user1: req.user._id }, { user2: req.user._id }],
  }).then((conversations) => {
    res.json({ allConversations: conversations });
  });
});

module.exports = router;
