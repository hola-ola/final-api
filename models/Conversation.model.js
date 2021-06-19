const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({
  subject: { type: String, default: "New conversation" },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  user1: { type: Schema.Types.ObjectId, ref: "User" },
  user2: { type: Schema.Types.ObjectId, ref: "User" },
  user1Read: { type: Boolean, default: false },
  user2Read: { type: Boolean, default: false },
});

const Conversation = model("Conversation", conversationSchema);
module.exports = Conversation;
