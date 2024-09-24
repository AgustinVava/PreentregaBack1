// src/views/carts.views.js

import cartManager from '../routers/managers/carts.manager.js';

async function renderCartPage(req, res, next) {
  try {
    const { userId } = req.params;
    const cart = await cartManager.read(userId);
    if (cart) {
      res.render('cart', { cart }); // Renderiza una vista de carrito con los datos del carrito
    } else {
      res.status(404).render('error', { message: 'CART NOT FOUND' }); // Manejo de error si no se encuentra el carrito
    }
  } catch (error) {
    return next(error);
  }
}

async function renderCartView(req, res, next) {
  try {
    const { userId } = req.params;
    const cart = await cartManager.read(userId);
    if (cart) {
      res.render('cart', { cart }); // Renderiza la vista del carrito
    } else {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

// Exportar las funciones de renderizado
export {
  renderCartPage,
  renderCartView,
};

