import Order from "../models/orders.model.js"



export const placeOrder=async(req,res,next)=>{

const {products,total,email,phone,address}=req.body;

if (!products || !total || !email || !phone || !address) {
    return res.status(400).json({ message: "Missing required fields in the request body." });
}
    const newOrder = new Order({ products, total, email, phone, address });
    try {
       await newOrder.save();
       res.status(201).json({message:"Order Placed Successfully"}) 

    } catch (error) {
        res.status(500).json({message:error})
    }

}

