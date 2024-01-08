import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserService,
  getAllUserAc,
  getUser,
  getServiceUser,
  getUsers,
  getUserno,
  getAllUser,
  updateUserPro,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter = express.Router();
userRouter.get("/test", test);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/services/:id", verifyToken, getUserService);
userRouter.get("/getuser/:id", verifyToken, getUser);
userRouter.get("/getusers", verifyToken, getUsers);
// userRouter.get("/getalluser/", getAllUser);
//With account
userRouter.get("/getalluserac/", verifyToken, getAllUserAc);
userRouter.post("/update/:id", verifyToken, updateUser);

userRouter.post("/updateconfirm/:id", updateUserPro);

//Wihotu account
userRouter.get("/getalluser/", getAllUser);
userRouter.get("/service/:id", getServiceUser);
userRouter.get("/getuserno/:id", getUserno);

export default userRouter;
