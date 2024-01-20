import express from "express";
import indexRouter from "./router/indexRouter.js";
import { db } from "./db/config.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/", indexRouter);

app.listen(3000, () => {
  console.log("Server started");
});
