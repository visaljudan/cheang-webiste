import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
//Sign Up
export const signup = async (req, res, next) => {
  const { nameuser, email, password } = req.body;
  //Checking pass word
  if (password.length < 6) {
    return next(errorHandler(400, "Password should be at less 6"));
  }
  //Crypt password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ nameuser, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(errorHandler(400, "Eamil is already used"));
  }
};

//Sign In
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "Email not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Password!"));

    //Create token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
