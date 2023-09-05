const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      requires: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      require: true,
    },
    messageList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

let Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
