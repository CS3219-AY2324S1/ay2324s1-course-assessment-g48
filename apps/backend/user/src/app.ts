import express from "express";
import * as logger from "./utils/logger";
import * as config from "./utils/config";
import { userRouter } from "./controllers/api/userRouter";
import cors from "cors";

export const app = express();
app.use(cors());



app.use(express.json());

app.use("/api/users", userRouter);

