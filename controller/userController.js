const { configDotenv } = require("dotenv");
const User = require("../models/user.js");
var jwt = require("jsonwebtoken");
require("dotenv").config();
class userController {
  static register = async (req, res) => {
    console.log(req.body.name);
    const { name, email, password, image } = req.body;
    if (!name || !email || !password || !image) {
      return res.status(400).json({ message: "Please fill all the fields" });
    } else {
      const exists = await User.findOne({ email: email });

      if (exists) {
        return res
          .status(200)
          .json({ message: "An account with this email Already Exists" });
      } else {
        await User.create({
          name,
          email,
          password,
          image,
        }).then((data, err) => {
          if (data) {
            console.log(data);
            return res
              .status(200)
              .json({ message: "User Registered Successfully" });
          }
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ message: "User Registeration Failed" });
          }
        });
      }
    }
  };
  static login = async (req, res) => {
    console.log(req.body.password);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    } else {
      User.findOne({ email: email })
        .then((data) => {
          if (data) {
            if (password == data.password) {
              const token = jwt.sign(
                { userId: data._id },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
              );
              return res.status(200).json({
                message: "Login Successfull!",
                success: true,
                token: token,
              });
            } else {
              return res
                .status(200)
                .json({ message: "Incorrect Username or Password" });
            }
          } else {
            return res
              .status(200)
              .json({ message: "User not found, Please SignUp" });
          }
        })
        .catch((err) => {});
    }
  };
}
module.exports = userController;
