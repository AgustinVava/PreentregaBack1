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

// src/routers/api/carts.api.js

import { Router } from 'express';
import {
  getCartByUserId,
  addProductToCart,
  removeProductFromCart,
  createCart,
  deleteCart,
} from '../../../src/controllers/carts.controllers.js';

const cartsApiRouter = Router();

// Obtener el carrito de un usuario por ID
cartsApiRouter.get('/:userId', getCartByUserId);

// Crear un nuevo carrito para un usuario
cartsApiRouter.post('/:userId', createCart);

// Agregar un producto al carrito de un usuario
cartsApiRouter.post('/:userId/add', addProductToCart);

// Eliminar un producto del carrito de un usuario
cartsApiRouter.delete('/:userId/remove/:productId', removeProductFromCart);

// Eliminar el carrito de un usuario
cartsApiRouter.delete('/:userId', deleteCart);

export default cartsApiRouter;
