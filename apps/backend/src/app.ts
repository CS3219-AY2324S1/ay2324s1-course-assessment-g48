import express from "express";
import mongoose from "mongoose";
import * as logger from "./utils/logger";
import * as config from "./utils/config";
import { questionRouter } from "./controllers/api/questionRouter";
import { userRouter } from "./controllers/api/userRouter";
import cors from "cors";

const app = express();
app.use(cors());

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI || "")
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/question", questionRouter);

module.exports = app;
