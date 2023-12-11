import Product from "../models/products.model.js"

export const showSortedProducts=async (req,res)=>{

    try {
        const latestProducts = await Product.find()
            .sort({ createdAt: -1 }) // Sort in descending order
            .exec();
            return latestProducts;
    } catch (error) {
        throw error;
    }
}

export const addProduct = async (req, res) => {
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
}


export const deleteProduct = async (req, res) => {
    const { productId } = req.body;
    try {
        const result = await Product.deleteOne({ _id: productId });
        if (result.deletedCount > 0) { res.status(200, 'Product Deleted Successfully') }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const editProduct = async (req, res) => {
    const { productId, name,
        description,
        price,
        images, } = req.body;
    const updatedProductDetails = {
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
        if (updatedProduct) return  res.status(200).json({message:'Product Updated Successfully'})
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal Server Error"})
    }
}

