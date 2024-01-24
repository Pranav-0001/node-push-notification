import jwt from "jsonwebtoken";

export const validateToken = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split("Bearer ")[1];
    const { user } = jwt.verify(token, process.env.JWT_KEY);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ status: false, Error: "Invalid token" });
    }
  } catch (error) {}
};
