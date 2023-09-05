const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requires: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    ChatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      require: true,
    },
    AdminAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

let User = mongoose.model("User", userSchema);
module.exports = User;
