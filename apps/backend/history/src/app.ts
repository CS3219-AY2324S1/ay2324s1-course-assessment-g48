import express from "express";
import mongoose from "mongoose";
import * as logger from "./utils/logger";
import * as config from "./utils/config";
import { historyRouter } from "./controllers/api/historyRouter";
import cors from "cors";
import test from "node:test";
import { testRouter } from "./controllers/api/testRouter";

export const app = express();
const allowedOrigins = [
  "http://localhost",
  "http://localhost:80",
  "http://localhost:3000",
  "http://localhost:8000",
  "http://localhost:8080",
  "http://localhost:8001",
  "http://localhost:8022",
  "http://localhost:8500",
  "http://localhost:9000",
  "http://leetpal.com",
  "http://www.leetpal.com",
  "https://www.leetpal.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

logger.info("History service connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI || "")
  .then(() => {
    logger.info("History service connected to MongoDB");
  })
  .catch((error) => {
    logger.error("History service error connection to MongoDB:", error.message);
  });

app.use(express.json());

app.use("/api/history", historyRouter);
app.use("/ping", testRouter);
