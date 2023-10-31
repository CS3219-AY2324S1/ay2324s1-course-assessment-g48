// // @ts-check
// import fs from "fs";
// import express from "express";
// import { WebSocketServer } from "ws";
// import { Repo, RepoConfig, PeerId } from "@automerge/automerge-repo";
// import { NodeWSServerAdapter } from "@automerge/automerge-repo-network-websocket";
// import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs";
// import { Server } from "http";
// import os from "os";
// import { PORT } from "./utils/config";

// export class WSServer {
//   socket: WebSocketServer;
//   server: Server;
//   isReady: boolean = false;
//   readyResolvers: ((value) => void)[] = [];

//   constructor() {
//     const dir = "automerge-sync-server-data";
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }

//     const hostname = os.hostname();

//     this.socket = new WebSocketServer({ noServer: true });

//     const app = express();
//     app.use(express.static("public"));

//     const config: RepoConfig = {
//       network: [new NodeWSServerAdapter(this.socket)],
//       storage: new NodeFSStorageAdapter(dir),
//       peerId: `storage-server-${hostname}` as PeerId,
//       // Since this is a server, we don't share generously — meaning we only sync documents they already
//       // know about and can ask for by ID.
//       sharePolicy: async () => false,
//     };
//     const serverRepo = new Repo(config);

//     app.get("/", (req, res) => {
//       res.send(`👍 @automerge/example-sync-server is running`);
//     });

//     this.server = app.listen(PORT, () => {
//       console.log(`Listening on port ${PORT}`);
//       this.isReady = true;
//       this.readyResolvers.forEach((resolve) => resolve(true));
//     });

//     this.server.on("upgrade", (request, socket, head) => {
//       this.socket.handleUpgrade(request, socket, head, (socket) => {
//         this.socket.emit("connection", socket, request);
//       });
//     });
//   }

//   async ready() {
//     if (this.isReady) {
//       return true;
//     }

//     return new Promise((resolve) => {
//       this.readyResolvers.push(resolve);
//     });
//   }

//   close() {
//     this.socket.close();
//     this.server.close();
//   }
// }
// new WSServer();

import { WebSocketServer } from "ws";
import express, { Express } from "express";
import { SessionRouter } from "./routes/sessionRouter.ts";
import cors from "cors";

class SessionServer {
  private wss: WebSocketServer;
  private router: SessionRouter;
  private app: Express;

  constructor() {
    this.wss = new WebSocketServer({ noServer: true });
    this.app = express();
    const server = this.app.listen(8250);

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
