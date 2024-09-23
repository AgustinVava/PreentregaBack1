import express from 'express';
import CartService from '../controllers/carts.controllers.js'; // Importar otros módulos usando ESM

const router = express.Router();

router.get('/:userId', async (req, res) => {
    // Lógica para obtener el carrito
    const cart = await CartService.getCartByUserId(req.params.userId);
    res.json(cart);
});

router.post('/:userId/add', async (req, res) => {
    const { productId, quantity } = req.body;
    const updatedCart = await CartService.addProductToCart(req.params.userId, productId, quantity);
    res.json(updatedCart);
});

router.post('/:userId/remove/:productId', async (req, res) => {
    const updatedCart = await CartService.removeProductFromCart(req.params.userId, req.params.productId);
    res.json(updatedCart);
});

export default cartsApiRouter;  

