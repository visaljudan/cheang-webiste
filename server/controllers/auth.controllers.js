import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
//Sign Up
export const signup = async (req, res, next) => {
  const { nameuser, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ nameuser, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};
