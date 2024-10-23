import { Router } from "express";
import { viewLogin } from "../../controllers/users.controllers.js";

const loginViewsRouter = Router ()

loginViewsRouter.get("/login", viewLogin);

export default loginViewsRouter;