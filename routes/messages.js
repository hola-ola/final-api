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

//CONVO ID is what we want
router.post("/start-conversation", isLoggedIn, (req, res) => {
  //validate that req.body.user2 exists
  //find a convo between the users (req.user & user2)
  //if NO CONVO -> create a convo res.json(CONVO ID)
  //if CONVO -> res.json(CONVO ID)
  Conversation.findOne({
    $or: [{ user1: req.user._id }, { user2: req.user._id }],
  })
    .then((foundConversation) => {
      if (foundConversation) {
        return res.json({ conversation: foundConversation._id });
      }
      // Conversation.create({user1: req.user._id, user2: req.body.....}).then(newConversation => res.json({conversation: newConversation._id}))
    })
    .catch((err) => res.status(500).json({ errorMessage: err.message }));
});

module.exports = router;
