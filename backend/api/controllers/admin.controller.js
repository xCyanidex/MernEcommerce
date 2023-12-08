import Product from "../models/products.model.js"
import { errorHandler } from "../utils/error.js";

export const addProduct=async(req,res,next)=>{
try {
    const { name, description, price, images } = req.body;
    const newProduct = new Product({
        name,
        description,
        price,
        images,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
    next();
}


export const deleteProduct=async (req,res,next)=>{
    const {productId} =req.body;
    try {
        const result = await Product.deleteOne({ _id: productId });
        if (result.deletedCount > 0) { res.status(200,'Product Deleted Successfully')}
    } catch (error) {
        return errorHandler(500,error);
    }
    next();
}

export const editProduct = async (req, res, next) => {
    const { productId, name,
        description,
        price,
        images, } = req.body;
    const updatedProductDetails={
        name,
        description,
        price,
        images,
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updatedProductDetails,
            { new: true, runValidators: true }
        );
        if (updatedProduct) { res.status(200, 'Product Updated Successfully') }
    } catch (error) {
        return errorHandler(500, error);
    }
    next();
}

