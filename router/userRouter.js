import express from "express";
import { userSignup } from "../controller/userController.js";
import { userSignupValidationSchema } from "../validationSchema/userSignupValidationSchema.js";
import { validateRequest } from "../helpers/validateRequest.js";
const router = express.Router();

router.post('/signup',userSignupValidationSchema,validateRequest,userSignup)

export default router;
