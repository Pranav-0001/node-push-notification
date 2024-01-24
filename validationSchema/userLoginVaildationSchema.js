import { body } from "express-validator";

export const userLoginValidationSchema = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password can't be empty")
];
