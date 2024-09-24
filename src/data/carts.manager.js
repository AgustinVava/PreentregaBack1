// src/routers/managers/carts.manager.js

import fs from "fs";
import crypto from "crypto";

class CartManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }

  exists() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("Cart file created");
    } else {
      console.log("Cart file already exists");
    }
  }

  async readAll() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async read(userId) {
    try {
      const allCarts = await this.readAll();
      return allCarts.find(cart => cart.userId === userId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(userId, products = []) {
    try {
      const newCart = { userId, products };
      const allCarts = await this.readAll();
      allCarts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
      return newCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(userId, updatedCart) {
    try {
      const allCarts = await this.readAll();
      const index = allCarts.findIndex(cart => cart.userId === userId);
      if (index === -1) {
        return null;
      }
      allCarts[index] = updatedCart;
      await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
      return updatedCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(userId) {
    try {
      const allCarts = await this.readAll();
      const filteredCarts = allCarts.filter(cart => cart.userId !== userId);
      if (allCarts.length === filteredCarts.length) {
        return null;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(filteredCarts, null, 2));
      return `Cart for user with id ${userId} deleted`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addProductToCart(userId, productId, quantity) {
    try {
      const cart = await this.read(userId);
      if (!cart) {
        return await this.create(userId, [{ productId, quantity }]);
      }

      const existingProductIndex = cart.products.findIndex(item => item.productId === productId);
      if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      return await this.update(userId, cart);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async removeProductFromCart(userId, productId) {
    try {
      const cart = await this.read(userId);
      if (!cart) throw new Error('Cart does not exist.');

      cart.products = cart.products.filter(item => item.productId !== productId);
      return await this.update(userId, cart);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const cartManager = new CartManager("./src/data/files/carts.json");
export default cartManager;
