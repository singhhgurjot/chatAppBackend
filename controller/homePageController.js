const User = require("../models/user");
class homePageController {
  static getAllUsers = async (req, res) => {
    console.log("Hi");
    const userId = req.params.userId;
    await User.find({ _id: { $ne: userId } })
      .then((data) => {
        if (data) {
          res.status(200).json({ users: data, message: "Users Are" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "Invalid User" });
      });
  };
}
module.exports = homePageController;
