const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { chats } = require("./data/data");
const connectDB = require("./config/db");
const { notFound, errorHandle } = require("./middlewares/errorMIddleware");

dotenv.config({ path: `../.env` });
connectDB();

const app = express();
app.use(express.json()); //to accept json data
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the backend");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandle);
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: true,
});

io.on("connection", (socket) => {
  console.log("connected to socket '_' ");

  socket.on("join-user", (data) => {
    console.log("Join User");
    socket.join(data.data._id);

    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log("User Joined Room : ", room);
  });

  socket.on("send-message", (chatMessage) => {
    var chat = chatMessage.chat;
    if (!chat.users) {
      return console.log("chat.users is not defined");
    }

    chat.users.forEach((user) => {
      if (chatMessage.sender._id !== user._id) {
        socket.to(user._id).emit("message-received", chatMessage);
      }
    });
  });
});
