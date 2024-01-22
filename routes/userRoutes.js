const express = require("express");
const UserController = require("../controller/userController.js");
const User = require("../models/user.js");
const userController = require("../controller/userController.js");
const userRoutes = express.Router();

userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.login);
userRoutes.get("/test/:name/:age", userController.test);
module.exports = userRoutes;
