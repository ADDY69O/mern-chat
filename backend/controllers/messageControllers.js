const AsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const fetchMessage = AsyncHandler(async (req, res) => {
  try {
    if (!req.params.chatId) {
      return res
        .status(400)
        .json({ success: false, message: "chatId is required" });
    }

    const fetch = await Message.find({
      chat: req.params.chatId,
    })
      .populate("sender", "name pic email")
      .populate("chat");

    return res.status(200).json({ fetch });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});
const sendMessage = AsyncHandler(async (req, res) => {
  try {
    const { content, chatId } = req.body;

    var message = await Message.create({
      content,
      chat: chatId,
      sender: req.user._id,
    });

    message = await message.populate("sender", "name pic email");
    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    console.log(message);
    const newChat = await Chat.findByIdAndUpdate(req.body.chatId, {
      latesMessage: message,
    });

    return res.status(200).json({ success: true, message });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

module.exports = {
  sendMessage,
  fetchMessage,
};
