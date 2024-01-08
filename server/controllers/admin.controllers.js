import User from "../models/user.model.js";
import { getIO } from "../index.js";

export const usersReq = async (req, res, next) => {
  try {
    const users = await User.find({
      Request: true,
    });

    // Emit real-time updates using Socket.io
    const io = getIO();

    if (io) {
      io.emit("update", users);
      console.log("Real-time update emitted:", users);
    } else {
      console.error("Socket.io instance not available");
    }

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
