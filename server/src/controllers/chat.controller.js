const Chat = require("../models/chat.model");

const fetchChat = async (req, res) => {
  try {
    if (!req.body?.chatId) {
      return res.json({ message: "incorect json body" });
    }

    const chat = await Chat.findById(req.body.chatId);

    if (chat) {
      return res.status(200).json({
        _id: chat._id,
        chatName: chat.chatName,
        client: chat.client,
        admin: chat.admin,
        messageList: chat.messageList,
      });
    }
    return res.status(401).json({ message: "Could not fetch the chat" });
  } catch (err) {
    return res
      .json({ message: "Could not fetch the chat" })
      .status(err.statusCode);
  }
};

module.exports = {
  fetchChat,
};
