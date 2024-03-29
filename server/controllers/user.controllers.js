import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Serivce from "../models/service.model.js";
import { errorHandler } from "../utils/error.js";
import { ObjectId } from "mongoose";

export const test = async (req, res) => {
  res.status(201).json("User created successfully");
};

//With token
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
          province: req.body.province,
          city: req.body.city,
          mainService: req.body.mainService,
          subService: req.body.subService,
          phone: req.body.phone,
          Request: req.body.Request,
          Confirm: req.body.Confirm,
          userPro: req.body.userPro,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

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

export const ratingUser = async (req, res, next) => {
  const { rating } = req.body;
  const userRate = req.user.id;
  const userResive = req.params.id;

  try {
    const userBeingRated = await User.findById(userResive);
    const existingRating = userBeingRated.ratings.find(
      (r) => r.userRate === userRate
    );

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Add a new rating
      userBeingRated.ratings.push({ userRate, rating });
    }

    // Save the updated user document
    const updatedUser = await userBeingRated.save();

    // Exclude password from the response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const commentUser = async (req, res, next) => {
  const { comment, avatar, nameuser } = req.body;
  const userComment = req.user.id;
  const userResive = req.params.id;
  try {
    const userBeingCommented = await User.findById(userResive);
    userBeingCommented.comments.push({
      userComment: userComment,
      userAvatar: avatar,
      userName: nameuser,
      comment: comment,
    });

    // Save the updated user document
    const updatedUser = await userBeingCommented.save();

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteCommentUser = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.body.user;

  try {
    const user = await User.findById(userId);
    console.log(commentId);

    const updatedComments = user.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    user.comments = updatedComments;
    const updatedUser = await user.save();
    console.log(updatedUser);
    // Exclude password from the response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const saveUser = async (req, res, next) => {
  const { userId } = req.params;
  const userSave = req.user.id;
  try {
    const userToSave = await User.findById(userSave);
    const userSaved = await User.findById(userId);
    console.log(userSaved.avatar);
    console.log(userSaved.nameuser);

    const isAlreadySaved = userToSave.saves.some(
      (save) => save.userId === userId
    );
    if (isAlreadySaved) {
      // If already saved, "unsave" the user
      userToSave.saves = userToSave.saves.filter(
        (save) => save.userId !== userId
      );
    } else {
      // Save the user
      userToSave.saves.push({
        userId,
        userAvatar: userSaved.avatar,
        userName: userSaved.nameuser,
        saveSign: true,
      });
    }
    console.log(userToSave);
    await userToSave.save();
    const { password, ...rest } = userToSave._doc;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const searchUsers = async (req, res, next) => {
  try {
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

export const liveSearch = async (req, res, next) => {
  try {
    console.log("work");
    const { mainService, subService, province, city } = req.query;
    // const { mainService, subService, province, city } = req.body;

    console.log(subService);
    // Create a query object based on the search parameters
    const liveSearchQuery = {
      userPro: true,
      admin: false,
      mainService: mainService,
      subService: subService,
      province: province,
      city: city,
    };

    // Use your User model to find users based on the liveSearchQuery
    const liveSearchResults = await User.find(liveSearchQuery);

    res.json(liveSearchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

///to admin
export const updateUserPro = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          Request: req.body.Request,
          Confirm: req.body.Confirm,
          userPro: req.body.userPro,
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

export const countUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    // console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/////////////////////////////////
////////////////////////////////
//////////////////////////////

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
