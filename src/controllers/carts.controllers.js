// src/routers/controllers/carts.controllers.js

import cartManager from '../managers/carts.manager.js';

async function getCartByUserId(req, res, next) {
  try {
    const { userId } = req.params;
    const cart = await cartManager.read(userId);
    if (cart) {
      return res.status(200).json({ message: "CART READ", response: cart });
    } else {
      const error = new Error("CART NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function addProductToCart(req, res, next) {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const updatedCart = await cartManager.addProductToCart(userId, productId, quantity);
    return res.status(200).json({ message: "PRODUCT ADDED TO CART", response: updatedCart });
  } catch (error) {
    return next(error);
  }
}

async function removeProductFromCart(req, res, next) {
  try {
    const { userId, productId } = req.params;
    const updatedCart = await cartManager.removeProductFromCart(userId, productId);
    return res.status(200).json({ message: "PRODUCT REMOVED FROM CART", response: updatedCart });
  } catch (error) {
    return next(error);
  }
}

async function createCart(req, res, next) {
  try {
    const { userId } = req.params;
    const newCart = await cartManager.create(userId);
    return res.status(201).json({ message: "CART CREATED", response: newCart });
  } catch (error) {
    return next(error);
  }
}

async function deleteCart(req, res, next) {
  try {
    const { userId } = req.params;
    const response = await cartManager.delete(userId);
    if (!response) {
      const error = new Error(`Cart for user with id ${userId} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ message: "CART DELETED", response });
  } catch (error) {
    return next(error);
  }
}

export {
  getCartByUserId,
  addProductToCart,
  removeProductFromCart,
  createCart,
  deleteCart
};


