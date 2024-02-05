const express = require("express");
const multer = require("multer");
const path = require("path");
const messageRouter = express.Router();
const messageController = require("../controller/messageController.js");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const destinationPath = path.join(
//       "D:/Projects/React Native Chat App/Frontend/chatApp/screens/files"
//     );
//     cb(null, destinationPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
messageRouter.get("/hi", (req, res) => {
  return res.send("Hi");
});
messageRouter.post(
  "/sendMessage",
  upload.single("imageFile"),
  messageController.sendMessage
);
messageRouter.get("/user/:userId", messageController.getUserHeader);
messageRouter.get(
  "/messages/:senderId/:recepientId",
  messageController.getMessages
);
module.exports = messageRouter;
