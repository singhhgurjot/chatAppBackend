const Message = require("../models/message.js");
const User = require("../models/user.js");
const crypto = require("crypto");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const dotenv = require("dotenv");
dotenv.config();
class messageController {
  //Send Messages
  static sendMessage = async (req, res) => {
    var imageUrl = null;
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const BUCKET_REGION = process.env.BUCKET_REGION;
    const ACCESS_KEY = process.env.ACCESS_KEY;
    const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
    const { senderId, recepientId, messageType, messageText } = req.body;
    const s3 = new S3Client({
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
      },
      region: BUCKET_REGION,
    });
    if (messageType === "image") {
      const randomImageName = await crypto.randomBytes(32).toString("hex");
      const params = {
        Bucket: BUCKET_NAME,
        Key: randomImageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3
        .send(command)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      const getObjectParams = { Bucket: BUCKET_NAME, Key: randomImageName };
      const command1 = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command1, { expiresIn: 3600 });
      imageUrl = url;
    }
    console.log(senderId);

    try {
      const newMessage = new Message({
        senderId,
        recepientId,
        messageType,
        messageText,
        timeStamp: new Date(),
        imageUrl: messageType === "image" ? imageUrl : null,
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
      const messages = await Message.find({
        $or: [
          { senderId: senderId, recepientId: recepientId },
          {
            senderId: recepientId,
            recepientId: senderId,
          },
        ],
      }).populate("senderId", "_id name");
      res.status(200).json(messages);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
module.exports = messageController;
