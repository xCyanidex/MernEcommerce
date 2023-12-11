import express from 'express';
import { showSortedProducts } from '../controllers/product.controller.js';


const router = express.Router();

router.get("/getSortedProducts",showSortedProducts);


export default router;