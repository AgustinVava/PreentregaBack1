import Product from "../models/product.model.js";

class ProductsMongoManager {
    async create(data) {
        try {
            const created = await Product.create(data);
            return created
        } catch (error) {
            throw error
        }
    }
    async readAll() {
        try {
            const all = await Product.find()
            return all
        } catch (error) {
            throw error
        }
    }
    async read(pid) {
        try {
            const one = await Product.findById(pid)
            return one
        } catch (error) {
            throw error
        }
    }
    async update(pid, data) {
        try {
            const opts = { new: true }
            const updateOne = await Product.findByIdAndUpdate(pid, data, opts)
            return updateOne
        } catch (error) {
            throw error
        }
    }
    async destroy(pid) {
        try {
            const deleteOne = await Product.findByIdAndDelete(pid)
            return deleteOne
        } catch (error) {
            throw error
        }
    }
};

const productsMongoManager = new ProductsMongoManager;

export default productsMongoManager;