import { Router } from 'express';
import {
    getCartByUserId,
    addProductToCart,
    removeProductFromCart,
} from "../../../src/controllers/carts.controllers.js"

const cartsApiRouter = Router();

cartsApiRouter.get("/", getCartByUserId);
cartsApiRouter.get("/:pid", addProductToCart);
cartsApiRouter.delete("/:pid", removeProductFromCart);


export default cartsApiRouter;