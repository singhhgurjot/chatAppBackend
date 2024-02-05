const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recepientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messageType: {
    type: String,
    enum: ["text", "image"],
  },
  messageText: String,
  imageUrl: String,
  timeStamp: {
    type: String,
    default: Date.now,
  },
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
