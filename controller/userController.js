import { matchedData } from "express-validator";
import bcrypt from "bcrypt";
import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  try {
    const data = matchedData(req);
    const password = await bcrypt.hash(data.password, 10);
    const createdUser = await new userModal({
      name: data.name,
      email: data.email,
      password,
    }).save();
    const token = jwt.sign({ user: createdUser }, process.env.JWT_KEY);
    res.json({ status: true, user: createdUser, token });
  } catch (error) {
    if (error.code === 11000) {
      res.json({ error: "email already registered" });
    }
    console.log({ error });
  }
};
