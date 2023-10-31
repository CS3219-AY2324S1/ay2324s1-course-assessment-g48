import { WebSocketServer } from "ws";
import express, { Express } from "express";
import { SessionRouter } from "./routes/sessionRouter.ts";
import cors from "cors";
import { PORT } from "./utils/config.ts";

class SessionServer {
  private wss: WebSocketServer;
  private router: SessionRouter;
  private app: Express;

  constructor() {
    this.wss = new WebSocketServer({ noServer: true });
    this.app = express();
    const server = this.app.listen(PORT);

    server.on("upgrade", (request, socket, head) => {
      this.wss.handleUpgrade(request, socket, head, (socket) => {
        this.wss.emit("connection", socket, request);
      });
    });

    this.app.use(express.json());
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
      "http://peerprep-user:8001",
      "http://peerprep-question:8000",
      "http://peerprep-frontend:3000",
    ];

    this.app.use(
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
    this.router = new SessionRouter(this.wss);
    this.app.use("/session", (req, res, next) =>
      this.router.router(req, res, next)
    );
  }
}

new SessionServer();
