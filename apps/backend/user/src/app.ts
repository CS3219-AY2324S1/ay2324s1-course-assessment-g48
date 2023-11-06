import express from "express";
import { userRouter } from "./controllers/api/userRouter";
import cors from "cors";

export const app = express();

const allowedOrigins = [
  "http://localhost",
  "http://localhost:80",
  "http://localhost:3000",
  "http://localhost:8000",
  "http://localhost:8080",
  "http://localhost:8001",
  "http://localhost:8022",
  "http://localhost:8420",
  "http://localhost:8500",
  "http://localhost:9000",
  "http://peerprep-user:8001",
  "http://peerprep-question:8000",
  "http://peerprep-frontend:3000",
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

app.use(express.json());
app.use("/api/users", userRouter);
