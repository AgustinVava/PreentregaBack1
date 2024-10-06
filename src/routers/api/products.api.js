import { Router } from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  destroyProduct,
  showProducts, // Asegúrate de importar el controlador para mostrar productos
} from "../../../src/controllers/products.controllers.js";
import isValidData from "../../middlewares/isValidData.mid.js";

const productsRouter = Router();

// Rutas para la API
productsRouter.get("/", getAllProducts); // Obtener todos los productos
productsRouter.get("/:pid", getProduct); // Obtener un producto específico
productsRouter.post("/", isValidData, createProduct); // Crear un nuevo producto
productsRouter.put("/:pid", updateProduct); // Actualizar un producto
productsRouter.delete("/:pid", destroyProduct); // Eliminar un producto

// Nueva ruta para renderizar el panel de administración
productsRouter.get("/admin", showProducts); // Mostrar todos los productos en el panel


export default productsRouter;
