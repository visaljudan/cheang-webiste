import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { usersReq } from "../controllers/admin.controllers.js";

const adminRouter = express.Router();

adminRouter.post("/user-req", usersReq);

export default adminRouter;
