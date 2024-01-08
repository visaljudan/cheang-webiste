import User from "../models/user.model.js";

export const usersReq = async (req, res, next) => {
  try {
    const users = await User.find({
      verified: true,
    });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
