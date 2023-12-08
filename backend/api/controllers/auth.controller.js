import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send("Email is already registered.")
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }


    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "User created Successfully" })
    } catch (error) {
        next(error);
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const pass = bcryptjs.compareSync(password, existingUser.password);
            if (!pass) return errorHandler(401, 'Wrong Credentials')
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
            const {password:hashedPassword,...rest}=existingUser._doc;
            const expiryDate=new Date(Date.now()+3600000);
            res.cookie('accesstoken', token, { httpOnly: true ,expires:expiryDate}).status(200).json(rest)
        } else {
            return next(errorHandler(404, 'User not found'));
        }
    } catch(error) {
        next(error);
    }
}