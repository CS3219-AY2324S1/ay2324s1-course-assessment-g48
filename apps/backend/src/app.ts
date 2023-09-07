import express, { response } from "express";
import mongoose from "mongoose";
import * as middleware from "./utils/middleware";
import * as logger from "./utils/logger";
import * as config from "./utils/config";
import { questionRouter } from "./controllers/Question";
import { prisma } from "./database/prisma";
var cors = require('cors')

const app = express();
app.use(cors())

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI || "")
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error: any) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(express.json());

app.use("/api/question", questionRouter);

module.exports = app;
