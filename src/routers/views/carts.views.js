import { Router } from "express";
import express from 'express';

const cartsViewRouter = Router()
const router = express.Router();

// Simulación de base de datos en memoria para los carritos
let carts = {};

// Obtener el carrito
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const cart = carts[userId] || { items: [], totalPrice: 0 };
    res.json({ message: "Carrito obtenido", cart });
});

// Agregar productos al carrito
router.post('/:userId/add', (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity, price } = req.body;
    if (!carts[userId]) carts[userId] = { items: [], totalPrice: 0 };
    
    const cart = carts[userId];
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId, quantity, price });
    }
    
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    res.json({ message: "Producto agregado", cart });
});

// Eliminar productos del carrito
router.post('/:userId/remove/:productId', (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    
    if (!carts[userId]) return res.status(404).json({ message: "Carrito no encontrado" });
    
    carts[userId].items = carts[userId].items.filter(item => item.productId !== productId);
    carts[userId].totalPrice = carts[userId].items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    res.json({ message: "Producto eliminado", cart: carts[userId] });
});



export default cartsViewRouter