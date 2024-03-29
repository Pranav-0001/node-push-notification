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

export const userLogin = async (req, res) => {
  try {
    const data = matchedData(req);
    const user = await userModal.findOne({ email: data.email });
    if (user) {
      if (await bcrypt.compare(data.password, user.password)) {
        const token = jwt.sign({ user }, process.env.JWT_KEY);
        res.status(200).json({ status: true, user, token }); // 200 OK for successful login
      } else {
        res.status(401).json({ status: false, Error: "Incorrect password" }); // 401 Unauthorized for incorrect password
      }
    } else {
      res.status(401).json({ status: false, Error: "Email not found" }); // 404 Not Found for email not found
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({ status: false, Error: "Internal Server Error" }); // 500 Internal Server Error for unexpected errors
  }
};


