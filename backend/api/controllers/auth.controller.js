import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";
import { createSecretToken } from '../utils/SecretToken.js';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered." })
        }
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({ username, email, password: hashedPassword });

        const result = await newUser.save();

        // const token = createSecretToken(newUser._id, newUser.email)
        const token =jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(200).json({ result, token, message: "User created Successfully" })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong." })
    }
}


export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) { return res.status(404).json({ message: "User doesn't exist." }) }
        const isPasswordCorrect = bcryptjs.compareSync(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials." })

        const token =jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET);
        // const token = createSecretToken(newUser._id, newUser.email)
        const { password: hashedPassword, ...rest } = existingUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(200).json({ token, rest, message: "User Successfully Logged In" })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong." })
    }
}




