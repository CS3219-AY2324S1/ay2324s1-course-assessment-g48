import { Server, Socket } from "socket.io";
import QueueService from "../services/queueService";

class SocketController {
  queueService: QueueService;
  io: Server;

  constructor(io: Server) {
    this.queueService = new QueueService();
    this.io = io;
  }

  handleConnection(socket: Socket) {
    socket.emit("connected", () => console.log("Socket connected"));
    socket.on("matching", (data) => {
      console.log(`\n`);
      //   console.log(`Socket data: ${JSON.stringify(data)}`);
      socket.emit(`Attempting to match user: ${data.uid} `);
      const nameSpace = data.nameSpace;
      const uid = data.user.id;
      this.queueService.checkAndReleaseOtherConnections(uid);

      socket.on("disconnect", () => this.handleDisconnect(socket, uid));
      this.queueService.attemptToMatchUsers(nameSpace, data.user.id, socket);
      setTimeout(() => {
        if (!socket.disconnected) {
          console.log(`\n`);
          socket.emit("timeout");
          console.log(
            `Disconnecting from ${data.user} due to 30s passing and no match was found.`
          );
          socket.disconnect();
        }
      }, 30000);
    });
  }

  handleDisconnect(socket: Socket, uid: number) {
    this.queueService.cleanUp(uid);
    socket.removeAllListeners();
  }

  async onExit() {
    this.io.fetchSockets().then((sockets) => {
      sockets.forEach((socket) => {
        socket.disconnect(true);
      });
    });
    this.queueService.onExit();
  }
}

export default SocketController;
