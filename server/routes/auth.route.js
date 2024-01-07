import express from "express";
import { signup } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

export default authRouter;
