import { Router } from "express";
import { showProducts, showOneProduct } from "../../../src/controllers/products.controller.js";

const productsViewRouter = Router()

productsViewRouter.get("/", showProducts)
productsViewRouter.get("/:pid", showOneProduct)

export default productsViewRouter