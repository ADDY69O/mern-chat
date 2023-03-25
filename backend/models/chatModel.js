const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latesMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    gorupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const chat = mongoose.model("Chat", chatModel);

module.exports = chat;

//chatName
//isGroupchat
//users
//latestMessages
//groupAdmin
