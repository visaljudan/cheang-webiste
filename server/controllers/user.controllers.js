import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Serivce from "../models/service.model.js";
import { errorHandler } from "../utils/error.js";

export const test = async (req, res) => {
  res.status(201).json("User created successfully");
};
///Without Token
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({
      userPro: true,
    });
    return res.status(200).json(users);
    console.log(users);
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          nameuser: req.body.nameuser,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
          brandName: req.body.brandName,
          location: req.body.location,
          typeService: req.body.typeService,
          userPro: req.body.userPro,
          phone: req.body.phone,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//////////////////////////////

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserService = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const service = await Serivce.find({ userRef: req.params.id });
      res.status(200).json(service);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own service!"));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || "";
    const locations = req.query.locations || "location";
    const order = req.query.order || "desc";
    const currentUserID = req.user.id;
    const users = await User.find({
      _id: { $ne: currentUserID },
      nameuser: { $regex: searchTerm, $options: "i" },
      userPro: true,
    })
      .sort({ [locations]: order })
      .limit(limit)
      .skip(startIndex);
    console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const id = req.params.id;
    console.log(id);
    if (!user) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getServiceUser = async (req, res, next) => {
  if (req.params.id) {
    try {
      const service = await Serivce.find({ userRef: req.params.id });
      res.status(200).json(service);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own service!"));
  }
};

export const getUserno = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const id = req.params.id;
    console.log(id);
    if (!user) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//Without account
export const getAllUserAc = async (req, res, next) => {
  try {
    const currentUserID = req.user.id;
    console.log(currentUserID);
    const users = await User.find({
      _id: { $ne: currentUserID },
      userPro: true,
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
