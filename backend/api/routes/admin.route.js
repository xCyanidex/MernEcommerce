import express from 'express';
import { addProduct, deleteProduct, editProduct } from '../controllers/admin.controller.js';
import { jwtAuth, isAdminChecker } from '../controllers/auth.controller.js';


const router=express.Router();

router.post('/addNewProduct', jwtAuth, isAdminChecker,addProduct);
router.post('/deleteProduct', jwtAuth, isAdminChecker,deleteProduct);
router.post('/editProduct', jwtAuth, isAdminChecker, editProduct);


export default router;