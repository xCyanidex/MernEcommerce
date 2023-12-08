import express from 'express';
import { mongoose } from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import cors from "cors";
import cookieParser from 'cookie-parser'
import {  isLoggedIn } from './controllers/user.controller.js';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("connected to mongodb");
})
.catch((err)=>{
    console.log(err);
})

const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());



app.listen(3000,()=>{
    console.log(`Server listening on port 3000`)
})

app.use('/api/user',userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin',adminRoutes)



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||500;
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
})