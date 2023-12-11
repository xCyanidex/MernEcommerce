import jwt from "jsonwebtoken"
import User from "../models/user.model.js";


export const auth = async (req, res, next) => {
const token=req.cookies.token;

    try {
        let decodedData;
        decodedData =jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decodedData?.id;
        const existingUser = await User.findOne({ _id: req.userId });
        if (!existingUser) return res.status(400).json({message:"User Not Logged In."})
        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth;