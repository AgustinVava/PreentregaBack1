import { Router } from "express";
import { registerView } from "../../controllers/users.controllers.js";
import { viewLogin } from "../../controllers/users.controllers.js";

const usersViewRouter = Router()

usersViewRouter.get("/register", registerView)
usersViewRouter.get("/login", viewLogin)

export default usersViewRouter