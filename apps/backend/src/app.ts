import express, { response } from "express";
import mongoose from "mongoose";
import * as middleware from "./utils/middleware";
import * as logger from "./utils/logger";
import * as config from "./utils/config";
import { questionRouter } from "./controllers/Question";
import { prisma } from "./database/prisma";

const app = express();

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

app.get("/", async (request, response) => {
  await prisma.users.create({
    data: {
      email: "pnws@gmail.com",
      password: "123987123",
    },
  });
  response.send("<h1>Hello World!</h1>");
  response.end();
});

app.use("/api/questions", questionRouter);

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
