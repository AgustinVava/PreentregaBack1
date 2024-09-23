function isValidData(req, res, next) {
  try {
    const { title, stock, price, supplier, locked } = req.body;
    if (!title || !stock || !price || !supplier || !locked) {
      const error = new Error("title, stock, price, supplier and locked");
      error.statusCode = 400;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    throw error;
  }
}

export default isValidData;