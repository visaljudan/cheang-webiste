import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createService,
  deleteService,
  updateService,
  getService,
  // getServiceUser,
} from "../controllers/service.controllers.js";
import { getUserService } from "../controllers/user.controllers.js";

const serviceRouter = express.Router();

serviceRouter.post("/create", verifyToken, createService);
serviceRouter.delete("/delete/:id", verifyToken, deleteService);
serviceRouter.post("/update/:id", verifyToken, updateService);
serviceRouter.get("/get/:id", getService);
// serviceRouter.get("/getServices/:id", getServiceUser);

export default serviceRouter;
