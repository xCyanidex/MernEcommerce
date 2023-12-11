import express from 'express';
import { addProduct, deleteProduct, editProduct } from '../controllers/product.controller.js';
import {auth} from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/adminChecker.middleware.js"


const router=express.Router();

router.post('/addNewProduct', auth, isAdmin,addProduct);
router.post('/deleteProduct', auth, isAdmin,deleteProduct);
router.post('/editProduct', auth, isAdmin, editProduct);


export default router;