import { WebSocketServer } from "ws";
import express from "express";
import { SessionRouter } from "./routes/sessionRouter.ts";
import cors from "cors";
import { SESSION_PORT, MONGODB_URI, WS_PORT } from "./utils/config.ts";
import mongoose from "mongoose";
import { testRouter } from "./routes/testRouter.ts";
import http from "http";

const app = express();

// Separate WebSocket server
const wsServer = http.createServer((req, res) => {
  // Handle HTTP requests specifically for the ping endpoint
  if (req.url === "/ping") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("pong");
  }
  // Other non-WebSocket requests can be handled here or returned as not found, etc.
});
const wss = new WebSocketServer({ server: wsServer, path: "/ws" });

wsServer.listen(WS_PORT, () => {
  console.log(`WebSocket Server is listening on port ${WS_PORT}`);
});

// Express HTTP server
const httpServer = http.createServer(app);

httpServer.listen(SESSION_PORT, () => {
  console.log(`HTTP Server is listening on port ${SESSION_PORT}`);
});

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
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

const sessionRouter = new SessionRouter(wss);
app.use("/api/session", sessionRouter.router);
app.use("/ping", testRouter);

console.log('Connecting to MongoDB...');

// MongoDB connection
mongoose
  .connect(MONGODB_URI || "")
  .then(() => {
    console.log("Session connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

mongoose.set("debug", true);
