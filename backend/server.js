const userRoutes =require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const express = require("express");
const cors=require('cors')
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const { notFound, errorHandle } = require("./middlewares/errorMIddleware");
dotenv.config({path:`../.env`});
connectDB();
const app = express();
app.use(express.json());//to accept json data 
app.use(cors())
app.get("/", (req, res) => {
  res.send("Welcome to the backend");
});
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandle);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
