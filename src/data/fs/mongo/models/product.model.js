import { Schema, model } from "mongoose";

const collection = "products"
const schema = new Schema({
    title: {type: String, required: true},
    photo: {type: String, default:""},
    category: {type: String, default:"Telefonos"},
    price: {type: Number, default: 721},
    stock: {type: Number, default: 40}
});

const Product = model(collection, schema);

export default Product;