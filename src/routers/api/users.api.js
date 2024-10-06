import { Router } from "express";
import isValidUser from "../../middlewares/isValidUser.js";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  destroyUser,
  loginUser
} from "../../../src/controllers/users.controllers.js";

const usersApiRouter = Router();

usersApiRouter.get("/", getAllUsers);
usersApiRouter.get("/:uid", getUser);
usersApiRouter.post("/", isValidUser, createUser);
usersApiRouter.put("/:uid", updateUser);
usersApiRouter.delete("/:uid", destroyUser);
usersApiRouter.post("/register", createUser);
usersApiRouter.post("/login", loginUser);

export default usersApiRouter;