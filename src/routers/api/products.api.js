import { Router } from "express";
import {
  create,
  read,
  readAll,
  update,
  destroy,
} from "../../../src/controllers/products.controllers.js"
import isValidData from "../../middlewares/isValidData.mid.js";


const productsRouter = Router();

productsRouter.get("/", readAll);
productsRouter.get("/:pid", read);
productsRouter.post("/", isValidData, create);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);

export default productsRouter;