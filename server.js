import express from "express";
import indexRouter from "./router/indexRouter.js";
import userRouter from "./router/userRouter.js";
import fileUploadRouter from "./router/fileRouter.js"
import dotenv from "dotenv";
import { db } from "./db/config.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/file",fileUploadRouter)

app.listen(3000, () => {
  console.log("Server started");
});
