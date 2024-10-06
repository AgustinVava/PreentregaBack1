function isValidData(req, res, next) {
  try {
    const { title, stock, price, supplier, category} = req.body;
    if (!title || !stock || !price || !supplier || !category) {
      const error = new Error("title, stock, category, price and supplier");
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