import jwt from 'jsonwebtoken';
import User from "../models/user.model.js"
import { errorHandler } from '../utils/error.js';

export const isLoggedIn =async (req,res,next)=>{
    console.log("reached here");
    const accessToken = req.cookies.accesstoken;

    try {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        const existingUser = await User.findOne({ _id:userId });
        if (!existingUser){return errorHandler(400,"User is not Logged in")}
        res.send({ statusCode:200, username: existingUser.username, role: existingUser.role })
    } catch (error) {
        console.log("error occured");
    }

next();
}

