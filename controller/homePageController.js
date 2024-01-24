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
  static sendFriendRequest = async (req, res) => {
    const { currentUserId, sentUserId } = req.body;
    if (!currentUserId || !sentUserId) {
      return res.status(500).json({ message: "Invalid User" });
    }
    console.log(currentUserId, sentUserId);
    try {
      await User.findByIdAndUpdate(sentUserId, {
        $push: { friendRequests: currentUserId },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Invalid User" });
    }
    try {
      await User.findByIdAndUpdate(currentUserId, {
        $push: { sentFriendRequests: sentUserId },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Invalid User" });
    }
    return res
      .status(200)
      .json({ message: "Friend Request Sent", success: true });
  };
  static takeFriendRequest = async (req, res) => {
    const { currentUserId, sentUserId } = req.body;
    if (!currentUserId || !sentUserId) {
      return res.status(500).json({ message: "Invalid User" });
    }
    console.log(currentUserId, sentUserId, "  ", "Hiii");
    try {
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { sentFriendRequests: sentUserId },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Invalid User" });
    }
    try {
      await User.findByIdAndUpdate(sentUserId, {
        $pull: { friendRequests: currentUserId },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Invalid User" });
    }
    return res
      .status(200)
      .json({ message: "Friend Request taken back", success: true });
  };
  static viewFriendRequests = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(500).json({ message: "Invalid User" });
    }
    try {
      const user = await User.findOne({ _id: userId })
        .populate("friendRequests", "name email image")
        .lean();
      const friendRequests = user.friendRequests;
      return res
        .status(200)
        .json({ friendRequests: friendRequests, message: "Friend Requests" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Invalid User" });
    }
  };
}
module.exports = homePageController;
