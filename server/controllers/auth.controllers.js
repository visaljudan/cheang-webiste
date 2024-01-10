import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//Sign Up
export const signup = async (req, res, next) => {
  const { nameuser, email, password } = req.body;

  const validNameUserPattern = /^[a-zA-Z0-9\s]+$/;
  const lowercasedEmail = email.toLowerCase();

  //Name only with letter number and space
  if (!validNameUserPattern.test(nameuser)) {
    return next(errorHandler(400, "Invalid characters in the name"));
  }

  //Checking pass word
  if (password.length < 6) {
    return next(errorHandler(400, "Password should be at less 6"));
  }
  //Crypt password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    nameuser,
    email: lowercasedEmail,
    password: hashedPassword,
  });
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
    // const lowercasedEmail = email.toLowerCase();

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
    // res.status(200).json({ token, ...rest });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

//Sign In With Google
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        nameuser: req.body.nameuser,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
