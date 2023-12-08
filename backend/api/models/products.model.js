import mongoose from "mongoose";


const productSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1, 
    },
    images: {
        type: [String], 
        default: [], 
    },
})

const Product = mongoose.model('Product', productSchema);

export default Product;