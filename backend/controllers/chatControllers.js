const AsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = AsyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "userId is not sended" });
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latesMessage");

  isChat = await User.populate(isChat, {
    path: "latesMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    return res.status(200).json({ isChat });
  } else {
    var newChat = {
      chatName: "Sender",
      isGroupChat: false,
      users: [req.user.id, userId],
    };
    try {
      const createdChat = await Chat.create(newChat);
      const FullChat = await Chat.findOne({ _id: createdChat._id });
      return res.status(200).json({ success: true, FullChat });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
});

const fetchChat = AsyncHandler(async (req, res) => {
  try {
    var fetch = await Chat.find({
      users: { $elemMatch: { $eq: req.user.id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latesMessage");

    return res.status(200).json({ fetch });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

const createGroupChat = AsyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.users) {
    res
      .status(400)
      .json({ success: false, message: "Filled the required credentials" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Minimum 2 users are required for the group",
    });
  }
  users.push(req.user);
  // console.log(users);
  const groupChat = await Chat.create({
    chatName: req.body.name,
    isGroupChat: true,
    users,
    groupAdmin: req.user,
  });

  try {
    const created = await Chat.find({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).json({ success: true, created });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
});

const rename = AsyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  if (!req.body.chatId || !req.body.chatName) {
    res
      .status(400)
      .json({ success: false, message: "Filled the required credentials" });
  }
  try {
    const update = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "updated Successfully", update });
  } catch (error) {
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
});

const addGroup = AsyncHandler(async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (added === null) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "added Successfully", added });
  } catch (error) {
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
});
const removeGroup = AsyncHandler(async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const remove = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res
      .status(200)
      .json({ success: true, message: "removed Successfully", remove });
  } catch (error) {
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  rename,
  addGroup,
  removeGroup,
};
