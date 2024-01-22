const express = require("express");
const homePageController = require("../controller/homePageController");
const homePageRouter = express.Router();
homePageRouter.get("/getUsers/:userId", homePageController.getAllUsers);
module.exports = homePageRouter;
