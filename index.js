const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/userRoutes.js");
const homePageRouter = require("./routes/homePageRoutes.js");
const messageRouter = require("./routes/messageRouter.js");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Listening to PORT:-" + PORT);
});
mongoose
  .connect(
    "mongodb+srv://GurjotSingh:harry499@cluster0.bqsptqv.mongodb.net/chatApp"
  ) //dotenv
  .then((db) => {
    console.log("Connected to the Database Successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(userRoutes);
app.use(homePageRouter);
app.use(messageRouter);
