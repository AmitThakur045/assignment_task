const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
      default: "ADMIN",
    },
  },
  {
    timestamps: true,
  }
);

let Message = mongoose.model("Message", messageSchema);
module.exports = Message;
