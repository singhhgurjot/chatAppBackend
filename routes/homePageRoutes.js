const express = require("express");
const homePageController = require("../controller/homePageController");
const homePageRouter = express.Router();
homePageRouter.get("/getUsers/:userId", homePageController.getAllUsers);
homePageRouter.post("/sendFriendRequest", homePageController.sendFriendRequest);
homePageRouter.post("/takeFriendRequest", homePageController.takeFriendRequest);
homePageRouter.get(
  "/viewFriendRequests/:userId",
  homePageController.viewFriendRequests
);
homePageRouter.post(
  "/acceptFriendRequest",
  homePageController.acceptFriendRequest
);
homePageRouter.get("/getAllFriends/:userId", homePageController.getAllFriends);
module.exports = homePageRouter;
