import { WebSocketServer } from "ws";
import express, { Express } from "express";
import { SessionRouter } from "./routes/sessionRouter.ts";
import cors from "cors";
import { MONGODB_URI, PORT } from "./utils/config.ts";
import mongoose from "mongoose";
import { testRouter } from "./routes/testRouter.ts";
import http from "http";

const wss: WebSocketServer = new WebSocketServer({ noServer: true });
const app = express();
const server = http.createServer(app);

app.use(express.json());

const allowedOrigins: string[] = [
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
    origin: (origin, callback) => {
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
server.listen(PORT, () => {
  console.log("Session Server is listening on port 8250");
});

const sessionRouter = new SessionRouter(wss);
app.use("/session", (req, res, next) => sessionRouter.router(req, res, next));
app.use("/ping", testRouter);

server.on("upgrade", (request, socket, head) => {
  //   console.log(request);
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});

mongoose
  .connect(MONGODB_URI || "")
  .then(() => {
    console.log("Session connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });
mongoose.set("debug", true);
