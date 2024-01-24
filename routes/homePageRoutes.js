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
module.exports = homePageRouter;
