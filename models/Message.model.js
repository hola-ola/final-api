const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
});

const Message = model("Message", messageSchema);
module.exports = Message;
