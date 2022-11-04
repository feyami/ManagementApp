import express from "express";
import  googleAuth from "../controllers/auth/googleAuth.js";
import {loginSuccess,loginFailed,logout}   from "../controllers/auth/auth.js";

 
const router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', googleAuth);

router.get("/login/success", loginSuccess);
router.get("/login/failed", loginFailed);
router.get("/logout", logout);

export default router;
