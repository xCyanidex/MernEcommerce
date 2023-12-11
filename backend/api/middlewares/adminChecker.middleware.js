import User from "../models/user.model.js"

export const isAdmin= async (req,res,next)=>{

    try {
        if (!req.userId) return res.status(400).json({ message: "User not logged In." });
        const userId = req.userId;
        const existingUser = await User.findOne({ _id: userId });
        if (!existingUser.role == 'admin') { return res.status(401).json({message:"User not Authorized"}) }
        next();
    } catch (error) {
        console.log(error);
    }
}



