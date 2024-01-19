import mongoose from "mongoose";
const messageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recepientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messageTypes: {
    type: String,
    enum: ["text", "image"],
  },
  message: String,
  imageUrl: String,
  timeStamp: {
    type: String,
    default: Date.now,
  },
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
