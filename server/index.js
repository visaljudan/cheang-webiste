import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
// import cors from "cors";
//Update
// import http from "http";
// import { Server } from "socket.io";
////
import path from "path";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongo DB!");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Update
// const server = http.createServer(app); // Create HTTP server
// let socketIo;
// const io = new Server(server); // Create Socket.io instance
// io.on("connection", (socket) => {
//   console.log("Client connected");
//   socketIo = io; // Save the instance for future use
// });
// console.log(socketIo);
////

app.listen(5000, () => {
  console.log(`Server is running on port 5000!`);
});

// Function to get the Socket.io instance from other files
// export const getIO = () => {
//   return socketIo;
// };
//////////
//Route
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

//Render deploy
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//Middleware Error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
