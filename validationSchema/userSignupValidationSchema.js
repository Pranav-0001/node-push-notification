import { body } from "express-validator";

export const userSignupValidationSchema = [
  body("name").notEmpty().withMessage("Name can't be empty"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
