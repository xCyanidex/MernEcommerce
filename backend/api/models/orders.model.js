import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    products: {
        type: [String],
        default: [],
    },
    total:{
        type:String,
        required:true,
    }
})

const Order = mongoose.model('Order', orderSchema);

export default Order;