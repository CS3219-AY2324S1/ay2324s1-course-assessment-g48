import express from "express";
import { userRouter } from "./routes/userRouter";
import cors from "cors";
import PingRouter from "./routes/pingRouter";
import helmet from "helmet";

export const app = express();

const allowedOrigins = [
    'http://localhost',
    'http://localhost:80',
    'http://localhost:3000',
    'http://localhost:8000',
    'http://localhost:8080',
    'http://localhost:8001',
    'http://localhost:8080',
    'http://localhost:9000',
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
app.use(helmet());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/ping", new PingRouter().routes());
