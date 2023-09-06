const User = require("../models/user.model");
const Token = require("../models/token.model");
const Admin = require("../models/admin.model");
const Chat = require("../models/chat.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const redisClient = require("../services/redis");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(402).json({ message: "please fill all the fields" });
    }

    const user = await User.findOne({ email });
    let flag = await bcrypt.compare(password, user.password);

    if (user && flag) {
      // send a new response with chatId and adminid in it
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        chatId: user.chatId,
        adminAssigned: user.adminAssigned,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    return res.json({ message: "Could not login" }).status(err.statusCode);
  }
};

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all of the fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(200).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const generatedToken = generateToken(user._id);
    await Token.create({
      email: user.email,
      token: generatedToken,
    });

    // if user successfully created
    if (user) {
      // finding the admin with lowest user count
      const assignedAdminId = await redisClient.zrange(
        "userAssigned:Admin",
        0,
        0
      );

      // create a new chat for the user
      const chat = await Chat.create({
        chatName: user.name,
        admin: assignedAdminId,
        client: user._id,
      });

      // update the client list of admin
      await Admin.findByIdAndUpdate(assignedAdminId, {
        $push: { userList: user._id },
      });

      // adding the chat Id and admin id to the user model
      await User.findByIdAndUpdate(user._id, {
        $set: {
          chatId: chat._id,
          adminAssigned: assignedAdminId,
        },
      });

      // update the count of assignedAdmin's user list count
      await redisClient.zincrby("userAssigned:Admin", 1, assignedAdminId);

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generatedToken,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log(err);
    return res
      .json({ message: "Could not register the user" })
      .status(err.statusCode);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(402).json({ message: "please fill all the fields" });
    }
    const admin = await Admin.findOne({ email }).populate("userList");
    let flag = await bcrypt.compare(password, admin.password);

    if (admin && flag) {
      return res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        userList: admin.userList,
        token: generateToken(admin._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    return res.json({ message: "Could not login" }).status(err.statusCode);
  }
};

const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all of the fields" });
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(200).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    const generatedToken = generateToken(admin._id);
    await Token.create({
      email: admin.email,
      token: generatedToken,
    });

    if (admin) {
      // add user to priority queue with the no of clients (user, 0)
      await redisClient.zadd("userAssigned:Admin", 0, admin._id);

      return res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generatedToken,
      });
    } else {
      return res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (err) {
    console.log(err);
    return res
      .json({ message: "Could not register the admin" })
      .status(err.statusCode);
  }
};

module.exports = {
  userLogin,
  userSignup,
  adminLogin,
  adminSignup,
};
