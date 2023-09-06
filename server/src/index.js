const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
// const socketio = require("socket.io");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const chatRoutes = require("./routes/chat.routes");
const { ACTIONS } = require("./services/Actions");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// routing
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Branch International API");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// map <socket.id, userId>
const userSocketMap = {};
io.on("connect", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ chatId, userId }) => {
    userSocketMap[socket.id] = userId;
    socket.join(chatId);

    console.log(`${userId} joined ${chatId}`);
  });

  socket.on(ACTIONS.CLIENT_SENT_MESSAGE, ({ message, chatId, type }) => {
    const clientId = userSocketMap[socket.id];
    console.log("Client ", clientId, " Sent Message to Chat: ", chatId);

    // add the given message to message DB abd chat DB

    socket.to(chatId).emit(ACTIONS.ADMIN_RECIEVE_MESSAGE, { message, type });
  });

  socket.on(ACTIONS.ADMIN_SENT_MESSAGE, ({ message, chatId, type }) => {
    const adminId = userSocketMap[socket.id];
    console.log("Admin ", adminId, " Sent Message to Chat: ", chatId);

    // add the given message to message DB abd chat DB

    socket.to(chatId).emit(ACTIONS.CLIENT_RECIEVE_MESSAGE, { message, type });
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    socket.leave();
  });
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log("MongoDB Error", error.message));

module.exports = app;
