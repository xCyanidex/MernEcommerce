
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const createSecretToken = (id,email) => {
    console.log(process.env.JWT_SECRET)
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60,
    });
};