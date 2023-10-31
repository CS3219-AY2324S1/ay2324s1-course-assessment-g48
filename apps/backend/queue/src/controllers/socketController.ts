import { Socket } from "socket.io";
import QueueService from "../services/queueService";

class SocketController {
  queueService: QueueService;

  constructor() {
    this.queueService = new QueueService();
  }

  handleConnection(socket: Socket) {
    socket.on("matching", (data) => {
      console.log(`\n`);
      console.log(`Socket data: ${JSON.stringify(data)}`);
      const difficulty = data.difficulty;
      const uid = data.user.id;
      this.queueService.checkAndReleaseOtherConnections(uid);

      socket.on("disconnect", () => this.handleDisconnect(socket, uid));
      this.queueService.attemptToMatchUsers(difficulty, data.user.id, socket);
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

    socket.emit("connected");
  }

  handleDisconnect(socket: Socket, uid: number) {
    this.queueService.cleanUp(uid);
    socket.removeAllListeners();
  }
}

export default SocketController;
