const express = require("express");
const UserController = require("../controller/userController.js");
const User = require("../models/user.js");
const userRoutes = express.Router();

userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.login);
module.exports = userRoutes;
