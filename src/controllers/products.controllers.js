import productsManager from "../data/products.manager.js";
import productsMongoManager from "../data/fs/mongo/managers/product.mongo.js";
import Product from "../data/fs/mongo/models/product.model.js";

async function getAllProducts(req, res, next) {
  try {
    let { category } = req.query;
    let response;
    if (!category) {
      response = await productsManager.readAll();
    } else {
      response = await productsManager.readAll(category);
    }
    if (response.length > 0) {
      return res.status(200).json({ message: "PRODUCTS READ", response });
    } else {
      const error = new Error("PRODUCTS NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsManager.read(pid);
    if (response) {
      return res.status(200).json({ message: "PRODUCT READ", response });
    } else {
      const error = new Error("PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function createGet(req, res, next) {
  try {
    const { title, price, quantity } = req.params;
    let { category, supplier} = req.query;
    if (!category) {
      category = "none";
    }
    if (!supplier) {
      supplier = "none";
    }
    const response = await productsManager.create({
      title,
      price,
      quantity,
      category,
      supplier
    });
    return res.status(201).json({ message: "PRODUCT CREATED SUCCESSFULLY", response });
  } catch (error) {
    return next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const data = req.body;
    const responseManager = await productsManager.create(data);
    return res
      .status(201)
      .json({ message: "PRODUCT CREATED SUCCESSFULLY", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const responseManager = await productsManager.update(pid, newData);
    if (!responseManager) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: "PRODUCT UPDATED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function destroyProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const responseManager = await productsManager.delete(pid);
    if (!responseManager) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: "PRODUCT DELETED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function showProducts (req, res, next) {
  try {
    let { category } = req.query;
    let all;
    if (!category) {
      all = await productsManager.readAll();
    } else {
      all = await productsManager.readAll(category);
    }
    if (all.length > 0) {
      return res.render("products", { products: all })
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }

  } catch (error) {
    return next(error)
  }
}

async function showOneProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsManager.read(pid);
    if (response) {
      return res.render("oneproduct", { one: response })
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function create (req, res, next) {
try {
  const data = req.body
  const response = await productsMongoManager.create(data)
  return res.status(201).json({ message: "Product Created", response: response._id })
} catch (error) {
  return next(error)
}  
}

async function readAll (req, res, next) {
  try {
    const { pid } = req.params
    const response = await productsMongoManager.readAll()
    return res.status(200).json({message: "Products read successfully", response})
  } catch (error) {
    return next(error) 
  }
}

async function read (req, res, next) {
  try {
    const { pid } = req.params
    const response = await productsMongoManager.read(pid)
    return res.status(200).json({message: "Product read successfully", response})
  } catch (error) {
    return next(error)
  }
}

async function update (req, res, next) {
  try {
    const { pid } = req.params
    const data = req.body
    const response = await productsMongoManager.update(pid, data)
    return res.status(200).json({message: "Product updated", response})
  } catch (error) {
    return next(error)
  }
}

async function destroy (req, res, next) {
  try {
    const { pid } = req.params
    const response = await productsMongoManager.destroy(pid)
    return res.status(200).json({message: "Product destroyed", response})
  } catch (error) {
    return next(error)
  }
}

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  destroyProduct,
  showProducts,
  showOneProduct,
  createGet,
  create,
  update,
  read,
  readAll,
  destroy
};