import express from "express";
import { userLogin, userSignup } from "../controller/userController.js";
import { userSignupValidationSchema } from "../validationSchema/userSignupValidationSchema.js";
import { validateRequest } from "../helpers/validateRequest.js";
import { userLoginValidationSchema } from "../validationSchema/userLoginVaildationSchema.js";
const router = express.Router();

router.post('/signup',userSignupValidationSchema,validateRequest,userSignup)
router.post('/login',userLoginValidationSchema,validateRequest,userLogin)

export default router;
