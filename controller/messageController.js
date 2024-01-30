const Message = require("../models/message.js");
const User = require("../models/user.js");
class messageController {
  //Send Messages
  static sendMessage = async (req, res) => {
    const { senderId, recepientId, messageType, messageText } = req.body;
    console.log(senderId);
    try {
      const newMessage = new Message({
        senderId,
        recepientId,
        messageType,
        messageText,
        timeStamp: new Date(),
        imageUrl: messageType === "image",
      });
      newMessage.save();
      return res.status(200).json({ message: "Message sent Successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Sever Error" });
    }
  };
  // Fetch User for Header
  static getUserHeader = async (req, res) => {
    try {
      const { userId } = req.params;
      const recepientId = await User.findById(userId).select(
        "name email image"
      );
      res.json(recepientId);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  static getMessages = async (req, res) => {
    try {
      const { senderId, recepientId } = req.params;
      const messages = await Messages.findOne({
        $or: [
          { senderId: senderId, recepientId: recepientId },
          {
            senderId: recepientId,
            recepientId: senderId,
          },
        ],
      }).populate("senderId", "_id name");
      res.json(messages);
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
module.exports = messageController;
