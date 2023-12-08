import express from 'express';
import { isLoggedIn } from '../controllers/user.controller.js';

const router=express.Router();      

router.post('/',isLoggedIn)

export default router;