const express = require('express');
const router = express.Router();

let carts = {}; // Objeto en memoria para almacenar los carritos

// Obtener carrito del usuario
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const cart = carts[userId] || { items: [], totalPrice: 0 };
    res.json(cart);
});

// Agregar producto al carrito
router.post('/:userId', (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity, price } = req.body;

    if (!carts[userId]) {
        carts[userId] = { items: [], totalPrice: 0 };
    }

    const cart = carts[userId];
    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        cart.items[itemIndex].quantity += quantity;
    } else {
        // Si el producto no está en el carrito, lo agrega
        cart.items.push({ productId, quantity, price });
    }

    // Actualizar el total del carrito
    cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    res.status(200).json(cart);
});

// Eliminar producto del carrito
router.delete('/:userId/:productId', (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const cart = carts[userId];

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.items = cart.items.filter(item => item.productId !== productId);

    // Actualizar el total del carrito
    cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    res.status(200).json(cart);
});

// Actualizar cantidad de un producto
router.put('/:userId/:productId', (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    const cart = carts[userId];

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;

        // Actualizar el total del carrito
        cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        res.status(200).json(cart);
    } else {
        res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }
});

module.exports = router;
