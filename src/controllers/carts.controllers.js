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
   
  export {
    getCartByUserId,
    addProductToCart,
    removeProductFromCart,
  };
  