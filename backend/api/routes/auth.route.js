import express from 'express';
import { roleChecker, signin, signup } from '../controllers/auth.controller.js';
import cookieChecker from '../middlewares/cookieChecker.js';


const router=express.Router();


router.post("/signup",signup);
router.post("/signin", signin, cookieChecker);
router.get("/rolechecker",cookieChecker,roleChecker)

export default router;