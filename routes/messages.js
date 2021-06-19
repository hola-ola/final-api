const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Conversation = require("../models/Conversation.model");
const User = require("../models/User.model");

router.get("/", isLoggedIn, (req, res) => {
  Conversation.find({ $or: [{ user1: req.user._id }, { user2: req.user._id }] })
    .then((foundConversations) => {
      res.json({ conversations: foundConversations });
    })
    .catch((err) => res.status(500).json({ errorMessage: err.message }));
});

router.post("/start-conversation", isLoggedIn, (req, res) => {
  User.findOne({ _id: req.body.recepient })
    .then(() => {
      Conversation.findOne({
        $and: [
          { $or: [{ user1: req.user._id }, { user2: req.body._id }] },
          { $or: [{ user1: req.body._id }, { user2: req.user._id }] },
        ],
      }).then((foundConversation) => {
        if (foundConversation) {
          return res.json({ conversation: foundConversation._id });
        } else {
          console.log("There is no conversation between the users");
          Conversation.create({
            user1: req.user._id,
            user2: req.foundUser._id,
          }).then((newConversation) => {
            console.log("Conversation created");
            res.json({ conversation: newConversation._id });
          });
        }
      });
    })
    .catch((err) => res.status(500).json({ errorMessage: err.message }));
});

module.exports = router;
