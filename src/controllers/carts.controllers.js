class cartsController {
    constructor() {
        this.carts = {};
    }

    async getCartByUserId(userId, productId, quantity, price) {
        // Agregar un producto al carrito de un usuario
        if (!this.carts[userId]) {
            this.carts[userId] = { items: [], totalPrice: 0 };
        }

        const cart = this.carts[userId];
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price });
        }

        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return cart;
    }

    async removeProductFromCart(userId, productId) {
        // Eliminar un producto del carrito de un usuario
        const cart = this.carts[userId];

        if (!cart) return null;

        cart.items = cart.items.filter(item => item.productId !== productId);
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        return cart;
    }
}

export default cartsController();
