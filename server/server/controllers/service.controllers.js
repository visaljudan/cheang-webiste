import Serivce from "../models/service.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

//With Token
export const createService = async (req, res, next) => {
  try {
    const serivce = await Serivce.create(req.body);
    return res.status(201).json(serivce);
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  const serivce = await Serivce.findById(req.params.id);
  console.log("serivce");
  console.log(serivce);
  if (!serivce) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== serivce.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Serivce.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  const serivce = await Serivce.findById(req.params.id);
  console.log(serivce);
  if (!serivce) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== serivce.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedSerivce = await Serivce.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSerivce);
  } catch (error) {
    next(error);
  }
};

export const getService = async (req, res, next) => {
  try {
    const service = await Serivce.findById(req.params.id);
    console.log(service);
    if (!service) {
      return next(errorHandler(404, "Service not found!"));
    }
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

// export const getServiceUser = async (req, res, next) => {
//   if (req.user.id === req.params.id) {
//     try {
//       const service = await Serivce.find({ userRef: req.params.id });
//       res.status(200).json(service);
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     return next(errorHandler(401, "You can only view your own service!"));
//   }
// };
