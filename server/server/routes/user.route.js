import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserService,
  getAllUserAc,
  getUser,
  getServiceUser,
  getUserno,
  getAllUser,
  updateUserPro,
  countUsers,
  ratingUser,
  commentUser,
  deleteCommentUser,
  saveUser,
  searchUsers,
  liveSearch,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter = express.Router();
userRouter.get("/test", test);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/services/:id", verifyToken, getUserService);
userRouter.get("/getuser/:id", verifyToken, getUser);
// userRouter.get("/getalluser/", getAllUser);
userRouter.get("/service/:id", getServiceUser);
userRouter.get("/getuserno/:id", getUserno);

//With token
userRouter.get("/getalluserac/", verifyToken, getAllUserAc);
userRouter.post("/update/:id", verifyToken, updateUser);
userRouter.post("/rating/:id", verifyToken, ratingUser);
userRouter.post("/comment/:id", verifyToken, commentUser);
userRouter.delete("/deletecomment/:commentId", verifyToken, deleteCommentUser);
userRouter.post("/save/:userId", verifyToken, saveUser);
userRouter.get("/search", verifyToken, searchUsers);
userRouter.get("/live-search", verifyToken, liveSearch);

//To admin
userRouter.post("/updateconfirm/:id", verifyToken, updateUserPro);
userRouter.get("/countusers", verifyToken, countUsers);

//Wihotu token
userRouter.get("/getalluser/", getAllUser);

export default userRouter;
