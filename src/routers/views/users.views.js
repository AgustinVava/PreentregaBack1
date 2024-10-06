import { Router } from "express";
import { getUserView, getRegisterView, getLoginView } from "../../controllers/users.controllers.js";

const usersViewRouter = Router();

// Ruta para ver los detalles del usuario
usersViewRouter.get("/:uid", getUserView);

// Ruta para mostrar el formulario de registro
usersViewRouter.get("/register", getRegisterView);

// Ruta para mostrar el formulario de inicio de sesión
usersViewRouter.get("/login", getLoginView);

export default usersViewRouter;
