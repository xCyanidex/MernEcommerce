import express from 'express';
import { addProduct, deleteProduct, editProduct } from '../controllers/admin.controller.js';


const router=express.Router();

router.post('/addNewProduct',addProduct);
router.post('/deleteProduct',deleteProduct);
router.post('/editProduct', editProduct);


export default router;